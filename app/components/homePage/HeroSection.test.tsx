import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HeroSection from './HeroSection'; // Caminho corrigido e usando alias

import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mocks
jest.mock('@/public/academia.png', () => ({
  __esModule: true,
  default: '/academia.png',
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  //                                            ^ Adicionado tipo para 'namespace'
  //                                                         ^ Adicionado tipo para 'key'
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    //                  ^ Adicionado tipo para 'children'
    h1: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
    //                  ^ Adicionado tipo para 'children'
    p: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
    //                  ^ Adicionado tipo para 'children'
    // Adicione outros elementos conforme usados no seu componente (ex: span, img)
  },
}));

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter',
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  }),
}));

jest.mock('@mui/icons-material/Facebook', () => ({
  __esModule: true,
  default: () => <svg data-testid="FacebookIcon" />,
}));
jest.mock('@mui/icons-material/X', () => ({
  __esModule: true,
  default: () => <svg data-testid="XIcon" />,
}));
jest.mock('@mui/icons-material/Instagram', () => ({
  __esModule: true,
  default: () => <svg data-testid="InstagramIcon" />,
}));

// Criação do tema MUI
const theme = createTheme();

describe('HeroSection', () => {
  // Função auxiliar para renderizar o componente com o ThemeProvider
  const renderWithTheme = (component: React.ReactElement) => { // Já havíamos adicionado tipo para 'component'
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  test('renders the title and description correctly with translations', () => {
    renderWithTheme(<HeroSection />);

    expect(screen.getByText('HeroSection.title')).toBeInTheDocument();
    expect(screen.getByText('HeroSection.description')).toBeInTheDocument();
  });

  test('renders the "Get Started" button with correct text and link', () => {
    renderWithTheme(<HeroSection />);

    const getStartedButton = screen.getByRole('link', { name: 'HeroSection.getStarted' });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', 'en/gyms');
  });

  test('renders the social media icons with correct links', () => {
    renderWithTheme(<HeroSection />);

    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();

    const xLink = screen.getByRole('link', { name: /x/i });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute('href', 'https://x.com/home');
    expect(screen.getByTestId('XIcon')).toBeInTheDocument();

    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/');
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
  });

  test('renders the background image', () => {
    renderWithTheme(<HeroSection />);
    const backgroundImage = screen.getByAltText('Athlete working out in a gym');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute('src', '/academia.png');
  });

  test('renders the figma component text', () => {
    renderWithTheme(<HeroSection />);
    expect(screen.getByText('HeroSection.figmaComponent')).toBeInTheDocument();
  });
});