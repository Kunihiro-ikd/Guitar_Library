// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// 以前
module.exports = {
  assetsDir: "static",
  css: {
    sourceMap: true
  }
} 

// import vue from '@vitejs/plugin-vue'

// export default {
//   plugins: [
//     vue({
//       template: {
//         compilerOptions: {
//           // treat all tags with a dash as custom elements
//           isCustomElement: (tag) => tag.startsWith('-')
//         }
//       }
//     })
//   ]
// }
// sass-loader
//https://www.npmjs.com/package/sass-loader