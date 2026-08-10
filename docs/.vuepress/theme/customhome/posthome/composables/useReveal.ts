import { onBeforeUnmount, onMounted, ref } from "vue";

export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const el = ref<T | null>(null);
  const visible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const target = el.value;
    if (!target || !("IntersectionObserver" in window)) {
      visible.value = true;
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true;
            observer?.disconnect();
          }
        }
      },
      { threshold },
    );
    observer.observe(target);
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { el, visible };
}
