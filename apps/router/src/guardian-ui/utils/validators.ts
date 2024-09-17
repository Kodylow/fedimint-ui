import { ConfigGenParams, ConsensusParams } from '@fedimint/types';

export const isValidNumber = (value: string, min?: number, max?: number) => {
  const int = parseInt(value, 10);
  if (Number.isNaN(int)) return false;
  if (typeof min === 'number' && int < min) return false;
  if (typeof max === 'number' && int > max) return false;
  return true;
};

export const isValidMeta = (meta: [string, string][]) => {
  return meta.every(([key, value]) => key && value);
};

export function isConsensusparams(
  params: ConfigGenParams | ConsensusParams
): params is ConsensusParams {
  return 'peers' in params;
}
