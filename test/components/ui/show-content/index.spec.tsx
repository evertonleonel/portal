import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ShowContent } from '@/components/ui/show-content';

describe('<ShowContent/>', () => {
  it('deve renderizar o conteúdo quando condition é true', () => {
    const content = 'Conteúdo de teste';
    render(<ShowContent condition={true}>{content}</ShowContent>);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('não deve renderizar o conteúdo quando condition é false', () => {
    const content = 'Conteúdo de teste';
    render(<ShowContent condition={false}>{content}</ShowContent>);

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  it('não deve renderizar o conteúdo quando condition não é fornecido (undefined)', () => {
    const content = 'Conteúdo';
    render(<ShowContent>{content}</ShowContent>);

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });
});
