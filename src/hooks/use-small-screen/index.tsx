import { useEffect, useState } from 'react';

const SMALL_SCREEN_HEIGHT = 700; // Altura mínima para evitar scroll em 1024x600

export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkSmallScreen = () => {
      const isSmall = window.innerHeight < SMALL_SCREEN_HEIGHT;
      setIsSmallScreen(isSmall);
    };

    checkSmallScreen();
    window.addEventListener('resize', checkSmallScreen);

    return () => window.removeEventListener('resize', checkSmallScreen);
  }, []);

  return !!isSmallScreen;
}
