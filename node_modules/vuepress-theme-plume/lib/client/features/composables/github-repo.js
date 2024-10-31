// src/client/features/composables/github-repo.ts
import { computed, ref, toValue, watch } from "vue";
function useGithubRepo(repo) {
  const repoRef = computed(() => {
    const info = toValue(repo);
    const [owner = "", name = ""] = info.split("/");
    return { owner, name };
  });
  const data = ref(null);
  const loaded = ref(false);
  async function fetchData() {
    const { owner, name } = repoRef.value;
    if (__VUEPRESS_SSR__ || !owner || !name)
      return;
    loaded.value = false;
    const res = await fetch(`https://api.pengzhanbo.cn/github/repo/${owner}/${name}`).then((res2) => res2.json());
    data.value = res;
    loaded.value = true;
  }
  watch(repoRef, fetchData, { immediate: true });
  return { data, loaded };
}
export {
  useGithubRepo
};
