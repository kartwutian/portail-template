## 开始使用

### 生成api.json

执行` node ./scripts/fetch/index.js`，会爬取yapi上项目的所有接口，生成api.json文件，
自动生成pages下面的路由文件,用于快速构建文件

### 生成相关页面
执行` node ./scripts/generatePages.js`，会根据pages.json的路径配置及api.json文件，
自动生成pages下面的路由文件,用于快速构建文件

