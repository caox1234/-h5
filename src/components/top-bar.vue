<template>
  <div class="bar">
    <div class="bar-content">
      <!-- 播放按钮 -->
      <img
        class="icon"
        v-if="isPlay && audioLoaded"
        src="@/assets/images/icon-music-1.png"
        @click="toggleAudio"
      />
      <!-- 停止按钮 -->
      <img
        class="icon"
        v-else-if="!isPlay && audioLoaded"
        src="@/assets/images/icon-music-2.png"
        @click="toggleAudio"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

// 控制播放状态
const isPlay = ref(false);
// 控制音频是否加载完成
const audioLoaded = ref(false);

// 创建音频对象
const audio = new Audio("/public/music.mp3");

// 切换播放/暂停
const toggleAudio = () => {
  if (isPlay.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlay.value = !isPlay.value;
};

// 音频加载完成后，显示播放按钮
onMounted(() => {
  audio.oncanplaythrough = () => {
    console.log("音乐加载完成");
    audioLoaded.value = true; // 音乐加载完成
  };
  // 自动播放音频
  audio.play().catch((err) => {
    console.log("自动播放失败：", err);
  });
});
</script>

<style lang="less" scoped>
.bar {
  width: 100%;
  padding-top: calc(80px + env(safe-area-inset-top)); /* 添加顶部安全区域 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.bar-content {
  width: 100%;
  height: 50px; /* 导航栏内容区高度 */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 42px; /* 内容左右内边距 */
  box-sizing: border-box;

  .icon {
    width: 65px;
    height: 65px;
  }

  .icon:first-child {
    margin-right: 30px;
  }

  .icon:active {
    opacity: 0.5;
  }

  span {
    color: #fff;
    font-size: 14px;
    text-align: center;
  }
}

.bar-content > * {
  flex-shrink: 0; /* 防止子元素收缩 */
}
</style>
