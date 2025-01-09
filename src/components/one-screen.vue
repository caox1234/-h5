<template>
  <div class="container-1">
    <!--流星背景-->
    <MeteorView>
      <img class="img-title" src="@/assets/images/one/img-title.png" />
    </MeteorView>
    <img class="halo" src="@/assets/images/one/halo.png" />
    <div class="bottom">
      <!--船-->
      <img class="ship" src="@/assets/images/one/ship.png" />
      <!--蝴蝶-->
      <img class="hudie" src="@/assets/images/one/hudie.png" />

      <!--打开记忆之门开始按钮-->
      <startButton class="start-button"></startButton>
      <butterfly class="b1"></butterfly>
    </div>
  </div>
</template>
<script setup>
/**
 * 第一屏
 */
import { ref, onMounted, onBeforeUnmount } from "vue";
import startButton from "./start-button.vue";
import butterfly from "./butterfly.vue";
import MeteorView from "./meteor-view.vue";
</script>
<style lang="less" scoped>
.container-1 {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/one/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  animation: fadeBg 1.5s ease-out forwards;
  .meteor-box {
    width: 100vw;
    height: 504px;
    position: absolute;
    // background-color: black;
    left: 0;
    right: 0;
    top: 0;
  }
  .img-title {
    width: 664px;
    height: 208px;
    display: block;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    // top: 280px;
    top: 15vh;
    z-index: 5;
    opacity: 0; /* 初始透明 */
    transform: translateY(100%); /* 初始位置在下方 */
    animation: fadeUp 1.5s ease-out 1.5s forwards; /* 文字动画 */
  }
  .bottom {
    width: 100%;
    height: 981px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("@/assets/images/one/img-sea.png");
    background-size: 100%; /* 设置宽度自动、高度为100% */
    background-repeat: repeat-y; /* 使背景在垂直方向上平铺 */
    background-position: top center; /* 背景从顶部开始 */
    background-repeat: no-repeat;
    // 船
    .ship {
      width: 351px;
      height: 826px;
      position: absolute;
      bottom: 0;
      right: 0;
      // animation: enter 2s ease-out forwards, ship 3s ease-in-out 2s infinite;
      animation: ship 3s ease-in-out infinite;
    }
    // 蝴蝶
    .hudie {
      width: 342px;
      height: 579px;
      position: absolute;
      bottom: 250px;
      left: 50px;
      animation: ship 5s ease-in-out infinite;
    }
    .start-button {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto 150px;
    }
  }
}
// 光圈
.halo {
  width: 700px;
  height: 700px;
  animation: rotateAnimation 8s infinite linear;
  text-align: center;
  display: block;
  margin: -110px auto 0;
  opacity: 0.6;
}
.b1 {
  position: absolute;
  bottom: 250px;
  right: 120px;
}
// 光圈旋转动画
@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* 标题动画 */
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
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
/* 船浮动动画 */
@keyframes ship {
  0% {
    transform: translateY(0); /* 初始位置 */
  }
  50% {
    transform: translateY(-10px); /* 上浮 */
  }
  100% {
    transform: translateY(0); /* 回到初始位置 */
  }
}
@keyframes enter {
  0% {
    transform: translateX(100vw); /* 初始位置：屏幕外右侧 */
  }
  100% {
    transform: translateX(0); /* 结束位置：屏幕内 */
  }
}
/* 媒体查询 */
@media (max-width: 375px) and (max-height: 667px) {
  /* iPhone SE */
  .img-title {
    top: 80px !important; /* 调整标题位置 */
  }
  .bottom {
    height: 60vh !important;
  }
}
@media (max-width: 414px) and (max-height: 736px) {
  /* iPhone SE */
  .img-title {
    top: 80px !important; /* 调整标题位置 */
  }
  .bottom {
    height: 55vh !important;
  }
}
</style>
