import microApp, { preFetch } from "@micro-zoe/micro-app";




export const systems = {
  'pms': import.meta.env.VITE_SYSTEM_PMS,
  'ems': import.meta.env.VITE_SYSTEM_EMS,
  'system': import.meta.env.VITE_SYSTEM_SYS,
  'cms': import.meta.env.VITE_SYSTEM_CMS,
  'mall': import.meta.env.VITE_SYSTEM_MALL,
  'auth': import.meta.env.VITE_SYSTEM_AUTH,
  'main': import.meta.env.VITE_SYSTEM_MAIN,
  // ''
}



export const start = () => {
  microApp.start({
    iframe: true,
    "router-mode": "pure",
    // preFetchApps: [
    //   {
    //     name: 'pms',
    //     url: 'http://82.156.98.100:8000/#/login'
    //   }
    // ]
  });
};
