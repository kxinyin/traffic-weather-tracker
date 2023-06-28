/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_GOV_DATA_BASE_URL: string;
    REACT_APP_GOOGLE_API_KEY: string;
    REACT_APP_GOOGLE_GEOCODE_API_URL: string;
  }
}
