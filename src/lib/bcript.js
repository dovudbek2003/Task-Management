const bcrypt = require("bcrypt")

const hashedPassword = async (password) => await bcrypt.hash(password, 10)
const isPassEqual = async (password, hash) => await bcrypt.compare(password, hash)

module.exports = { hashedPassword, isPassEqual }