import React from 'react';
import {
  // Button,
  Flex,
  // FormControl,
  // IconButton,
  // Input,
  // useTheme,
} from '@chakra-ui/react';
// import { ReactComponent as XCircleIcon } from '../assets/svgs/x-circle.svg';
// import { ReactComponent as PlusIcon } from '../assets/svgs/plus.svg';
// import { ReactComponent as EditIcon } from '../assets/svgs/edit.svg';
// import { ReactComponent as UndoIcon } from '../assets/svgs/rotate-cw.svg';
// import { useTranslation } from '@fedimint/utils';
import { MetaConfig } from '@fedimint/types';

interface Props {
  meta: MetaConfig;
  metaModuleId: string;
}

// const metaToFields = (meta: MetaConfig): [string, string][] => {
//   return Object.entries(meta).map(([key, value]) => [key, value ?? '']);
// };

export const MetaEditor: React.FC<Props> = () => {
  // const { t } = useTranslation();
  // const theme = useTheme();
  // const [editableField, setEditableField] = React.useState<string | null>(null);
  // const [metaFields, setMetaFields] = React.useState(metaToFields(meta));

  return <Flex direction='column' gap='4'></Flex>;
};
