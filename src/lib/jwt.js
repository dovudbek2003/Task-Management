const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../common/config/index.js")

const generateJWTToken = (userId) => jwt.sign({ userId }, JWT_KEY, { expiresIn: "30d" })
const verifyToken = (token) => jwt.verify(token, JWT_KEY)

module.exports = { generateJWTToken, verifyToken }