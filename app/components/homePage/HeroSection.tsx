// components/HeroSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Typography, Box } from '@mui/material'; // Adicione Box
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTranslations } from 'next-intl';

import heroBgImage from '@/public/academia.png';

const HeroSection = () => {
    const t = useTranslations('HeroSection');
    return (
        <section className="relative h-screen flex items-center justify-start text-white overflow-hidden"> {/* Adicionado overflow-hidden */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBgImage}
                    alt="Athlete working out in a gym"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-80"></div>
            </div>

            <div className="relative z-10 max-w-4xl px-8 md:px-16 lg:px-24 pt-16 md:pt-0"> {/* Ajustado padding top para mobile */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight" // Reduzido tamanho da fonte para mobile
                >
                    {t("title")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base md:text-xl mb-8 max-w-lg" // Reduzido tamanho da fonte para mobile
                >
                    {t("description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className="!bg-accent !text-primary px-6 py-2 rounded-lg !font-semibold
                      hover:!bg-opacity-90 transition-all duration-300" // Ajustado padding do botão para mobile
                        size="medium" // Botão MUI médio para mobile
                    >
                        {t("getStarted")}
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 flex space-x-4 md:space-x-6" // Ajustado espaçamento para mobile
                >
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-300">
                        <FacebookIcon fontSize="medium" /> {/* Reduzido tamanho do ícone para mobile */}
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-300">
                        <TwitterIcon fontSize="medium" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-300">
                        <InstagramIcon fontSize="medium" />
                    </a>
                </motion.div>
            </div>

            {/* Elemento Triangular: Escondido em mobile, visível em md e acima */}
            <motion.div
                initial={{ opacity: 0, x: 200, rotate: 15 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
                className="hidden md:flex absolute right-0 top-0 h-full w-1/3 bg-secondary
                   transform skew-x-[-15deg] origin-top-left
                   items-center justify-center p-4 overflow-hidden" // Adicionado hidden md:flex
            >
                <Typography
                    variant="h6"
                    component="span"
                    className="text-white text-2xl md:text-3xl font-bold whitespace-nowrap"
                    style={{ transform: 'rotate(90deg)' }}
                >
                    {t("figmaComponent")}
                </Typography>
            </motion.div>
        </section>
    );
};

export default HeroSection;