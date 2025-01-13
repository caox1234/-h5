import { store } from "@/stores";
import { defineStore } from "pinia";
import { setToken, getToken, clearToken, isLogin } from "@/utils/auth";


import { webLoginApi, ddloginApi } from "@/api/app";

import { isProdMode, isTest } from "@/utils/env";

export const useAppStore = defineStore("app-local", {
  state: () => {
    return {
      // 存储用户唯一标识,本地存储持久化token
      token: getToken(),
    };
  },

  actions: {
    // 免密登录
    async ddLogin(params) {
      try {
        const { data } = await ddloginApi(params);

        // save token
        this.token = data.token;
        setToken(data.token);
        window.location.reload();

      } catch (error) {

      }
    },
    async webLogin(params) {
      try {
        const { data } = await webLoginApi(params);

        this.token = data.token;
        setToken(data.token);
        window.location.reload();


      } catch (error) {

      }
    },
    // async afterLoginAction(goHome?: boolean): Promise<any | null> {
    //   if (!isLogin()) return null;

    //   if (isTest()) {
    //     window.location.replace(import.meta.env.VITE_GLOB_API_URL_PREFIX);
    //   } else if (isProdMode()) {
    //     // 根据环境跳转 以便清楚路由的code
    //     window.location.replace(import.meta.env.VITE_GLOB_API_URL_PREFIX);
    //   }

    //   goHome && (await router.replace(PageEnum.BASE_HOME));
    // },
  },
  getters: {},
  persist: true,
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
