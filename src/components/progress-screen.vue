<template>
  <div class="container" ref="transitionView">
    <div class="content">
      <div class="ship-box">
        <img class="ship" :src="getImgUrl('/img-ship.png')" />
        <div class="hl"></div>
      </div>
      <img class="img-text" :src="getImgUrl('/img-start-text.png')" />
      <p class="num">
        <NumberFlow
          :value="progress"
          :transformTiming="{ duration: 200, easing: 'ease-out' }"
          :spinTiming="{ duration: 800, easing: 'linear' }"
          :opacityTiming="{ duration: 500, easing: 'ease-in' }"
          @onStart="handleAnimationStart"
        />
        %
      </p>
      <!-- <butterfly style="position: relative;left:120px;top:-90px"></butterfly> -->
      <img
        class="icon-up"
        v-if="progress === 100"
        :src="getImgUrl('/icon-up.png')"
      />
      <p class="tips " v-if="progress === 100">上划开启旅程</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import NumberFlow from "@number-flow/vue";
import butterfly from "./butterfly.vue";
import Hammer from "hammerjs";
import { getImgUrl } from "@/utils/utils.js";
/**
 * 进度加载屏
 */
const transitionView = ref();
let hammer = null;
let startPosition = { x: 0, y: 0 }; // 记录按压开始的坐标
let isMoving = false; // 标记是否开始移动

const progress = ref(0);

const emit = defineEmits(["next"]);

const handleAnimationStart = () => {
  console.log("加载成功");
};

onMounted(() => {
  if (transitionView.value) {
    hammer = new Hammer(transitionView.value);

    // 配置 pan 手势识别器
    hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL, threshold: 10 });

    // 监听按压开始事件
    hammer.on("panstart", (ev) => {
      startPosition = { x: ev.center.x, y: ev.center.y }; // 记录按压的起始坐标
      isMoving = false; // 重置移动标志
    });

    // 监听按压移动事件
    hammer.on("panmove", (ev) => {
      if (!isMoving) {
        // 判断是否开始移动超过一定的距离
        const distance = Math.sqrt(
          Math.pow(ev.center.x - startPosition.x, 2) +
            Math.pow(ev.center.y - startPosition.y, 2)
        );

        if (distance > 10) {
          // 设定一个阈值，移动超过 10px 就认为开始移动
          isMoving = true; // 开始移动
        }
      }
    });

    // 监听按压结束事件
    hammer.on("panend", (ev) => {
      if (isMoving) {
        // 计算最终移动的距离并判断是否满足条件
        const endPosition = { x: ev.center.x, y: ev.center.y };
        const distance = Math.sqrt(
          Math.pow(endPosition.x - startPosition.x, 2) +
            Math.pow(endPosition.y - startPosition.y, 2)
        );

        if (distance > 50) {
          // 根据需求调整距离阈值
          console.log("成功完成按压并滑动");
          if (progress.value < 100) return;
          emit("next");
        }
      } else {
        console.log("按压没有足够的滑动距离");
      }
    });
  } else {
    console.error("未找到 transitionView 元素");
  }
});
// 清理事件监听
onBeforeUnmount(() => {
  hammer.destroy();
});
onMounted(() => {
  let intervalId = setInterval(() => {
    if (progress.value < 100) {
      // 让进度以一定的随机波动增长
      const randomIncrease = Math.random() * 35; // 随机增加 0-5%
      // const randomIncrease = Math.random() * 55; // 随机增加 0-5%

      progress.value += Math.floor(randomIncrease);
      // 如果进度超过100，限制在100
      if (progress.value >= 100) {
        progress.value = 100;
        clearInterval(intervalId); // 停止模拟
      }
    }
  }, 1000); // 每100ms更新一次进度
});
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/bg-progress.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  // animation: fadeBg 1.5s ease-out forwards;
}
.content {
  display: flex;
  flex-direction: column;
  padding-top: 500px;
  align-items: center; /* 水平居中 */
  height: 100%; /* 占满父容器的高度 */
  .ship-box {
    width: 300px;
    height: 80px;
    position: relative;
    // overflow-y: hidden;
    // background-color: red;
  }
  .ship {
    width: 132px;
    height: 78px;
    animation: boatSway 1.5s linear infinite;
    transform-origin: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .hl {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 128px;
    height: 12px;
    background-image: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/img-hl.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
// 船动画
@keyframes boatSway {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  20% {
    transform: translate(4px, 2px) rotate(1deg);
  }
  30% {
    transform: translate(7px, -2px) rotate(0deg);
  }
  40% {
    transform: translate(4px, -6px) rotate(-1deg);
  }
  50% {
    transform: translate(0px, -8px) rotate(0deg);
  }
  60% {
    transform: translate(-4px, -6px) rotate(1deg);
  }
  70% {
    transform: translate(-7px, -2px) rotate(0deg);
  }
  80% {
    transform: translate(-4px, 0px) rotate(-1deg);
  }
  100% {
    transform: translate(0, 0px) rotate(0deg);
  }
}
.img-text {
  width: 344px;
  height: 40px;
  display: block;
  margin-top: 30px;
  font-family: "TencentSans-W3", sans-serif;
}
.num {
  font-size: 42px;
  text-align: center;
  color: #ffffff;
  margin-top: 28px;
  font-family: "TencentSans-W3", sans-serif;
}
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.tips {
  position: fixed;
  text-align: center;
  bottom: 50px;
  left: 0;
  right: 0;
  color: #ffffff;
  font-weight: bold;
  margin: 0 auto;
}
.icon-up {
  width: 47px;
  height: 45px;
  margin: 92px auto 84px;
  display: block;
  position: absolute;
  bottom: 40px;
  animation: up 3s ease-in-out infinite;
}
/* 浮动动画 */
@keyframes up {
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
</style>
