"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased `}>
				<SessionProvider>
					<nav>
						<Navbar></Navbar>
					</nav>
					<main className="px-2">{children}</main>
					<footer>
						<Footer></Footer>
					</footer>
				</SessionProvider>
			</body>
		</html>
	);
}
