<template>
  <div>
    <div
      id="J-Container"
      ref="container"
      :class="modelValue ? 'show' : 'hide'"
    ></div>
    <!--  -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Player, AssetManager } from "@galacean/effects";

const props = defineProps({
  //开启弹窗
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 动画类型
  checkNumber: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:modelValue"]);

const showModal = ref(props.modelValue);
const container = ref(null);
const player = ref(null);
const jsonList = [
  // "/animation/transition-1/transition-1.json",
  // "/animation/transition-2/transition-2.json",
  // "/animation/transition-3/transition-3.json",
  // "/animation/transition-4/transition-4.json",
  "/nzjh5/animation/transition-1/transition-1.json",
  "/nzjh5/animation/transition-2/transition-2.json",
  "/nzjh5/animation/transition-3/transition-3.json",
  "/nzjh5/animation/transition-4/transition-4.json",
];

watch(
  () => props.modelValue,
  (newValue) => {
    showModal.value = newValue;
    if (newValue) {
      if (props.checkNumber === 0) return;
      loadScene(props.checkNumber - 1);
    }
  },
  { deep: true }
);
onMounted(async () => {
  // 初始化 Player 实例
  player.value = new Player({
    container: container.value,
    interactive: true,
  });
  await player.loadScene(
    [
      "/animation/transition-1/transition-1.json",
      "/animation/transition-3/transition-3.json",
      "/animation/transition-3/transition-3.json",
    ],
    { autoplay: false, reusable: true }
  );
  console.log("加载动画完成");
});
const loadScene = (index) => {
  if (jsonList[index]) {
    console.log("有");
    player.value.loadScene(jsonList[index]);
  } else {
    console.log("没有");
  }
};

onBeforeUnmount(() => {
  // 释放 Player 资源
  if (player) {
    player.value.dispose();
    player.value = null;
  }
});
const updateScreenSize = () => {
  player.value.resize();
};
// 在组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

// 在组件卸载时移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>
<style scoped>
#J-Container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.show {
  z-index: 999;
}
.hide {
  z-index: -1;
}
</style>
