---
title: CommonJS 与 ES6 导入区别
createTime: 2025/11/24 14:38:37
permalink: /qa/js/loh87wfy/
---

<Question :questions="['CommonJS 与 ES6 导入模块的区别？']" />

---

## CommonJS 导入导出

CommonJS 的导入导出是 Nodejs 早期原生支持的方式，ES6 的导入导出可以通过工具如 Babel 转换为 CommonJS 的方式。

- 1. 导入导出语法

```js
// 导出
const name = "moduleA";
module.exports = {
  name,
};

// 引入
const moduleA = require("./moduleA");
```

- 2. 特点

- CommonJS 还可以动态导入导出，通过条件判断甚至在函数体内导出模块。

  ```js
  if (condition) {
    exports.name = "moduleA";
  } else {
    exports.name = "moduleB";
  }
  function exportModule() {
    exports.name = "moduleA";
  }
  ```

- require 是运行时加载（同步加载），且在 require 时会加载和立即执行。
- 导出的是值的拷贝，但是导入的引用类型共享同一引用。

## ES6 导入导出

- 1. 导入导出语法

```js
// 导出
export const name = "moduleA";
// 默认导出
export default "moduleA";

// 引入
import { name } from "./moduleA";
```

- 2. 特点

- ES6 导入导出是静态的，即在编译时确定要导入的模块，而不是在运行时，这使得它可以在编译时确定依赖关系。所以它不允许像 CommonJS 那样动态导入导出模块。
- ES6 导入是异步加载，不会阻塞其他加载过程。
- ES6 导出的是值的引用，修改会影响所有导入该值的地方。

ESM 的设计更利于现代工具链优化和浏览器原生支持，是如今项目首推的导入导出方式。除非你有动态导入模块的场景，否则更推荐使用 ES6 导入导出的方式。
