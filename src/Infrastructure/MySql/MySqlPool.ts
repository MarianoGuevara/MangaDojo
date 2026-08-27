import mysql from "mysql2/promise";

// conexion a la base de datos según librería mysql2 (credenciales encriptadas)

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});