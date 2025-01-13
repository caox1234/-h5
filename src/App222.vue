<template>
  <div class="container" ref="swipeArea">
    <!--顶部导航栏-->
    <TopBar :isStar="isPlay" />
    <!---过渡屏-->
    <TransitionScreen
      v-model="isTransition"
      :checkNumber="checkNumber"
    ></TransitionScreen>

    <!--首屏加载进度-->
    <ProcessScreen v-if="checkNumber == 0" @next="checkScreen()" />
    <!--第一屏-->
    <oneScreen v-else-if="checkNumber == 1" @next="checkScreen()" />
    <!--第二屏-->
    <twoScreen
      v-else-if="checkNumber == 2"
      @next="checkScreen()"
      :rzts="rzts"
      :rzsj="rzsj"
    />
    <!--第三屏-->
    <threeScreen v-else-if="checkNumber == 3" @next="checkScreen()" />
    <!--第四屏-->
    <fourScreen v-else-if="checkNumber == 4" @next="checkScreen()"></fourScreen>
    <!--第五屏-->
    <fiveScreen v-else-if="checkNumber == 5" @next="checkScreen()"></fiveScreen>
    <!--第六屏-年终奖列表-->
    <sixScreen
      :nzjList="nzjList"
      v-else-if="checkNumber == 6"
      @next="checkScreen()"
    >
    </sixScreen>
    <!-- 年终奖总计 -->
    <sevenScreen
      :nzjList="nzjList"
      :type="checkNumber"
      @next="checkScreen()"
      v-else-if="checkNumber == 7"
    />
    <!-- 绘制海报 -->
    <eightScreen
      :info="info"
      :type="checkNumber"
      v-else-if="checkNumber == 8"
    />
    <!--预加载-->
    <preloadImages></preloadImages>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import $http from "@/api/index.js";
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

const swipeArea = ref(null);
const checkNumber = ref(0);
const isTransition = ref(false); //是否开启过渡动画
const isPlay = ref(false); //准备就绪开始播放
const rzsj = ref(0); // 入职时间戳
const rzts = ref(0); // 入职天数
const nzjList = ref([]); // 年终奖列表
// 用户信息
const info = reactive({
  name: "",
  tx: "",
  ws: "",
  gwmc: "",
});
// 切屏
const checkScreen = () => {
  console.log("checkScreen", checkNumber.value);
  if (checkNumber.value === 0) {
    isPlay.value = true;
  }
  checkTransition(checkNumber.value);
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
// 过滤掉空数组的项
const filteredData = (nzjList) => {
  return Object.values(nzjList).filter(
    (item) => item.length || (item.bt && item.price && item.sm)
  );
};
const fetchData = async () => {
  try {
    const res = await $http.getInfo();
    if (res.code == 1) {
      const data = res.data;
      rzsj.value = data.rzsj; // 入职时间戳
      rzts.value = data.rzts; // 入职天数
      nzjList.value = filteredData(data.nzj); // 年终奖列表
      // 用户信息
      info.name = data.name;
      info.tx = data.tx;
      info.ws = data.ws;
      info.gwmc = data.gwmc;
    }
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  console.log("获取用户信息");
  fetchData();
});
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
}

/* 对安卓设备进行兼容 */
@supports (--css: variables) {
  .container {
    padding-bottom: 20px; /* 对安卓设备应用默认的底部间距 */
  }
}

/* 如果你需要底部区域额外的 20px 间距，可以这样做 */
.container-with-extra-padding {
  width: 100vw;
  height: 100vh;
  padding-bottom: calc(
    env(safe-area-inset-bottom) + 20px
  ); /* 在底部安全区域上增加额外的 20px 间距 */
}
</style>
