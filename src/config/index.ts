import * as dotenv from "dotenv";
import { configType } from "./types";

dotenv.config();

const config: configType = {
  APP: {
    PORT: String(process.env.HTTP_PORT),
    HTTPS_PORT: String(process.env.HTTPS_PORT),
    NODE_ENV: String(process.env.NODE_ENV),
    LOCATION: process.env.APPLICATION_LOCATION!,
    ACCESS: {
      SECRET: String(process.env.ACCESS_TOKEN_SECRET),
      SESSION_TIMEOUT: String(process.env.ACCESS_TOKEN_SESSION_TIMEOUT),
    },
    REFRESH: {
      SECRET: String(process.env.REFRESH_TOKEN_SECRET),
      SESSION_TIMEOUT: String(process.env.REFRESH_TOKEN_SESSION_TIMEOUT),
    },
  },
  EUROPE: {
    DB: {
      host: String(process.env.DB_HOST),
      user: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PASSWORD),
      port: Number(process.env.DB_PORT),
      database: String(process.env.DB_NAME),
      APPLICATION_NAME: String(process.env.APPLICATION_NAME),
    },
    CLOUD_STORAGE: {
      ACCESS_KEY_ID: String(process.env.AWS_ACCESS_KEY_ID),
      SECRET_ACCESS_KEY: String(process.env.AWS_SECRET_ACCESS_KEY),
      BUCKET_NAME: String(process.env.AWS_CFA_BUCKET_NAME),
    },
  },

};

export default config;
