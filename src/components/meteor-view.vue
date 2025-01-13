<template>
  <div>
    <slot />
    <div class="landscape-moon">
      <div class="meteor-1"></div>
      <div class="meteor-2"></div>
      <div class="meteor-3"></div>
      <div class="meteor-4"></div>
      <div class="meteor-5"></div>
      <div class="meteor-6"></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@keyframes meteor-anim {
  0% {
    transform: rotate(-32deg) translate(419px, 10px);
  }
  100% {
    transform: rotate(-32deg) translate(-500px, 10px);
  }
}
.landscape-moon {
  opacity: 1;
  width: 100vw;
  height: 504px;
  position: relative;
  overflow: hidden;
}
.tree-1,
.tree-2,
.tree-3,
.trunk-1,
.trunk-2,
.trunk-3,
.meteor-1,
.meteor-2,
.meteor-3,
.meteor-4,
.meteor-5,
.meteor-6,
span {
  position: absolute;
}

.meteor-1,
.meteor-2,
.meteor-3,
.meteor-4,
.meteor-5,
.meteor-6 {
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 0.5) 47%,
    rgba(237, 237, 237, 0) 100%
  );
}
.meteor-1 {
  width: 103px;
  height: 2px;
  top: 143px;
  transform: rotate(-20deg);
  opacity: 0.8;
  animation: 4s meteor-anim linear infinite;
}
.meteor-2 {
  top: 52px;
  left: 114px;
  width: 70px;
  height: 2px;
  transform: rotate(-12deg);
  opacity: 0.6;
  animation: 4s meteor-anim linear infinite;
}
.meteor-3 {
  top: 124px;
  right: 264px;
  width: 121px;
  height: 2px;
  transform: rotate(-23deg);
  animation: 2s meteor-anim linear infinite;
}
.meteor-4 {
  top: 65px;
  right: 264px;
  width: 43px;
  height: 2px;
  transform: rotate(-12deg);
  opacity: 0.3;
  animation: 4s meteor-anim linear infinite;
}
.meteor-5 {
  top: 65px;
  left: 264px;
  width: 51px;
  height: 2px;
  transform: rotate(-12deg);
  opacity: 0.5;
  animation: 4s meteor-anim linear infinite;
}
.meteor-6 {
  top: 65px;
  left: 525px;
  width: 86px;
  height: 2px;
  transform: rotate(-21deg);
  opacity: 0.5;

  animation: 4s meteor-anim linear infinite;
}
span {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 1px 1px white;
}
@function rand-width() {
  @return random(1200);
}
@function rand-height() {
  @return random(300);
}
@function rand-opacity() {
  @return (random(100) / 100);
}
</style>
