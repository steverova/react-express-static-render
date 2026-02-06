import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './components/providers/theme-provider'
import LoadingFallback from './components/ui/loading-fallback'
import { router } from './routes/router'

const rootElement: HTMLElement | null = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<Suspense fallback={<LoadingFallback />}>
				<RouterProvider router={router} />
			</Suspense>
		</ThemeProvider>
	</React.StrictMode>
)
