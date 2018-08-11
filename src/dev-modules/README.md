# 依赖包热开发

说明
一般情况下，开发某个nb-模块可以单独clone到本地的某个目录中，然后走正常的开发方式开发，然后内部进行单元测试，但如果这个模块需要依赖某个业务系统来进行开发调试的时候，就需要跟业务系统建立直接关系，直接import系统外部的文件并不靠谱，也容易出现意想不到的异常，为此我们在业务系统建立一个ghost文件夹，即`src/dev-modules`，这样在系统内部可以借助webpack，通过路径的转换直接import，同时又可以引用业务系统本身的一些依赖和context。

热开发状态下的模块可以放置到该目录中，方便开发调试

## 具体开发流程

1. 在gitlab的`nbnpm`组中建立对应的repo

2. clone到业务系统中的`dev-modules`目录

3. 添加和编写模块需要的文件

4. 完成模块编写并通过测试后，发布到nbnpm server &nbsp; [[?]](https://fe.newbanker.cn/wiki/docs/tools/nbnpm-publish.html)


`dev-modules`目录内的文件夹不在版本库中，放置在这里是临时性的，也就是说哪个业务系统需要用到某个模块来二次开发，或者是新建一个通用业务模块的时候，就可以放在这里做临时性的开发调试。

开发过程中，记得及时push代码到repo，避免代码丢失。


## 注意事项

`dev-modules`内的热开发模块采用白名单的方式加载，需要在dev-modules内创建local.js文件，内容export一个对象，包含所有允许被加入到系统的热模块名
`local.js`也不在版本库中，需要单独创建。

```js
// local.js模板
// true 表示激活热开发模式，false 表示不激活
module.exports = {
  'nb-vue-activiti': true
}
```
