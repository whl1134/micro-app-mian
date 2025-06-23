import router from "./index";
import { getToken } from "@/utils/auth";
import { useRouteStore, useShopStore, useUserStore } from "@/stores";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示圆圈加载
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
const whiteList = [
  "/auth/login",
  "/auth/signIn",
  "/auth/signUp",
  "/about/doc",
  "/about",
];

// console.log(routeStore);
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const routeStore = useRouteStore();
  const shopStore = useShopStore();
  const userStore = useUserStore();
  // 判断该用户是否登录
  if (getToken()) {
    if (to.path === "/auth/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next();
    } else {
      if (shopStore.shops.length < 1) {
        await shopStore.getUserCurrentShopInfo();
      }
      if (!userStore.getUserInfo) {
        await userStore.getInfo();
      }

      if (routeStore.asyncRoutes.length > 0) {
        next();
        NProgress.done();
      } else {
        const accessRoutes = await routeStore.generateRoutes();
        next();
      }

      // accessRoutes.forEach((route) => {
      //   if (!isHttp(route.path)) {
      //     router.addRoute(route) // 动态添加可访问路由表
      //   }
      // })
      //     hasRouteFlag = true
      //     // 确保添加路由已完成
      //     // 设置 replace: true, 因此导航将不会留下历史记录
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
      //     await userStore.logoutCallBack()
      //     next(`/login?redirect=${to.path}`)
      //   }
      // } else {
      //   next()
      // }

      // next()
    }
  } else {
    // 如果没有 Token
    if (whiteList.includes(to.path)) {
      // 如果在免登录的白名单中，则直接进入
      next();
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next({
        name: "Login",
      });
    }
  }

  router.onError(() => {
    NProgress.done();
  });

  router.afterEach(() => {
    NProgress.done();
  });
  // 生产环境开启检测版本更新
  // const isProd = import.meta.env.PROD
  // if (isProd) {
  //   await compareTag()
  // }
});
