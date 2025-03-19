import OracleDB from "oracledb";

// Initialize Oracle client
OracleDB.initOracleClient();

// Create connection pool
const pool = await OracleDB.createPool({
  user: "c##dbdata",
  password: "dbdata",
  connectString: "localhost:1521/XE",
  // Optional pool configurations
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1
});

const query = async (sql: string) => {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    
    // Execute the query
    const result = await connection.execute(sql, [], {
      outFormat: OracleDB.OUT_FORMAT_OBJECT
    });
    
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    // Always release the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection", err);
      }
    }
  }
};

// Test query
query("SELECT * FROM CUSTOMERS WHERE ROWNUM <= 10").then((results) => {
  console.log(results);
});