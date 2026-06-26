/**
 * VuePress Plugin: 提取博客文章之间的内链关系
 *
 * 在 onPrepared 阶段，遍历所有 /blog/ 文章的 page.links，
 * 解析出指向其他博客文章的链接，写入临时文件供客户端使用。
 *
 * 匹配策略说明：
 * page.links[].absolute 的值因链接写法而异（由 @vuepress/markdown 的 resolvePaths 决定）：
 *   1. 相对路径链接 [text](../other/README.md) → absolute = "/blog/other/README.md"（base + relativePath）
 *   2. 绝对路径 .md 链接 [text](/blog/other.md)  → absolute = "/blog/other.md"
 *   3. 绝对路径非.md链接 [text](/blog/other)      → absolute = "/blog/other"（保留原始 URL 路径）
 *
 * 因此需要多种策略将 link.absolute 匹配到目标页面的 path。
 */
const postLinksPlugin = () => ({
  name: "post-links-plugin",

  async onPrepared(app) {
    // 1. 筛选所有博客文章页面
    const blogPages = app.pages.filter(
      (p) => p.filePathRelative?.startsWith("blog/") && p.frontmatter.article !== false,
    );

    // 2. 建立多维度查找映射：各种可能的 key → 页面的 urlPath
    const lookup = new Map();
    for (const p of blogPages) {
      // filePathRelative: 最可靠，如 "blog/some-post/README.md"
      lookup.set(p.filePathRelative, p.path);
      // filePath: 绝对文件系统路径
      lookup.set(p.filePath, p.path);
      // urlPath: 页面的最终 URL 路径，如 "/blog/some-post.html"
      lookup.set(p.path, p.path);
      // urlPath 去掉 .html 后缀
      lookup.set(p.path.replace(/\.html$/, ""), p.path);
    }

    // 3. 遍历每篇文章的 links，解析指向其他文章的链接
    const postLinks = {};
    for (const p of blogPages) {
      const linkedUrls = [];
      for (const link of p.links || []) {
        if (!link.absolute) continue;

        const targetUrl = resolveTargetUrl(link.absolute, lookup);
        if (targetUrl && targetUrl !== p.path) {
          linkedUrls.push(targetUrl);
        }
      }
      if (linkedUrls.length > 0) {
        postLinks[p.path] = [...new Set(linkedUrls)];
      }
    }

    // 4. 写入临时文件
    const content = `export const postLinks = ${JSON.stringify(postLinks)}`;
    await app.writeTemp("internal/postLinks.js", content);
  },
});

/**
 * 将 link.absolute 解析为目标页面的 urlPath
 */
function resolveTargetUrl(absolute, lookup) {
  // 策略 1: 直接匹配
  if (lookup.has(absolute)) return lookup.get(absolute);

  // 策略 2: 去掉前导 "/" 后匹配 filePathRelative
  // 如 "/blog/other/README.md" → "blog/other/README.md"
  if (absolute.startsWith("/")) {
    const stripped = absolute.slice(1);
    if (lookup.has(stripped)) return lookup.get(stripped);
  }

  // 策略 3: 追加 "/README.md"（链接指向目录时）
  // 如 "/blog/other" → "/blog/other/README.md"
  const withReadme = absolute.replace(/\/?$/, "/README.md");
  if (lookup.has(withReadme)) return lookup.get(withReadme);
  // 也尝试去掉前导 "/" 的版本
  if (withReadme.startsWith("/") && lookup.has(withReadme.slice(1))) {
    return lookup.get(withReadme.slice(1));
  }

  // 策略 4: 追加 ".html"（链接为不完整的 URL 路径）
  // 如 "/blog/other" → "/blog/other.html"
  const withHtml = absolute.replace(/\/?$/, ".html");
  if (lookup.has(withHtml)) return lookup.get(withHtml);

  // 策略 5: 追加 ".md"（相对链接指向无后缀文件）
  // 如 "/blog/other" → "/blog/other.md"
  const withMd = absolute + ".md";
  if (lookup.has(withMd)) return lookup.get(withMd);
  if (withMd.startsWith("/") && lookup.has(withMd.slice(1))) {
    return lookup.get(withMd.slice(1));
  }

  return null;
}

export default postLinksPlugin;
