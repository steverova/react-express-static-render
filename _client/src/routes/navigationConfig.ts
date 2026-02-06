import {
	FileText,
	Home,
	Info,
	LayoutDashboard,
	type LucideProps
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export type TNavigationItem = {
	label: string
	icon?: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>
	path?: string
	type: 'item' | 'collapse' | 'group' | 'separator'
	children?: TNavigationItem[]
	isActive?: boolean
}

const navigation: TNavigationItem[] = [
	{
		path: '/about',
		type: 'item',
		label: 'About',
		icon: Info
	},
	{
		type: 'separator',
		label: 'Main Separator',
		children: [
			{
				path: '/',
				type: 'group',
				label: 'Home',
				icon: Home,
				children: [
					{
						path: '/overview',
						type: 'item',
						label: 'Overview',
						icon: LayoutDashboard
					},
					{
						path: '/details',
						type: 'item',
						label: 'Details',
						icon: FileText
					}
				]
			}
		]
	}
]

export default navigation
