import pg  from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "northwind_pg",
  password: "123456",
  port: 5432,
});

type Customer = {
  customer_id: string;
  company_name: string;
  contact_name: string;
  contact_title: string;
  address: string;
  city: string;
  region: string | null;
  postal_code: string;
  country: string;
  phone: string;
  fax: string;
};

pool
  .connect()
  .then(async () => {
    console.log("Connected to Postgres");
    await queryCustomers();
    await endPoolConnection();
  })
  .catch((err) => console.error("Error connecting to Postgres", err));

const queryCustomers = async () => {
  try {
    const res = await pool.query("SELECT * FROM customers LIMIT 10");
    const customers: Customer[] = res.rows;
    console.log(customers[0]);
    return customers;
  } catch (err) {
    console.error("Error querying customers:", err);
    return [];
  }
};

const endPoolConnection = async () => {
  await pool
    .end()
    .then(() => console.log("Disconnected from Postgres"))
    .catch((err) => console.error("Error disconnecting from Postgres", err));
};
