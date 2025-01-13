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
const isSwiping = ref(false); // 标记是否正在滑动中
const progress = ref(0);

const emit = defineEmits(["next"]);

const handleAnimationStart = () => {
  console.log("加载成功");
};

onMounted(() => {
  hammer = new Hammer(transitionView.value);

  hammer.on("panup panend", (ev) => {
    // 只有在滑动结束时才处理
    // if (ev.type === "panup" && !isSwiping.value && progress.value >= 100) {
    if (ev.type === "panup" && !isSwiping.value) {
      console.log("滑动开始");
      // 记录当前正在滑动
      isSwiping.value = true;

      // 滑动进入下一屏
      // emit("next");
    }

    // 在滑动结束后重置标志
    if (ev.type === "panend") {
      console.log("滑动结束");
      isSwiping.value = false;
    }
  });
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
