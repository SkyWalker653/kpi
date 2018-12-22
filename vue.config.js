module.exports = {
  lintOnSave: false,

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
