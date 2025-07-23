import React from 'react';

import { ChevronDownArrowIcon } from '@/assets/icons/arrow/chevron-down-arrow';
import { ChevronLeftArrowIcon } from '@/assets/icons/arrow/chevron-left-arrow';
import { ChevronRightArrowIcon } from '@/assets/icons/arrow/chevron-right-arrrow';
import { ChevronUpArrowIcon } from '@/assets/icons/arrow/chevron-up-arrow';
import { DownArrowIcon } from '@/assets/icons/arrow/down-arrow';
import { ExpandeHorizontalArrowIcon } from '@/assets/icons/arrow/expande-horizontal-arrow';
import { LogoutArrowIcon } from '@/assets/icons/arrow/logout-arrow';
import { MoveArrowIcon } from '@/assets/icons/arrow/move-arrow';
import { UpArrowIcon } from '@/assets/icons/arrow/up-arrow';
import { UpDownArrowIcon } from '@/assets/icons/arrow/up-down-arrow';
import { HomeIcon } from '@/assets/icons/design/home';
import { MicrosoftIcon } from '@/assets/icons/design/microsoft.';
import { NotificationDefaultIcon } from '@/assets/icons/design/nofitication-default';
import { NotificationErrorIcon } from '@/assets/icons/design/notification-error';
import { NotificationPanelOffIcon } from '@/assets/icons/design/notification-panel-off';
import { NotificationPanelOnIcon } from '@/assets/icons/design/notification-panel-on';
import { NotificationSucessIcon } from '@/assets/icons/design/notification-sucess';
import { xIcon } from '@/assets/icons/design/x';
import { AddSquareIcon } from '@/assets/icons/essentional/add-square';
import { CheckIcon } from '@/assets/icons/essentional/check';
import { CheckCircleIcon } from '@/assets/icons/essentional/check-circle';
import { CloseCircleIcon } from '@/assets/icons/essentional/close-circle';
import { Cube3DIcon } from '@/assets/icons/essentional/cube-3d-';
import { EditPencilIcon } from '@/assets/icons/essentional/edit-pencil';
import { EditPencilWriteIcon } from '@/assets/icons/essentional/edit-pencil-write';
import { NoteIcon } from '@/assets/icons/essentional/note';
import { DocumentCopyIcon } from '@/assets/icons/files/document-copy';
import { InputSearchIcon } from '@/assets/icons/search/input-search';
import { BellIcon } from '@/assets/icons/tools/bell';
import { ConfigIcon } from '@/assets/icons/tools/config';
import { FilterIcon } from '@/assets/icons/tools/filter';
import { StackIcon } from '@/assets/icons/tools/stack';
import { TrashIcon } from '@/assets/icons/tools/trash';
import { ProfileTickUserIcon } from '@/assets/icons/user/profile-tick-user';
import { ProfileTwoUsersIcon } from '@/assets/icons/user/profile-two-users';
import { ProfileUserIcon } from '@/assets/icons/user/profile-user';

const icons = {
  addSquare: AddSquareIcon,
  bell: BellIcon,
  cube3D: Cube3DIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  closeCircle: CloseCircleIcon,
  chevronLeftArrow: ChevronLeftArrowIcon,
  chevronUpArrow: ChevronUpArrowIcon,
  chevronDownArrow: ChevronDownArrowIcon,
  chevronRightArrow: ChevronRightArrowIcon,
  config: ConfigIcon,
  documentCopy: DocumentCopyIcon,
  downArrow: DownArrowIcon,
  editPencil: EditPencilIcon,
  editPencilWrite: EditPencilWriteIcon,
  filter: FilterIcon,
  home: HomeIcon,
  notificationError: NotificationErrorIcon,
  notificationSucces: NotificationSucessIcon,
  notificationDefault: NotificationDefaultIcon,
  notificationPanelOff: NotificationPanelOffIcon,
  notificationPanelOn: NotificationPanelOnIcon,
  expandeHorizontalArrow: ExpandeHorizontalArrowIcon,
  inputSearch: InputSearchIcon,
  logoutArrow: LogoutArrowIcon,
  note: NoteIcon,
  microsoft: MicrosoftIcon,
  moveArrow: MoveArrowIcon,
  profileUser: ProfileUserIcon,
  profileTwoUsers: ProfileTwoUsersIcon,
  profileTickUser: ProfileTickUserIcon,
  stack: StackIcon,
  trash: TrashIcon,
  upArrow: UpArrowIcon,
  upDownArrow: UpDownArrowIcon,
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
