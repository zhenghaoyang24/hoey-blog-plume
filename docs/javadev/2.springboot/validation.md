---
title: validation
createTime: 2026/05/15 11:08:53
permalink: /javadev/springboot/svi6p57k/
---

## 为什么需要参数校验？

在开发过程中，参数校验是后端接口健壮性的第一道防线。前端校验更多是为了用户体验，而真正从安全性和数据完整性的角度，后端必须进行二次校验。HTTP 请求是可以被伪造的，如果后端不做校验，
脏数据一旦进入数据库，可能引发安全漏洞。

Spring Boot 提供的参数校验机制基于 Jakarta Bean Validation 标准，能让我们用声明式的方式，在参数进入业务方法之前就完成所有校验，从繁琐的 `if-else` 中彻底解放出来。

## 常用校验注解

Jakarta Bean Validation 提供了一套声明式的校验机制，常用的注解如下：

| 注解                            | 作用                            | 适用类型           | 示例                                               |
| ------------------------------- | ------------------------------- | ------------------ | -------------------------------------------------- |
| `@NotNull`                      | 不能为 `null`                   | 任意类型           | `@NotNull String name`                             |
| `@NotBlank`                     | 字符串非空且不能全是空格        | `String`           | `@NotBlank String password`                        |
| `@NotEmpty`                     | 集合/字符串/数组不为空          | 集合、字符串、数组 | `@NotEmpty List<String> tags`                      |
| `@Size(min, max)`               | 长度范围限制                    | 字符串、集合、数组 | `@Size(min=6, max=20) String username`             |
| `@Min` / `@Max`                 | 数值最小/最大值                 | 数值类型           | `@Min(18) int age`                                 |
| `@Email`                        | 邮箱格式校验                    | `String`           | `@Email String email`                              |
| `@Pattern`                      | 正则匹配                        | `String`           | `@Pattern(regexp="^[A-Za-z0-9]+$") String code`    |
| `@Past` / `@Future`             | 过去/未来时间                   | 日期类型           | `@Past LocalDate birthday`                         |
| `@Positive` / `@PositiveOrZero` | 正数/非负整数                   | 数值类型           | `@Positive int quantity`                           |
| `@Negative` / `@NegativeOrZero` | 负数/非正整数                   | 数值类型           | `@Negative BigDecimal amount`                      |
| `@Digits(integer, fraction)`    | 数值整数/小数位数               | 数值类型           | `@Digits(integer=10, fraction=2) BigDecimal price` |
| `@AssertTrue` / `@AssertFalse`  | 布尔值校验                      | `boolean`          | `@AssertTrue boolean agreed`                       |
| `@URL`                          | URL格式校验（Hibernate扩展）    | `String`           | `@URL String website`                              |
| `@Length`                       | 字符串长度限制（Hibernate扩展） | `String`           | `@Length(min=2, max=20) String nickname`           |
| `@Range`                        | 数值范围（Hibernate扩展）       | 数值类型           | `@Range(min=1, max=100) int score`                 |

## 使用

### 依赖引入

Spring Boot 2.3+ 之后的版本，[spring-boot-starter-web](https://www.baeldung.com/spring-boot-bean-validation) 默认不再包含校验依赖，需要手动引入。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
    <!-- 无需指定版本，Spring Boot 父工程已统一管理 -->
</dependency>
```

### 实体类添加校验

创建一个 [DTO](https://www.baeldung.com/java-dto-pattern) 并在字段上添加校验注解：

```java
import jakarta.validation.constraints.*;

public class UserCreateRequest {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度必须在3到20之间")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 32, message = "密码长度必须在6到32之间")
    private String password;

    @NotNull(message = "年龄不能为空")
    @Min(value = 1, message = "年龄必须大于0")
    @Max(value = 150, message = "年龄不能超过150")
    private Integer age;

    @Email(message = "邮箱格式不正确")
    private String email;

    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    // getters and setters
}
```

### Controller 中使用 @Valid

在 Controller 的接收参数前添加 `@Valid` 注解，Spring 就会自动对该参数执行校验：

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/create")
    public Result createUser(@Valid @RequestBody UserCreateRequest request) {
        // 校验通过后才执行此处业务逻辑
        return Result.success("用户创建成功");
    }
}
```

### 基本类型参数校验

对于 `@RequestParam`、`@PathVariable` 等非对象的参数，需要在 Controller 类上添加 `@Validated` 注解才能在方法参数上使用校验注解：

```java
@RestController
@RequestMapping("/user")
@Validated
public class UserController {

    @GetMapping("/{id}")
    public Result getUser(
            @PathVariable @NotNull(message = "用户ID不能为空") Long id,
            @RequestParam @NotBlank(message = "用户名不能为空") String username) {
        // 如果 id 或 username 不符合校验条件，会抛出 ConstraintViolationException
        return Result.success("查询成功");
    }
}
```

### @Valid 与 @Validated 的区别

`@Valid` 适用于简单校验和嵌套对象校验，而 `@Validated` 是 Spring 提供的扩展，支持分组校验和类级别校验，适合更复杂和分层的业务场景。

## 分组校验

### 使用分组校验

在实际业务中，同一个 DTO 在不同场景下可能有不同的校验规则。比如：**新增用户**时不需要传 ID，但**更新用户**时必须传 ID。这时候就需要用到分组校验。

**第一步：定义分组接口（标记用）**

```java
public class ValidationGroups {
    public interface Create {}
    public interface Update {}
}
```

**第二步：在 DTO 字段上指定分组**

```java
import jakarta.validation.constraints.*;

public class UserRequest {

    @NotNull(message = "用户ID不能为空", groups = ValidationGroups.Update.class)
    private Long id;

    // getters and setters
}
```

**第三步：在 Controller 中指定分组**

```java
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/create")
    public Result create(@Validated(ValidationGroups.Create.class) @RequestBody User user) {
        // ID不会被校验
        return Result.success("创建成功");
    }

    @PutMapping("/update")
    public Result update(@Validated(ValidationGroups.Update.class) @RequestBody User user) {
        // ID会被校验（不能为空）
        return Result.success("更新成功");
    }
}
```

### 分组顺序

有时我们希望对校验进行顺序控制，比如先校验 A 组，再校验 B 组。可以使用 `@GroupSequence` 实现：

```java
import jakarta.validation.GroupSequence;

@GroupSequence({ValidationGroups.Create.class, ValidationGroups.Update.class})
public interface SequentialValidation {
}
```

使用方式：

```java
@PostMapping("/user")
public Result process(@Validated(SequentialValidation.class) @RequestBody UserRequest request) {
    // 会先校验 Create 组，再校验 Update 组
    return Result.success();
}
```

## 嵌套校验

当 DTO 中包含了另一个需要校验的对象时，需要在嵌套字段上加 `@Valid`，才能递归触发内部属性的校验：

```java
public class OrderRequest {

    @NotBlank(message = "订单号不能为空")
    private String orderNo;

    @NotNull(message = "用户信息不能为空")
    @Valid // [!code ++]
    private UserRequest user;  // 需要递归校验 UserRequest 内的字段

    @NotEmpty(message = "订单项不能为空")
    @Valid
    private List<OrderItemRequest> items;  // List 中的每个元素也需要校验

    // getters and setters
}
```

## 全局异常处理

为了让校验失败返回统一的响应格式，可以配置全局异常处理器：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result handleException(Exception e) {
        e.printStackTrace();
        return Result.error(StringUtils.hasLength(e.getMessage()) ? e.getMessage() : "Server error");
    }
}
```
