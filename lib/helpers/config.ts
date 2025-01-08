/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export interface HFCredential {
  HF_URL: string;
  CHALLENGE_URL: string;
  ADMIN_ACCOUNT: string;
  MGR_ACCOUNT: string;
  EMPLOYEE_ACCOUNT: string;
  CRED_PASS: string;
}

export interface EnvironmentCredentials {
  HF: HFCredential;
}

export const config: EnvironmentCredentials = {
  HF: {
    // SITE_URLS
    HF_URL: process.env.HF_URL || 'https://humanforce.com/',
    //Accounts
    ADMIN_ACCOUNT: process.env.ADMIN_ACCOUNT || `ADM01`,
    MGR_ACCOUNT: process.env.MGR_ACCOUNT || `MGR01`,
    EMPLOYEE_ACCOUNT: process.env.EMPLOYEE_ACCOUNT || `EMP01`,
    CRED_PASS: process.env.CRED_PASS || `Q@T3chCh4lleng3@`,
    CHALLENGE_URL:
      process.env.CHALLENGE_URL || 'https://qatestchallenge2.humanforce.io/',
  },
};
