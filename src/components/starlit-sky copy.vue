<template>
  <div class="stars-container">
    <div class="stars">
      <div v-for="index in starsCount" :key="index" class="star"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// 定义星星数量
const starsCount = 800;

// 在组件挂载后执行，生成星星的动态样式
onMounted(() => {
  const stars = document.querySelectorAll(".star");
  const r = 800; // 星星的起始半径
  stars.forEach((star) => {
    const s = 0.2 + Math.random() * 1; // 随机的大小
    const curR = r + Math.random() * 300; // 随机的深度
    const rotateY = Math.random() * 360; // 随机的 Y 轴旋转
    const rotateX = Math.random() * -50; // 随机的 X 轴旋转

    // 设置每颗星星的 transform 和 transform-origin
    star.style.transformOrigin = `0 0 ${curR}px`;
    star.style.transform = `translate3d(0, 0, -${curR}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${s}, ${s})`;
  });
});
</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

.stars-container {
  position: absolute;
  width: 100%;
  height: 400px; /* 设置容器高度，你可以根据需求修改 */
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
}

.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
}

.star {
  width: 5px;
  height: 5px;
  background: #f7f7b6;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0 -300px;
  transform: translate3d(0, 0, -300px);
  backface-visibility: hidden;
}
</style>
