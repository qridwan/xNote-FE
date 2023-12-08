import {
	AppShell,
	Box
} from '@mantine/core';

import { Outlet } from 'react-router-dom'
import Footer from '../components/shared/Footer';
import XHeader from '../components/layouts/Header';
import { XSidebar } from '../components/layouts/Sidebar';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';


export function MainLayout() {

	const isMobile = useMediaQuery('(min-width: 500px)');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, { toggle }] = useDisclosure(false);


	return (
		<>
			<AppShell
				padding="md"
				navbar={isMobile ? <XSidebar toggle={toggle} /> : <></>}
				header={<XHeader />}
				styles={(theme) => ({

					main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'auto', },
				})}
				footer={
					<Footer />}
			>
				<Box mih={'82vh'}>
					<Outlet />
				</Box>
			</AppShell>

		</>

	);
}