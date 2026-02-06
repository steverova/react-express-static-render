import type { JSX } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui/tooltip'

type AppTooltipProps = {
	label: string
	children: React.ReactNode | JSX.Element
	position?: 'top' | 'bottom' | 'left' | 'right'
}

export function AppTooltip({
	label,
	children,
	position = 'top'
}: AppTooltipProps): JSX.Element {
	return (
		<Tooltip>
			<TooltipTrigger asChild={true}>{children}</TooltipTrigger>
			<TooltipContent side={position}>
				<p>{label}</p>
			</TooltipContent>
		</Tooltip>
	)
}
