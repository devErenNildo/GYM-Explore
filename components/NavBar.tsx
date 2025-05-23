// components/Navbar.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import gymExploreLogo from "@/public/logo.png";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("services"), href: "/services" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="!bg-transparent !shadow-none z-50 py-2"
    >
      <Toolbar className="flex justify-between items-center px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={gymExploreLogo}
            alt="Gym Explore Logo"
            width={160}
            height={55}
            priority
          />
        </motion.div>

        <Box className="hidden md:flex space-x-6 lg:space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Button
                color="inherit"
                href={link.href}
                className="!text-white hover:!text-accent !font-semibold hover:scale-105 transition-transform duration-300"
              >
                {link.label}
              </Button>
            </motion.div>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            className="!bg-accent !text-primary px-6 py-2 rounded-md !font-semibold hover:!bg-opacity-90 transition-all duration-300"
          >
            {t("joinNow")}
          </Button>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
