import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { ClientConfig, ModuleKind } from '@fedimint/types';
import { useTranslation } from '@fedimint/utils';
import { MetaEditor } from './MetaEditor';

interface FederationConfigCardProps {
  config: ClientConfig | undefined;
}

export const FederationConfigCard: React.FC<FederationConfigCardProps> = ({
  config,
}) => {
  const { t } = useTranslation();

  const metaModuleId = config
    ? Object.entries(config.modules).find(
        (m) => m[1].kind === ModuleKind.Meta
      )?.[0]
    : undefined;

  return config ? (
    <Card flex='1'>
      <CardHeader>{t('federation-dashboard.config.label')}</CardHeader>
      <CardBody>
        <Tabs variant='soft-rounded' colorScheme='blue'>
          <Flex direction='column' gap='4'>
            <TabList justifySelf='center'>
              <Tab>{t('federation-dashboard.config.view')}</Tab>
              {metaModuleId && (
                <Tab>{t('federation-dashboard.config.propose.tab')}</Tab>
              )}
              {metaModuleId && (
                <Tab>{t('federation-dashboard.config.review')}</Tab>
              )}
            </TabList>
          </Flex>
          <TabPanels>
            <TabPanel>
              <CodeMirror
                value={JSON.stringify(config, null, 2)}
                theme={githubLight}
                extensions={[json()]}
                basicSetup={{ autocompletion: true }}
                minWidth={'500px'}
                minHeight={'500px'}
                readOnly
              />
            </TabPanel>
            <TabPanel>
              {metaModuleId && (
                <MetaEditor meta={config.meta} metaModuleId={metaModuleId} />
              )}
            </TabPanel>
            {metaModuleId && (
              <TabPanel>{/* Content for Review Proposals */}</TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  ) : null;
};
