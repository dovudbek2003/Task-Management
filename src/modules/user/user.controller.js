const ResData = require("../../common/resData.js")
const { userLoginSchema, userRegistrSchema } = require("./validator/user.schema.js")
const validationSchema = require("../../lib/validationSchema.js")
const { roles } = require("../../common/enums/roles.js")

class UserController {
    #userService
    #companyService
    #userTaskService
    constructor(userService, companyService, userTaskService) {
        this.#userService = userService
        this.#companyService = companyService
        this.#userTaskService = userTaskService
    }

    // CREATE
    async register(req, res) {
        try {
            const dto = req.body,
                currentUser = req.currentUser;

            if (currentUser.role == roles.ADMIN) {
                dto.companyId = currentUser.company_id
            }

            validationSchema(userRegistrSchema, dto)

            if (dto.companyId) {
                await this.#companyService.getOneCompanyById(dto.companyId)
            }

            const resData = await this.#userService.createUser(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // READE
    async login(req, res) {
        try {
            const dto = req.body

            validationSchema(userLoginSchema, dto)

            const resData = await this.#userService.login(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    async getAllUser(req, res) {
        try {
            let currentUser = req.currentUser,
                companyId;

            if (currentUser.role == roles.SUPERADMIN) {
                companyId = req.query.companyId
            } else {
                companyId = currentUser.company_id
            }

            const resData = await this.#userService.getAllUser(companyId)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    async getOneUserById(req, res) {
        try {
            const id = req.params.id

            const resData = await this.#userService.getOneUserById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // UPDATE
    async updateUser(req, res) {
        try {
            const dto = req.body,
                id = req.params.id,
                currentUser = req.currentUser;

            if (currentUser.role == roles.ADMIN) {
                dto.companyId = currentUser.company_id
            }

            validationSchema(userRegistrSchema, dto)

            if (dto.companyId) {
                await this.#companyService.getOneCompanyById(dto.companyId)
            }

            const resData = await this.#userService.updateUser(dto, id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // DELETE
    async deleteUser(req, res) {
        try {
            const id = req.params.id,
                currentUser = req.currentUser;
                console.log("kirmayapti");
            await this.#userTaskService.deleteUserTaskByUserId(id, currentUser)

            const resData = await this.#userService.deleteUser(id, currentUser)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }
}

module.exports = UserController