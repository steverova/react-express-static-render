import { createContext, type JSX, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

export const MODES = {
	DARK: 'dark',
	LIGHT: 'light',
	SYSTEM: 'system'
}

type ThemeProviderState = {
	MODES: typeof MODES
	theme: Theme
	setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
	MODES
}

const ThemeProviderContext: React.Context<ThemeProviderState> =
	createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps): JSX.Element {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme
	)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [])

	const value = {
		MODES,
		theme,
		setTheme: (th: Theme): void => {
			const update = (): void => {
				localStorage.setItem(storageKey, th)
				setTheme(th)

				const root = window.document.documentElement

				root.classList.remove('light', 'dark')

				if (th === 'system') {
					const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
						.matches
						? 'dark'
						: 'light'

					root.classList.add(systemTheme)
					return
				}

				root.classList.add(th)
			}

			if (document.startViewTransition) {
				document.startViewTransition(update)
			} else {
				update()
			}
		}
	}

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	)
}

export const useTheme = (): ThemeProviderState => {
	const context = useContext(ThemeProviderContext)

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider')

	return context
}
