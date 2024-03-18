import React, { useState } from 'react';
import { MetaConfig } from '@fedimint/types';
import { MetaFieldFormControl } from './MetaFieldFormControl';

const metaToFields = (meta: MetaConfig): [string, string][] => {
  return Object.entries(meta).map(([key, value]) => [key, value ?? '']);
};

interface MetaEditorTabProps {
  meta: MetaConfig;
  metaModuleId: string;
}

export const MetaEditorTab: React.FC<MetaEditorTabProps> = ({
  meta,
  metaModuleId,
}) => {
  console.log('MetaEditorTab', meta);
  const [metaFields, setMetaFields] = useState<[string, string][]>(
    metaToFields(meta)
  );

  return (
    <>
      <p>metaModuleId: {metaModuleId}</p>
      <MetaFieldFormControl
        metaFields={metaFields}
        onChangeMetaFields={setMetaFields}
      />
    </>
  );
};
