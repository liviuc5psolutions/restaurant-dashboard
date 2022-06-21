import { DEV_MODE } from '../configs';


/*
 * Usage: await sleep(2000);
 */
export const sleep = (ms: number = 1000, onlyInDevMode: boolean = true) => {
  if (onlyInDevMode && DEV_MODE) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return Promise.resolve();
};


export const debugLog = (...data: any[]) => {
  if (DEV_MODE) {
    console.log(...data);
  }
};
