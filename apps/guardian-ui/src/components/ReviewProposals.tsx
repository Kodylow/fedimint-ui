import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../hooks';
import { ModuleRpc } from '../types';

interface MetaConsensusValue {
  revision: number;
  value: Uint8Array;
}

interface ReviewProposalsProps {
  metaModuleId: string;
}

export const ReviewProposals: React.FC<ReviewProposalsProps> = ({
  metaModuleId,
}) => {
  const { api } = useAdminContext();
  const [consensusMetaValue, setConsensusMetaValue] =
    useState<MetaConsensusValue>();

  useEffect(() => {
    api
      .moduleApiCall<{ metaValue: string }[]>(
        Number(metaModuleId),
        ModuleRpc.getConsensus
      )
      .then((consensusMetaValue) => setConsensusMetaValue(consensusMetaValue))
      .catch(console.error);
  }, [config, api, metaModuleId]);

  return <div></div>;
};
