const { Router } = require("express")
const AuthorizationMiddleware = require("../../middleware/authorization.js")

const CompanyService = require("./companies.service.js")
const CompanyController = require("./companies.controller.js")

const router = Router()

const companyService = new CompanyService()
const companyController = new CompanyController(companyService)

const authorizationMiddleware = new AuthorizationMiddleware()

router.post("/",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminRole,
    (req, res) => { companyController.createCompany(req, res) }
)

router.get("/",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminRole,
    (req, res) => { companyController.getAllCompany(req, res) }
)

router.get("/my-company/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    (req, res) => { companyController.getMyCompany(req, res) }
)

router.put("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminRole,
    (req, res) => { companyController.updateCompany(req, res) }
)

router.delete("/:id",
    authorizationMiddleware.checkToken,
    authorizationMiddleware.checkUser,
    authorizationMiddleware.checkSuperAdminRole,
    (req, res) => { companyController.deleteCompany(req, res) }
)


module.exports = { router }