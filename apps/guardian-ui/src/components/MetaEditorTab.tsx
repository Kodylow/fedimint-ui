import React, { useState } from 'react';
import { MetaConfig } from '@fedimint/types';
import { MetaFieldFormControl } from './MetaFieldFormControl';

const metaToFields = (meta: MetaConfig): [string, string][] => {
  return Object.entries(meta).map(([key, value]) => [key, value ?? '']);
};

interface MetaEditorTabProps {
  meta: MetaConfig;
}

export const MetaEditorTab: React.FC<MetaEditorTabProps> = ({ meta }) => {
  console.log('MetaEditorTab', meta);
  const [metaFields, setMetaFields] = useState<[string, string][]>(
    metaToFields(meta)
  );

  return (
    <>
      <MetaFieldFormControl
        metaFields={metaFields}
        onChangeMetaFields={setMetaFields}
      />
    </>
  );
};
