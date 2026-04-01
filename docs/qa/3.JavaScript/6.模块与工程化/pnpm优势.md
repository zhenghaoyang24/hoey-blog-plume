---
title: pnpm 的优势
createTime: 2026/04/01 10:02:50
permalink: /qa/js/5p56zh6v/
---

<Question :questions="['pnpm 的优势？']" />

---

### 核心原理：全局存储 + 硬链接 + 软链接

`pnpm` 之所以快且省空间，核心在于它独特的 `node_modules` 构建方式。

- **全局存储:**
  - 传统的 `npm`/`yarn` 会将每个项目的依赖都下载一份到各自的 `node_modules` 中。
  - `pnpm` 会在全局维护一个存储库（通常在 `~/.pnpm-store`）。所有包根据内容的哈希值存储，**同一版本同一个包在磁盘上只存在一份**。
- **硬链接:**
  - 当项目安装依赖时，`pnpm` 不会复制文件，而是从全局存储创建**硬链接**到项目目录下的 `.pnpm` 文件夹中。硬链接指向磁盘上的同一inode，因此不占用额外空间。
- **软链接:**
  - 项目的 `node_modules` 文件夹中，包是通过**软链接**指向 `.pnpm` 文件夹中的具体版本。
  - 结构示例：
    ```
    node_modules/
      lodash -> .pnpm/lodash@4.17.21/node_modules/lodash    # 符号链接（软链接）
    .pnpm/
      lodash@4.17.21/
        node_modules/
          lodash/    # 真实目录，但里面的文件是硬链接到全局存储
            ├── index.js      # 硬链接 → ~/.pnpm-store/xxx
            ├── package.json  # 硬链接 → ~/.pnpm-store/yyy
            └── ...
    ```

### 解决了什么核心痛点？

#### A. 幽灵依赖

- **问题:** 在 `npm`/`yarn` v1 的扁平化结构中，依赖会被提升（hoist）到顶层。这意味着你可以在 `package.json` 中没有声明的情况下，通过 `import 'lodash'` 使用某个包（因为它是另一个依赖的依赖）。这会导致代码在不同环境（如 CI 或生产环境）下因依赖树不同而报错。
- **pnpm 方案:** `pnpm` 的 `node_modules` 结构是非扁平化的（虽然为了兼容性做了一些提升，但默认严格）。**你只能 import 你在 `package.json` 中明确声明的依赖**。这强制了依赖的显式声明，提高了项目的健壮性。

#### B. 磁盘空间浪费

- **问题:** 如果你有 10 个项目都用 `React 18`，`npm` 会存 10 份。
- **pnpm 方案:** 只存 1 份。对于大型 Monorepo 或多项目开发者，节省的空间可达数 GB 甚至数十 GB。

#### C. 安装速度慢

- **问题:** 大量文件复制 IO 操作耗时。
- **pnpm 方案:** 硬链接操作几乎是瞬间完成的，且全局缓存命中率高，显著减少网络请求和磁盘 IO。
