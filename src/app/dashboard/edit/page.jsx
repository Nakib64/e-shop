"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";


const categories = ["monitor", "speaker", "mouse", "keyboard"];
const brands = ["Hp", "Acer", "Lenovo"];

export default function EditProduct() {
    const router = useRouter()
  const { data: session } = useSession();
  const params = useSearchParams();
  const id = params.get("id");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch product and set values
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`/api/products?id=${id}`)
      .then((res) => {
        const data = res.data;

        // Prefill form fields
        setValue("name", data.name);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("price", data.price);
        setValue("description", data.description);

        // Show existing image
        if (data.image) setImagePreview(data.image);

        setLoading(false);
      })
      .catch(() => {
        toast.error("❌ Failed to load product");
        setLoading(false);
      });
  }, [id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageUrl = imagePreview; // Keep old image if no new one selected

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
        if (!imgbbKey) throw new Error("Missing imgbb key");

        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );
        imageUrl = imgbbRes.data.data.url;
      }

      // Update product
      await axios.put(`/api/products?id=${id}`, {
        ...data,
        image: imageUrl,
      });

      toast.success("✅ Product updated successfully!");
      router.back()
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    }

    setLoading(false);
  };

  if (loading && !imagePreview)
    return (
      <Box className="flex justify-center mt-10">
        <CircularProgress />
      </Box>
    );

  return (
    <Paper
      sx={{ maxWidth: 600, margin: "2rem auto", p: 4, borderRadius: 3 }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Edit Product
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Image Upload */}
        <Box className="flex flex-col items-center">
          <input
            accept="image/*"
            type="file"
            id="product-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="product-image">
            <IconButton
              component={motion.div}
              whileHover={{ scale: 1.2 }}
              sx={{
                border: "2px dashed #aaa",
                width: 120,
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                <UploadFileIcon sx={{ fontSize: 40, color: "#777" }} />
              )}
            </IconButton>
          </label>
        </Box>

        {/* Name */}
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          {...register("name", { required: "Product name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Category */}
        <TextField
          select
          label="Category"
          variant="outlined"
          fullWidth
          {...register("category", { required: "Category is required" })}
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        {/* Brand */}
        <TextField
          select
          label="Brand"
          variant="outlined"
          fullWidth
          {...register("brand", { required: "Brand is required" })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
        >
          {brands.map((b) => (
            <MenuItem key={b} value={b}>
              {b}
            </MenuItem>
          ))}
        </TextField>

        {/* Price */}
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        {/* Description */}
        <TextField
          label="Description"
          type="text"
          variant="outlined"
          fullWidth
          {...register("description", { required: "Description is required" })}
        />

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "9999px", mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Update Product"}
          </Button>
        </motion.div>
      </form>
    </Paper>
  );
}
