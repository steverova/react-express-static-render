import { type JSX, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function HomePage(): JSX.Element {
	const [counter, setCounter] = useState(0)

	return (
		<div className='flex min-h-svh flex-col items-center justify-center'>
			<Button onClick={(): void => setCounter(counter + 1)}>
				Click me {counter}
			</Button>
		</div>
	)
}
