---
title: TypeScript 快速入门
createTime: 2025/04/04 20:07:57
permalink: /web/TypeScript/
tags:
  - TypeScript
---

## TypeScript 简介
- 是什么 ：TypeScript 是 JavaScript 的超集，添加了静态类型系统，最终编译为纯 JavaScript。

- 优势 ：
  - 强类型检查，减少运行时错误
  - 支持现代 JS 特性（ES6+）
  - 提高代码可维护性和可读性

学习资料：[learning-vue3](https://github.com/chengpeiquan/learning-vue3)

## 数据类型

| 特性 | 原始类型（Primitive Types） | 引用类型（Reference Types） |
|------|-----------------------------|------------------------------|
| 数据存储方式 | 存储实际的值 | 存储指向对象的引用地址 |
| 拷贝方式 | 按值拷贝 | 按引用拷贝 |
| 比较方式 | 比较值是否相等 | 比较引用地址是否相同 |
| 可变性 | 不可变（例如字符串修改会生成新字符串） | 可变（对象内容可以被修改） |
| 类型示例 | `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` | `object`, `array`, `function`, `date`, `map`, `set` 等 |

| 原始类型 | JavaScript | TypeScript |
|------------|------------|------------|
| 字符串     | String     | string     |
| 数值       | Number     | number     |
| 布尔值     | Boolean    | boolean    |
| 大整数     | BigInt     | bigint     |
| 符号       | Symbol     | symbol     |
| 不存在     | Null       | null       |
| 未定义     | Undefined  | undefined  |

类型定义：

```typescript
// 显式类型声明（隐式时自动推断类型）
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;

// 数组（引用类型）
let numbers: number[] = [1, 2, 3];
let names1: Array<string> = ["Alice", "Bob"]; // 写法1
let names2: string[] = ["Alice", "Bob"];// 写法2

// 元组
let tuple: [string, number] = ["Alice", 30];

// 特殊类型
let anyValue: any = "可以赋任何值";
let unknownValue: unknown = "需要类型检查后才能使用";
let nullable: string | null = null; // 联合类型

```
对象的类型定义有两个语法支持： type 和 interface，两者非常接近，但也有一定的 [区别](#type-和-interface-的区别)。

```typescript
/**
 * 类型别名
 */
type Point = {
  x: number;
  y: number;
};

/**
 * 接口
 */
interface User {
    name: string;
    age: number;
    email?: string; // 可选属性 [!code highlight]
    readonly id: number; // 只读属性 [!code highlight]
    friends: User[], // 属性可以引用本身类型 [!code highlight]
}

// 继承 User 的所有属性类型，并追加了一个权限等级属性
interface Admin extends User {
  permissionLevel: number // [!code highlight]
}

// 函数类型接口
interface Obj {
  sum: (x: number, y: number) => number
}

```

在继承的过程中舍弃某些属性，通过 `Omit` 帮助类型来实现。`T` 代表已有的一个对象类型， `K` 代表要删除的属性名，如果只有一个属性就直接是一个字符串，如果有多个属性，用 | 来分隔开。

```ts
// type Omit<T, K extends string | number | symbol>

interface UserItem {
  name: string
  age: number
  enjoyFoods: string[]
  friendList?: UserItem[]
}

// 这里在继承 UserItem 类型的时候，删除了两个多余的属性 [!code highlight]
interface Admin extends Omit<UserItem, 'enjoyFoods' | 'friendList'> {
  permissionLevel: number
}

// 现在的 admin 就非常精简了
const admin: Admin = {
  name: 'Petter',
  age: 18,
  permissionLevel: 1,
}
```

## 类型断言

当一个变量应用了 **联合类型** 时，在某些时候如果不显式的指明其中的一种类型，可能会导致后续的代码运行报错。

这个时候就可以 **通过类型断言强制指定其中一种类型**，以便程序顺利运行下去。

```ts :collapsed-lines=20
// 对单人或者多人打招呼
function greet(name: string | string[]): string | string[] {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}

// 不使用断言将会报错
const greetings = greet(['Petter', 'Tom', 'Jimmy']) // [!code error]
const greetingSentence = greetings.join(' ') // [!code error]
// error - 'join' does not exist on type 'string'

// 用类型断言将其指定为 string[]
const greetings = greet(['Petter', 'Tom', 'Jimmy']) as string[] // [!code highlight]

// 现在可以正常使用 join 方法
const greetingSentence = greetings.join(' ')
console.log(greetingSentence)

```

## 类 

```typescript :collapsed-lines=20
class Animal {
  // 访问修饰符
  public name: string;
  private age: number;
  protected species: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  getName(){
    console.log(`The animal's name is ${this.name}`);
  }
}

// 类与类继承 // [!code highlight]
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
    this.species = "Canine"; // 可以访问 protected 成员
  }
  bark() {
    console.log("Woof!");
  }
}

// 接口继承类 且 去掉类上面的方法 // [!code highlight] 
interface Rooster extends Omit<Animal, 'getName'> {
  legs: number
}

// 抽象类
abstract class Shape {
  abstract getArea(): number;
}


```


## 函数

与 JS 一样，在 TS 中函数有很多种写法：

```ts
// 写法一：函数声明
function sum1(x: number, y: number): number {
  return x + y
}

// 写法二：函数表达式
const sum2 = function(x: number, y: number): number {
  return x + y
}

// 写法三：箭头函数
const sum3 = (x: number, y: number): number => x + y

// 写法四：对象上的方法
const obj = {
  sum4(x: number, y: number): number {
    return x + y
  }
}
```

它们有 [区别](#函数定义的三种方式区别)，也有共同点：“入参” 和 “返回值”。

```typescript
// 参数和返回值类型
function add(a: number, b: number): number { // [!code word:number:3]
  return a + b;
}

// 可选参数
function greet(name: string, age?: number): void {  // [!code word:age?]
  console.log(`Hello ${name}${age ? `, ${age} years old` : ''}`);
}

// 默认参数
function multiply(a: number, b: number = 1): number {
  return a * b;
}

// 异步函数的返回值：Promise<string>，若没有resolve数据，返回值则为 Promise<void>
function queryData(): Promise<string> { // [!code word:Promise<string>]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello World')
    }, 3000)
  })
}
```
当一个函数需要接收不同类型的入参，且有不同类型的返回值时，则可利用 TypeScript 的函数重载。

```ts {1,2,3}
function greet(name: string): string
function greet(name: string[]): string[]
function greet(name: string | string[]) {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}

// 单个问候语，此时只有一个类型 string
const greeting = greet('Petter')
console.log(greeting) // Welcome, Petter!

// 多个问候语，此时只有一个类型 string[]
const greetings = greet(['Petter', 'Tom', 'Jimmy'])
console.log(greetings)
// [ 'Welcome, Petter!', 'Welcome, Tom!', 'Welcome, Jimmy!' ]

```
  

## 泛型
```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface GenericArray<T> {
  [index: number]: T;
}

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 模块化
```typescript
// 导出
export interface User { /* ... */ }
export class MyClass { /* ... */ }

// 导入
import { User, MyClass } from './module';

// 默认导出/导入
export default function() { /* ... */ }
import myFunction from './module';
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    // 指定编译后的 ECMAScript 目标版本（ES3/ES5/ES6/ES2020 等）
    "target": "ES6",

    // 定义模块系统类型（CommonJS/ES6/AMD/UMD 等）
    // CommonJS 适用于 Node.js 环境，ES6 适用于浏览器环境
    "module": "CommonJS",

    // 启用所有严格类型检查选项（推荐开启）
    // 包含：noImplicitAny, strictNullChecks, strictFunctionTypes 等
    "strict": true,

    // 编译输出目录（生成的 .js 文件存放位置）
    "outDir": "./dist",

    // 源代码根目录（TypeScript 文件存放位置）
    "rootDir": "./src",

    // 改善 CommonJS 与 ES Module 的互操作性
    // 允许 import * as React from 'react' 的语法
    "esModuleInterop": true,

    // 跳过声明文件（.d.ts）的类型检查
    // 提升编译速度，但可能降低类型安全性（大型项目建议开启）
    "skipLibCheck": true
  }
}
```

## Type 和 Interface 的区别

在 TypeScript 中，`type` 和 `interface` 都可以用来定义类型，但它们有一些关键区别：

1. **语法不同**：
   ```typescript
   type Point = { x: number; y: number };
   interface Point { x: number; y: number }
   ```

2. **扩展方式**：
   - interface 使用 `extends`：
     ```typescript
     interface Animal { name: string }
     interface Bear extends Animal { honey: boolean }
     ```
   - type 使用交叉类型 `&`：
     ```typescript
     type Animal = { name: string }
     type Bear = Animal & { honey: boolean }
     ```

3. **合并声明**：
   - interface 可以重复声明并自动合并：
     ```typescript
     interface Window { title: string }
     interface Window { ts: any }
     // 合并为 { title: string; ts: any }
     ```
   - type 不能重复声明

4. **能力差异**：
   - type 可以定义联合类型、元组等：
     ```typescript
     type ID = string | number;
     type Point = [number, number];
     ```
   - interface 更适合对象类型



## 函数定义的三种方式区别

这三种写法在功能上是等价的，都能正确实现数字相加功能，但有以下区别：

1. 函数声明（写法一）
```typescript
function sum1(x: number, y: number): number {
  return x + y
}
```
**特点**：
- 存在函数提升（hoisting），可以在定义前调用
- 有独立的函数作用域
- 适合定义较复杂的函数逻辑

2. 函数表达式（写法二）
```typescript
const sum2 = function(x: number, y: number): number {
  return x + y
}
```
**特点**：
- 不存在函数提升，必须先定义后使用
- 赋值给变量，可以作为参数传递
- 适合需要将函数作为值使用的场景

3. 箭头函数（写法三）
```typescript
const sum3 = (x: number, y: number): number => x + y
```
**特点**：
- 语法最简洁
- 没有自己的 `this`，继承自外层作用域
- 不能用作构造函数（不能用 `new` 调用）
- 适合简单的回调函数或需要保持 `this` 上下文的场景
