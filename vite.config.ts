import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import presets from './presets/presets'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: env.VITE_ENV === 'dev' ? '/' : './',
    plugins: presets(),
    // alias别名设置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
        UTILS: path.resolve(__dirname, './src/utils'),
        VIEWS: path.resolve(__dirname, './src/views'),
        COMPONENTS: path.resolve(__dirname, './src/components'),
        STORE: path.resolve(__dirname, './src/store'),
        API: path.resolve(__dirname, './src/api/modules'),
      },
    },
    // 服务设置
    server: {
      host: '0.0.0.0',
      port: 3015,
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_REQUEST_API,
          changeOrigin: true, //是否允许跨域
          rewrite: (pathStr: string) => pathStr.replace(env.VITE_APP_BASE_API, env.VITE_APP_TRUE_API),
        },
      },
    },
    // build配置
    build: {
      reportCompressedSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      minify: 'esbuild',
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    // css配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/element/dark.scss" as *;
          @import "@/styles/variables.scss";
        `,
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                // 去除elementPlus内部charset警告
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  })
}
