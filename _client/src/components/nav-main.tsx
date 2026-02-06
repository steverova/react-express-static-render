import { ChevronRight, SquareTerminal } from 'lucide-react'
import type { JSX } from 'react'
import { Link } from 'react-router'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/ui/sidebar'
import type { TNavigationItem } from '@/routes/navigationConfig'

export function NavMain({ items }: { items: TNavigationItem[] }): JSX.Element {
	const groups: JSX.Element[] = []
	let currentGroupItems: TNavigationItem[] = []
	let currentGroupLabel = ''

	const renderMenuItem = (menuItem: TNavigationItem): JSX.Element => {
		const IconComponent = menuItem.icon || SquareTerminal
		return (
			<Collapsible
				asChild={true}
				defaultOpen={menuItem.isActive}
				key={`${menuItem.label}-${menuItem.path || 'no-path'}`}>
				<SidebarMenuItem>
					{menuItem.children && menuItem.children.length > 0 ? (
						<CollapsibleTrigger asChild={true}>
							<SidebarMenuButton tooltip={menuItem.label}>
								<IconComponent />
								<span>{menuItem.label}</span>
							</SidebarMenuButton>
						</CollapsibleTrigger>
					) : (
						<SidebarMenuButton asChild={true} tooltip={menuItem.label}>
							<Link to={menuItem.path || '#'}>
								<IconComponent />
								<span>{menuItem.label}</span>
							</Link>
						</SidebarMenuButton>
					)}
					{menuItem.children && menuItem.children.length > 0 && (
						<>
							<CollapsibleTrigger asChild={true}>
								<SidebarMenuAction className='data-[state=open]:rotate-90'>
									<ChevronRight />
									<span className='sr-only'>Toggle</span>
								</SidebarMenuAction>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{menuItem.children.map((subItem) => (
										<SidebarMenuSubItem key={subItem.label}>
											<SidebarMenuSubButton asChild={true}>
												<Link to={subItem.path || '#'}>
													{subItem.icon ? <subItem.icon /> : null}
													<span>{subItem.label}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</>
					)}
				</SidebarMenuItem>
			</Collapsible>
		)
	}

	const createGroup = (
		label: string | undefined,
		groupItems: TNavigationItem[]
	): JSX.Element => {
		return (
			<SidebarGroup key={`group-${label ?? 'no-label'}`}>
				{label !== undefined && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
				<SidebarMenu>{groupItems.map(renderMenuItem)}</SidebarMenu>
			</SidebarGroup>
		)
	}

	const processNavigationItem = (item: TNavigationItem): void => {
		if (item.type === 'separator') {
			if (currentGroupItems.length > 0) {
				groups.push(createGroup(currentGroupLabel, currentGroupItems))
				currentGroupItems = []
			}
			currentGroupLabel = item.label
			if (item.children) {
				item.children.forEach(processNavigationItem)
			}
		} else {
			currentGroupItems.push(item)
		}
	}

	// Process all navigation items
	items.forEach(processNavigationItem)

	// Add the last group
	if (currentGroupItems.length > 0) {
		groups.push(createGroup(currentGroupLabel, currentGroupItems))
	}

	return <>{groups}</>
}
