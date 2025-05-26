// jest.setup.js
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => React.createElement('img', props),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace) => (key) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }) => React.createElement('div', null, children),
    h1: ({ children }) => React.createElement('h1', null, children),
    p: ({ children }) => React.createElement('p', null, children),
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

jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material');

  return {
    ...originalModule,
    Button: ({ children, ...props }) => {
      if (props.href) {
        return React.createElement('a', props, children);
      }
      return React.createElement('button', props, children);
    },
    Typography: ({ children, component, ...props }) => {
      const Component = component || 'span';
      return React.createElement(Component, props, children);
    },
    CardHeader: (props) => React.createElement('div', { 'data-testid': 'CardHeader', ...props }, props.children),
    ListItemText: (props) => React.createElement('div', { 'data-testid': 'ListItemText', ...props }, [
      props.primary && React.createElement('span', { key: 'primary' }, props.primary),
      props.secondary && React.createElement('span', { key: 'secondary' }, props.secondary),
      props.children,
    ]),
  };
});