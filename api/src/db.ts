import mysql from "mysql";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "test",
  database: "organizer",
});

export default pool;
