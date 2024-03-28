const { Router } = require("express")
const AuthorizationMiddleware = require("../../middleware/authorization.js")

const UserTaskService = require("./user_task.service.js")
const UserService = require("../user/user.service.js")
const TaskService = require("../task/task.service.js")

const UserTaskController = require("./user_task.controller.js")

const authorizationMiddleware = new AuthorizationMiddleware()

const router = Router()

const userTaskService = new UserTaskService()
const userService = new UserService()
const taskService = new TaskService()

const userTaskController = new UserTaskController(userTaskService, userService, taskService)

router.post("/",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminOrManagerRole,
    (req, res) => { userTaskController.createUserTask(req, res) }
)

router.get("/task-id/:id", (req, res) => {
    userTaskController.getUserTaskByTaskId(req, res)
})

router.get("/user-id/:id", (req, res) => {
    userTaskController.getUserTaskByUserId(req, res)
})

router.get("/:id", (req, res) => {
    userTaskController.getOneUserTaskById(req, res)
})

router.put("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminOrManagerRole,
    (req, res) => { userTaskController.updateUserTask(req, res) }
)

router.delete("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminRole,
    (req, res) => { userTaskController.deleteUserTask(req, res) }
)

module.exports = { router }