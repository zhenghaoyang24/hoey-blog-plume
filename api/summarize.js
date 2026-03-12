// api/summarize.js
import OpenAI from 'openai';

// 使用 Map 存储限流数据，key 为 IP，value 为时间戳数组
const rateLimitMap = new Map();

// 每分钟清理一次过期数据
setInterval(() => {
  const now = Date.now();
  const oneMinute = 60 * 1000;
  
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    // 只保留 1 分钟内的记录
    const valid = timestamps.filter(t => now - t < oneMinute);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 60000);

// 获取真实 IP
const getClientIp = (req) => {
  // Vercel 转发头
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  // 其他可能头
  return req.headers['x-real-ip'] 
    || req.headers['x-vercel-forwarded-for']
    || req.socket?.remoteAddress 
    || 'unknown';
};

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp = getClientIp(req);
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // 获取该 IP 的请求记录
  const requests = rateLimitMap.get(clientIp) || [];
  
  // 清理该 IP 的过期记录（双保险）
  const validRequests = requests.filter(t => now - t < oneMinute);
  
  // 检查是否超过限制（1分钟2次）
  if (validRequests.length >= 2) {
    const oldestRequest = validRequests[0];
    const retryAfter = Math.ceil((oldestRequest + oneMinute - now) / 1000);
    
    return res.status(429).json({ 
      error: '请求过于频繁',
      message: `请 ${retryAfter} 秒后再试`,
      retryAfter,
      limit: 2,
      window: 60
    });
  }

  // 记录本次请求时间
  validRequests.push(now);
  rateLimitMap.set(clientIp, validRequests);

  // 验证环境变量
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.OPENAI_API_KEY
  });

  const { content, title } = req.body;

  if (!content || !title) {
    return res.status(400).json({ error: 'Missing content or title' });
  }

  try {
    const stream = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "你是一位专业的技术文章编辑。请用200字内总结文章核心观点，语言简洁专业。" 
        },
        { 
          role: "user", 
          content: `标题：${title}\n\n内容：${content.substring(0, 6000)}` 
        }
      ],
      model: "deepseek-chat",
      stream: true,
    });

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Stream error:', error);
    
    if (!res.headersSent) {
      res.status(500).json({ error: 'AI 服务暂时不可用' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`);
      res.end();
    }
  }
}