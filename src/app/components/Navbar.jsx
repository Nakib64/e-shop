"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSession } from "next-auth/react";
import LogoutButton from "./Logout";

const navLinks = [
	{ name: "Home", path: "/" },
	{ name: "Products", path: "/products" },
	{ name: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [theme, setTheme] = useState("light");
	const pathname = usePathname();
	const { data: session, status } = useSession();

	// Show nothing while loading session


	// Load saved theme
	useEffect(() => {
		const saved = localStorage.getItem("theme");
		if (saved) {
			setTheme(saved);
			document.documentElement.setAttribute("data-theme", saved);
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			const defaultTheme = prefersDark ? "dark" : "light";
			setTheme(defaultTheme);
			document.documentElement.setAttribute("data-theme", defaultTheme);
		}
	}, []);


	// Hide navbar on dashboard page if needed
	if (pathname.includes("dashboard")) return null;
	if (status === "loading") return null;
	return (
		<>
			{/* Navbar */}
			<AppBar
				position="sticky"
				className="bg-white sticky top-0 dark:bg-gray-900 shadow-md px-4 lg:px-12 transition-colors duration-300"
				sx={{ background: "transparent", boxShadow: "none" }}
			>
				<Toolbar className="flex justify-between items-center">
					{/* Logo */}
					<motion.div
						whileHover={{ scale: 1.1 }}
						transition={{ type: "spring", stiffness: 300 }}
						className="text-2xl font-bold tracking-wide text-blue-600 dark:text-blue-400"
					>
						<Link href="/">PC-Store</Link>
					</motion.div>

					{/* Desktop Links */}
					<div className="hidden md:flex gap-6">
						{navLinks.map((link, index) => (
							<motion.div
								key={index}
								whileHover={{ y: -3, scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<Link
									href={link.path}
									className={`font-medium transition-all ${
										pathname === link.path
											? "text-blue-600 dark:text-blue-400"
											: "text-gray-700 dark:text-gray-300"
									} hover:text-blue-600 dark:hover:text-blue-400`}
								>
									{link.name}
								</Link>
							</motion.div>
						))}
					</div>

					{/* Desktop Right Section */}
					<div className="hidden md:flex items-center gap-3">


						{/* Auth Buttons */}
						{session ? (
							<LogoutButton />
						) : (
							<Link href="/login" passHref>
								<Button
									variant="contained"
									color="primary"
									sx={{ borderRadius: "9999px", textTransform: "none" }}
								>
									Sign In
								</Button>
							</Link>
						)}
					</div>

					{/* Mobile Section */}
					<div className="md:hidden flex items-center gap-2">
						
						<IconButton onClick={() => setOpen(true)}>
							<MenuIcon className="dark:text-white"/>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer */}
			<Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
				<div className="w-64 flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300">
					<div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
						<span className="text-xl font-bold text-blue-600 dark:text-blue-400">
							PC-Store
						</span>
						<IconButton onClick={() => setOpen(false)}>
							<CloseIcon className="text-gray-700 dark:text-gray-300" />
						</IconButton>
					</div>

					<List className="flex-1">
						{navLinks.map((link, index) => (
							<motion.div
								key={index}
								initial={{ x: 50, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: index * 0.1 }}
							>
								<ListItem button onClick={() => setOpen(false)}>
									<Link
										href={link.path}
										className={`w-full block py-2 px-2 rounded-md ${
											pathname === link.path
												? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
												: "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
										}`}
									>
										<ListItemText primary={link.name} />
									</Link>
								</ListItem>
							</motion.div>
						))}
					</List>

					<div className="p-4">
						{session ? (
							<LogoutButton />
						) : (
							<Link href="/login" passHref>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									sx={{ borderRadius: "9999px", textTransform: "none" }}
								>
									Sign In
								</Button>
							</Link>
						)}
					</div>
				</div>
			</Drawer>
		</>
	);
}
