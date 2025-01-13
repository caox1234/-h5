import * as dd from "dingtalk-jsapi";
import { useAppStore } from "@/stores/modules/app";
import { isDevMode } from "@/utils/env";
export async function getCode(callback) {
  const appStore = useAppStore();
  // 微应用免登用户所在企业应用的corpId
  const corpId = "dingb76c1cbae8cb62be35c2f4657eb6378f";

  async function webLogin(authCode) {
    await appStore.webLogin({
      code: authCode,
    });
  }
  function getParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const result = {};

    urlParams.forEach(function (value, key) {
      result[key] = value;
    });

    return result;
  }

  if (dd.env.platform !== "notInDingTalk") {
    dd.ready(() => {
      // 使用SDK 获取免登授权码
      dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: (info) => {
          // 根据钉钉提供的api 获得code后,再次调用这个callback方法
          // 由于是钉钉获取code是异步操作,不知道什么时候执行完毕
          // callback 函数会等他执行完毕后在自己调用自己
          callback(info.code);
        },
        onFail: (err) => {
          alert(JSON.stringify(err));
        },
      });
    });
  } else {
    // 钉钉二维码 web登录
    console.log("钉钉二维码 web登录");
    const params = getParamsFromURL();
    if (params.authCode) {
      webLogin(params.authCode);
    } else {
      console.log('object', import.meta.env)
      window.location.href = import.meta.env.VITE_GLOB_QR_LOGIN_URL
    }


  }
}
