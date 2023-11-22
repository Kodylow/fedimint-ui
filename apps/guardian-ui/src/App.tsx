import React, { useMemo } from 'react';
import {
  Box,
  Flex,
  Spinner,
  Heading,
  Text,
  Center,
  Button,
} from '@chakra-ui/react';
import {
  theme,
  Fonts,
  SharedChakraProvider,
  Wrapper,
  Login,
} from '@fedimint/ui';
import spaceGroteskTtf from '@fedimint/ui/assets/fonts/SpaceGrotesk-Variable.ttf';
import interTtf from '@fedimint/ui/assets/fonts/Inter-Variable.ttf';
import { SetupContextProvider } from './setup/SetupContext';
import { AdminContextProvider } from './admin/AdminContext';
import { FederationSetup } from './setup/FederationSetup';
import { FederationAdmin } from './admin/FederationAdmin';
import { useAppContext } from './hooks';
import { useTranslation } from '@fedimint/utils';
import { APP_ACTION_TYPE, Status } from './types';
import { formatApiErrorMessage } from './utils/api';

export const App = React.memo(function App() {
  const { t } = useTranslation();
  const { state, api, dispatch } = useAppContext();

  const content = useMemo(() => {
    if (state.appError) {
      return (
        <Center h='100vh'>
          <Box w='80%' maxW='md'>
            <Flex direction='column' gap={6}>
              <Heading size='md'>{t('common.error')}</Heading>
              <Text>{state.appError}</Text>
              <Button
                width={['100%', '50%']}
                onClick={() => window.location.reload()}
              >
                {t('common.reset')}
              </Button>
            </Flex>
          </Box>
        </Center>
      );
    }

    if (state.needsAuth) {
      return (
        <Wrapper>
          <Login
            checkAuth={(password) => api.testPassword(password || '')}
            setAuthenticated={() =>
              dispatch({ type: APP_ACTION_TYPE.SET_NEEDS_AUTH, payload: false })
            }
            parseError={formatApiErrorMessage}
          />
        </Wrapper>
      );
    }

    if (state.status === Status.Setup && state.initServerStatus) {
      return (
        <SetupContextProvider
          initServerStatus={state.initServerStatus}
          api={api}
        >
          <Wrapper>
            <FederationSetup />
          </Wrapper>
        </SetupContextProvider>
      );
    }

    if (state.status === Status.Admin) {
      return (
        <AdminContextProvider api={api}>
          <Wrapper size='lg'>
            <FederationAdmin />
          </Wrapper>
        </AdminContextProvider>
      );
    }

    return (
      <Center p={12}>
        <Spinner size='xl' />
      </Center>
    );
  }, [
    state.status,
    state.initServerStatus,
    state.appError,
    state.needsAuth,
    api,
    dispatch,
    t,
  ]);

  return (
    <React.StrictMode>
      <Fonts spaceGroteskTtf={spaceGroteskTtf} interTtf={interTtf} />
      <SharedChakraProvider theme={theme}>
        <Center>
          <Box width='100%'>{content}</Box>
        </Center>
      </SharedChakraProvider>
    </React.StrictMode>
  );
});
