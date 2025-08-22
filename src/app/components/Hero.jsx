"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@mui/material";
import Link from "next/link";

export default function HeroSwiper() {
	const banners = [
		{
			id: 1,
			bg: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
			title: "High-Performance PC Accessories",
			subtitle: "Upgrade your setup to the next level!",
		},
		{
			id: 2,
			bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
			title: "Gaming Gear for Pros",
			subtitle: "Feel the difference in every game!",
		},
	];

	return (
		<div className="relative w-full">
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				// navigation
			>
				{banners.map((banner) => (
					<SwiperSlide key={banner.id}>
						<div
							className={`relative w-full rounded-2xl h-[40vh] md:h-[60vh]  ${banner.bg}`}
						>
							{/* Overlay content */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1 }}
								className="absolute inset-0 grid grid-cols-1 rounded-full justify-center items-center text-center px-4 md:px-8"
							>
								<h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-4">
									{banner.title}
								</h1>
								<p className="text-lg md:text-2xl text-white drop-shadow-xl mb-6">
									{banner.subtitle}
								</p>
								<div className="w-full flex justify-center">
									<Link href={"/products"}>
										<Button variant="contained" className="w-fit">
											Shop now
										</Button>
									</Link>
								</div>
							</motion.div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
