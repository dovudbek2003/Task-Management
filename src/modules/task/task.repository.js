const Postgres = require("../../lib/pg.js")

class TaskRepository extends Postgres {
    async insert(dto) {
        return await this.fetch(
            `insert into tasks(title, description, company_id, parent_id)
            values($1, $2, $3, $4) returning *
            `,
            dto.title,
            dto.description,
            dto.company_id,
            dto.parent_id,
        )
    }

    async findByCompanyId(id) {
        return await this.fetchAll(
            `select * from tasks where company_id = $1`,
            id
        )
    }

    async findById(id) {
        return await this.fetch(
            `select * from tasks where id = $1`,
            id
        )
    }

    async update(dto, id) {
        return await this.fetch(
            `update tasks
            set title = $1, description = $2, company_id = $3, parent_id = $4
            where id = $5 returning *
            `,
            dto.title,
            dto.description,
            dto.company_id,
            dto.parent_id,
            id
        )
    }

    async deleteTask(id) {
        return await this.fetch(
            `delete from tasks where id = $1 returning *`,
            id
        )
    }
}

module.exports = TaskRepository