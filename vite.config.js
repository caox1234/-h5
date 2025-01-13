import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { loadEnv } from 'vite'; // 使用 Vite 提供的 loadEnv
import autoprefixer from 'autoprefixer';
import pxtoviewport from 'postcss-px-to-viewport';

export default defineConfig(({ mode }) => {
  // 使用 loadEnv 来加载环境变量，mode 是 Vite 默认提供的环境模式参数
  const env = loadEnv(mode, process.cwd()); // 默认加载根目录的 .env 文件
  const { VITE_PORT, VITE_BASE_PATH } = loadEnv(mode, process.cwd());
  console.log('env', env);
  return {
    plugins: [vue()],
    base: VITE_BASE_PATH,
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
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['.no-vw'],
            minPixelValue: 1,
            mediaQuery: false,
            exclude: /node_modules/i,
          }),
        ],
      },
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: true,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
        },
      },
    },
  };
});
