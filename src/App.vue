<template>
  <div
    class="container"
    ref="swipeArea"
    v-if="checkNumber != 17 && checkNumber != 16"
  >
    <!--顶部导航栏-->
    <TopBar @click="checkScreen" />
    <!-- <transition name="slide-fade" mode="out-in"> -->
    <!--首屏加载进度-->
    <ProcessScreen v-if="checkNumber == 0" />
    <!--第一屏-->
    <oneScreen v-else-if="checkNumber == 1" />
    <!--第二屏-->
    <twoScreen v-else-if="checkNumber == 2" />
    <!--第三屏-->
    <threeScreen v-else-if="checkNumber == 3" />
    <!--第四屏-->
    <fourScreen v-else-if="checkNumber == 4"></fourScreen>
    <!-- </transition> -->
    <!--第五屏-->
    <fiveScreen v-else-if="checkNumber == 5"></fiveScreen>
    <!--第六屏 基础年终奖-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 6"
    />
    <!--第六屏 人才贡献奖-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 7"
    />
    <!--第六屏 域名合伙人-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 8"
    />
    <!--第六屏 BD合伙人-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 9"
    />
    <!--第六屏 域名业务-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 10"
    />
    <!--第六屏 BD业务贡献-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 11"
    />
    <!--第六屏 雷米业务贡献-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 12"
    />
    <!--第六屏 域铺业务贡献-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 13"
    />
    <!--第六屏 补贴业务贡献-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 14"
    />
    <!--第六屏 理财业务贡献-->
    <sixScreen
      :type="checkNumber"
      :data="info.data"
      v-else-if="checkNumber == 15"
    />
    <!-- 年终奖总计 -->
    <sevenScreen
      :type="checkNumber"
      :data="info.data"
      @update:next="renderPoster"
      v-else-if="checkNumber == 16"
    />
    <!-- 绘制海报 -->
    <eightScreen
      :data="info.data"
      :type="checkNumber"
      v-else-if="checkNumber == 17"
    />
    <!---过渡屏-->
    <TransitionScreen
      v-model="isTransition"
      :checkNumber="checkNumber"
    ></TransitionScreen>
    <!--预加载-->
    <preloadImages></preloadImages>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRaw, reactive } from "vue";
import Hammer from "hammerjs";
import TopBar from "@/components/top-bar.vue";
import ProcessScreen from "@/components/progress-screen.vue";
import TransitionScreen from "./components/transition-screen.vue";
import oneScreen from "@/components/one-screen.vue";
import twoScreen from "@/components/two-screen.vue";
import threeScreen from "@/components/three-screen.vue";
import fourScreen from "@/components/four-screen.vue";
import fiveScreen from "@/components/five-screen.vue";

import preloadImages from "@/components/preloadImages.vue";
import sixScreen from "@/components/six-screen.vue";
import sevenScreen from "@/components/seven-screen.vue";
import eightScreen from "@/components/eight-screen.vue";

// import photoWall from "./components/photo-wall.vue";

const swipeArea = ref(null);
const checkNumber = ref(0);
const isTransition = ref(false); //是否开启过渡动画
const info = reactive({
  code: 1,
  msg: "ok",
  data: {
    rzsj: 1736404414,
    rzts: 365,
    ws: "中五位",
    tx: "",
    name: "姓名",
    gwmc: "前端组长",
    nzj: {
      p1: {
        bt: "基础年终奖",
        price: "10000",
        sm: "岁月如歌，感谢你的付出，愿未来更灿烂。",
      },
      p2: {
        bt: "人才贡献奖",
        price: "10000",
        sm: "岁月如歌，感谢你的付出，愿未来更灿烂。",
      },
      p3: {},
      p4: {},
      p5: {},
      p6: {},
      p7: {},
      p8: {},
      p9: {},
      p10: {},
      p11: {
        bt: "总计",
        price: "400000",
        sm: "才智卓越，你的智慧与奋斗是聚名宝贵的财富。",
      },
    },
  },
});
const nzjArr = ref([]);
info.data.nzj &&
  Object.keys(info.data.nzj).forEach((key, index) => {
    nzjArr.value.push({
      [index + 6]: info.data.nzj[key],
    });
  });
console.log("nzjArr", nzjArr.value);
// 切屏
const checkScreen = () => {
  const nextScreen = checkNumber.value;
  console.log("nextScreen: " + nextScreen);

  if (nextScreen == 16) {
    return;
  }
  // 判断下一个屏幕是否有数据，没有继续下一个，直到有数据，如果到最后一屏，也就是16，就跳到16
  if (nextScreen > 5) {
    const getScreenData = nzjArr.value.find((item) => item[nextScreen]);
    // 判断是否有数据
    const hasData = getScreenData && getScreenData[nextScreen].price;
    console.log("hasData: " + hasData);
    console.log("nextScreen: " + nextScreen);
    if (hasData) {
      checkTransition(nextScreen);
    } else {
      checkNumber.value++;
      checkScreen();
    }
  } else {
    checkTransition(checkNumber.value);
  }
  console.log("checkNumber", checkNumber.value);
};
const renderPoster = () => {
  checkNumber.value = 17;
};
// 过渡
const checkTransition = (type) => {
  isTransition.value = true;

  checkNumber.value = type;
  setTimeout(() => {
    checkNumber.value++;
  }, 500);
  setTimeout(() => {
    isTransition.value = false;
  }, 2000);
};
onMounted(() => {
  const hammer = new Hammer(swipeArea.value);
  hammer.on("panup pandown tap press", (ev) => {
    // console.log("ev:", ev);
    if (ev.type === "panup") {
      // checkNumber.value = 1;
      checkScreen();
    } else {
      // checkNumber.value = 2;
    }
  });
});
// 清理事件监听
onBeforeUnmount(() => {
  hammer.destroy();
});
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
/* slide-fade 动画的过渡效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out; /* 透明度和位移平滑过渡 */
}

/* 进入时的透明度和缩放 */
.slide-fade-enter {
  opacity: 0.6;
  transform: scale(0.9); /* 轻微缩小 */
}

/* 离开时的透明度和缩放 */
.slide-fade-leave-to {
  opacity: 0.6;
  transform: scale(1.1); /* 离开时稍微放大，给人深度感 */
}

/* 新组件进入时 */
.slide-fade-enter-active {
  z-index: 2; /* 新组件进入时位于顶部 */
}

/* 旧组件离开时 */
.slide-fade-leave-active {
  z-index: 1; /* 旧组件离开时位于底部 */
}
</style>
