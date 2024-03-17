import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { ClientConfig } from '@fedimint/types';
import { useTranslation } from '@fedimint/utils';
import { MetaEditorTab } from './MetaEditorTab';

interface FederationConfigCardProps {
  config: ClientConfig | undefined;
}

export const FederationConfigCard: React.FC<FederationConfigCardProps> = ({
  config,
}) => {
  const { t } = useTranslation();

  return config ? (
    <Card flex='1'>
      <CardHeader></CardHeader>
      <CardBody>
        <Tabs variant='soft-rounded' colorScheme='blue'>
          <Flex direction='column' gap='4'>
            <Text size='lg' fontWeight='600'>
              {t('federation-dashboard.config.label')}
            </Text>
            <TabList justifySelf='center'>
              <Tab>{t('federation-dashboard.config.view')}</Tab>
              <Tab>{t('federation-dashboard.config.propose.tab')}</Tab>
              <Tab>{t('federation-dashboard.config.review')}</Tab>
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
              <MetaEditorTab meta={config.meta} />
            </TabPanel>
            <TabPanel>{/* Content for Review Proposals */}</TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  ) : null;
};
