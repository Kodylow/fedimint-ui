import { MetaConfig, ModuleKind, Peer, BitcoinRpc, Network } from './api';

export enum GuardianRole {
  Host = 'Host',
  Follower = 'Follower',
  Solo = 'Solo',
}

export enum SetupProgress {
  Start = 'Start',
  SetConfiguration = 'SetConfiguration',
  ConnectGuardians = 'ConnectGuardians',
  RunDKG = 'RunDKG',
  VerifyGuardians = 'VerifyGuardians',
  SetupComplete = 'SetupComplete',
}

export enum StepState {
  Active = 'Active',
  InActive = 'InActive',
  Completed = 'Completed',
}

export type PeerHashMap = Record<number, string>;

export type LnModuleParams = [
  ModuleKind.Ln,
  {
    consensus?: object;
    local?: object;
  }
];
export type MintModuleParams = [
  ModuleKind.Mint,
  {
    consensus?: { mint_amounts: number[] };
    local?: object;
  }
];
export type WalletModuleParams = [
  ModuleKind.Wallet,
  {
    consensus?: {
      finality_delay: number;
      network: Network;
      client_default_bitcoin_rpc: BitcoinRpc;
    };
    local?: {
      bitcoin_rpc: BitcoinRpc;
    };
  }
];
export type OtherModuleParams = [
  string,
  { consensus?: object; local?: object }
];
export type AnyModuleParams =
  | LnModuleParams
  | MintModuleParams
  | WalletModuleParams
  | OtherModuleParams;

export type ConfigGenParams = {
  meta: MetaConfig;
  modules: Record<number, AnyModuleParams>;
};

export type ConsensusParams = ConfigGenParams & {
  peers: Record<number, Peer>;
};

export interface ConsensusState {
  consensus: ConsensusParams;
  our_current_id: number;
}

export interface SetupState {
  role: GuardianRole | null;
  progress: SetupProgress;
  myName: string;
  password: string;
  ourCurrentId: number | null;
  configGenParams: ConfigGenParams | null;
  numPeers: number;
  peers: Peer[];
}

export enum SETUP_ACTION_TYPE {
  SET_INITIAL_STATE = 'SET_INITIAL_STATE',
  SET_ROLE = 'SET_ROLE',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_MY_NAME = 'SET_MY_NAME',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_CONFIG_GEN_PARAMS = 'SET_CONFIG_GEN_PARAMS',
  SET_NUM_PEERS = 'SET_NUM_PEERS',
  SET_PEERS = 'SET_PEERS',
  SET_IS_SETUP_COMPLETE = 'SET_IS_SETUP_COMPLETE',
  SET_OUR_CURRENT_ID = 'SET_OUR_CURRENT_ID',
}

export type SetupAction =
  | {
      type: SETUP_ACTION_TYPE.SET_INITIAL_STATE;
      payload: null;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_ROLE;
      payload: GuardianRole;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_PROGRESS;
      payload: SetupProgress;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_MY_NAME;
      payload: string;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_CONFIG_GEN_PARAMS;
      payload: ConfigGenParams | null;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_PASSWORD;
      payload: string;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_NUM_PEERS;
      payload: number;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_PEERS;
      payload: Peer[];
    }
  | {
      type: SETUP_ACTION_TYPE.SET_IS_SETUP_COMPLETE;
      payload: boolean;
    }
  | {
      type: SETUP_ACTION_TYPE.SET_OUR_CURRENT_ID;
      payload: number;
    };
