<template>
  <div class="container">
    <img
      class="title_bg"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/title.png"
    />
    <div class="scratch_box">
      <img
        src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/seven/lw.png"
        alt=""
      />
      <div class="price_box">{{ info.price }}<span>元</span></div>
      <div class="tips">恭喜你共获得年终奖</div>
      <div class="info">{{ info.sm }}</div>
    </div>
    <div class="up_box" @click="emit('next')">
      <img
        src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/seven/btn.png"
        alt=""
      />
    </div>
    <div class="light">
      <img
        src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/guang.png"
        alt=""
      />
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
const props = defineProps({
  // 年终奖列表
  nzjList: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["next"]);

const info = reactive({
  bt: "",
  price: "",
  sm: "",
});

watch(
  () => props.nzjList,
  (arr) => {
    if (arr.length > 0) {
      console.log("arr", arr);
      // 只需要最后一项
      const data = arr[arr.length - 1];
      console.log("data111111", data);
      info.bt = data.bt;
      info.price = data.price;
      info.sm = data.sm;
    }
  },
  { immediate: true, deep: true }
);
</script>
<style lang="less" scoped>
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
  overflow: hidden;
  animation: fadeBg 1.5s ease-out forwards;
}
.title_bg {
  width: 609px;
  height: 196px;
  margin-left: 10px;
  position: relative;
  z-index: 2;
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
  img {
    width: 272px;
    display: block;
    margin-top: 150px;
  }
}
.price_box {
  display: flex;
  align-items: baseline;
  font-size: 113px;
  font-family: "TencentSans-W7";
  font-weight: 700;
  background: linear-gradient(to bottom, #ff983d, #ff2a6b);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  height: 149px;
  span {
    font-size: 60px;
  }
}
.tips {
  margin-top: 20px;
  color: #242424;
  font-size: 29px;
}
.info {
  margin-top: 100px;
  color: #000;
  font-size: 29px;
}
.up_box {
  position: relative;
  z-index: 2;
  img {
    width: 597px;
    height: 102px;
    margin: 75px;
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
@keyframes fadeBg {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
