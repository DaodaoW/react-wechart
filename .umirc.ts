import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        // { path: '/', component: '../pages/index' },
        { path: '/', component: '../pages/bindAccount/index', title: '个人主页' },
        { path: '/userLogin', component: '../pages/userLogin/index', title: '登录' },
        { path: '/userVerify', component: '../pages/userVerify/index', title: '登录验证' },
        { path: '/setPwd', component: '../pages/setPwd/index', title: '输入密码' },
        { path: '/changeAccount', component: '../pages/changeAccount/index', title: '切换账户' },
        { path: '/addAccount', component: '../pages/addaccount/index', title: '新增账户' },
        { path: '/bill', component: '../pages/bill/index', title: '充值记录' },
        { path: '/pay', component: '../pages/pay/index', title: '充值' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '布兰图',
      dll: true,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
