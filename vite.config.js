import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { terser } from 'rollup-plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  envDir: 'configs',
  base: './',
  server: {
    fs: { strict: false },
    host: '0.0.0.0',
    port: 9100,
    strictPort: true
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('a-')
        }
      }
    }),
    Components({
      // ui库解析器，也可以自定义
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()]
    }),
    terser({ compress: true }),
    visualizer({ open: false })
    // viteCompression({
    //   verbose: true, // 默认即可
    //   disable: false, //开启压缩(不禁用)，默认即可
    //   deleteOriginFile: false, //删除源文件
    //   threshold: 10240, //压缩前最小文件大小
    //   algorithm: 'gzip', //压缩算法
    //   ext: '.gz' //文件类型
    // })
  ],
  resolve: {
    alias: [
      {
        find: /^three(?!-)/,
        replacement: path.resolve(__dirname, 'vendor', 'three')
      },
      { find: /^@(?=\/)/, replacement: path.resolve(__dirname, 'src') }
    ]
  },
  build: {
    chunkSizeWarningLimit: 2048
  }
})
