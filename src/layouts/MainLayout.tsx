import {
	AppShell,
	Box
} from '@mantine/core';

import { Outlet } from 'react-router-dom'
import Footer from '../components/shared/Footer';
import XHeader from '../components/layouts/Header';
import { XSidebar } from '../components/layouts/Sidebar';


export function MainLayout() {



	return (
		<>

			<AppShell
				padding="md"
				navbar={<XSidebar />}
				header={<XHeader />}
				styles={(theme) => ({

					main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'auto', height: '80vh' },
				})}
				footer={
					<Footer />}
			>
				<Box mih={'auto'}>
					<Outlet />
				</Box>
			</AppShell>

		</>

	);
}