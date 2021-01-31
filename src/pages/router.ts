export interface RouterType {
	path?: string;
	component: string;
	code?: string;
	noAuthRedirect?: string;
	routes?: Array<RouterType>;
}

export const routers: Array<RouterType> = [
	{
		path: '/',
		component: '../layouts/TopLeftLayout',
		routes: [
			{
				path: '/',
				component: './Index',
				code: 'test_page_index',
				noAuthRedirect: '/noauth',
			},
			{ path: '/noauth', component: './403' },
			{ component: './404' },
		],
	},
];
