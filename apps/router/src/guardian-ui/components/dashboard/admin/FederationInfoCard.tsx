import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { ClientConfig, StatusResponse, Versions } from '@fedimint/types';
import { useTranslation } from '@fedimint/utils';
import { KeyValues } from '@fedimint/ui';
import { useAdminContext } from '../../../hooks';

interface Props {
  status: StatusResponse | undefined;
  config: ClientConfig | undefined;
  latestSession: number | undefined;
}

export const FederationInfoCard: React.FC<Props> = ({
  status,
  config,
  latestSession,
}) => {
  const { t } = useTranslation();
  const { api } = useAdminContext();
  const [versions, setVersions] = useState<Versions>();
  const [blockCount, setBlockCount] = useState<number>();

  const serverStatus = status?.server || '';
  const apiVersion = versions?.core.api.length
    ? `${versions.core.api[0].major}.${versions.core.api[0].minor}`
    : '';
  const consensusVersion =
    versions?.core.core_consensus !== undefined
      ? `${versions.core.core_consensus.major}.${versions.core.core_consensus.minor}`
      : '';

  useEffect(() => {
    api.version().then(setVersions).catch(console.error);
  }, [api]);

  useEffect(() => {
    if (!config) return;
    const fetchBlockCount = () => {
      api.fetchBlockCount(config).then(setBlockCount).catch(console.error);
    };
    fetchBlockCount();
    const interval = setInterval(fetchBlockCount, 5000);
    return () => clearInterval(interval);
  }, [api, config]);

  const federationInfoKeyValues = useMemo(
    () => [
      {
        key: 'status',
        label: t('federation-dashboard.fed-info.your-status-label'),
        value: serverStatus,
      },
      {
        key: 'blockCount',
        label: t('federation-dashboard.fed-info.block-count-label'),
        value: blockCount,
      },
      {
        key: 'apiVersion',
        label: t('federation-dashboard.fed-info.api-version-label'),
        value: apiVersion,
      },
      {
        key: 'consensusVersion',
        label: t('federation-dashboard.fed-info.consensus-version-label'),
        value: consensusVersion,
      },
    ],
    [t, serverStatus, blockCount, apiVersion, consensusVersion]
  );

  const sessionInfoKeyValues = useMemo(
    () => [
      {
        key: 'latestSession',
        label: t('federation-dashboard.fed-info.session-info.session-height'),
        value: latestSession ?? 0,
      },
    ],
    [t, latestSession]
  );

  return (
    <Card w='100%'>
      <CardHeader>
        <Text size='lg' fontWeight='600'>
          {t('federation-dashboard.fed-info.label')}
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <KeyValues keyValues={federationInfoKeyValues} />
          </Box>
          <Box>
            <KeyValues keyValues={sessionInfoKeyValues} />
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};
