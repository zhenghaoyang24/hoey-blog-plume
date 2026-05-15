---
title: ThreadLocal
createTime: 2026/05/15 09:40:12
permalink: /javadev/springboot/ql2z22rc/
---

## ThreadLocal 是什么？

`ThreadLocal` 提供了一种线程隔离的变量存储机制。每个线程通过同一个 `ThreadLocal` 对象访问到的，都是该线程内部独立的一份副本。
线程之间的读写完全隔离，无需任何同步。

- 每个 `Thread` 对象内部维护一个 `ThreadLocalMap`。
- `ThreadLocalMap` 的 Key 是 `ThreadLocal` 的**弱引用**，Value 是实际存储的数据。
- 调用 `set(value)` 时，以当前线程为索引找到其 `ThreadLocalMap`，再以 `this`（ThreadLocal 实例）为键存入数据。
- `get()` 同理，从当前线程的 `Map` 中取出 Value。

由于数据直接挂在 `Thread` 对象上，不同线程通过同一个 `ThreadLocal` 实例获取的是各自 `Map` 中的值，天然隔离。

```java
ThreadLocal<String> threadLocal = new ThreadLocal<>();
threadLocal.set("hello");   // 存入当前线程的 ThreadLocalMap
String val = threadLocal.get(); // 从当前线程的 Map 取出
```

## 核心作用

后端开发中，很多数据属于“线程级上下文”，例如：

- 当前登录用户的 ID、用户名
- 数据库连接、Session
- 请求追踪的 TraceId

这些数据如果通过方法参数层层传递，代码会急剧膨胀且耦合严重。`ThreadLocal` 让它们变成线程内的“隐式全局变量”，在任何位置随取随用。

**典型优势：**

| 对比项     | 参数传递               | ThreadLocal                |
| ---------- | ---------------------- | -------------------------- |
| 代码侵入性 | 每个方法签名都要加参数 | 无侵入，直接调用工具类获取 |
| 线程安全   | 需使用不可变对象或加锁 | 天然线程隔离               |
| 内存开销   | 同一份数据可能重复传递 | 每个线程仅存一份副本       |

## 拦截器用法

### ThreadLocal 工具类设计

```java
public class ThreadLocalUtil {
    //提供ThreadLocal对象,
    private static final ThreadLocal THREAD_LOCAL = new ThreadLocal();

    //根据键获取值
    public static <T> T get() {
        return (T) THREAD_LOCAL.get();
    }

    //存储键值对
    public static void set(Object value) {
        THREAD_LOCAL.set(value);
    }

    //清除ThreadLocal 防止内存泄漏
    public static void remove() {
        THREAD_LOCAL.remove();
    }
}
```

### 拦截器中设置与清理

```java
@Component
public class UserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {
        // 从请求头中解析 Token，获取用户信息
        String token = request.getHeader("Authorization");
        try {
            Map<String,Object> claims = JwtUtil.parseToken(token);
            ThreadLocalUtil.set(claims); // 存储用户信息到 ThreadLocal
            return true;
        } catch (Exception e) {
            response.setStatus(401);
            return false;
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler, Exception ex) {
        // 请求结束后必须移除，防止线程池复用导致的脏数据或内存泄漏
        ThreadLocalUtil.remove(); // 清除线程数据
    }
}
```

配合 Spring 配置（如实现 `WebMvcConfigurer`）注册拦截器后，所有同步请求都会经过该流程。Controller 中即可直接获取：

```java
@GetMapping("/info")
public String getUser() {
    Map<String, Object> claims = ThreadLocalUtil.get();
    // 业务处理...
}
```

### remove()

线程池环境下，线程并不会随请求结束而销毁，而是被回收复用。若不在 `afterCompletion` 中清除 `ThreadLocal`，上一个请求的用户信息可能残留到下一个请求中，造成数据错乱。同时，由于 `ThreadLocalMap` 的 Key 是弱引用，若外部不再持有 `ThreadLocal` 实例，Key 会被回收，但 Value 仍作为强引用存在，长期累积会导致内存泄漏。
**因此：永远在 finally 或拦截器的 afterCompletion 中调用 remove()。**

### 避免滥用

`ThreadLocal` 是线程级全局变量，线程数越多内存占用越大。非必要不要存储大对象，且务必确保 remove 机制健全。它适合“一次请求内有效”的临时数据，而非跨请求的持久化存储（跨请求应使用 Token/Session/Redis）。
