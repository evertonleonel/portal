import React from 'react';

import { ArrowDownIcon } from '@/assets/icons/arrow/arrow-down';
import { ArrowUpIcon } from '@/assets/icons/arrow/arrow-up';
import { ChevronDownArrowIcon } from '@/assets/icons/arrow/chevron-down-arrow';
import { ChevronLeftArrowIcon } from '@/assets/icons/arrow/chevron-left-arrow';
import { ChevronRightArrowIcon } from '@/assets/icons/arrow/chevron-right-arrrow';
import { ChevronUpArrowIcon } from '@/assets/icons/arrow/chevron-up-arrow';
import { ExpandeHorizontalArrowIcon } from '@/assets/icons/arrow/expande-horizontal-arrow';
import { LogoutArrowIcon } from '@/assets/icons/arrow/logout-arrow';
import { MoveArrowIcon } from '@/assets/icons/arrow/move-arrow';
import { HomeIcon } from '@/assets/icons/design/home';
import { MicrosoftIcon } from '@/assets/icons/design/microsoft.';
import { NotificationDefaultIcon } from '@/assets/icons/design/nofitication-default';
import { NotificationErrorIcon } from '@/assets/icons/design/notification-error';
import { NotificationSucessIcon } from '@/assets/icons/design/notification-sucess';
import { xIcon } from '@/assets/icons/design/x';
import { CheckIcon } from '@/assets/icons/essentional/check';
import { CheckCircleIcon } from '@/assets/icons/essentional/check-circle';
import { CloseCircleIcon } from '@/assets/icons/essentional/close-circle';
import { NoteIcon } from '@/assets/icons/essentional/note';
import { DocumentCopyIcon } from '@/assets/icons/files/document-copy';
import { InputSearchIcon } from '@/assets/icons/search/input-search';
import { BellIcon } from '@/assets/icons/tools/bell';
import { FilterIcon } from '@/assets/icons/tools/filter';
import { ProfileTickUserIcon } from '@/assets/icons/user/profile-tick-user';
import { ProfileTwoUsersIcon } from '@/assets/icons/user/profile-two-users';
import { ProfileUserIcon } from '@/assets/icons/user/profile-user';

const icons = {
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  bell: BellIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  closeCircle: CloseCircleIcon,
  chevronLeftArrow: ChevronLeftArrowIcon,
  chevronUpArrow: ChevronUpArrowIcon,
  chevronDownArrow: ChevronDownArrowIcon,
  chevronRightArrow: ChevronRightArrowIcon,
  documentCopy: DocumentCopyIcon,
  filter: FilterIcon,
  home: HomeIcon,
  notificationError: NotificationErrorIcon,
  notificationSucces: NotificationSucessIcon,
  notificationDefault: NotificationDefaultIcon,
  expandeHorizontalArrow: ExpandeHorizontalArrowIcon,
  inputSearch: InputSearchIcon,
  logoutArrow: LogoutArrowIcon,
  note: NoteIcon,
  microsoft: MicrosoftIcon,
  moveArrow: MoveArrowIcon,
  profileUser: ProfileUserIcon,
  profileTwoUsers: ProfileTwoUsersIcon,
  profileTickUser: ProfileTickUserIcon,
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
