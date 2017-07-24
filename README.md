# vuepro

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



搭建项目：

1、安装Vue-Cli ： npm install -g vue-cli

2、初始化vue-cli项目：vue init webpack 项目名称

3、cd 到项目根目录 安装所需依赖： npm install

4、启动热加载：npm run dev



运行项目：

1、运行vue：npm run dev

2、链接数据库： mongod --dbpath=E:\nodeWork\vuepro\db --port=27020

3、运行node：进入server文件夹 node index

4、打包：npm run build  

​	*会生成一个dist目录*



使用该项目：

1、从git 克隆项目： git clone git@github.com:1193082625/vuepro.git	

2、安装依赖包： npm install --save

3、在根目录添加db文件夹，以链接该项目的数据库（如果链接该db，则是新数据库，需要在后台添加新的内容）

4、运行后台：进入server文件夹，运行index.js文件

5、运行前台：npm run dev



## 目录结构

**bulid** 里面是一些操作文件，使用npm run *时其实执行的就是这里的文件

**config** 配置文件，执行文件需要的配置信息

**src** 资源文件，所有的组件以及所用的图片

​	**assets** 资源文件夹

​	**components** 组件文件夹

​	**router** 路由文件夹（决定页面的跳转规则）

​	**App.vue** 应用组件，所有自己写的组件，都是在这个组件上运行

​	**main.js**    webpack入口文件

**server**          Node文件夹

​	**index.js** 入口文件

​	**db.js** 数据库

​	**api.js** 接口



**解决跨域请求node接口问题：**

config文件夹下的index.js中有一个proxyTable，这是用来开启一个代理服务：[Vue-Cli官方描述](https://vuejs-templates.github.io/webpack/proxy.html)

```
 proxyTable: {
        '/api': {
        target: 'http://localhost:8088/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
```

改成这样就可以正常访问了