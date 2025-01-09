<template>
  <div class="hd-box" ref="container">
    <!-- Fireflies will be generated here -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const fireflies = 15; // 萤火虫数量
const container = ref(null); // 容器引用

onMounted(() => {
  if (container.value) {
    const containerWidth = container.value.offsetWidth;
    const containerHeight = container.value.offsetHeight;

    for (let i = 0; i < fireflies; i++) {
      const firefly = document.createElement("div");
      firefly.classList.add("firefly");
      container.value.appendChild(firefly);

      // 初始化位置
      gsap.set(firefly, {
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
      });

      // 开始飞行和闪烁
      flyTheFirefly(firefly, containerWidth, containerHeight);
    }
  }
});

// 飞行动画
function flyTheFirefly(elm, containerWidth, containerHeight) {
  const targetX = Math.random() * containerWidth;
  const targetY = Math.random() * containerHeight;

  gsap.to(elm, {
    duration: Math.random() * 3 + 15, // 随机持续时间
    x: targetX,
    y: targetY,
    repeat: -1, // 无限循环
    yoyo: true, // 来回飞行
    ease: "power1.inOut", // 平滑过渡
    onComplete: () => {
      flyTheFirefly(elm, containerWidth, containerHeight); // 递归调用
    },
  });

  // 闪烁动画
  gsap.to(elm, {
    opacity: 0.3,
    duration: Math.random() * 0.5 + 0.5,
    yoyo: true,
    repeat: -1,
    delay: Math.random() * 0.1, // 随机闪烁延迟
  });
}
</script>

<style>
.firefly {
  width: 10px; /* 增加大小，方便观察 */
  height: 10px; /* 增加大小，方便观察 */
  position: absolute;
  background-color: #fcff67;
  box-shadow: 0px 0px 17px 2px wheat;
  border-radius: 50%;
  opacity: 1; /* 默认可见 */
  pointer-events: none; /* 防止被鼠标事件拦截 */
}

.hd-box {
  width: 100vw; /* 宽度占满整个屏幕 */
  height: 400px; /* 高度 400px */
  position: relative; /* 容器相对定位 */
  overflow: hidden; /* 防止飞出容器 */
}
</style>
