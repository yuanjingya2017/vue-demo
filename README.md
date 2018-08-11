# vue-demo

> demo project for vue2.0 about practise.

## Init

前端在build的之后是一个纯静态的工程，只需要一个静态服务器即可，而前端的build操作则需要依赖NodeJs环境。

## 安装nvm，用nvm来安装和管理NodeJs环境

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

# 用nvm安装v6.x版本nodejs(实际上>4.x即可)
$ nvm install v6

# 设置v6为默认版本
$ nvm alias default v6
```

## 安装淘宝官方cnpm私有镜像客户端工具

```bash
$ npm install cnpm -g --registry=https://registry.npm.taobao.org

# 同时查看npm版本，保证npm版本>=5.x
```

## Build Setup

``` bash
# install dependencies
nbnpm install

# serve with hot reload at localhost:8080
nbnpm run dev

# build for production with minification
nbnpm run build

# build for production and view the bundle analyzer report
nbnpm run build --report

# run unit tests
nbnpm run unit

# run all tests
nbnpm run test
```

some docs:

[Vue.js](https://vuejs.org/)

[Webpack](http://webpack.github.io/)

------

### 在config目录里创建一个local.js文件(内容参考local.sample.js)
```js
// local.js文件不在版本库里，只做local config
module.exports = {
  proxyTable: {
    '/api': {
      target: 'http://api-server.com/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

```

### nginx server里加上一条配置，根路由下的所有请求都location到index.html
```bash
# server root指向dist目录
location / {
  try_files $uri /index.html;
}  

```
