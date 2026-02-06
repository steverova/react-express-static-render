import { Moon, Sun } from 'lucide-react'
import type { JSX } from 'react'
import { AppTooltip } from './app-tooltip'
import { useTheme } from './providers/theme-provider'
import { Button } from './ui/button'

export default function ThemeMode(): JSX.Element {
	const { theme, setTheme } = useTheme()

	const handleToggle = (): void => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	return (
		<AppTooltip label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
			<Button
				className='cursor-pointer'
				onClick={handleToggle}
				size='icon'
				variant='ghost'>
				{theme === 'dark' ? (
					<Sun className='h-4 w-4' />
				) : (
					<Moon className='h-4 w-4' />
				)}
			</Button>
		</AppTooltip>
	)
}
