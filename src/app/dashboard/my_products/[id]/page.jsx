"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Chip,
    Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { usePathname } from "next/navigation";

export default function ProductDetailsPage({ params }) {
    const { id } = params; // safely get the product id from route
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        axios
            .get(`/api/products?id=${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!product) return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                p: 4,
            }}
        >
            {/* Left: Image */}
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    height: { xs: 280, sm: 350, md: 420 }, // 🔹 fixed responsive height
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "16px",
                    overflow: "hidden",
                }}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain", // 🔹 keep full image visible
                    }}
                />
            </Box>

            {/* Right: Details */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {product.name}
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Chip label={product.category} color="primary" sx={{ fontWeight: 600 }} />
                    <Chip label={product.brand} color="secondary" sx={{ fontWeight: 600 }} />
                </Stack>

                <Typography
                    variant="h4"
                    color="success.main"
                    sx={{ fontWeight: 700, mt: 2 }}
                >
                    ৳{product.price}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                    {product.description || "No description available."}
                </Typography>

                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                   
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
