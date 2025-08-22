"use client";

import { Container, Paper, Typography, IconButton, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, useSession, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/products" }); // Redirect after login
  };

  return (
    <Container maxWidth="xs" className="flex justify-center items-center h-screen">
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
        }}
        className="w-full flex flex-col gap-6"
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {session ? "Welcome 🎉" : "Sign In"}
        </Typography>

        {session ? (
          <Box className="flex flex-col gap-4">
            <Typography>Logged in as {session.user.email}</Typography>
            <IconButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 3,
                py: 1.5,
                px: 3,
                "&:hover": { backgroundColor: "#fce4e4" },
              }}
            >
              Logout
            </IconButton>
          </Box>
        ) : (
          <IconButton
            onClick={handleGoogleLogin}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              py: 1.5,
              px: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              transition: "0.3s",
              "&:hover": { backgroundColor: "#f9f9f9", transform: "scale(1.05)" },
            }}
          >
            <GoogleIcon sx={{ color: "#DB4437", fontSize: 28 }} />
            <Typography fontWeight="bold">Continue with Google</Typography>
          </IconButton>
        )}
      </Paper>
    </Container>
  );
}
