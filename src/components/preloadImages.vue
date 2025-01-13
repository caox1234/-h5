<template>
  <div>
    <img class="p-img" :src="getImgUrl('/one/bg.png')" />
    <img class="p-img" :src="getImgUrl('/two/bg.png')" />

    <img class="p-img" :src="getImgUrl('/three/bg-1.jpg')" />
    <img class="p-img" :src="getImgUrl('/three/bg-2.jpg')" />
    <img class="p-img" :src="getImgUrl('/three/bg-3.jpg')" />
    <img class="p-img" :src="getImgUrl('/three/bg-4.jpg')" />
    <img class="p-img" :src="getImgUrl('/three/bg-5.jpg')" />
    <img class="p-img" :src="getImgUrl('/three/bg-6.jpg')" />

    <img class="p-img" :src="getImgUrl('/four/bg.png')" />
    <img class="p-img" :src="getImgUrl('/four/lg-1.png')" />
    <img class="p-img" :src="getImgUrl('/four/lg-2.png')" />
    <img class="p-img" :src="getImgUrl('/four/xj-1.png')" />
    <img class="p-img" :src="getImgUrl('/four/xj-2.png')" />
    <img class="p-img" :src="getImgUrl('/four/xj-3.png')" />

    <img class="p-img" :src="getImgUrl('/five/bg-1.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-2.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-3.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-4.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-5.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-6.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-7.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-8.jpg')" />
    <img class="p-img" :src="getImgUrl('/five/bg-9.jpg')" />
    <img
      class="p-img"
      src="https://jmceshi.oss-cn-hangzhou.aliyuncs.com/nzjh5/eight/page_bg.png"
    />
    <img class="p-img" src="@/assets/images/eight/logo.png" />
    <img class="p-img" src="@/assets/images/eight/hb_bg.png" />
    <img class="p-img" src="@/assets/images/eight/ljjm.png" />
    <img class="p-img" src="@/assets/images/eight/page_bg.png" />
    <img class="p-img" src="@/assets/images/eight/bg.png" />
  </div>
</template>
<script setup>
/**
 * 离屏渲染
 */
import { getImgUrl } from "@/utils/utils.js";
</script>
<style scoped>
.p-img {
  transform: translateX(5000px);
}
</style>
