import { createApp } from "vue";
import "./styles/index.less";
import "./styles/font.less";
import App from "./App.vue";
import "viewerjs/dist/viewer.css";
import { setupStore } from '@/stores'
import VueViewer from "v-viewer";
// 引入 vConsole
import VConsole from 'vconsole'

// 只在开发环境中引入 vConsole（可避免生产环境也引入）
if (import.meta.env.MODE === 'development') {
    const vConsole = new VConsole()
    console.log('vConsole is ready')
}



const app = createApp(App);
setupStore(app)
app.use(VueViewer);
app.mount("#app");
