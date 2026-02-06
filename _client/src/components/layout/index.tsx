import type { JSX } from 'react'
import { Outlet } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/components/ui/sidebar'
import ToolbarActions from './toolbar-actions'

export default function Layout(): JSX.Element {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 px-4'>
					<div className='flex justify-between w-full'>
						<div className='flex items-center gap-2'>
							<SidebarTrigger className='-ml-1' />
							<Separator
								className='mr-2 data-[orientation=vertical]:h-4'
								orientation='vertical'
							/>
						</div>
						<ToolbarActions />
					</div>
				</header>
				<div className='flex flex-1 flex-col gap-4 p-2 pt-0'>
					<div className='bg-muted/50 min-h-min flex-1 rounded-xl p-2'>
						<Outlet />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
