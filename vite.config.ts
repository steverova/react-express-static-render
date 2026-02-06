import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	root: `${process.cwd()}/_client`,
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './_client/src'),
			'_shared': path.resolve(__dirname, './_shared')
		}
	},
	build: {
		outDir: '../dist/client',
		emptyOutDir: false
	},
	server: {
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	}
})
