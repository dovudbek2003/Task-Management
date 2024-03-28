const ResData = require("../../common/resData.js")
const validationSchema = require("../../lib/validationSchema.js")
const { userCreateTaskSchema, userUpdateTaskSchema } = require("./validator/user_task.schema.js")

class UserTaskController {
    #userTaskService
    #userService
    #taskService
    constructor(userTaskService, userService, taskService) {
        this.#userTaskService = userTaskService;
        this.#userService = userService;
        this.#taskService = taskService;
    }

    // CREATE
    async createUserTask(req, res) {
        try {
            const dto = req.body

            validationSchema(userCreateTaskSchema, dto)

            await this.#userService.getOneUserById(dto.userId)
            await this.#taskService.getOneTaskById(dto.taskId)

            const resData = await this.#userTaskService.createUserTask(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // READE
    async getOneUserTaskById(req, res) {
        try {
            const id = req.params.id

            const resData = await this.#userTaskService.getOneUserTaskById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    async getUserTaskByTaskId(req, res) {
        try {
            const taskId = req.params.id

            const resData = await this.#userTaskService.getUserTaskByTaskId(taskId)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    async getUserTaskByUserId(req, res) {
        try {
            const userId = req.params.id

            const resData = await this.#userTaskService.getUserTaskByUserId(userId)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // UPDATE
    async updateUserTask(req, res) {
        try {
            const dto = req.body,
                id = req.params.id;

            validationSchema(userUpdateTaskSchema, dto)

            await this.#userService.getOneUserById(dto.userId)
            await this.#taskService.getOneTaskById(dto.taskId)

            const resData = await this.#userTaskService.updateUserTask(dto, id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // DELETE
    async deleteUserTask(req, res) {
        try {
            const id = req.params.id

            const resData = await this.#userTaskService.deleteUserTask(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }
}

module.exports = UserTaskController