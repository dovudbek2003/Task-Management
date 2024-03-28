const ResData = require("../../common/resData.js")
const UserTask = require("./entity/user_task.entity.js")
const UserTaskRepository = require("./user_task.repository.js")
const { UserTaskNotFound, UserTaskUsersNotFound, UserTasksTasksNotFound } = require("./exception/user_task.exception.js")

class UserTaskService {
    #repository
    constructor() {
        this.#repository = new UserTaskRepository()
    }

    // CREATE
    async createUserTask(dto) {
        const newUserTask = new UserTask(dto)

        const createdUserTask = await this.#repository.insert(newUserTask)

        const resData = new ResData("create", 201, createdUserTask)
        return resData
    }

    // READE
    async getOneUserTaskById(id) {
        const foundUserTask = await this.#repository.findById(id)
        if (!foundUserTask) {
            throw new UserTaskNotFound()
        }

        const resData = new ResData("get one user_task", 200, foundUserTask)
        return resData
    }

    async getUserTaskByTaskId(taskId) {
        const foundUserTaskByTaskId = await this.#repository.findByTaskId(taskId)
        if (!foundUserTaskByTaskId.length) {
            throw new UserTaskUsersNotFound()
        }

        const resData = new ResData("get users", 200, foundUserTaskByTaskId)
        return resData
    }

    async getUserTaskByUserId(userId) {
        const foundUserTaskByUserId = await this.#repository.findByUserId(userId)
        if (!foundUserTaskByUserId.length) {
            throw new UserTasksTasksNotFound()
        }

        const resData = new ResData("get tasks", 200, foundUserTaskByUserId)
        return resData
    }

    // UPDATE
    async updateUserTask(dto, id) {
        const foundUserTask = await this.getOneUserTaskById(id)

        foundUserTask.user_id = dto.userId;
        foundUserTask.task_id = dto.taskId;
        foundUserTask.start_at = dto.startAt;
        foundUserTask.end_at = dto.endAt;
        foundUserTask.started_date = dto.startedDate;
        foundUserTask.ended_date = dto.endedDate;
        foundUserTask.status = dto.status;

        const updatedUserTask = await this.#repository.update(foundUserTask, id)

        const resData = new ResData("update", 200, updatedUserTask)
        return resData
    }

    // DELETE
    async deleteUserTask(id) {
        await this.getOneUserTaskById(id)
        const deletedUserTask = await this.#repository.deleteUserTask(id)

        const resData = new ResData("delete", 200, deletedUserTask)
        return resData
    }

    async deleteUserTaskByUserId(userId) {
        await this.#repository.deleteUserTaskByUserId(userId)
    }

    async deleteUserTaskByTaskId(taskId) {
        await this.#repository.deleteUserTaskByTaskId(taskId)
    }
}

module.exports = UserTaskService