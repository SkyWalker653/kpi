module.exports = {
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {
        // 'vuex-store': resolve('src/store')
        'vuex-store': '@/store/store'
      }
    }
  },

  pluginOptions: {
    quasar: {
      theme: 'mat',
      importAll: true
    }
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
