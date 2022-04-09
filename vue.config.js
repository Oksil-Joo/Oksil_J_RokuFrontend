const BASE_URL = "http://localhost:3000";
const UMS_PATH = "/users";

// get movies
const API_URL = "http://localhost:8888/RokuApp/RokuFlashback/api/index.php";


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  
  transpileDependencies: true,
  
  lintOnSave: false,
  
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/sass/reset.scss";
        @import "@/assets/sass/vars.scss";
        @import "@/assets/sass/main.scss";
        `
      }
    }
  },

  devServer: {
    proxy: {
      '/users': {
          target: `${BASE_URL + UMS_PATH}`,
          changeOrigin: true,
          pathRewrite: { '^/users' : '' }
      },

      '/movies': {
        target: `${API_URL}`,
        changeOrigin: true,
        pathRewrite: { '^/movies' : '' }
      }
    }
  }
});
