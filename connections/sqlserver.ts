import mssql from "mssql";

const config = {
  user: "sa",
  password: "r00t.R00T",
  server: "localhost",
  database: "master",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // Changed from true to false for local development
    trustServerCertificate: true, // Fixed property name
  },
};

const pool = new mssql.ConnectionPool(config);

pool
  .connect()
  .then(() => {
    console.log("Connected to SQL Server");
    queryDatabases();
  })
  .catch((err) => {
    console.error("Connection error:", err);
  })
  .finally(() => {
    pool.close();
  });

const queryDatabases = async () => {
  try {
    // SQL Server uses TOP not LIMIT
    const res = await pool.query("SELECT TOP 10 * FROM Customers");
    console.log(res);
  } catch (err) {
    console.error("Error querying databases:", err);
  }
};
