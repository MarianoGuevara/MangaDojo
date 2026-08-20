import mysql from "mysql2/promise";

// conexion a la base de datos (encriptar credenciales)
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'mangadojo_db'
});