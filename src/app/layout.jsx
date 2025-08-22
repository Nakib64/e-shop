"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased flex flex-col min-h-screen`}>
				<SessionProvider>
					<nav>
						<Navbar></Navbar>
					</nav>
					<main className="px-2 flex-1">
						{children}
						<ToastContainer position="top-right" autoClose={3000} />
					</main>
					<footer>
						<Footer></Footer>
					</footer>
				</SessionProvider>
			</body>
		</html>
	);
}
