export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Unquotable Quote',
	description: 'A game of unquotable quotes',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Help',
			href: '/help',
		},
	],
	navMenuItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Help',
			href: '/help',
		},
	],
	links: {
		github: 'https://github.com/godkingjay',
		twitter: 'https://twitter.com/godking_jay',
	},
};
