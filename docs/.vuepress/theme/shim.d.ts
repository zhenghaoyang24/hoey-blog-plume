declare module "*.vue" {
  import type { ComponentOptions } from "vue";

  const comp: ComponentOptions;
  export default comp;
}

declare module "@internal/postLinks" {
  const postLinks: Record<string, string[]>;
  export { postLinks };
}
