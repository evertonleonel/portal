import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;

export function useIsTablet() {
  const [isTabletMode, setIsTabletMode] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`
    );
    const onChange = () => {
      setIsTabletMode(
        window.innerWidth >= MOBILE_BREAKPOINT &&
          window.innerWidth < TABLET_BREAKPOINT
      );
    };
    mql.addEventListener('change', onChange);
    setIsTabletMode(
      window.innerWidth >= MOBILE_BREAKPOINT &&
        window.innerWidth < TABLET_BREAKPOINT
    );
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isTabletMode;
}
