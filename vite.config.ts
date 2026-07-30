import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { env } from 'node:process'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		AutoImport({
			imports: ['vue'],
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	// 跨域代理
	server: {
	    port: 5173,
	    proxy: {
	      // 将所有 /api 请求代理到后端
	      '/api': {
	        target: 'http://localhost:8080',  // 后端地址
	        changeOrigin: true,                // 修改请求头中的 Origin
	        rewrite: (path) => path.replace(/^\/api/, '')  // 如果后端不需要 /api 前缀
	      }
	    }
	  }
})