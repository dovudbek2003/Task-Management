const Postgres = require("../../lib/pg.js")

class UserTaskRepository extends Postgres {
    async insert(dto) {
        return await this.fetch(
            `insert into user_tasks(user_id, task_id, start_at, end_at)
            values($1, $2, $3, $4) returning *
            `,
            dto.user_id,
            dto.task_id,
            dto.start_at,
            dto.end_at
        )
    }

    async findById(id) {
        return await this.fetch(
            `select * from user_tasks where id = $1`,
            id
        )
    }

    async findByTaskId(taskId) {
        return await this.fetchAll(
            `select user_tasks.id,
            (select row_to_json(users.*) as user from users where id = user_tasks.user_id),
            (select row_to_json(tasks.*) as task from tasks where id = user_tasks.task_id),
            user_tasks.start_at,
            user_tasks.end_at,
            user_tasks.started_date,
            user_tasks.ended_date,
            user_tasks.status
            from user_tasks where task_id = $1`,
            taskId
        )
    }

    async findByUserId(userId) {
        return await this.fetchAll(
            `select user_tasks.id,
            (select row_to_json(users.*) as user from users where id = user_tasks.user_id),
            (select row_to_json(tasks.*) as task from tasks where id = user_tasks.task_id),
            user_tasks.start_at,
            user_tasks.end_at,
            user_tasks.started_date,
            user_tasks.ended_date,
            user_tasks.status
            from user_tasks where user_id = $1`,
            userId
        )
    }

    async update(dto, id) {
        return await this.fetch(
            `update user_tasks
            set user_id = $1, task_id = $2, start_at = $3, end_at = $4, started_date = $5, ended_date = $6, status = $7
            where id = $8 returning *
            `,
            dto.user_id,
            dto.task_id,
            dto.start_at,
            dto.end_at,
            dto.started_date,
            dto.ended_date,
            dto.status,
            id
        )
    }

    async deleteUserTask(id) {
        return await this.fetch(
            `delete from user_tasks where id = $1 returning *`,
            id
        )
    }

    async deleteUserTaskByUserId(userId) {
        return await this.fetch(
            `delete from user_tasks where user_id = $1`,
            userId
        )
    }

    async deleteUserTaskByTaskId(taskId) {
        return await this.fetch(
            `delete from user_tasks where task_id = $1`,
            taskId
        )
    }
}

module.exports = UserTaskRepository