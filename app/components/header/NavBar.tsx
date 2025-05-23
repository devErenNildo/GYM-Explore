// components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import gymExploreLogo from '@/public/logo.png';

const Navbar = () => {
    const t = useTranslations('Navbar');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        const footer = document.querySelector('footer');
        let observer: IntersectionObserver | null = null;

        if (footer) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        setIsVisible(!entry.isIntersecting);
                    });
                },
                {
                    // Mantemos o rootMargin para definir o ponto de desaparecimento.
                    // Ajuste '-50px' se quiser que o fade out comece mais cedo ou mais tarde.
                    // Um valor mais negativo fará com que o fade out comece *antes* do footer estar muito visível.
                    rootMargin: '0px 0px -50px 0px',
                }
            );
            observer.observe(footer);
        } else {
            console.warn("Footer element not found for Navbar IntersectionObserver.");
            setIsVisible(true);
        }

        return () => {
            if (observer && footer) {
                observer.unobserve(footer);
            }
        };
    }, []);

    // Adicionamos 'opacity' à transição e a classe 'opacity-0' ou 'opacity-100'
    const navbarClasses = `
    fixed top-0 left-0 right-0
    !bg-transparent !shadow-none z-[100] py-1
    transition-all duration-500 ease-in-out
    ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
  `;

    const navLinks = [
        { label: t("home"), href: "/" },
        { label: t("about"), href: "/about" },
        { label: t("services"), href: "/services" },
        { label: t("contact"), href: "/contact" },
    ];

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            className="text-white bg-primary h-full"
            sx={{ width: 250 }}
        >
            <Box className="flex justify-end p-4">
                <IconButton onClick={handleDrawerToggle} className="!text-white">
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {navLinks.map((link) => (
                    <ListItem key={link.label} disablePadding>
                        <ListItemButton component="a" href={link.href} className="!text-white hover:!bg-accent hover:!text-primary">
                            <ListItemText primary={link.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding className="mt-4 px-4">
                    <Button
                        variant="contained"
                        color="primary"
                        className="!bg-accent !text-primary w-full py-2 rounded-md !font-semibold hover:!bg-opacity-90 transition-all duration-300"
                        onClick={() => console.log('Join Now from Mobile Menu')}
                    >
                        {t("joinNow")}
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            elevation={0}
            className={navbarClasses} // Aplica as classes dinâmicas
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
                        width={100}
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
                    className="hidden md:block"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className="!bg-accent !text-primary px-6 py-2 rounded-md !font-semibold hover:!bg-opacity-90 transition-all duration-300"
                    >
                        {t("joinNow")}
                    </Button>
                </motion.div>

                <Box className="md:hidden">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className="!text-white"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;