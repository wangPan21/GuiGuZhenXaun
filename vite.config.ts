import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

//引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//mock插件提供的方法
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command ,mode}) => {
  //获取各个环境下的对应的变量
  let env = loadEnv(mode,process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        //开发阶段使用mock数据
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
    //代理跨域
    server:{
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据服务器的地址设置
          target: env.VITE_SERVE,
          // 是否需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  }
})
