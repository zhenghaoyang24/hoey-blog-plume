---
title: React Router
createTime: 2026/01/06 10:47:27
permalink: /web/react/react-router/
outline: [2, 3]
---

React Router 7 引入了革命性的数据路由架构，通过 Loader 和 Action 模式彻底改变了传统路由的工作方式。这种架构转变不仅仅是 API 的变化，而是代表了现代前端路由设计的重大革新，使得数据获取和状态管理更加声明式和可预测。

数据模式的核心是将路由与数据逻辑紧密结合，让每个路由负责自己的数据加载和突变操作。React Router 7 提供了改进的类型安全，为路由参数、loader 数据、actions 等提供了第一类类型支持。

## 核心概念

### 数据路由

数据路由 API 是 React Router 7 的核心创新，它提供了一种声明式且更强大的方式来定义路由、加载数据、处理操作和管理状态。与传统的路由配置不同，数据路由将数据获取逻辑直接与路由定义关联。

### Loader 函数

Loader 函数用于在路由渲染前获取数据。在 React Router v7 中，数据获取（loader）直接与路由定义相关联，组件通过钩子访问数据。Loader 函数在服务器端和客户端都能工作，为服务器渲染和客户端渲染提供统一的 API。

### Action 函数

Action 函数用于处理数据突变（如表单提交、API 调用等）。数据突变通过路由的 action 函数完成，当 action 完成后，页面上所有 loader 数据都会被重新验证，以保持 UI 与数据同步。这种自动重新验证机制确保了数据的一致性。

### 重新验证

在 action 重定向后，React Router 会调用页面上所有数据的 loader 来获取最新值（这就是"重新验证"）。这个机制确保了数据突变后 UI 能够自动更新，无需手动管理状态。

## 路由

### 使用 React Router

首先，安装 React Router 7：

```bash
npm i react-router
```

然后，使用 `createBrowserRouter` 创建路由配置：

```javascript :collapsed-lines=30
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  // [!code word:createBrowserRouter]
  {
    path: "/",
    Component: <App />,
    children: [
      {
        index: true,
        Component: <Home />,
        loader: homeLoader,
      },
      {
        path: "about",
        Component: <About />,
        loader: aboutLoader,
        action: aboutAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} /> // [!code word:RouterProvider]
  </StrictMode>
);
```

在 React Router v7 中，需要使用 `createBrowserRouter` 和 `RouterProvider` 来包裹你的应用。

### 嵌套路由

路由可以通过 `children` 嵌套在父路由内部。

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    Component: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: <Home />,
        loader: homeLoader,
      },
      {
        path: "dashboard",
        Component: <DashboardLayout />,
        children: [
          {
            index: true,
            Component: <DashboardHome />,
            loader: dashboardHomeLoader,
          },
          {
            path: "settings",
            Component: <Settings />,
            loader: settingsLoader,
            action: settingsAction,
          },
        ],
      },
    ],
  },
]);
```

父路由的路径会自动包含在子路由路径中，因此上面的嵌套路由将会创建创建 `/` 、`/dashboard` 、`/dashboard/settings` URL。

子路由通过 `<Outlet />` 渲染在父路由中。

上面的例子中：`<DashboardHome />` 与 `<Settings />` 渲染在 `<DashboardLayout />` 的 `<Outlet />` 中，它们的路径分别为：
`/dashboard` 和 `/dashboard/settings`。

```jsx
// DashboardLayout.jsx
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be <Home> or <Settings> */}
      <Outlet />
    </div>
  );
}
```

### 路由配置 {data-outline="4"}

传递给 `createBrowserRouter` 的对象称为路由对象。路由对象中的各个属性决定了路由的各种功能。

#### 索引路由

通过在路由对象上设置 `index: true` 创建索引路由。索引路由将会渲染到父路由的 Outlet 中，作为父路由的一个默认子路由。

```js
createBrowserRouter([
  // 渲染在 "/"
  { index: true, Component: Home },
]);
```

#### 布局路由

如果一个子路由只有 Component（或 element）而没有 path，它会被当作布局路由。布局路由不消耗 URL 路径，仅用于包裹子路由，
提供一些共享 UI（如侧边栏），它的子路由会相对于父级路径继续匹配。

```js
{
  path: "projects",
  children: [
    { index: true, Component: ProjectsHome },
    {
      // 这个路由“透明”地包裹子路由，路径仍相对于 /projects
      // 隐式 path: ""
      Component: ProjectLayout, // 在 Project 与 EditProject 上提供公共 UI
      children: [
        { path: ":pid", Component: Project },
        { path: ":pid/edit", Component: EditProject },
      ],
    },
  ],
}
```

路径与对应的组件如下：

- `/projects` → `<ProjectsLayout><ProjectsHome /></ProjectsLayout>`
- `/projects/123` → `<ProjectsLayout><ProjectLayout><Project /></ProjectLayout></ProjectsLayout>`
- `/projects/123/edit` → `<ProjectsLayout><ProjectLayout><EditProject /></ProjectLayout></ProjectsLayout>`

#### 前缀路由

一个只有路径而没有组件的路由会创建一组具有路径前缀的路由。

```js
createBrowserRouter([
  {
    // 没有 Commponent 的路由，提供一个 projects 路径前缀
    path: "/projects",
    children: [
      { index: true, Component: ProjectsHome },
      { path: ":pid", Component: Project },
      { path: ":pid/edit", Component: EditProject },
    ],
  },
]);
```

路径对应关系如下：

- `/projects` → `<ProjectsHome />`
- `/projects/123` → `<Project />`
- `/projects/123/edit` → `<EditProject />`

#### 路径参数

如果路径字符串以 `:` 开头，它就成为一个动态字段，会被解析为路径参数。路径参数会作为 `params` 提供给其他路由 API 或者对应组件。

```js
{
  path: "teams/:teamId",
  loader: async ({ params }) => {
    // 在路由对象中可获取 params
    let team = await fetchTeam(params.teamId);
    return { name: team.name };
  },
  Component: Team,
}
```

在组件中，可以通过 `useParams` 获取路径参数。

```jsx
import { useParams } from "react-router";

function Team() {
  let params = useParams();
  // ...
}
```

#### 可选段

添加 `?` 后缀，表示路径参数是可选的，也可以有可选的静态段。

```js
path: ":lang?/categories";
path: "users/:userId/edit?";
```

`path: ":lang?/categories"` 会匹配如 `/categories` 和 `/en/categories`。

`path: "users/:userId/edit?"` 会匹配如 `/users/123/edit` 和 `/users/123`。

## loader

loader 接收一个函数或回调，并返回一个值。用于在路由组件渲染之前为其提供数据。

```js
createBrowserRouter([
  {
    path: "/",
    loader: loader,
    Component: MyRoute,
  },
]);

async function loader({ params }) {
  return { message: "Hello, world!" };
}

function MyRoute() {
  let data = useLoaderData();
  return <h1>{data.message}</h1>;
}
```
