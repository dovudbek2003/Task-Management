require("dotenv").config()

module.exports = {
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_KEY,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
}