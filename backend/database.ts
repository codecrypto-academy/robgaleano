import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123456",
  port: 5432,
});

// Better type definitions for query results
export type QueryResult<T = any> = {
  rows: T[];
  rowCount: number;
};

export const dbQuery = async <T = any>(
  query: string,
  params: Array<string | number | boolean | null> = []
): Promise<QueryResult<T>> => {
  const client = await pool.connect();

  try {
    const result = await client.query(query, params);
    return {
      rows: result.rows as T[],
      rowCount: result.rowCount,
    } as QueryResult<T>;
  } catch (err) {
    console.error("Error executing database query:", err);
    throw err; // Re-throw to allow caller to handle
  } finally {
    client.release(); // Return client to pool instead of ending the pool
  }
};

// Only call this when shutting down the application
export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("Disconnected from Postgres");
  } catch (err) {
    console.error("Error disconnecting from Postgres", err);
    throw err;
  }
};
