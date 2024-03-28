class UserTaskNotFound extends Error {
    constructor() {
        super("user_tasks not found")
        this.statusCode = 404
    }
}

class UserTaskUsersNotFound extends Error {
    constructor() {
        super("users not found")
        this.statusCode = 404
    }
}

class UserTasksTasksNotFound extends Error {
    constructor() {
        super("tasks not found")
        this.statusCode = 404
    }
}
module.exports = { UserTaskNotFound, UserTaskUsersNotFound, UserTasksTasksNotFound }