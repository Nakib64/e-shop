"use client";
import * as React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActions,
	Button,
	Box,
	Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductCard({ product }) {
	const { _id, name, category, brand, price, image } = product;
	const pathname = usePathname();
	return (
		<Card
			sx={{
				width: 300,
				height: 420, // 🔹 fixed card height for uniformity
				borderRadius: 4,
				boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
				backgroundColor: "transparent",
				backdropFilter: "blur(6px)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				transition: "all 0.3s ease-in-out",
				"&:hover": {
					transform: "translateY(-6px)",
					boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
				},
			}}
		>
			{/* Product Image Box */}
			<Box
				sx={{
					width: "100%",
					height: 180, // 🔹 fixed image box height
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#f9f9f9",
					borderTopLeftRadius: "16px",
					borderTopRightRadius: "16px",
					overflow: "hidden",
				}}
			>
				<CardMedia
					component="img"
					image={image}
					alt={name}
					sx={{
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "contain", // 🔹 prevents cropping
					}}
				/>
			</Box>

			{/* Card Content */}
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography
					variant="h6"
					component="div"
					gutterBottom
					sx={{
						fontWeight: 600,
						whiteSpace: "nowrap", // 🔹 single line
						overflow: "hidden", // 🔹 hide overflow
						textOverflow: "ellipsis", // 🔹 show ...
					}}
				>
					{name}
				</Typography>

				<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
					<Chip label={category} size="small" color="primary" variant="outlined" />
					<Chip label={brand} size="small" color="secondary" variant="outlined" />
				</Box>

				<Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
					৳{price}
				</Typography>
			</CardContent>

			{/* Actions */}

			<CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
				{pathname.includes("dashboard") ? (
					<Link href={`/dashboard/edit?id=${_id}`}>
						<Button
							variant="contained"
							startIcon={<ModeEditTwoToneIcon />}
							sx={{
								borderRadius: 3,
								textTransform: "none",
								px: 2,
								fontWeight: 600,
							}}
						>
							Edit
						</Button>
					</Link>
				) : (
					<Button
						variant="contained"
						startIcon={<ShoppingCartIcon />}
						sx={{
							borderRadius: 3,
							textTransform: "none",
							px: 2,
							fontWeight: 600,
						}}
					>
						Add to Cart
					</Button>
				)}

				<Link href={`/dashboard/my_products/${_id}`} passHref>
					<Button
						variant="outlined"
						sx={{
							borderRadius: 3,
							textTransform: "none",
							fontWeight: 500,
						}}
					>
						Details
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
}
