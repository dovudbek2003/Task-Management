const Postgres = require("../../lib/pg.js")

class CompaniesRepository extends Postgres {
    async insert(dto) {
        return await this.fetch(
            `insert into companies(name) values($1) returning *`,
            dto.name
        )
    }

    async findAll() {
        return await this.fetchAll(
            `select * from companies`
        )
    }

    async findById(id) {
        return await this.fetch(
            'select * from companies where id = $1',
            id
        )
    }

    async findByName(name) {
        return await this.fetch(
            'select * from companies where name = $1',
            name
        )
    }

    async findByCompanyId(companyId) {
        return await this.fetch(
            `select * from companies where id = $1`,
            companyId
        )
    }

    async update(dto, id) {
        return await this.fetch(
            `update companies set name = $1 where id = $2 returning *`,
            dto.name,
            id
        )
    }

    async deleteCompany(id) {
        return await this.fetch(
            `delete from companies where id = $1 returning *`,
            id
        )
    }
}

module.exports = CompaniesRepository