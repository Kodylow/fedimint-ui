import React, { useState } from 'react';
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
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { ClientConfig } from '@fedimint/types';
import { useTranslation } from '@fedimint/utils';
import { diffJson } from 'diff';

interface ConfigViewerProps {
  config: ClientConfig | undefined;
}

export const ConfigViewer: React.FC<ConfigViewerProps> = ({ config }) => {
  const { t } = useTranslation();
  const [newMeta, setNewMeta] = useState(config?.meta);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [diffResult, setDiffResult] = useState('');

  const handleSubmit = () => {
    console.log('newMeta', newMeta);
    console.log('meta', config?.meta);
    if (config?.meta && newMeta) {
      // Serialize objects to JSON strings before computing diff
      const oldMetaJson = JSON.stringify(config.meta, null, 2);
      const newMetaJson = JSON.stringify(newMeta, null, 2);

      // Compute diff
      const diff = diffJson(oldMetaJson, newMetaJson);
      console.log('diff', diff);
      const formattedDiff = diff
        .map((part) => {
          // Ignore if the part is an empty line
          if (part.value === '\n') return '';
          const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
          return prefix + part.value;
        })
        .join('');

      setDiffResult(formattedDiff);
      onOpen();
    }
  };

  return (
    <>
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
                <Flex direction='column' gap='4'>
                  <Text fontSize='md'>
                    {t('federation-dashboard.config.propose.instructions')}
                  </Text>
                  <Flex direction='row' gap='4'>
                    <Flex
                      direction='column'
                      gap='4'
                      fontWeight='600'
                      width='50%'
                      border='1px solid #E2E8F0'
                      borderRadius='md'
                      p='4'
                    >
                      <Text>Current Metadata</Text>
                      <CodeMirror
                        value={JSON.stringify(config?.meta, null, 2)}
                        theme={githubLight}
                        extensions={[json()]}
                        basicSetup={{ autocompletion: true }}
                        minWidth={'250px'}
                        minHeight={'500px'}
                        readOnly
                      />
                    </Flex>
                    <Flex
                      direction='column'
                      gap='4'
                      fontWeight='600'
                      width='50%'
                      border='1px solid #E2E8F0'
                      borderRadius='md'
                      p='4'
                    >
                      <Text>Proposed Metadata</Text>
                      <CodeMirror
                        value={JSON.stringify(config?.meta, null, 2)}
                        theme={githubLight}
                        extensions={[json()]}
                        basicSetup={{ autocompletion: true }}
                        minWidth={'250px'}
                        minHeight={'500px'}
                        onChange={(value) => {
                          console.log('value', value);
                          setNewMeta(JSON.parse(value));
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex justifyContent='right'>
                    <Button colorScheme='blue' onClick={handleSubmit}>
                      Submit Proposed Change
                    </Button>
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel>{/* Content for Review Proposals */}</TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Diff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CodeMirror
              value={diffResult}
              theme={githubLight}
              extensions={[json()]}
              basicSetup={{ lineNumbers: true }}
              readOnly
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
