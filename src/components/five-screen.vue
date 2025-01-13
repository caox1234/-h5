<template>
  <div class="container-5" :class="currClass">
    <!-- 中间发光的效果 -->
    <!-- <div class="glow"></div> -->
    <transition name="fade">
      <div
        class="bg-button"
        v-if="!isChanging"
        @click="startChangingBackground()"
      ></div>
      <!-- <div class="bg-button" v-if="!isChanging" @click="xxx()"></div> -->
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

/**
 * 第五屏-拆信封
 */

const emit = defineEmits(["next"]);

// 背景图class
const backgrounds = [
  "bg-1",
  "bg-2",
  "bg-3",
  "bg-4",
  "bg-5",
  "bg-6",
  "bg-7",
  "bg-8",
  "bg-9",
];

// 设定初始索引
const indexNumber = ref(0);
let interval = null;
const isChanging = ref(false); // 用于控制是否正在进行背景更换

// 动态计算当前背景图的class
const currClass = computed(() => {
  return backgrounds[indexNumber.value % backgrounds.length];
});

// 改变背景的函数
function changeBackground() {
  if (indexNumber.value < backgrounds.length - 1) {
    indexNumber.value++;
    console.log("indexNumber", indexNumber.value);
  } else {
    clearInterval(interval); // 当到达最后一个时停止定时器
    console.log("结束");
    emit("next");
  }
}
const xxx = () => {
  emit("next");
};

// 开始定时更新背景图
function startChangingBackground() {
  if (isChanging.value) return; // 防止多次点击触发多个定时器

  isChanging.value = true;
  interval = setInterval(changeBackground, 800);
}

onMounted(() => {
  // 在组件挂载后不立即启动背景更换，只有点击触发
});

// 在组件卸载时清理定时器
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval); // 清除定时器，防止内存泄漏
  }
});
</script>

<style lang="less" scoped>
.container-5 {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  animation: fadeBg 1.5s ease-out forwards;
  transition: background 0.5s ease-in-out;
  overflow: hidden;
}
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.bg-1 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-1.jpg");
  background-size: cover;
}
.bg-2 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-2.jpg");
  background-size: cover;
}
.bg-3 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-3.jpg");
  background-size: cover;
}
.bg-4 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-4.jpg");
  background-size: cover;
}
.bg-5 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-5.jpg");
  background-size: cover;
}
.bg-6 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-6.jpg");
  background-size: cover;
}
.bg-7 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-7.jpg");
  background-size: cover;
}
.bg-8 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-8.jpg");
  background-size: cover;
}
.bg-9 {
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/five/bg-9.jpg");
  background-size: cover;
}
/* 按钮的基础样式 */
.bg-button {
  width: 596px;
  height: 100.9px;
  background: url("@/assets/images/js-button.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 100px;
  opacity: 1; /* 初始状态为透明 */
  transition: opacity 0.2s ease-in-out; /* 淡入淡出的过渡效果 */
}

/* 按钮被点击时透明度变化 */
.bg-button:active {
  opacity: 0.8;
}

/* 定义 Vue 的过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 初始状态为透明 */
}

/* 发光效果的元素 */
.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.8); /* 初始发光颜色 */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: glowEffect 3s ease-out forwards; /* 启动发光动画 */
  z-index: 10; /* 确保发光效果在页面内容之上 */
}

/* 页面内容 */
.content {
  position: relative;
  z-index: 1; /* 确保内容在发光层的下方 */
  text-align: center;
  color: #333;
  padding: 20px;
}

/* 动画效果：从中心发光并扩展，直到页面变白 */
@keyframes glowEffect {
  0% {
    transform: translate(-50%, -50%) scale(1); /* 从中心开始，初始大小 */
    background-color: rgba(255, 255, 255, 0.8); /* 初始光辉颜色 */
    opacity: 0; /* 初始光辉不透明 */
  }
  50% {
    transform: translate(-50%, -50%) scale(10); /* 扩展至较大 */
    background-color: rgba(255, 255, 255, 0.6); /* 稍微减弱光辉颜色 */
    opacity: 0.5; /* 中间时稍微透明 */
  }
  100% {
    transform: translate(-50%, -50%) scale(100); /* 扩展至最大，几乎覆盖整个页面 */
    background-color: white; /* 背景变为纯白 */
    opacity: 1; /* 最终完全透明 */
  }
}
</style>
