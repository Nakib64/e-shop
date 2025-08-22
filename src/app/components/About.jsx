// app/about/page.js (Next.js 13+ with App Router)
"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, Headphones, Rocket, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
	return (
		<main className="min-h-screen  dark:bg-gray-900 text-gray-800 dark:text-gray-200">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
				<div className="max-w-6xl mx-auto px-6 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-4xl md:text-6xl font-extrabold mb-6"
					>
						About <span className="text-yellow-300">PC Shop</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						className="text-lg md:text-xl max-w-3xl mx-auto"
					>
						We are passionate about delivering high-performance PCs, gaming rigs, and
						accessories to empower gamers, creators, and businesses.
					</motion.p>
				</div>
			</section>

			{/* Story Section */}
			<section className="max-w-6xl mx-auto px-6 py-20">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<motion.img
						src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
						alt="PC store workspace"
						className="rounded-2xl shadow-lg"
						initial={{ opacity: 0, x: -80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
					/>
					<motion.div
						initial={{ opacity: 0, x: 80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
					>
						<h2 className="text-3xl font-bold mb-4">Our Story</h2>
						<p className="mb-4 text-lg leading-relaxed">
							Founded in 2020,  PC Shop started as a small custom PC builder and
							quickly grew into a trusted hub for cutting-edge hardware, professional
							workstations, and gaming essentials.
						</p>
						<p className="text-lg leading-relaxed">
							Today, we help thousands of customers build their dream PCs with quality
							components, expert support, and unbeatable prices.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Values Section */}
			<section className="bg-gray-100 dark:bg-gray-800 py-20">
				<div className="max-w-6xl mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
					<div className="grid md:grid-cols-4 gap-8">
						{[
							{
								icon: <Cpu size={36} />,
								title: "High-Performance",
								desc: "Only the best components for speed & reliability.",
							},
							{
								icon: <Rocket size={36} />,
								title: "Innovation",
								desc: "Stay ahead with the latest gaming and workstation tech.",
							},
							{
								icon: <Users size={36} />,
								title: "Customer First",
								desc: "We guide you from building to after-sales support.",
							},
							{
								icon: <Headphones size={36} />,
								title: "24/7 Support",
								desc: "Our team is always here to solve your tech issues.",
							},
						].map((item, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: i * 0.2 }}
								className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition"
							>
								<div className="flex justify-center mb-4 text-blue-600">
									{item.icon}
								</div>
								<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
								<p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 text-center">
				<motion.h2
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					className="text-3xl md:text-4xl font-bold mb-6"
				>
					Ready to Build Your Dream PC?
				</motion.h2>
				<Link href={"/products"}>
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
					>
						Explore Our Store
					</motion.div>
				</Link>
			</section>
		</main>
	);
}
