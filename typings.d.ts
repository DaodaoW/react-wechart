declare var wx: any;
declare var WeixinJSBridge: any;
declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.less';
declare module '*.tsx';
declare module '*.ts';
declare module '*.js';
interface Window { // umi允许通过window.g_app 访问store
  g_app: {
    _store: {
      dispatch: Function,
      getState: Function
    },
    _models: Array<any>
  },
  g_routes: Array<any>
}