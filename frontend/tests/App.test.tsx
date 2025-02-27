import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('renders GuruJava title', () => {
  render(<App />);
  const titleElement = screen.getByText(/GuruJava/i);
  expect(titleElement).toBeInTheDocument();
});
