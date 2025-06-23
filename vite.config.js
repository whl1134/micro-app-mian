import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from 'node:url'
import viteCompression from 'vite-plugin-compression'
import federation from '@originjs/vite-plugin-federation'

import vueJsx from "@vitejs/plugin-vue-jsx"
// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [ 
      vue(), 
      vueJsx(),
      // federation({
      //   name: 'main',
      //   filename: 'remoteEntry.js',
      //   shared: ['vue', 'pinia', 'vue-router']
      // }),
      viteCompression({
        verbose: true, // 打印压缩日志
        disable: false, // 启用压缩
        threshold: 1, // 仅对大于 10KB 的文件进行压缩
        algorithm: 'gzip', // 使用 gzip 压缩
        ext: '.gz', // 生成的文件后缀
      }),
      // viteCompression({
      //   verbose: true,
      //   disable: false,
      //   threshold: 1,
      //   algorithm: 'brotliCompress', // 使用 Brotli 压缩
      //   ext: '.br', // 生成的文件后缀
      // })
    ],
    server: {
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`,
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
