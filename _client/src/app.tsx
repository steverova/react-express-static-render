import greetings from '@vite-static-render/shared'
import type { JSX } from 'react'
import { Button } from './components/ui/button'

export default function App(): JSX.Element {
	const greeting = greetings('steven')
	return (
		<div>
			{`${greeting}, this is my App from scratch`}

			<div className='flex min-h-svh flex-col items-center justify-center'>
				<Button>Click me</Button>
			</div>
		</div>
	)
}
