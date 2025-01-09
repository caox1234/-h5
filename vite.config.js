import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import pxtoviewport from 'postcss-px-to-viewport';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        autoprefixer(), // 自动添加前缀
        pxtoviewport({
          viewportWidth: 750, // 设计稿宽度 375px
          viewportHeight: 1334, // 可选，设计稿的高度（通常是 667px）
          unitPrecision: 5, // 转换时保留的小数点位数
          propList: ['*'], // 所有属性都转换
          selectorBlackList: ['.no-vw'], // 排除某些选择器（不需要转换）
          minPixelValue: 1, // 小于等于 1px 的不转换
          mediaQuery: false, // 不转换媒体查询中的 px
          exclude: /node_modules/i, // 排除 node_modules 目录中的样式（避免第三方库的 px 被转换）
        }),
      ],
    },
  },
  server: {
    host: '0.0.0.0', // 允许外部访问，监听所有 IP 地址
    port: 8000, // 你可以自定义端口
    open: true, // 启动时自动打开浏览器
  }
});
