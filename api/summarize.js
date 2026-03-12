// api/summarize.js
import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.OPENAI_API_KEY
  });

  const { content, title } = req.body;

  try {
    const stream = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "你是一位专业的技术文章编辑。请用200字内总结文章核心观点，语言简洁专业。" 
        },
        { 
          role: "user", 
          content: `标题：${title}\n\n内容：${content}` 
        }
      ],
      model: "deepseek-chat",
      stream: true,  // 启用流式
    });

    // 设置 SSE 头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'AI 服务暂时不可用' });
  }
}