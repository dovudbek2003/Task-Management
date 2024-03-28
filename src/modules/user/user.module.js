const { Router } = require("express")
const AuthorizationMiddleware = require("../../middleware/authorization.js")

const UserService = require("./user.service.js")
const CompanyService = require("../companies/companies.service.js")
const UserTaskService = require("../user_task/user_task.service.js")

const UserController = require("./user.controller.js")

const router = Router()

const userService = new UserService()
const companyService = new CompanyService()
const userTaskService = new UserTaskService()

const userController = new UserController(userService, companyService, userTaskService)

const authorizationMiddleware = new AuthorizationMiddleware()

router.post("/register",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminRole,
    (req, res) => { userController.register(req, res) }
)

router.post("/login", (req, res) => {
    userController.login(req, res)
})

router.get("/",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    (req, res) => { userController.getAllUser(req, res) }
)

router.get("/:id", (req, res) => {
    userController.getOneUserById(req, res)
})

router.put("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminRole,
    (req, res) => { userController.updateUser(req, res) }
)

router.delete("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminOrAdminRole,
    (req, res) => { userController.deleteUser(req, res) }
)

module.exports = { router }