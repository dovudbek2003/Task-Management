class CompanyNotFound extends Error {
    constructor() {
        super("company not found")
        this.statusCode = 404
    }
}

class CompanyAlreadyExist extends Error {
    constructor() {
        super("company already exist")
        this.statusCode = 400
    }
}

class UserCompanyNotFound extends Error {
    constructor() {
        super("user company not found")
        this.statusCode = 404
    }
}

module.exports = { CompanyNotFound, CompanyAlreadyExist, UserCompanyNotFound }