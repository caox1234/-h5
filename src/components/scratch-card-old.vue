<template>
  <div class="container">
    <div class="light">
      <img
        src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/guang.png"
        alt=""
      />
    </div>
    <img
      class="title_bg"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/title.png"
    />
    <div class="scratch_box">
      <div class="title">1111</div>
      <ScratchCard
        maskColor="skyblue"
        font="30px 微软雅黑"
        :radius="30"
        imageUrl="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/price_bg1.jpg"
        :scratchRadius="40"
        :scratchPercent="80"
        @scratchStart="scratchStart"
        @scratchEnd="scratchEnd"
        @scratchAll="scratchAll"
      >
        <div class="prize">
          <div class="price_box">222<span>元</span></div>
        </div>
      </ScratchCard>
      <div class="info">xxxx</div>
    </div>
    <div class="up_box" v-if="isEnd">
      <img
        class="icon-up"
        src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/icon-up.png"
      />
      <p>你以为这就结束了</p>
    </div>
  </div>
</template>
<script setup>
/**
 * 刮刮乐
 */
import { ref, watch } from "vue";
import ScratchCard from "./StratchCard.vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const isEnd = ref(props.modelValue); // 是否刮完
// 刮刮结束事件
const scratchAll = () => {
  console.log("scratchAll");
  // isEnd.value = true;
  emit("update:modelValue", true);
};

watch(
  () => props.modelValue,
  (newValue) => {
    console.log("watch:modelValue", newValue);
    isEnd.value = newValue;
  },
  { deep: true }
);
</script>
<style lang="less" scoped>
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
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/bg.png")
    no-repeat;
  background-size: cover;
}
.title_bg {
  width: 609px;
  height: 196px;
  margin-left: 10px;
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
.light {
  width: 1200px;
  height: 1200px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
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
</style>
