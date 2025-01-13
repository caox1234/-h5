<template>
  <div class="container-6" ref="transitionView">
    <img
      class="title_bg"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/title.png"
    />
    <div class="light">
      <img
        src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/guang.png"
        alt=""
      />
    </div>

    <!--刮刮乐轮播卡片-->
    <swiper
      ref="swiperRef"
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      :allowSlideNext="allowTouchMove"
      :allowSlidePrev="allowTouchMove"
      :slideShadows="false"
      class="mySwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(item, index) in list" :key="index">
        <div class="scratch_box">
          <div class="title">{{ item.bt }}</div>
          <ScratchCard
            maskColor="skyblue"
            font="30px 微软雅黑"
            :radius="30"
            :imageUrl="fmUrl"
            :scratchRadius="40"
            :scratchPercent="80"
            @scratchStart="scratchStart"
            @scratchEnd="scratchEnd"
            @scratchAll="scratchAll(index)"
          >
            <div class="prize">
              <div class="price_box">{{ item.price }}<span>元</span></div>
            </div>
          </ScratchCard>
          <div class="info">{{ item.sm }}</div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="tips">{{ allFlagsTrue ? "精彩继续揭晓" : tips }}</div>
    <img
      class="icon-up"
      v-if="allFlagsTrue"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/icon-up.png"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import ScratchCard from "./StratchCard.vue";
import fmUrl from "@/assets/images/price_bg1.png";

const props = defineProps({
  // 年终奖列表
  nzjList: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["next"]);

let hammer = null;
const transitionView = ref();
let startPosition = { x: 0, y: 0 }; // 记录按压开始的坐标
let isMoving = false; // 标记是否开始移动

// 获取 swiper 实例
const swiperRef = ref(null);
// 禁止滑动
const allowTouchMove = ref(false);
// 年终列表
const list = ref([]);
// 提示内容
const tips = ref("刮开卡片，获取属于你的年终奖");

// ScratchCard 事件回调
const scratchStart = () => {};
const scratchEnd = () => {};
// 刮开全部事件
const scratchAll = (index) => {
  list.value[index].flag = true;
  // 允许滑动到下一张
  allowTouchMove.value = true;
  tips.value = "滑动卡片，惊喜继续揭晓";
};
//swiper滑动事件
const onSlideChange = (swiper) => {
  const index = swiper.realIndex;
  console.log(list.value[index].flag);
  if (list.value[index].flag == false) {
    allowTouchMove.value = false;
    tips.value = "";
  } else {
    // 允许滑动到下一张
    allowTouchMove.value = true;
    tips.value = "滑动卡片，惊喜继续揭晓";
  }
};
// 模块配置
const modules = [EffectCards];

watch(
  () => props.nzjList,
  (arr) => {
    // 最后一项不需要，是下一屏的内容
    list.value = arr.slice(0, arr.length - 1).map((item) => ({
      ...item,
      flag: false, // 给每个对象增加一个 flag 属性，值为 false
    }));
  },
  { immediate: true, deep: true }
);
// 当全部都刮开提示进入下一屏
const allFlagsTrue = computed(() => {
  return list.value.every((item) => item.flag === true);
});

onMounted(() => {
  if (transitionView.value) {
    hammer = new Hammer(transitionView.value);

    // 配置 pan 手势识别器，启用所有方向的识别
    hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL, threshold: 10 });

    // 监听按压开始事件
    hammer.on("panstart", (ev) => {
      if (ev.target.tagName === "CANVAS" || !allFlagsTrue.value) return;
      startPosition = { x: ev.center.x, y: ev.center.y }; // 记录按压的起始坐标
      isMoving = false; // 重置移动标志
    });

    // 监听按压移动事件
    hammer.on("panmove", (ev) => {
      if (ev.target.tagName === "CANVAS" || !allFlagsTrue.value) return;

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
      if (ev.target.tagName === "CANVAS" || !allFlagsTrue.value) return;

      if (isMoving) {
        // 计算最终移动的距离并判断是否满足条件
        const endPosition = { x: ev.center.x, y: ev.center.y };
        const distance = Math.sqrt(
          Math.pow(endPosition.x - startPosition.x, 2) +
            Math.pow(endPosition.y - startPosition.y, 2)
        );

        // 判断滑动方向
        const isVerticalMove = Math.abs(endPosition.x - startPosition.x) < 30; // 水平滑动小于 30px
        const isUpward = endPosition.y < startPosition.y; // 滑动方向：从下往上

        // 严格判断滑动方向
        if (distance > 50 && isVerticalMove && isUpward) {
          console.log("成功完成从下往上的滑动");
          emit("next"); // 触发事件
        } else {
          console.log("滑动没有满足要求：距离不够或方向不对");
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
</script>

<style lang="scss" scoped>
.container-6 {
  width: 100vw;
  height: 100vh;
  animation: fadeBg 1.5s ease-out forwards;
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/bg.png")
    no-repeat;
  background-size: cover;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 70px;
}
.title_bg {
  width: 609px;
  height: 196px;
  display: block;
  margin: 0 auto;
}
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.light {
  width: 1200px;
  height: 1200px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 1200px;
    height: 1200px;
    animation: rotate 8s linear infinite;
  }
}
// light旋转
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
// swiper
.swiper {
  width: 676px;
  height: 921px;
}

.swiper-slide {
  background-image: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/chou_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 676px;
  height: 921px;
}
.prize {
  width: 578px;
  height: 359px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/price_bg.jpg")
    no-repeat;
  background-size: cover;
  border-radius: 30px;
  font-size: 113px;
  color: #ff0054;
  font-family: "TencentSans-W7";
  font-weight: 700;
  .price_box {
    display: flex;
    align-items: baseline;
    span {
      font-size: 60px;
    }
  }
}
.scratch_box {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 676px;
  height: 921px;
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/chou_bg.png")
    no-repeat;
  background-size: cover;
}
.title {
  margin-top: 123px;
  margin-bottom: 30px;
  font-size: 49px;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  background: linear-gradient(to bottom, #ff983d, #ff2a6b);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
.info {
  margin-top: 100px;
  color: #000;
  font-size: 29px;
  font-weight: 700;
}
.icon-up {
  width: 47px;
  height: 45px;
  display: block;
  margin-top: 80px;
  margin-bottom: 28px;
  animation: up 3s ease-in-out infinite;
}
.up_box {
  position: fixed;
  bottom: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #fefefe;
    font-size: 27px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
.tips {
  position: fixed;
  text-align: center;
  bottom: 40px;
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  animation: up 3s ease-in-out infinite;
  z-index: 100;
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
