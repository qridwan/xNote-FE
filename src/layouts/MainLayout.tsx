import { AppShell, Box, ScrollArea } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/shared/Footer";
import XHeader from "../components/layouts/Header";
import { XSidebar } from "../components/layouts/Sidebar";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

export function MainLayout() {
	const isMobile = useMediaQuery("(min-width: 500px)");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, { toggle }] = useDisclosure(false);
	const navigate = useNavigate();

	useEffect(() => {
		const authItem: string | null = localStorage.getItem("auth");

		// Check if authItem is not null and parse it
		if (authItem !== null) {
			const tokenPresent: {
				accessToken: string;
				user: {
					id: number;
					create_time: string;
					email: string;
					username: string;
				};
			} = JSON.parse(authItem);

			if (!tokenPresent.accessToken) {
				navigate("/auth/login");
			}
		} else {
			navigate("/auth/login");
		}
	}, [navigate]);

	return (
		<AppShell
			padding="md"
			navbar={isMobile ? <XSidebar toggle={toggle} /> : <></>}
			header={<XHeader />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
					minHeight: "auto",
				},
			})}
			footer={<Footer />}
		>
			<Box h={"85vh"} style={{ paddingBottom: "2vh" }} component={ScrollArea}>
				<Outlet />
			</Box>
		</AppShell>
	);
}
