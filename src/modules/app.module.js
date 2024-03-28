const { Router } = require("express")

const company = require("./companies/companies.module.js")
const user = require("./user/user.module.js")
const task = require("./task/task.module.js")
const userTask = require("./user_task/user_task.module.js")

const router = Router()

router.use("/company", company.router)
router.use("/user", user.router)
router.use("/task", task.router)
router.use("/user-task", userTask.router)

module.exports = { router }