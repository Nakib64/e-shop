"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { useSession } from "next-auth/react";
import ProductCard from "@/app/components/Card";
import LinearProgress from '@mui/material/LinearProgress';

export default function MyProducts() {
    const {data: session} = useSession()

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  if(!session.user){
    return <div className="w-full">
      <LinearProgress />
    </div>
  }

  useEffect(() => {
    setLoading(true);
    console.log(session);
    axios
      .get("/api/products", { params: { email: session?.user?.email } })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <Box display="flex" width={'full'} justifyContent="center" alignItems="center" minHeight="60vh">
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        My Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
