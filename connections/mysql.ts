import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "northwind_mysql"
});

const query = (sql: string) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results, fields) => {
      if (err) reject(err);
      return resolve(results);
    });
  });
};

query("SELECT * FROM Customer LIMIT 10").then((results) => {
    console.log(results);
});
