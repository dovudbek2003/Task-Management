const { Router } = require("express")
const AuthorizationMiddleware = require("../../middleware/authorization.js")

const TaskService = require("./task.service.js")
const CompanyService = require("../companies/companies.service.js")
const UserService = require("../user/user.service.js")
const UserTaskService = require("../user_task/user_task.service.js")

const TaskController = require("./task.controller.js")

const router = Router()

const taskService = new TaskService()
const companyService = new CompanyService()
const userService = new UserService()
const userTaskService = new UserTaskService()

const taskController = new TaskController(taskService, companyService, userService, userTaskService)

const authorizationMiddleware = new AuthorizationMiddleware()

router.post("/",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminOrManagerRole,
    (req, res) => { taskController.createTask(req, res) }
)

router.get("/:id", (req, res) => {
    taskController.getOneTaskById(req, res)
})

router.get("/company-id/:id", (req, res) => {
    taskController.getTaskByCompanyId(req, res)
})

router.put("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminOrManagerRole,
    (req, res) => { taskController.updateTask(req, res) }
)

router.delete("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminRole,
    (req, res) => { taskController.deleteTask(req, res) }
)

module.exports = { router }