---
title: TypeScript
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
  - IDE 智能提示更友好

## 基础类型
```typescript
// 显式类型声明
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// 元组
let tuple: [string, number] = ["Alice", 30];

// 特殊类型
let anyValue: any = "可以赋任何值";
let unknownValue: unknown = "需要类型检查后才能使用";
let nullable: string | null = null;
```


## 函数
```typescript
// 参数和返回值类型
function add(a: number, b: number): number {
  return a + b;
}

// 可选参数
function greet(name: string, age?: number): void {
  console.log(`Hello ${name}${age ? `, ${age} years old` : ''}`);
}

// 默认参数
function multiply(a: number, b: number = 1): number {
  return a * b;
}

// 箭头函数
const sum = (x: number, y: number): number => x + y;
```


## 接口与类型别名
```typescript
// 接口
interface User {
  name: string;
  age: number;
  email?: string; // 可选属性
  readonly id: number; // 只读属性
}

// 类型别名
type Point = {
  x: number;
  y: number;
};

// 扩展接口
interface Admin extends User {
  permissions: string[];
}

// 函数类型接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

## 类
```typescript
class Animal {
  // 访问修饰符
  public name: string;
  private age: number;
  protected species: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
    this.species = "Canine"; // 可以访问 protected 成员
  }

  bark() {
    console.log("Woof!");
  }
}

// 抽象类
abstract class Shape {
  abstract getArea(): number;
}
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

## 高级类型
```typescript
// 联合类型
let value: string | number;

// 交叉类型
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

// 类型断言
const input = document.getElementById("input") as HTMLInputElement;

// 类型保护
function isString(test: any): test is string {
  return typeof test === "string";
}

// keyof 和 in
type Keys = keyof Person;  // "name" | "age"
type OptionalPerson = {
  [K in keyof Person]?: Person[K];
};
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

## 配置（tsconfig.json 核心配置）
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
