<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    :allowTouchMove="allowTouchMove"
    :slideShadows="false"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in 6" :key="index">
      <div class="scratch_box">
        <div class="title">标题111</div>
        <ScratchCard
          maskColor="skyblue"
          font="30px 微软雅黑"
          :radius="30"
          imageUrl="/nzjh5/src/assets/images/six/price_bg1.jpg"
          :scratchRadius="40"
          :scratchPercent="80"
          @scratchStart="scratchStart"
          @scratchEnd="scratchEnd"
          @scratchAll="scratchAll"
        >
          <div class="prize">
            <div class="price_box">555<span>元</span></div>
          </div>
        </ScratchCard>
        <div class="info">加油</div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import ScratchCard from "./StratchCard.vue";

// 响应式变量
const allowTouchMove = ref(true);

// ScratchCard 事件回调
const scratchStart = () => {};
const scratchEnd = () => {};
const scratchAll = () => {};

// 模块配置
const modules = [EffectCards];
</script>

<style lang="less" scoped>
.swiper {
  width: 676px;
  height: 921px;
}

.swiper-slide {
  background-image: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/chou_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 676px;
  height: 921px;
}
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
</style>
