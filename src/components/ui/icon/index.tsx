import React from 'react';

import { BellIcon } from '@/assets/icons/bell';
import { ErrorIcon } from '@/assets/icons/error';
import { SearchIcon } from '@/assets/icons/search';

const icons = {
  search: SearchIcon,
  bell: BellIcon,
  error: ErrorIcon,
};

type IconsName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconsName;
  animate?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export { Icon };
