'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTranslations } from 'next-intl';

import heroBgImage from '@/public/academia.png';

const HeroSection = () => {
  const t = useTranslations('HeroSection');
  return (
    <section className="relative h-screen flex items-center justify-start text-white">
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

      <div className="relative z-10 max-w-4xl px-8 md:px-16 lg:px-24 mt-24">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-lg"
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
            className="!bg-accent !text-primary px-8 py-3 rounded-lg !font-semibold
                      hover:!bg-opacity-90 transition-all duration-300"
            size="large"
          >
            {t("getStarted")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex space-x-6"
        >
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-300">
            <FacebookIcon fontSize="large" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-300">
            <TwitterIcon fontSize="large" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-300">
            <InstagramIcon fontSize="large" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 200, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        className="absolute right-0 top-0 h-full w-1/3 bg-secondary
                   transform skew-x-[-15deg] origin-top-left
                   flex items-center justify-center p-4 overflow-hidden mt-12"
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
