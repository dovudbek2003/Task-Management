const CompaniesRepository = require("./companies.repository.js")
const { CompanyNotFound, CompanyAlreadyExist, UserCompanyNotFound } = require("./exception/companies.exception.js")
const Company = require("./entity/companies.entity.js")
const ResData = require("../../common/resData.js")

class CompanyService {
    #repository
    constructor() {
        this.#repository = new CompaniesRepository()
    }

    // CREATE
    async createCompany(dto) {
        await this.getOneCompanyByName(dto.name)
        const newCompany = new Company(dto)

        const createdCompany = await this.#repository.insert(newCompany)

        const resData = new ResData('create', 201, createdCompany)
        return resData
    }

    // READE
    async getAllCompany() {
        const companies = await this.#repository.findAll()

        const resData = new ResData("get all", 200, companies)
        return resData
    }

    async getMyCompany(companyId) {
        const foundCompany = await this.#repository.findByCompanyId(companyId)
        if (!foundCompany) {
            throw new UserCompanyNotFound()
        }

        const resData = new ResData("get user company", 200, foundCompany)
        return resData
    }

    async getOneCompanyById(id) {
        const foundCompany = await this.#repository.findById(id)
        if (!foundCompany) {
            throw new CompanyNotFound()
        }

        return foundCompany
    }

    async getOneCompanyByName(name) {
        const foundCompany = await this.#repository.findByName(name)
        if (foundCompany) {
            throw new CompanyAlreadyExist()
        }

        return foundCompany
    }

    // UPDATE
    async updateCompany(dto, id) {
        const foundCompany = await this.getOneCompanyById(id)
        foundCompany.name = dto.name;

        const updatedCompany = await this.#repository.update(foundCompany, id)
        const resData = new ResData('update', 200, updatedCompany)
        return resData
    }

    // DELETE
    async deleteCompany(id) {
        await this.getOneCompanyById(id)

        const deletedCompany = await this.#repository.deleteCompany(id)
        const resData = new ResData('delete', 200, deletedCompany)
        return resData
    }
}

module.exports = CompanyService