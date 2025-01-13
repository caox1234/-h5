<template>
  <div style="position: relative; height: 100%; width: 100%; padding-left: 0px">
    <div
      class="card-card"
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <div
        class="card card-card"
        style="z-index: 13"
        :style="{
          left: left + 'px',
          top: top + 'px',
          'border-radius': borderRadius + 'px',
        }"
        :class="{
          animation: isAnimating,
          shadowEffect: hasShadow,
          boderEffect: hasBorder,
        }"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchcancel="touchCancel"
        @touchend="touchCancel"
      >
        <slot name="firstCard"></slot>
      </div>
      <div
        class="card"
        style="z-index: 12"
        :style="{
          width: width2 + 'px',
          height: height2 + 'px',
          left: left2 + 'px',
          top: top2 + 'px',
          'border-radius': borderRadius + 'px',
        }"
        :class="{
          animation: isAnimating,
          shadowEffect: hasShadow,
          boderEffect: hasBorder,
        }"
      >
        <slot name="secondCard"></slot>
      </div>
      <div
        class="card"
        style="z-index: 11"
        :style="{
          width: width3 + 'px',
          height: height3 + 'px',
          left: left3 + 'px',
          top: top3 + 'px',
          'border-radius': borderRadius + 'px',
        }"
        :class="{
          animation: isAnimating,
          shadowEffect: hasShadow,
          boderEffect: hasBorder,
        }"
      >
        <slot name="thirdCard"></slot>
      </div>
      <div
        class="card"
        style="z-index: 10"
        :style="{
          width: width4 + 'px',
          height: height4 + 'px',
          left: left4 + 'px',
          top: top4 + 'px',
          'border-radius': borderRadius + 'px',
          opacity: opacity4,
        }"
        :class="{
          animation: isAnimating,
          shadowEffect: hasShadow,
          boderEffect: hasBorder,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import useTouch from "@/utils/touch";

export default {
  props: {
    // 是否禁止拖动
    disabled: {
      type: Boolean,
      default: false,
    },
    // 正常卡片宽度
    cardWidth: {
      type: Number,
      default: 338,
    },
    // 正常卡片高度
    cardHeight: {
      type: Number,
      default: 460,
    },
    // 卡片层叠的横向边距
    leftPad: {
      type: Number,
      default: 10,
    },
    // 卡片层叠的纵向边距
    topPad: {
      type: Number,
      default: 6,
    },

    // 卡片拖拽方向
    dragDirection: {
      type: String,
      default: "all", //all,vertical,horizontal
    },
    // 卡片的圆角弧度
    borderRadius: {
      type: Number,
      default: 10,
    },
    // 卡片触发飞卡效果的距离
    throwTriggerDistance: {
      type: Number,
      default: 100,
    },
    // 飞卡的移动距离
    throwDistance: {
      type: Number,
      default: 1000,
    },
    // 是否开启卡片描边效果
    hasBorder: {
      type: Boolean,
      default: false,
    },
    // 是否开启阴影效果
    hasShadow: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    "onDragStart",
    "onDragMove",
    "onDragStop",
    "onThrowFail",
    "onThrowStart",
    "onThrowDone",
  ],
  setup(props, { emit }) {
    const touchState = useTouch(props, {
      onDragStart: () => emit("onDragStart"),
      onDragMove: (obj) => emit("onDragMove", obj),
      onDragStop: (obj) => emit("onDragStop", obj),
      onThrowFail: () => emit("onThrowFail"),
      onThrowStart: () => emit("onThrowStart"),
      onThrowDone: () => emit("onThrowDone"),
    });
    return { ...touchState };
  },
};
</script>

<style lang="less" scoped>
.card {
  position: absolute;
  overflow: hidden;
  background: url("https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/six/chou_bg.png")
    no-repeat;
  background-size: cover;
}
.card-card {
  width: 676px;
  height: 921px;
}
.card.boderEffect {
  border: 1px solid #ccc;
}
.card.shadowEffect {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}
.card.animation {
  transition: opacity 0.4s ease-out, left 0.4s ease-out, top 0.4s ease-out,
    width 0.4s ease-out, height 0.4s ease-out;
}
</style>
