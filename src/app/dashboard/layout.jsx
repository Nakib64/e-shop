"use client";

import { useEffect, useState } from "react";
import {
	Box,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	IconButton,
	Typography,
	LinearProgress,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const links = [
	{ name: "Home", path: "/" },
	{ name: "Overview", path: "/dashboard" },
	{ name: "Products", path: "/dashboard/my_products" },
	{ name: "Add Product", path: "/dashboard/add_product" },
	
];

export default function DashboardLayout({ children }) {
	const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter()
	const { data: session , status} = useSession();
	console.log(session);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === "unauthenticated") router.push("/login");
		if (status === "authenticated") setLoading(false);
	}, [status]);

	const toggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};
  if (loading) return <div className="w-full"> <LinearProgress /></div>
	const sidebar = (
		<Box className="bg-gray-900 text-white h-full flex flex-col">
			<Typography variant="h5" fontWeight="bold" className="p-6 text-center">
				Admin Panel
			</Typography>
			<List className="flex-1">
				{links.map((link) => (
					<Link key={link.name} href={link.path}>
						<ListItemButton className="hover:bg-gray-800">
							<ListItemText primary={link.name} />
						</ListItemButton>
					</Link>
				))}
			</List>
		</Box>
	);

	return (
		<div className="flex h-screen">
			{/* Sidebar for desktop */}
			<Box
				sx={{
					width: { md: 240 },
					flexShrink: 0,
					display: { xs: "none", md: "block" },
				}}
			>
				{sidebar}
			</Box>

			{/* Drawer for mobile */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={toggleDrawer}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
				}}
			>
				{sidebar}
			</Drawer>

			{/* Main content */}
			<Box className="flex-1 flex flex-col ">
				{/* Mobile top bar */}
				<Box className="flex items-center justify-between p-4  shadow md:hidden">
					<IconButton onClick={toggleDrawer}>
						<Menu className="dark:text-white"/>
					</IconButton>
					<Typography variant="h6">Dashboard</Typography>
				</Box>

				{/* Page content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex-1 px-4 overflow-auto"
				>
					{children}
				</motion.div>
			</Box>
		</div>
	);
}
