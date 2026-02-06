import { type JSX, lazy } from 'react'
import type { RouteObject } from 'react-router'
import ErrorPage from '@/components/blocks/error-page'
import Layout from '@/components/layout'
import AboutPage from '@/pages/about'
import DetailsPage from '@/pages/details'
import OverviewPage from '@/pages/overview'

const LoginPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
	() => import('@/pages/sign-in')
)

export const routes: RouteObject[] = [
	{
		path: 'sign-in',
		Component: LoginPage
	},
	{
		path: '/',
		Component: Layout,
		children: [
			{
				path: '/about',
				Component: AboutPage
			},
			{
				path: '/overview',
				Component: OverviewPage
			},
			{
				path: '/details',
				Component: DetailsPage
			}
		]
	},
	{
		path: '*',
		Component: ErrorPage
	}
]
