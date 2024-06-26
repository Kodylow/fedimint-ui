import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useTranslation } from '@fedimint/utils';
import { FormGroup } from '@fedimint/ui';
import { ReactComponent as FedimintLogo } from '../../../../assets/svgs/fedimint.svg';
import { NumberFormControl } from '../../../NumberFormControl';

interface FederationSettingsFormProps {
  federationName: string;
  handleChangeFederationName: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isHost: boolean;
  numPeers: string;
  setNumPeers: (value: string) => void;
}

export const FederationSettingsForm: React.FC<FederationSettingsFormProps> = ({
  federationName,
  handleChangeFederationName,
  isHost,
  numPeers,
  setNumPeers,
}) => {
  const { t } = useTranslation();

  return (
    <FormGroup
      icon={FedimintLogo}
      title={`${t('set-config.federation-settings')}`}
      isOpen={true}
    >
      <FormControl>
        <FormLabel>{t('set-config.federation-name')}</FormLabel>
        <Input value={federationName} onChange={handleChangeFederationName} />
      </FormControl>
      {isHost && (
        <NumberFormControl
          labelText={t('set-config.guardian-number')}
          helperText={t('set-config.guardian-number-help')}
          min={4}
          value={numPeers}
          onChange={(value) => {
            setNumPeers(value);
          }}
        />
      )}
    </FormGroup>
  );
};
