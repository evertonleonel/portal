import React from 'react';

import { ExpandeHorizontalArrowIcon } from '@/assets/icons/arrow/expande-horizontal-arrow';
import { ErrorIcon } from '@/assets/icons/design/error';
import { MicrosoftIcon } from '@/assets/icons/design/microsoft.';
import { SucessIcon } from '@/assets/icons/design/sucess';
import { xIcon } from '@/assets/icons/design/x';
import { InputSearchIcon } from '@/assets/icons/search/input-search';
import { BellIcon } from '@/assets/icons/tools/bell';

const icons = {
  expandeHorizontalArrow: ExpandeHorizontalArrowIcon,
  error: ErrorIcon,
  microsoft: MicrosoftIcon,
  sucess: SucessIcon,
  x: xIcon,
  inputSearch: InputSearchIcon,
  bell: BellIcon,
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
