<template>
  <div class="container-6" ref="transitionView">
    <scratchCard
      v-model="isEnd"
      v-if="list.length > 0 && defaultIndex >= 0 && defaultIndex < list.length"
      :key="defaultIndex"
      :item="list[defaultIndex]"
    ></scratchCard>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import scratchCard from "./scratch-card.vue";

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
const isSwiping = ref(false); // 标记是否正在滑动中

const defaultIndex = ref(0);
const list = ref([]);
const isEnd = ref(false); // 是否刮完
// 过滤掉空数组的项
const filteredData = () => {
  return Object.values(props.nzjList).filter(
    (item) => item.length || (item.bt && item.price && item.sm)
  );
};

watch(
  () => props.nzjList,
  (newValue) => {
    if (newValue) {
      list.value = filteredData();
    }
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  hammer = new Hammer(transitionView.value);

  hammer.on("panup panend", (ev) => {
    if (ev.target.tagName == "CANVAS") return;
    // if (!isEnd.value) return;
    // 只有在滑动结束时才处理
    if (ev.type === "panup" && !isSwiping.value) {
      // 记录当前正在滑动
      isSwiping.value = true;

      if (defaultIndex.value < list.value.length - 1) {
        console.log("default index");
        defaultIndex.value++;
        isEnd.value = true;
      } else {
        // 滑动进入下个刮刮乐
        emit("next");
      }
    }

    // 在滑动结束后重置标志
    if (ev.type === "panend") {
      isSwiping.value = false;
    }
  });
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
