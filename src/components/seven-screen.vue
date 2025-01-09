<template>
  <div class="container">
    <img class="title_bg" src="@/assets/images/six/title.png" />
    <div class="scratch_box">
      <img src="@/assets/images/seven/lw.png" alt="" />
      <div class="price_box">400000<span>元</span></div>
      <div class="tips">恭喜你共获得年终奖</div>
      <div class="info">才智卓越，你的智慧与奋斗是聚名宝贵的财富</div>
    </div>
    <div class="up_box" @click="emit('update:next')">
      <img src="@/assets/images/seven/btn.png" alt="" />
    </div>
    <div class="light">
      <img src="@/assets/images/six/guang.png" alt="" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  type: Number,
});
const emit = defineEmits(["update:next"]);
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("@/assets/images/six/bg.png") no-repeat;
  background-size: cover;
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
  background: url("@/assets/images/six/chou_bg.png") no-repeat;
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
</style>
