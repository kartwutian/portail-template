module.exports = {
  pages: [
    // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      path: 'pages/index', // 生成的页面路径
      //   template: 'list', // 配置生成相关页面使用的模板文件，没有则用默认模板文件
      route: '/index', // 使用的前端路由
      name: '首页',
    },
    // {
    //   path: "pages/login",
    //   route: "/login",
    //   name: "登录"
    // }
  ],
};
