import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'
import Markdown from 'vite-plugin-vue-markdown'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
// 自动导入组件及UI库
import Components from 'unplugin-vue-components/vite'
// 自动导入vue3的hooks,支持vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core等
import AutoImport from 'unplugin-auto-import/vite'
// element plus自动导入（组件+样式）
import ElementPlus from 'unplugin-element-plus/vite'

export default () => {
  return [
    vue({ include: [/\.vue$/, /\.md$/] }),
    vueJsx(),
    svgLoader(),
    Markdown(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    ElementPlus({
      // useSource: true
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', 'vue-i18n', '@vueuse/core'],
      // 指定配置文件生成的位置与文件名
      dts: './src/automatic/auto-imports.d.ts',
      // 指定引入utils目录下所有文件
      dirs: ['./src/utils/**'],
      resolvers: [ElementPlusResolver()],
      // 配置开启eslint
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      // 指定组件位置，默认为 src/components
      dirs: ['src/components'],
      // 指定配置文件生成的位置与文件名
      dts: './src/automatic/components.d.ts',
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver(), IconsResolver(), VueUseComponentsResolver()],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ]
}
