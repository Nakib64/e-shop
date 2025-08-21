"use client";

import { Box, Grid, Typography, IconButton, Divider, Container, Link as MuiLink } from "@mui/material";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname()
  const links = [
    { title: "Company", items: ["About Us", "Careers", "Blog", "Contact"] },
    { title: "Support", items: ["FAQ", "Shipping", "Returns", "Warranty"] },
    { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookies"] },
  ];

  const socialIcons = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaLinkedinIn />, href: "#" },
  ];

  if(pathname.includes('dashboard')){
    return <></>
  }
  return (
    <Box component="footer" sx={{ backgroundColor: "#1e1e2f", color: "#ccc", py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo & Description */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
              PC-Store
            </Typography>
            <Typography variant="body2" color="gray.400">
              Your one-stop shop for premium PC accessories. Quality gear for gaming & productivity.
            </Typography>
            <Box mt={2} display="flex" gap={1}>
              {socialIcons.map((social, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.2 }}>
                  <IconButton
                    component="a"
                    href={social.href}
                    sx={{ color: "blue", "&:hover": { color: "white" } }}
                  >
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Navigation Links */}
          {links.map((linkGroup, idx) => (
            <Grid item xs={12} md={3} key={idx}>
              <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                {linkGroup.title}
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {linkGroup.items.map((item, i) => (
                  <MuiLink
                    component={Link}
                    key={i}
                    href="#"
                    underline="none"
                    sx={{ color: "#ccc", "&:hover": { color: "white" } }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 6, borderColor: "gray.700" }} />

        <Typography variant="body2" color="gray.500" textAlign="center">
          &copy; {new Date().getFullYear()} PC-Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
