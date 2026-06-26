import type { ThemePosts, ThemePostsItem } from "vuepress-theme-plume";

// 按时间降序排序
function sortByTime(posts: ThemePosts): ThemePosts {
  // 复制数组，避免修改原数组
  const copy = [...posts];
  copy.sort((a, b) => {
    return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
  });
  return copy;
}

// 按 sticky 降序
function sortBySticky(posts: ThemePosts): ThemePosts {
  const copy = [...posts];
  const getStickyValue = (item: ThemePostsItem): number | null => {
    // 检查属性是否存在
    if (!item.hasOwnProperty("sticky")) return null;
    const s = item.sticky;
    if (typeof s === "number") return s;
    if (typeof s === "boolean" && s === true) return 1;
    if (typeof s === "boolean" && s === false) return null; // false 视为 null
    // 其他情况（如字符串等）视为无效
    return null;
  };

  copy.sort((a, b) => {
    const valA = getStickyValue(a);
    const valB = getStickyValue(b);
    // 有有效值的排在前面
    if (valA !== null && valB === null) return -1;
    if (valA === null && valB !== null) return 1;
    // 两者都有效：按数值降序（值大的在前）
    if (valA !== null && valB !== null) {
      return valB - valA;
    }
    // 两者都无效：保持原顺序（0 表示相等）
    return 0;
  });
  return copy;
}

export { sortByTime, sortBySticky };
