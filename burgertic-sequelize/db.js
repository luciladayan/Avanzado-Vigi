import "dotenv/config";

export const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true,
};


import "dotenv/config";
import { Sequelize } from "sequelize";

// Usar la URL de conexión directamente
export const sequelize = new Sequelize(process.env.DB_URL, {
  ssl: true,  // Si necesitas habilitar SSL
});

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
