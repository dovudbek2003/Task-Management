class TaskNotFound extends Error {
    constructor() {
        super("task not found")
        this.statusCode = 404
    }
}

module.exports = { TaskNotFound }