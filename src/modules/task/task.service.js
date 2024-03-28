const TaskRepository = require("./task.repository.js")
const Task = require("./entity/task.entity.js")
const ResData = require("../../common/resData.js")
const { TaskNotFound } = require("./exception/task.exception.js")

class TaskService {
    #repository
    constructor() {
        this.#repository = new TaskRepository()
    }

    // CREATE
    async createTask(dto) {
        const newTask = new Task(dto)
        const createdTask = await this.#repository.insert(newTask)

        const resData = new ResData("create", 201, createdTask)
        return resData
    }

    // READE
    async getTaskByCompanyId(companyId) {
        const foundTasks = await this.#repository.findByCompanyId(companyId)

        const resData = new ResData("get all company tasks", 200, foundTasks)
        return resData
    }

    async getOneTaskById(id) {
        const task = await this.#repository.findById(id)
        if (!task) {
            throw new TaskNotFound()
        }

        const resData = new ResData("get one task", 200, task)
        return resData
    }

    // UPDATE
    async updateTask(dto, id) {
        const { data: foundTask } = await this.getOneTaskById(id)

        foundTask.title = dto.title;
        foundTask.description = dto.description;
        foundTask.company_id = dto.companyId;
        foundTask.parent_id = dto.parentId;

        const updatedTask = await this.#repository.update(foundTask, id)

        const resData = new ResData("update", 200, updatedTask)
        return resData
    }

    // DELETE
    async deleteTask(id) {
        await this.getOneTaskById(id)

        const deletedTask = await this.#repository.deleteTask(id)

        const resData = new ResData("delete", 200, deletedTask)
        return resData
    }
}

module.exports = TaskService