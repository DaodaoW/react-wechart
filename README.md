# 布兰图公众号
## 说明：
   #### 布兰图微信公众号web页面，提供用户登录充值缴费等功能。
## 涉及技术：
   [React](https://react.docschina.org/) + [UmiJs](https://umijs.org/zh/guide/) +
   [TypeScript](https://ts.xcatliu.com/) + [DvaJs](https://dvajs.com/)

## 项目运行：
   1.将代码从码云仓库克隆到本地

   ```
   git clone https://gitee.com/zhejiang_blandu_smart_energy/boslend-wechart.git
   ```

   2.进入代码所在根目录分别执行
   ```
    npm install
    umi dev
   ```

   3.访问本地http://localhost:8000/

## umi基本项目结构：
   ```
    .
    ├── dist/                          // 默认的 build 输出目录
    ├── mock/                          // mock 文件所在目录，基于 express
    ├── config/
        ├── config.js                  // umi 配置，同 .umirc.js，二选一
    └── src/                           // 源码目录，可选
        ├── layouts/index.js           // 全局布局
        ├── pages/                     // 页面目录，里面的文件即路由
            ├── .umi/                  // dev 临时目录，需添加到 .gitignore
            ├── .umi-production/       // build 临时目录，会自动删除
            ├── document.ejs           // HTML 模板
            ├── 404.js                 // 404 页面
            ├── page1.js               // 页面 1，任意命名，导出 react 组件
            ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
            └── page2.js               // 页面 2，任意命名
        ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
        ├── global.js                  // 可以在这里加入 polyfill
        ├── app.js                     // 运行时配置文件
    ├── .umirc.js                      // umi 配置，同 config/config.js，二选一
    ├── .env                           // 环境变量
    └── package.json
   ```