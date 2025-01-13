<template>
  <div class="scartch-card">
    <fly-card
      @onDragMove="onCardDragMove"
      @onDragStop="onCardDragStop"
      @onThrowDone="onCardThrowDone"
      :cardWidth="338"
      :cardHeight="460"
      :throwTriggerDistance="100"
      dragDirection="vertical"
      :hasShadow="false"
    >
      <template
        #firstCard
        style="width: 100%; height: 100%"
        v-for="(v, index) in cards"
        :key="index"
      >
        <div class="scratch_box">
          <div class="title">标题111</div>
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
              <div class="price_box">555<span>元</span></div>
            </div>
          </ScratchCard>
          <div class="info">加油</div>
        </div>
      </template>
      <!-- <template #secondCard style="width: 100%; height: 100%">
        <div v-if="cards[1]" class="tantanCard">
          <img
            :src="cards[1].img"
            style="width: 100%; height: 100%"
            mode="aspectFill"
          />
        </div>
      </template>
      <template #thirdCard style="width: 100%; height: 100%">
        <div v-if="cards[2]" class="tantanCard">
          <img
            :src="cards[2].img"
            style="width: 100%; height: 100%"
            mode="aspectFill"
          />
        </div>
      </template> -->
    </fly-card>
  </div>
</template>

<script>
import FlyCard from "@/components/FlyCard.vue";
import ScratchCard from "./StratchCard.vue";
export default {
  components: {
    FlyCard,
  },
  data() {
    return {
      actionName: "",
      cards: [
        {
          img: "https://picsum.photos/200/300?111",
        },
        {
          img: "https://picsum.photos/200/300?222",
        },
        {
          img: "https://picsum.photos/200/300?333",
        },
        {
          img: "https://picsum.photos/200/300?444",
        },
        {
          img: "https://picsum.photos/200/300?555",
        },
      ],
    };
  },
  methods: {
    onCardDragMove(obj) {
      if (obj.left < -10) {
        this.actionName = "不喜欢";
      } else if (obj.left > 10) {
        this.actionName = "喜欢";
      } else {
        this.actionName = "";
      }
    },
    onCardDragStop(obj) {
      this.actionName = "";
    },
    onCardThrowDone(obj) {
      this.cards.splice(0, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.scartch-card {
  width: 100vw;
  margin-top: 120px;
  height: 654px;
}
.tantanCard {
  width: 100%;
  height: 100%;
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
