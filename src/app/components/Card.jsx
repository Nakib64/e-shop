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
import Link from "next/link";

export default function ProductCard({ product }) {
	const { name, category, brand, price, image } = product;

	return (
		<Card
			sx={{
				maxWidth: 320,
				borderRadius: 4,
				boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
				backgroundColor: "transparent", // transparent background
				backdropFilter: "blur(6px)",
				transition: "all 0.3s ease-in-out",
				"&:hover": {
					transform: "translateY(-6px)",
					boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
				},
			}}
		>
			{/* Product Image */}
			<CardMedia
				component="img"
				height="220"
				image={image}
				alt={name}
				sx={{
					objectFit: "cover",
					borderTopLeftRadius: "16px",
					borderTopRightRadius: "16px",
				}}
			/>

			{/* Card Content */}
			<CardContent>
				<Typography
					variant="h6"
					component="div"
					gutterBottom
					sx={{ fontWeight: 600 }}
				>
					{name}
				</Typography>

				<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
					<Chip label={category} size="small" color="primary" variant="outlined" />
					<Chip label={brand} size="small" color="secondary" variant="outlined" />
				</Box>

				<Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
					${price}
				</Typography>
			</CardContent>

			{/* Actions */}
			<CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
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
				<Link href={`/products/${product._id}`}>
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
