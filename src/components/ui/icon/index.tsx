import React from 'react';

import { ChevronArrowIcon } from '@/assets/icons/arrow/chevron-arrrow';
import { ExpandeHorizontalArrowIcon } from '@/assets/icons/arrow/expande-horizontal-arrow';
import { MoveArrowIcon } from '@/assets/icons/arrow/move-arrow';
import { MicrosoftIcon } from '@/assets/icons/design/microsoft.';
import { NotificationDefaultIcon } from '@/assets/icons/design/nofitication-default';
import { NotificationErrorIcon } from '@/assets/icons/design/notification-error';
import { NotificationSucessIcon } from '@/assets/icons/design/notification-sucess';
import { xIcon } from '@/assets/icons/design/x';
import { InputSearchIcon } from '@/assets/icons/search/input-search';
import { BellIcon } from '@/assets/icons/tools/bell';

const icons = {
  bell: BellIcon,
  chevronArrow: ChevronArrowIcon,
  'notification-error': NotificationErrorIcon,
  'notification-success': NotificationSucessIcon,
  'notification-default': NotificationDefaultIcon,
  expandeHorizontalArrow: ExpandeHorizontalArrowIcon,
  inputSearch: InputSearchIcon,
  microsoft: MicrosoftIcon,
  moveArrow: MoveArrowIcon,
  x: xIcon,
};

export type IconsName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconsName;
  animate?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export { Icon };
