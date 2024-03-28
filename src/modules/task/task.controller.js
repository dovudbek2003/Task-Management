const ResData = require("../../common/resData.js")
const validationSchema = require("../../lib/validationSchema.js")
const taskSchema = require("./validator/task.schema.js")
const { roles } = require("../../common/enums/roles.js")

class TaskController {
    #taskService
    #companyService
    #userService
    #userTaskService
    constructor(taskService, companyService, userService, userTaskService) {
        this.#taskService = taskService;
        this.#companyService = companyService;
        this.#userService = userService;
        this.#userTaskService = userTaskService
    }

    // CREATE
    async createTask(req, res) {
        try {
            const dto = req.body,
                currentUser = req.currentUser;

            if (currentUser.role !== roles.SUPERADMIN) {
                dto.companyId = currentUser.company_id
            }

            validationSchema(taskSchema, dto)
            if (dto.companyId) {
                await this.#companyService.getOneCompanyById(dto.companyId)
            }

            if (dto.parentId) {
                await this.#userService.getOneUserById(dto.parentId)
            }

            const resData = await this.#taskService.createTask(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }

    }

    // READE
    async getTaskByCompanyId(req, res) {
        try {
            const companyId = req.params.id

            const resData = await this.#taskService.getTaskByCompanyId(companyId)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    async getOneTaskById(req, res) {
        try {
            const id = req.params.id

            const resData = await this.#taskService.getOneTaskById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // UPDATE
    async updateTask(req, res) {
        try {
            const dto = req.body,
                currentUser = req.currentUser,
                id = req.params.id;

            if (currentUser.role !== roles.SUPERADMIN) {
                dto.companyId = currentUser.company_id
            }

            validationSchema(taskSchema, dto)
            if (dto.companyId) {
                await this.#companyService.getOneCompanyById(dto.companyId)
            }

            if (dto.parentId) {
                await this.#userService.getOneUserById(dto.parentId)
            }

            const resData = await this.#taskService.updateTask(dto, id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }

    }

    // DELETE
    async deleteTask(req, res) {
        try {
            const id = req.params.id

            await this.#userTaskService.deleteUserTaskByTaskId(id)

            const resData = await this.#taskService.deleteTask(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }
}

module.exports = TaskController