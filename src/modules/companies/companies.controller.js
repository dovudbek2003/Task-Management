const ResData = require("../../common/resData.js")
const validationSchema = require("../../lib/validationSchema.js")
const companySchema = require("./validation/companies.schema.js")
const { roles } = require("../../common/enums/roles.js")

class CompanyController {
    #companyService
    constructor(companyService) {
        this.#companyService = companyService
    }

    // CREATE
    async createCompany(req, res) {
        try {
            const dto = req.body
            validationSchema(companySchema, dto)

            const resData = await this.#companyService.createCompany(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // READE
    async getAllCompany(req, res) {
        try {
            const resData = await this.#companyService.getAllCompany()
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    async getMyCompany(req, res) {
        try {
            let companyId = req.currentUser.company_id,
                currentUser = req.currentUser;

            if (currentUser.role == roles.SUPERADMIN) {
                companyId = req.params.id
            }

            const resData = await this.#companyService.getMyCompany(companyId)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // UPDATE
    async updateCompany(req, res) {
        try {
            const dto = req.body,
                id = req.params.id;

            validationSchema(companySchema, dto)

            const resData = await this.#companyService.updateCompany(dto, id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }

    // DELETE
    async deleteCompany(req, res) {
        try {
            const id = req.params.id

            const resData = await this.#companyService.deleteCompany(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error)
            res.status(resData.statusCode).json(resData)
        }
    }
}

module.exports = CompanyController