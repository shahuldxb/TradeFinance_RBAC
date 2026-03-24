import sql from "mssql";

const config2 = {
  server: process.env.MSSQL_SERVER as string,
  port: Number(process.env.MSSQL_PORT ?? 1433),
  database: process.env.MSSQL_DATABASE as string,
  user: process.env.MSSQL_USER as string,
  password: process.env.MSSQL_PASSWORD as string,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool2: sql.ConnectionPool | null = null;

export async function getPool2() {
  if (pool2) return pool2;
  pool2 = new sql.ConnectionPool(config2);
  await pool2.connect();
  return pool2;
}

export async function executeQuery2(query: string, params: Record<string, any> = {}) {
  const p = await getPool2();
  const req = p.request();

  Object.keys(params).forEach(k => req.input(k, params[k]));

  const result = await req.query(query);
  return result.recordset;
}
