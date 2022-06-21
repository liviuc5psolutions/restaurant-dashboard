// ------------------------
//   Generic configs
// ------------------------
export const DEFAULT_API_ERROR = 'Something went wrong. Please reload the page and try again.';
export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

// ------------------------
//   Environment configs
// ------------------------

export interface EnvConfigs {
  baseURL: string,
  envName: string,
  debugApi: boolean,
  devMode: boolean,
  simulateApiLatency: boolean,
}


const ProdConfigs: EnvConfigs = {
  baseURL: 'https://app.3dfits.com/api/v1',
  envName: 'prod',
  debugApi: false,
  devMode: false,
  simulateApiLatency: false,
};

const StageConfigs: EnvConfigs = {
  ...ProdConfigs,
  envName: 'stage',
  baseURL: 'https://stage.3dfits.com/api/v1',
};


const LocalConfigs: EnvConfigs = {
  ...ProdConfigs,
  baseURL: 'https://local.3dfits.com/api/v1',

  envName: 'local',
  debugApi: true,
  devMode: true,
  simulateApiLatency: false
};


export const getEnvConfigs = (REACT_APP_ENV?: string) => {
  if (REACT_APP_ENV === 'production' || REACT_APP_ENV === 'prod') {
    return ProdConfigs;
  }
  if (REACT_APP_ENV === 'staging' || REACT_APP_ENV === 'stage') {
    return StageConfigs;
  }
  return LocalConfigs;
};


export const envConfigs = getEnvConfigs(process.env.REACT_APP_ENV);

export const isProd: boolean = envConfigs.envName === 'prod';
export const baseURL = envConfigs.baseURL;
export const ENV_NAME = envConfigs.envName;
export const DEV_MODE = envConfigs.devMode;

export const DEBUG_API = envConfigs.debugApi;

export const SIMULATE_API_LATENCY = envConfigs.simulateApiLatency;

