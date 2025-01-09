<template>
  <div class="container-4">
    <!-- 用于显示彩带 -->
    <div class="confetti-container" ref="confettiContainer"></div>
    <!--文字-->
    <div class="text-box">
      <p class="p1">也一起做了一件有意义的事</p>
      <p class="p2">为热爱前行的同时</p>
      <p class="p3">
        我们也在贡献自己的<span class="s-1">爱心</span>和<span class="s-2"
          >力量</span
        >
      </p>
    </div>
    <!--气球-->
    <img class="qq-1 qiqiu" src="@/assets/images/four/qq-1.png" />
    <img class="qq-2 qiqiu" src="@/assets/images/four/qq-2.png" />
    <img class="qq-3 qiqiu" src="@/assets/images/four/qq-3.png" />
    <img class="qq-4 qiqiu" src="@/assets/images/four/qq-4.png" />
    <img class="qq-5 qiqiu" src="@/assets/images/four/qq-5.png" />
    <img class="qq-6 qiqiu" src="@/assets/images/four/qq-6.png" />
    <img class="qq-7 qiqiu" src="@/assets/images/four/qq-7.png" />
    <img class="qq-8 qiqiu" src="@/assets/images/four/qq-8.png" />

    <!--人物奔跑-->
    <div class="bottom-4">
      <!--奔跑过程-1-->
      <img class="bp-1" src="@/assets/images/four/xj-1.png" />
      <!--奔跑过程-2-->
      <img class="bp-2" src="@/assets/images/four/xj-2.png" />
      <!--奔跑过程-3-->
      <img class="bp-3" src="@/assets/images/four/xj-3.png" />
      <!--冲刺线-1-->
      <img class="cc-line lg-1" src="@/assets/images/four/lg-1.png" />
      <img class="cc-line lg-3" src="@/assets/images/four/lg-1.png" />
      <!--冲刺线-2-->
      <img class="cc-line lg-2" src="@/assets/images/four/lg-2.png" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";

let interval = null;

// 引用彩带容器
const confettiContainer = ref(null);

// 创建彩带
const createConfetti = () => {
  const confettiCount = 30; // 彩带数量
  const container = confettiContainer.value;

  if (!container) return; // 如果容器不存在，直接返回

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-item");

    // 随机设置颜色
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.backgroundColor = color;

    // 随机设置宽高，模拟条状彩带，调整为更细小的尺寸
    const width = Math.random() * 5 + 2; // 2-7px宽
    const height = Math.random() * 20 + 5; // 5-25px高
    confetti.style.width = `${width}px`;
    confetti.style.height = `${height}px`;

    // 随机设置初始位置和动画延迟
    const delay = Math.random() * 1 + 0.5; // 延迟时间 0.5s 到 1.5s
    const duration = Math.random() * 4 + 4; // 持续时间 4s 到 8s（变慢）

    gsap.set(confetti, {
      position: "absolute",
      left: `${Math.random() * 100}%`, // 随机从屏幕上方位置飞出
      top: `${Math.random() * -100}%`, // 从上方飞出
    });

    // 使用 GSAP 动画让彩带下落
    gsap.to(confetti, {
      y: "100vh", // 飞到屏幕底部
      x: `${Math.random() * 50 - 25}%`, // 随机横向位移
      opacity: 0,
      rotation: Math.random() * 360, // 随机旋转
      scale: Math.random() * 0.5 + 0.5, // 随机缩放
      delay: delay,
      duration: duration, // 延长持续时间
      ease: "power2.out",
      onComplete: () => confetti.remove(), // 完成后移除
    });

    container.appendChild(confetti);
  }
};

onMounted(() => {
  nextTick(() => {
    // 2秒后启动彩带生成的定时器
    interval = setInterval(() => {
      createConfetti();
    }, 1100); // 每1100ms生成一次新的彩带
    // 定时器销毁
    setTimeout(() => {
      clearInterval(interval); // 5秒后停止动画
    }, 10000); // 设置停止的时间
  });
});

// 在组件卸载时清理定时器
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval); // 清除定时器，防止内存泄漏
  }
});
</script>

<style lang="less" scoped>
.container-4 {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/four/bg.png");
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  position: relative;
  animation: fadeBg 1.5s ease-out forwards;
}
// 彩带盒子
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // 确保不会干扰其他交互
}
// 彩带
.confetti-item {
  position: absolute;
  border-radius: 5px; // 让彩带看起来像柔软的条状物
  opacity: 1;
  pointer-events: none; // 确保彩带不被点击
}

// 人物奔跑-盒子
.bottom-4 {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 40%;
  // background-color: rgba(0, 0, 0, 0.5);
  .bp-1 {
    width: 148px;
    height: 177px;
    position: absolute;
    left: 243px;
    bottom: 624px;
    animation: fadeInOut 8s infinite;
    opacity: 0;
  }
  .bp-2 {
    width: 157px;
    height: 260px;
    position: absolute;
    left: 353px;
    bottom: 539px;
    animation: fadeInOut 8s infinite;
    animation-delay: 2s;
    opacity: 0;
  }
  .bp-3 {
    width: 330px;
    height: 446px;
    position: absolute;
    bottom: 365px;
    right: 75px;
    animation: fadeInOut 8s infinite;
    animation-delay: 4s;
    opacity: 0;
  }
  .cc-line {
    width: 549px;
    height: 254px;
    position: absolute;
    right: 0;
    bottom: 346px;
  }
  .lg-1 {
    animation: fadeInOut 8s infinite;
    opacity: 0;
  }
  .lg-3 {
    animation: fadeInOut 8s infinite;
    opacity: 0;
    animation-delay: 2s;
  }
  .lg-2 {
    animation: fadeInOut 8s infinite;
    animation-delay: 4s;
    opacity: 0;
  }
}
@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

// 气球
.qiqiu {
  animation: ship 3s ease-in-out infinite;
}
.qq-1 {
  width: 50px;
  position: absolute;
  left: 20%;
  top: 500px;
}
.qq-2 {
  width: 50px;
  position: absolute;
  left: 45%;
  top: 550px;
  animation-delay: 1s;
}
.qq-3 {
  width: 50px;
  position: absolute;
  right: 14%;
  top: 500px;
}
.qq-4 {
  width: 50px;
  position: absolute;
  left: 14%;
  top: 700px;
}
.qq-5 {
  width: 30px;
  position: absolute;
  right: 9%;
  top: 9%;
  animation-delay: 1s;
}
.qq-6 {
  width: 20px;
  position: absolute;
  right: 29%;
  top: 14%;
}
.qq-7 {
  width: 50px;
  width: 20px;
  position: absolute;
  left: 29%;
  top: 5%;
}
.qq-8 {
  width: 30px;
  position: absolute;
  right: 29%;
  top: 25%;
  animation-delay: 1s;
}
/* 船浮动动画 */
@keyframes ship {
  0% {
    transform: translateY(0); /* 初始位置 */
  }
  50% {
    transform: translateY(-20px); /* 上浮 */
  }
  100% {
    transform: translateY(0); /* 回到初始位置 */
  }
}
// 文字
.text-box {
  position: absolute;
  left: 39px;
  top: 200px;
  .p1 {
    font-size: 40px;
    font-family: "TencentSans-W3", sans-serif;
    color: #ffffff;
    opacity: 0; /* 初始不可见 */
    animation: fadeUp 1.5s ease-out forwards; /* 动画延迟和持续时间 */
  }
  .p2 {
    font-size: 40px;
    font-family: "TencentSans-W3", sans-serif;
    opacity: 0; /* 初始不可见 */
    color: #ffffff;
    animation: fadeUp 1.5s ease-out 1s forwards; /* 延迟1s */
  }
  .p3 {
    font-size: 40px;
    font-family: "TencentSans-W3", sans-serif;
    opacity: 0;
    color: #ffffff;
    animation: fadeUp 1.5s ease-out 1.5s forwards;
    .s-1 {
      font-size: 53px;
      font-weight: bold;
      font-family: "TencentSans-W7", sans-serif;
    }
    .s-2 {
      font-size: 53px;
      font-weight: bold;
      font-family: "TencentSans-W7", sans-serif;
      color: #ffe400;
    }
  }
}
/* 文字动画 */
@keyframes fadeUp {
  0% {
    opacity: 0; /* 起始透明 */
    transform: translateY(50%); /* 起始位置在下方 */
  }
  100% {
    opacity: 1; /* 结束时完全不透明 */
    transform: translateY(0); /* 结束时位于正常位置 */
  }
}
</style>
