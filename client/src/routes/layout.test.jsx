import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Layout', () => {
  it('renders "Sign in" link', () => {
    render(
      <App />
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
