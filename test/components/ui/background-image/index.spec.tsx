import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  BackgroundImage,
  BackgroundWrapper,
} from '@/components/ui/background-image';

describe('<BackgroundWrapper/>', () => {
  it('deve renderizar o picture com as classes padrão', () => {
    render(<BackgroundWrapper data-testid="bg-wrapper" />);

    const wrapper = screen.getByTestId('bg-wrapper');
    expect(wrapper.tagName.toLowerCase()).toBe('picture');
    expect(wrapper).toHaveClass('absolute', '-z-10');
  });

  it('deve aceitar classes customizadas', () => {
    const customClass = 'custom-wrapper-class';
    render(
      <BackgroundWrapper className={customClass} data-testid="bg-wrapper" />
    );

    const wrapper = screen.getByTestId('bg-wrapper');
    expect(wrapper).toHaveClass('absolute', '-z-10', customClass);
  });
});

describe('<BackgroundImage/>', () => {
  it('deve renderizar a imagem com as classes padrão', () => {
    render(
      <BackgroundImage src="/test.jpg" alt="Test" data-testid="bg-image" />
    );

    const image = screen.getByTestId('bg-image');
    expect(image.tagName.toLowerCase()).toBe('img');
    expect(image).toHaveClass('h-full', 'w-full');
    expect(image).toHaveAttribute('src', '/test.jpg');
    expect(image).toHaveAttribute('alt', 'Test');
  });

  it('deve aceitar classes customizadas', () => {
    const customClass = 'custom-image-class';
    render(
      <BackgroundImage
        src="/test.jpg"
        alt="Test"
        className={customClass}
        data-testid="bg-image"
      />
    );

    const image = screen.getByTestId('bg-image');
    expect(image).toHaveClass('h-full', 'w-full', customClass);
  });

  it('deve funcionar em conjunto com BackgroundWrapper', () => {
    render(
      <BackgroundWrapper data-testid="bg-wrapper">
        <BackgroundImage src="/test.jpg" alt="Test" data-testid="bg-image" />
      </BackgroundWrapper>
    );

    const wrapper = screen.getByTestId('bg-wrapper');
    const image = screen.getByTestId('bg-image');

    expect(wrapper).toContainElement(image);
    expect(wrapper).toHaveClass('absolute', '-z-10');
    expect(image).toHaveClass('h-full', 'w-full');
  });
});
