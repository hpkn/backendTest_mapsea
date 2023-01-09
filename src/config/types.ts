export type configType = {
  APP: {
    PORT: string;
    NODE_ENV: string;
    HTTPS_PORT: string;
    LOCATION: string;
    ACCESS: {
      SECRET: string;
      SESSION_TIMEOUT: string;
    };
    REFRESH: {
      SECRET: string;
      SESSION_TIMEOUT: string;
    };
  };
  EUROPE: {
    DB: customDB;
    CLOUD_STORAGE: {
      ACCESS_KEY_ID: string;
      SECRET_ACCESS_KEY: string;
      BUCKET_NAME: string;
    };
  };

};

type customDB = {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
  APPLICATION_NAME: string;
};
