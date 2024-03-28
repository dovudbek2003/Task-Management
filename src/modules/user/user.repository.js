const Postgres = require("../../lib/pg.js")

class UserRepository extends Postgres {
    async insert(dto) {
        return await this.fetch(
            `insert into users(login, password, full_name, company_id, role)
            values($1, $2, $3, $4, $5) returning *
            `,
            dto.login,
            dto.password,
            dto.full_name,
            dto.company_id,
            dto.role
        )
    }

    async findAll(companyId) {
        return await this.fetchAll(
            `select * from users where company_id = $1`,
            companyId
        )
    }

    async findById(id) {
        return await this.fetch(
            `select * from users where id = $1`,
            id
        )
    }

    async findByLogin(login) {
        return await this.fetch(
            `select * from users where login = $1`,
            login
        )
    }

    async update(dto, id) {
        return await this.fetch(
            `update users set login = $1, password = $2, full_name = $3, company_id = $4, role = $5 where id = $6 returning *`,
            dto.login,
            dto.password,
            dto.full_name,
            dto.company_id,
            dto.role,
            id
        )
    }

    async deleteUser(id) {
        return await this.fetch(
            `delete from users where id = $1 returning *`, id
        )
    }
}

module.exports = UserRepository
