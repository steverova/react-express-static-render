import type { JSX } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

export default function DetailsPage(): JSX.Element {
	const navigate = useNavigate()

	const goToOverview = (): void => {
		navigate('/overview', {
			state: { from: 'details' }
		})
	}

	return (
		<div>
			<Button onClick={goToOverview}>Go to overview</Button>
		</div>
	)
}
