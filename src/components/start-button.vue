<template>
  <div class="border">
    <div class="bg-button">
      <img class="img-text" src="@/assets/images/one/img-text.png" />
      <div id="container-stars">
        <div id="stars"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
/**
 * 开始按钮
 */
</script>
<style lang="less" scoped>
.border {
  background-image: url("@/assets/images/one/bg-border.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 556px;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg-button {
    background-image: url("@/assets/images/one/bg-button.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 534px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .img-text {
      width: 288px;
      height: 44px;
      z-index: 5;
      position: relative;
    }
  }
  .bg-button:active {
    opacity: 0.9;
  }
}
#container-stars {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  border-radius: 5rem;
}
#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 400s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 100px 100px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 300s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 100px 100px;
  opacity: 0.5;
}
@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}
</style>
