// jest.setup.js
// Este arquivo é JavaScript puro, sem tipagens TypeScript.

import '@testing-library/jest-dom';
import React from 'react'; // React é importado para que o JSX dentro dos mocks funcione

// Mock do useRouter do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

// Mock para next/image (componente Image)
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return React.createElement('img', props); // Usando React.createElement para compatibilidade JS
  },
}));

// Mock para useTranslations e useLocale do next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace) => (key) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'),
}));

// Mock para framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }) => React.createElement('div', null, children),
    h1: ({ children }) => React.createElement('h1', null, children),
    p: ({ children }) => React.createElement('p', null, children),
    // Adicione outros elementos conforme usados no seu componente
  },
}));

// Mock para next/font/google
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter',
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  }),
}));

// Mocks para @mui/material
jest.mock('@mui/material/Button', () => ({
  __esModule: true,
  default: ({ children, ...props }) => {
    if (props.href) {
      return React.createElement('a', props, children);
    }
    return React.createElement('button', props, children);
  },
}));

jest.mock('@mui/material/Typography', () => ({
  __esModule: true,
  default: ({ children, component, ...props }) => {
    const Component = component || 'span';
    return React.createElement(Component, props, children);
  },
}));

// MOCK PARA CardHeader (Causa original do erro 'root')
jest.mock('@mui/material/CardHeader', () => ({
  __esModule: true,
  default: (props) => React.createElement('div', { 'data-testid': 'CardHeader', ...props }, props.children),
}));

// Mocks para os ícones do MUI
jest.mock('@mui/icons-material/Facebook', () => ({
  __esModule: true,
  default: (props) => React.createElement('svg', { 'data-testid': 'FacebookIcon', ...props }),
}));
jest.mock('@mui/icons-material/X', () => ({
  __esModule: true,
  default: (props) => React.createElement('svg', { 'data-testid': 'XIcon', ...props }),
}));
jest.mock('@mui/icons-material/Instagram', () => ({
  __esModule: true,
  default: (props) => React.createElement('svg', { 'data-testid': 'InstagramIcon', ...props }),
}));