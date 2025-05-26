import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import React from 'react';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string, options?: Record<string, string | number>) => {
    const mockedTranslations: { [key: string]: string } = {
      'home': 'Home',
      'about': 'About',
      'services': 'Services',
      'contact': 'Contact',
      'privacyPolicy': 'Privacy Policy',
      'termsOfService': 'Terms of Service',
      'aboutUsText': 'About Us Description',
      'quickLinksTitle': 'Quick Links',
      'contactUsTitle': 'Contact Us',
      'address': '123 Main St, Anytown',
      'phone': '+123456789',
      'email': 'info@gymexplore.com',
      'allRightsReserved': `All rights reserved, {year}.`,
    };

    let translatedText = mockedTranslations[key] || key;

    if (options) {
      Object.entries(options).forEach(([optKey, optValue]) => {
        translatedText = translatedText.replace(new RegExp(`\\{${optKey}\\}`, 'g'), String(optValue));
      });
    }
    return translatedText;
  }),
}));

jest.mock('@/public/logo.png', () => ({
  __esModule: true,
  default: '/logo.png',
}));

jest.mock('@mui/icons-material/Facebook', () => () => <svg data-testid="facebook-icon" />);
jest.mock('@mui/icons-material/Twitter', () => () => <svg data-testid="twitter-icon" />);

jest.mock('next/link', () => {
  return ({ children, href, passHref, ...restProps }: { children: React.ReactNode; href: string; passHref?: boolean; [key: string]: any }) => {
    return (
      <a href={href} {...restProps}>
        {children}
      </a>
    );
  };
});

jest.mock('@mui/material/ListItem', () => {
  return ({ children, disablePadding, ...restProps }: { children: React.ReactNode; disablePadding?: boolean; [key: string]: any }) => {
    return (
      <li {...restProps} className="MuiListItem-root MuiListItem-gutters mb-0 css-19f6boz-MuiListItem-root">
        {children}
      </li>
    );
  };
});

jest.mock('@mui/material/ListItemText', () => {
  return ({ primary, ...restProps }: { primary: React.ReactNode; [key: string]: any }) => {
    return (
      <div {...restProps}>
        <span data-testid="list-item-text-primary">{primary}</span>
      </div>
    );
  };
});

describe('Footer', () => {
  test('confirma a presença de todos os elementos e textos principais', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
    expect(screen.getByTestId('footer-about-us-text')).toHaveTextContent('About Us Description');
    expect(screen.getByTestId('footer-facebook-link')).toBeInTheDocument();
    expect(screen.getByTestId('footer-twitter-link')).toBeInTheDocument();

    expect(screen.getByTestId('footer-quick-links-title')).toHaveTextContent('Quick Links');
    expect(screen.getByTestId('footer-quick-link-home')).toBeInTheDocument();
    expect(screen.getByTestId('footer-quick-link-about')).toBeInTheDocument();
    expect(screen.getByTestId('footer-quick-link-services')).toBeInTheDocument();
    expect(screen.getByTestId('footer-quick-link-contact')).toBeInTheDocument();

    expect(screen.getByTestId('footer-contact-us-title')).toHaveTextContent('Contact Us');
    expect(screen.getByTestId('footer-address-text')).toHaveTextContent('123 Main St, Anytown');
    expect(screen.getByTestId('footer-phone-text')).toHaveTextContent('+123456789');
    expect(screen.getByTestId('footer-email-text')).toHaveTextContent('info@gymexplore.com');

    expect(screen.getByTestId('footer-legal-links-title')).toHaveTextContent('Quick Links');
    expect(screen.getByTestId('footer-legal-link-privacy-policy')).toBeInTheDocument();
    expect(screen.getByTestId('footer-legal-link-terms-of-service')).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    expect(screen.getByTestId('footer-copyright-text')).toHaveTextContent(`All rights reserved, ${currentYear}.`);
  });
});