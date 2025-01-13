<template>
  <div class="photo-wall">
    <div class="photo-box">
      <div class="photo-list">
        <vue3ScrollSeamless
          class="scroll-wrap"
          :classOptions="classOptions"
          :dataList="list"
        >
          <ul class="ui-wrap">
            <li class="li-item" v-for="(item, i) of list[0]" :key="item">
              <img
                class="site-view"
                :src="`${OSSUrl}/photo/${item}.jpg`"
                alt=""
              />
            </li>
          </ul>
        </vue3ScrollSeamless>
        <vue3ScrollSeamless
          class="scroll-wrap"
          :classOptions="classOptions1"
          :dataList="list"
        >
          <ul class="ui-wrap">
            <li class="li-item" v-for="(item, i) of list[1]" :key="item">
              <img
                class="site-view"
                :src="`${OSSUrl}/photo/${item}.jpg`"
                alt=""
              />
            </li>
          </ul>
        </vue3ScrollSeamless>
        <vue3ScrollSeamless
          class="scroll-wrap"
          :classOptions="classOptions2"
          :dataList="list"
        >
          <ul class="ui-wrap">
            <li class="li-item" v-for="(item, i) of list[2]" :key="item">
              <img
                class="site-view"
                :src="`${OSSUrl}/photo/${item}.jpg`"
                alt=""
              />
            </li>
          </ul>
        </vue3ScrollSeamless>
      </div>
      <div class="close" @click="emit('update:close')"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onUnmounted } from "vue";
import { vue3ScrollSeamless } from "vue3-scroll-seamless";
import "viewerjs/dist/viewer.css";
import { api as viewerApi } from "v-viewer";
const OSSUrl = import.meta.env.VITE_OSS_BASE_URL;
const emit = defineEmits(["update:close"]);
const list = reactive([
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
]);

const classOptions = {
  limitMoveNum: 3,
  direction: 2,
  step: 1,
  hoverStop: false,
};
const classOptions1 = {
  limitMoveNum: 3,
  direction: 3,
  step: 1,
  hoverStop: false,
};
const classOptions2 = {
  limitMoveNum: 3,
  direction: 2,
  step: 1,
  hoverStop: false,
};
const getSrc = (el) => {
  return el.getAttribute("src");
};
// 定义事件处理函数
const handleClick = function(event) {
  if (event.target.classList.contains("site-view")) {
    viewerApi({
      options: {
        toolbar: false,
        inline: true,
        navbar: false,
        movable: false,
      },
      images: [getSrc(event.target)],
    });
  }
};

// 添加点击事件监听器
document.addEventListener("click", handleClick);
// 组件卸载时，移除事件监听器
onUnmounted(() => {
  document.removeEventListener("click", handleClick);
});
</script>

<style lang="scss" scoped>
.photo-wall {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-box {
  position: relative;
  width: 100%;
  height: 1100px; /* 可以调整高度 */
  background-color: transparent;
}
.scroll-wrap {
  width: 800px;
}
.ui-wrap {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
.close {
  width: 86px;
  height: 86px;
  position: absolute;
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/icon_close.png")
    no-repeat;
  background-size: contain;
  left: 50%;
  margin-left: -43px;
  bottom: -120px;
}
.li-item {
  padding: 0;
  margin-top: 0;
  margin-left: 20px;
  width: 534px;
  height: 358px;
  line-height: 200px;
  text-align: center;
  border-radius: 30px;
  border: 8px solid #fff;
  overflow: hidden;
}
.li-item img {
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
.photo-list {
  display: flex;
  flex-direction: column; /* 横向排列 */
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.photo-item {
  width: 400px;
  height: 280px;
  background-color: aqua;
  box-sizing: border-box;
  border: 2px solid #ffffff;
  border-radius: 30px;
  margin-right: 20px; /* 项目之间的间隔 */
}
</style>
