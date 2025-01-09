<template>
  <div class="container">
    <div class="light">
      <img src="@/assets/images/six/guang.png" alt="" />
    </div>
    <img class="title_bg" src="@/assets/images/six/title.png" />
    <div class="scratch_box">
      <div class="title">{{ prizeList[type].title }}</div>
      <ScratchCard
        maskColor="skyblue"
        font="30px 微软雅黑"
        :radius="30"
        imageUrl="/src/assets/images/six/price_bg1.jpg"
        :scratchRadius="40"
        :scratchPercent="60"
        @scratchStart="scratchStart"
        @scratchEnd="scratchEnd"
        @scratchAll="scratchAll"
      >
        <div class="prize">
          <div class="price_box">
            {{ prizeList[type].prize }}<span>元</span>
          </div>
        </div>
      </ScratchCard>
      <div class="info">{{ prizeList[type].info }}</div>
    </div>
    <div class="up_box">
      <img class="icon-up" src="@/assets/images/icon-up.png" />
      <p>你以为这就结束了</p>
    </div>
  </div>
</template>
<script setup>
/**
 * 第一屏
 */
import ScratchCard from "./StratchCard.vue";
const props = defineProps({
  type: Number,
});
// 枚举不同type对应的奖项
const prizeList = {
  6: {
    title: "基础年终奖",
    prize: "201000",
    info: "岁月如歌，感谢你的付出，愿未来更灿烂。",
  },
  7: {
    title: "人才贡献奖",
    prize: "202000",
    info: "才智卓越，你的智慧与奋斗是聚名宝贵的财富。",
  },
  8: {
    title: "域名合伙人贡献奖",
    prize: "203000",
    info: "携手共进，带领团队共创辉煌。",
  },
  9: {
    title: "BD合伙人贡献奖",
    prize: "240000",
    info: "携手共进，带领团队共创辉煌。",
  },
  10: {
    title: "域名业务贡献奖",
    prize: "201000",
    info: "业绩斐然，你的努力与成就为聚名增光添彩。",
  },
  11: {
    title: "BD业务贡献奖",
    prize: "201000",
    info: "业绩斐然，你的努力与成就为聚名增光添彩。",
  },
  12: {
    title: "雷米业务贡献奖",
    prize: "201000",
    info: "业绩斐然，你的努力与成就为聚名增光添彩。",
  },
  13: {
    title: "域铺业务贡献奖",
    prize: "201000",
    info: "业绩斐然，你的努力与成就为聚名增光添彩。",
  },
  14: {
    title: "补贴业务贡献奖",
    prize: "201000",
    info: "业绩斐然，你的努力与成就为聚名增光添彩。",
  },
  15: {
    title: "理财业务贡献奖",
    prize: "201000",
    info: "业绩斐然，你的努力与成就为聚名增光添彩。",
  },
};
</script>
<style lang="less" scoped>
.prize {
  width: 578px;
  height: 359px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("@/assets/images/six/price_bg.jpg") no-repeat;
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
  background: url("@/assets/images/six/bg.png") no-repeat;
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
  background: url("@/assets/images/six/chou_bg.png") no-repeat;
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
  margin-top: 115px;
  margin-bottom: 28px;
  animation: up 3s ease-in-out infinite;
}
.up_box {
  position: relative;
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
