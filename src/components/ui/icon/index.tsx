import React from 'react';

import { ChevronDownArrowIcon } from '@/assets/icons/arrow/chevron-down-arrow';
import { ChevronLeftArrowIcon } from '@/assets/icons/arrow/chevron-left-arrow';
import { ChevronRightArrowIcon } from '@/assets/icons/arrow/chevron-right-arrrow';
import { ChevronUpArrowIcon } from '@/assets/icons/arrow/chevron-up-arrow';
import { ExpandeHorizontalArrowIcon } from '@/assets/icons/arrow/expande-horizontal-arrow';
import { MoveArrowIcon } from '@/assets/icons/arrow/move-arrow';
import { MicrosoftIcon } from '@/assets/icons/design/microsoft.';
import { NotificationDefaultIcon } from '@/assets/icons/design/nofitication-default';
import { NotificationErrorIcon } from '@/assets/icons/design/notification-error';
import { NotificationSucessIcon } from '@/assets/icons/design/notification-sucess';
import { xIcon } from '@/assets/icons/design/x';
import { CheckIcon } from '@/assets/icons/essentional/check';
import { InputSearchIcon } from '@/assets/icons/search/input-search';
import { BellIcon } from '@/assets/icons/tools/bell';

const icons = {
  bell: BellIcon,
  check: CheckIcon,
  chevronLeftArrow: ChevronLeftArrowIcon,
  chevronUpArrow: ChevronUpArrowIcon,
  chevronDownArrow: ChevronDownArrowIcon,
  chevronRightArrow: ChevronRightArrowIcon,
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
