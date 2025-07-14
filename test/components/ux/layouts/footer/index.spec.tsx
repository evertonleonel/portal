import { render, screen } from '@testing-library/react';

import { Footer } from '@/components/ux/_layouts/footer';

describe('Footer', () => {
  it('deve renderizar o footer corretamente', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('deve renderizar uma lista de logos', () => {
    render(<Footer />);

    const logos = screen.getAllByRole('img');
    expect(logos).toHaveLength(4);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });
});
