import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './_server/src'),
			'_shared': path.resolve(__dirname, './_shared')
		}
	},
	build: {
		lib: {
			entry: `${process.cwd()}/_server/app.ts`,
			name: 'ViteStaticRender',
			formats: ['es'],
			fileName: 'index'
		},
		outDir: 'dist/server',
		emptyOutDir: false,
		ssr: true
	}
})
