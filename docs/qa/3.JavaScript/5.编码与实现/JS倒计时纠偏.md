---
title: JS倒计时纠偏
createTime: 2026/03/31 17:39:54
permalink: /qa/js/7julcz3c/
---

::: tip 问题
如何纠偏使用 `setTimeout()` 或者 `setInterval()` 实现的倒计时？
:::

---

使用 `setTimeout()` 或者 `setInterval()` 创建的定时器，会因为时间精度问题，导致时间间隔有误差。
因为两者是到了时间后将事件加入到事件队列中，会等到当前执行栈为空的时候再取出事件执行，而不是立即执行。
因此会导致真实时间比计时器更快。

通常有两种解决办法：

- 定时向服务器发送请求去获取最新时间差，从而进行纠偏。
- 第二种则不依赖服务器，基于标准时间戳计算剩余时间。

核心原理：根据持续时间与当前时间计算结束时间，用 `setTimeout()` 递归更新剩余时间。

<JSRunner :code="code" />

可以优化 remaining 的计算让其只返回整数。

<script setup>
const code = `function createCountdown(duration, onTick, onComplete) {
  const startTime = Date.now();
  const endTime = startTime + duration;
  let timerId = null;

  function update() {
    const now = Date.now();
    const remaining = Math.max(0, endTime - now);

    onTick(remaining);

    if (remaining <= 0) {
      onComplete?.();
      return;
    }

    timerId = setTimeout(update, 10); // 高频检查，显示更流畅
  }

  update(); // 立即执行一次

  return {
    cancel: () => clearTimeout(timerId)
  };
}
const countdown = createCountdown(
  3*1000, // 4 秒
  (remaining) => {
    console.log(remaining)
  },
  () => {
    console.log('倒计时结束！');
  }
);

// 取消
// countdown.cancel();`
</script>