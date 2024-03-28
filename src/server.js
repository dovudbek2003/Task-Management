const express = require('express')
const cors = require("cors")
const { PORT } = require('./common/config/index.js')
const appModule = require("./modules/app.module.js")

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

app.use("/api", appModule.router)

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})