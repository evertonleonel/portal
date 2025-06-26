import React from 'react';

import { cn } from '@/utils/lib/tailwind-merge';

const BackgroundImageRoot = React.forwardRef<HTMLPictureElement, React.HTMLAttributes<HTMLPictureElement>>(
  ({ className, ...props }, ref) => <picture ref={ref} className={cn('absolute -z-10', className)} {...props} />
);
BackgroundImageRoot.displayName = 'BackgroundImageRoot';

const BackgroundImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => <img ref={ref} className={cn('h-full w-full', className)} {...props} />
);
BackgroundImage.displayName = 'BackgroundImage';

export { BackgroundImageRoot, BackgroundImage };
