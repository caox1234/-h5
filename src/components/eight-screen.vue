<template>
  <div class="container" id="container">
    <img class="logo" src="@/assets/images/eight/logo.png" />
    <div class="hb_box">
      <div class="avatar">
        <img :src="props.data.tx" alt="" />
        <span>@聚名人-{{ props.data.name }}</span>
      </div>
      <img class="hb_bg" src="@/assets/images/eight/hb_bg.png" alt="" />
      <div class="nzj_box">
        <div class="nzj_box_left">
          <p>YEAR-END BONUS</p>
          <strong>#2024年终奖</strong>
        </div>
        <div class="nzj_box_right">{{ props.data.ws }}</div>
      </div>
      <div class="tips">
        2024的年轮里刻录了<br />
        <p>
          你在聚名作为<span>{{ props.data.gwmc }}</span
          >的辛勤付出。
        </p>
      </div>
    </div>
    <img class="jmsl" src="@/assets/images/eight/ljjm.png" alt="" />
  </div>
  <div class="save_hb">长按保存海报</div>

  <img v-if="hburl != ''" class="imgurl" :src="hburl" alt="" />
  <div class="mask" v-if="maskShow">
    <div class="loader">
      <p class="heading">海报生成中</p>
      <div class="loading">
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import html2canvas from "html2canvas";
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const maskShow = ref(true);
const hburl = ref("");
onMounted(() => {
  html2canvas(document.getElementById("container"), {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
    scale: 3,
  }).then((canvas) => {
    const baseImg = canvas.toDataURL("image/png");
    hburl.value = baseImg;
    setTimeout(() => {
      maskShow.value = false;
    }, 2000);
  });
});
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("@/assets/images/eight/page_bg.png") no-repeat;
  background-size: cover;
}
.logo {
  width: 177px;
  height: 49px;
}
.imgurl {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.jmsl {
  width: 666px;
  height: 152px;
}
.hb_box {
  width: 660px;
  height: 1090px;
  margin-top: 34px;
  margin-bottom: 140px;
  padding: 0 34px;
  background: url("@/assets/images/eight/bg.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
  .avatar {
    display: flex;
    align-items: center;
    margin-top: 87px;
    margin-bottom: 27px;
    img {
      width: 54px;
      height: 54px;
    }
    span {
      font-size: 27px;
      color: #000;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  .hb_bg {
    width: 599px;
    height: 492px;
  }
}
.nzj_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nzj_box p {
  color: rgba(62, 63, 68, 0.3);
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
}
.nzj_box strong {
  display: block;
  margin-top: 10px;
  color: #000;
  font-family: sans-serif;
  font-size: 37px;
  font-weight: 400;
}
.nzj_box_right {
  font-weight: 700;
  color: #8896fe;
  font-size: 87px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.tips {
  margin-top: 100px;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 47px;
  margin-left: 20px;
  span {
    color: #0077ff;
  }
}
.save_hb {
  position: absolute;
  right: 0;
  width: 220px;
  height: 46px;
  background: rgba(0, 0, 0, 0.2) url("@/assets/images/eight/xz.png") no-repeat
    27px;
  background-size: 17px;
  text-indent: 56px;
  color: rgba(255, 255, 255, 0.6);
  border-top-left-radius: 23px;
  border-bottom-left-radius: 23px;
  bottom: 278px;
  line-height: 46px;
  font-size: 24px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

@keyframes rotate {
  0% {
    transform: rotate(-15deg);
  }

  25%,
  75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(25deg);
  }
}
.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
}
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heading {
  color: black;
  letter-spacing: 0.2em;
  margin-bottom: 1em;
  font-size: 1.5em;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.loading {
  display: flex;
  width: 5em;
  align-items: center;
  justify-content: center;
}

.load {
  width: 46px;
  height: 6px;
  background-color: limegreen;
  animation: 1s move_5011 infinite;
  border-radius: 5px;
  margin: 0.1em;
}

.load:nth-child(1) {
  animation-delay: 0.2s;
}

.load:nth-child(2) {
  animation-delay: 0.4s;
}

.load:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes move_5011 {
  0% {
    width: 0.4em;
  }

  25% {
    width: 1.4em;
  }

  50% {
    width: 3em;
  }

  100% {
    width: 0.4em;
  }
}
</style>
