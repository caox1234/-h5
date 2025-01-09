<template>
  <div class="container-3" :class="currClass">
    <div class="bottom">
      <div class="ndhy" @click="toggleComponent">
        <img class="icon-photo" src="@/assets/images/three/icon-photo.png" />
        <img class="img-text-1" src="@/assets/images/three/img-text-1.png" />
      </div>
      <div class="text-1">这一年</div>
      <div class="text-2">我们收获了很多<span>美好的回忆</span></div>
      <div class="text-3">（生日会、新生趴、聚享学社…）</div>
      <img class="icon-up" src="@/assets/images/icon-up.png" />
    </div>
    <transition name="fade">
      <photoWall v-if="shwoPhoto" @update:close="shwoPhoto = false" />
    </transition>
  </div>
</template>
<script setup>
/**
 * 第三屏-年度回忆
 */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import photoWall from "./photo-wall.vue";
// 背景图class
const backgrounds = ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6"];
// 设定初始索引
const indexNumber = ref(0);
let interval = null;
const shwoPhoto = ref(false);
const currClass = computed(() => {
  return backgrounds[indexNumber.value % backgrounds.length];
});
// 定义改变背景的函数
function changeBackground() {
  // 移除旧的类
  document
    .querySelector(".container-3")
    .classList.remove(backgrounds[indexNumber.value % backgrounds.length]);
  // 更新索引
  indexNumber.value++;
  // 添加新的类
  document
    .querySelector(".container-3")
    .classList.add(backgrounds[backgrounds.value % backgrounds.length]);
}

onMounted(() => {
  // 设置时间间隔去改变背景
  interval = setInterval(changeBackground, 1500);
});
const toggleComponent = () => {
  shwoPhoto.value = !shwoPhoto.value;
};
// 在组件卸载时清理定时器
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval); // 清除定时器，防止内存泄漏
  }
});
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.prize {
  width: 80vw;
  height: 45vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightcoral;
}
.container-3 {
  width: 100vw;
  height: 100vh;
  transition: background 1s ease-in-out;
  background-size: cover;
  background: url("@/assets/images/three/bg-1.jpg");
  position: relative;
  animation: fadeBg 1.5s ease-out forwards;
  background-position: bottom center;
}
.bg-1 {
  background: url("@/assets/images/three/bg-1.jpg");
  background-size: cover;
}
.bg-2 {
  background: url("@/assets/images/three/bg-2.jpg");
  background-size: cover;
}
.bg-3 {
  background: url("@/assets/images/three/bg-3.jpg");
  background-size: cover;
}
.bg-4 {
  background: url("@/assets/images/three/bg-4.jpg");
  background-size: cover;
}
.bg-5 {
  background: url("@/assets/images/three/bg-5.jpg");
  background-size: cover;
}
.bg-6 {
  background: url("@/assets/images/three/bg-6.jpg");
  background-size: cover;
}

.bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  .ndhy {
    padding-left: 43px;
    display: flex;
    align-items: center;
    animation: fadeUp 1.5s ease-out forwards;
    opacity: 0;
    .icon-photo {
      width: 55px;
      height: 50px;
      margin-right: 16px;
    }
    .img-text-1 {
      width: 244px;
      height: 28px;
    }
  }
  .text-1 {
    padding-left: 43px;
    margin-top: 50px;
    font-size: 46.67px;
    color: #ffffff;
    font-family: "TencentSans-W3", sans-serif;
    animation: fadeUp 1.5s ease-out 1s forwards; /* 延迟1s */
    opacity: 0;
  }
  .text-2 {
    padding-left: 43px;
    margin-top: 10px;
    font-size: 46.67px;
    color: #ffffff;
    font-family: "TencentSans-W3", sans-serif;
    animation: fadeUp 1.5s ease-out 1.5s forwards; /* 延迟1s */
    opacity: 0;
    span {
      color: #ffe400;
      font-weight: bold;
      font-family: "TencentSans-W7", sans-serif;
    }
  }
  .text-3 {
    padding-left: 43px;
    margin-top: 20px;
    font-size: 33px;
    color: #ffffff;
    font-family: "TencentSans-W3", sans-serif;
    opacity: 0;
    animation: fadeUp 1.5s ease-out 2s forwards; /* 延迟1s */
  }
  .ndhy:active {
    opacity: 0.7;
  }
}
.icon-up {
  width: 47px;
  height: 45px;
  margin: 92px auto 84px;
  display: block;
  animation: up 3s ease-in-out infinite;
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
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
