import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
  override: true,
});


export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  mssql: {
    server: process.env.MSSQL_SERVER ?? "",
    database: process.env.MSSQL_DATABASE2 ?? "",
    username: process.env.MSSQL_USERNAME ?? "",
    password: process.env.MSSQL_PASSWORD ?? "",
    port: process.env.MSSQL_PORT ?? "",
    encrypt: process.env.MSSQL_ENCRYPT ?? "yes",
    trustServerCertificate: process.env.MSSQL_TRUST_SERVER_CERT ?? "yes",
  },
};
