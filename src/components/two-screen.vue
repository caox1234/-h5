<template>
  <div class="container" ref="transitionView">
    <!--星空背景-->
    <startlitSky />
    <div class="mess-box">
      <p class="p1">Hi，聚名人</p>
      <p class="p2">
        <span>{{ year }}</span
        >年<span>{{ month }}</span
        >月<span>{{ day }}</span
        >日，我们相遇了。
      </p>
      <p class="p3">
        时间过得真快，转眼已经<span>
          <NumberFlow
            :value="days"
            :transformTiming="{ duration: 200, easing: 'ease-out' }"
            :spinTiming="{ duration: 800, easing: 'linear' }"
            :opacityTiming="{ duration: 500, easing: 'ease-in' }"
            @onStart="handleAnimationStart"
          /> </span
        >天了
      </p>
      <p class="p4">奋斗的路上，有你，真好~</p>
    </div>
    <!--人物行走-->
    <img
      class="xj-1"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/two/xj-1.png"
    />
    <img
      class="xj-2"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/two/xj-2.png"
    />
    <img
      class="xj-3"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/two/xj-3.png"
    />
    <!--💗-->
    <img
      class="img-ax"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/two/ax.png"
    />

    <!--萤火虫-->
    <firefly class="firefly-box" />
    <img
      class="icon-up"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/icon-up.png"
    />
  </div>
</template>
<script setup>
/**
 * 第二屏
 */
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import startlitSky from "./starlit-sky.vue";
import firefly from "./firefly.vue";
import NumberFlow from "@number-flow/vue";
import Hammer from "hammerjs";

const props = defineProps({
  // 入职天数
  rzts: {
    type: Number,
    default: 0,
  },
  // 入职时间戳
  rzsj: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["next"]);

const days = ref(0); // 工龄（天）

const year = ref(0); //年
const month = ref(0); //月
const day = ref(0); //日

const transitionView = ref();
let hammer = null;
let startPosition = { x: 0, y: 0 }; // 记录按压开始的坐标
let isMoving = false; // 标记是否开始移动

// 动画开始的回调
const handleAnimationStart = () => {};

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
// 获取年月日
const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
  year.value = date.getFullYear();
  month.value = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需加1，并补充0
  day.value = String(date.getDate()).padStart(2, "0"); // 补充0到个位数
};
// 清理事件监听
onBeforeUnmount(() => {
  hammer.destroy();
});
watch(
  () => props.rzts,
  (newValue) => {
    console.log("你看看啊", newValue);
    setTimeout(() => {
      days.value = newValue;
    }, 1500);
  },
  { immediate: true, deep: true }
);
watch(
  () => props.rzsj,
  (newValue) => {
    getFormattedDate(newValue);
  },
  { immediate: true, deep: true }
);
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/two/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-position: bottom center;
  animation: fadeBg 1.5s ease-out forwards;
  overflow: hidden;
}
.mess-box {
  color: #ffffff;
  margin: 25% 0 0 45px;

  /* p1 */
  .p1 {
    font-size: 59px;
    font-weight: 400;
    font-family: "TencentSans-W7", sans-serif;
    opacity: 0; /* 初始不可见 */
    animation: fadeUp 1.5s ease-out forwards; /* 动画延迟和持续时间 */
  }

  /* p2 */
  .p2 {
    font-size: 36px;
    font-family: "TencentSans-W3", sans-serif;
    opacity: 0; /* 初始不可见 */
    animation: fadeUp 1.5s ease-out 1s forwards; /* 延迟1s */
    span {
      font-size: 59px;
      font-weight: bold;
      font-family: "TencentSans-W7", sans-serif;
    }
  }

  /* p3 */
  .p3 {
    margin-top: 15px;
    font-size: 36px;
    font-family: "TencentSans-W3", sans-serif;
    opacity: 0;
    animation: fadeUp 1.5s ease-out 1.5s forwards;
    span {
      font-size: 53px;
      font-weight: bold;
      font-family: "TencentSans-W7", sans-serif;
      color: #ffe400;
    }
  }

  /* p4 */
  .p4 {
    font-size: 36px;
    opacity: 0; /* 初始不可见 */
    font-family: "TencentSans-W3", sans-serif;
    animation: fadeUp 1.5s ease-out 2s forwards; /* 延迟2s */
  }
}
// 萤火虫
.firefly-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
/* 小聚人物-1 */
.xj-1 {
  width: 126px;
  height: 210px;
  position: absolute;
  bottom: 220px;
  left: 51px;
  animation: fadeInOut1 10s infinite; /* 持续6秒，循环 */
  opacity: 0;
}

/* 小聚人物-2 */
.xj-2 {
  width: 82px;
  height: 185px;
  position: absolute;
  bottom: 280px;
  left: 149px;
  animation: fadeInOut2 10s infinite; /* 持续6秒，循环 */
  animation-delay: 2s; /* 延迟2秒 */
  opacity: 0;
}

/* 小聚人物-3 */
.xj-3 {
  width: 103px;
  height: 176px;
  position: absolute;
  bottom: 320px;
  left: 234px;
  animation: fadeInOut3 10s infinite; /* 持续6秒，循环 */
  animation-delay: 4s; /* 延迟4秒 */
  opacity: 0;
}
/* 💗 */
.img-ax {
  width: 43px;
  height: 39px;
  position: absolute;
  bottom: 490px;
  left: 294px;
  animation: fadeInOut3 10s infinite, floatUp 10s ease-in-out infinite;
  animation-delay: 4s; /* 延迟4秒 */
  opacity: 0;
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
/* 每个动画的具体过程 */
@keyframes fadeInOut1 {
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

@keyframes fadeInOut2 {
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

@keyframes fadeInOut3 {
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
/* 漂浮效果 */
@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0); /* 初始位置 */
  }
  100% {
    opacity: 1;
    transform: translateY(-25px);
  }
  80% {
    opacity: 1;
    transform: translateY(-50px);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
/* 媒体查询 */
@media (max-width: 375px) and (max-height: 667px) {
  .mess-box {
    color: #ffffff;
    margin: 70px 0 0 25px;
  }
  // .xj-1 {
  //   bottom: 20px !important;
  // }
  // .xj-2 {
  //   bottom: 65px !important;
  // }
  // .xj-3 {
  //   bottom: 85px !important;
  // }
}
@media (max-width: 430px) and (max-height: 932px) {
  .mess-box {
    color: #ffffff;
    margin: 90px 0 0 25px;
  }
}
.icon-up {
  width: 47px;
  height: 45px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: 92px auto 84px;
  display: block;
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
