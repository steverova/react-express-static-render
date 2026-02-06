import greetings from '@vite-static-render/shared'
import type { JSX } from 'react'

export default function App(): JSX.Element {
	const greeting = greetings('steven')
	return <div>{`${greeting}, this is my App from scratch`}</div>
}
