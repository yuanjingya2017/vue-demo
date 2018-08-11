export const menu = {
  menus: [
    {
      id: 'demo0001',
      name: 'vue例子',
      webUrl: '',
      icon: 'fa fa-user-circle',
      subResources: [
        {
          id: 'demo00010001',
          name: '计算属性和监听器',
          webUrl: 'vueCompute',
          subResources: []
        },
        {
          id: 'demo00010002',
          name: 'class与style绑定',
          webUrl: 'vueStyle',
          subResources: []
        }
      ]
    },
    {
      id: 'demo0002',
      name: 'vuex例子',
      webUrl: '',
      icon: 'fa fa-server',
      subResources: [
        {
          id: 'demo00020001',
          name: '基础概念',
          webUrl: 'vuexBase',
          subResources: []
        },
        {
          id: 'demo00020002',
          name: '插件用法',
          webUrl: 'vuexPlugin',
          subResources: []
        }
      ]
    }
  ]
}
