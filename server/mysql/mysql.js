import mysql from "mysql";
import alt from "alt";
const connection = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "array_dm",
  password: "",
  debug: true
});
console.log ("Check the connection to the database...");
connection.query("SELECT 14 + 15 AS solution", (err, result) => {
if (err) {
  return console.log (err);
}
else {
  if (result[0].solution) {
    console.log ("[DB] The database connection was successfully established!");
  }
}
})
export {connection}
