const { UserLoginAlreadyExistException, UserNotFound, UserDeleteException, UserLoginNotFound, UserLoginWrongException } = require("./exception/user.exception.js")
const UserRepository = require("./user.repository.js")
const User = require("./entity/user.entity.js")
const { hashedPassword, isPassEqual } = require("../../lib/bcript.js")
const { generateJWTToken, verifyToken } = require("../../lib/jwt.js")
const ResData = require("../../common/resData.js")
const { roles } = require("../../common/enums/roles.js")

class UserService {
    #repository
    constructor() {
        this.#repository = new UserRepository()
    }

    // CREATE
    async createUser(dto) {
        const foundByLogin = await this.#repository.findByLogin(dto.login)
        if (foundByLogin) {
            throw new UserLoginAlreadyExistException()
        }

        const hashPass = await hashedPassword(dto.password);
        dto.password = hashPass;

        const newUser = new User(dto)
        const createdUser = await this.#repository.insert(newUser)

        const token = generateJWTToken(createdUser.id)
        const resData = new ResData('user created', 201, {
            user: createdUser,
            token
        })

        return resData
    }

    // READE
    async login(dto) {
        const foundUser = await this.getOneUserByLogin(dto.login)

        const comparePassword = await isPassEqual(dto.password, foundUser.password)
        if (!comparePassword) {
            throw new UserLoginWrongException()
        }

        const token = generateJWTToken(foundUser.id)

        const resData = new ResData("success login", 200, {
            user: foundUser,
            token
        })
        return resData
    }

    async getAllUser(companyId) {
        const users = await this.#repository.findAll(companyId)

        const resData = new ResData("get all user", 200, users)
        return resData
    }

    async getOneUserById(id) {
        const user = await this.#repository.findById(id)
        if (!user) {
            throw new UserNotFound()
        }

        const resData = new ResData("get one user", 200, user)
        return resData
    }

    async getOneUserByLogin(login) {
        const foundUser = await this.#repository.findByLogin(login)
        if (!foundUser) {
            throw new UserLoginNotFound()
        }

        return foundUser
    }

    // UPDATE
    async updateUser(dto, id) {
        const foundUser = await this.getOneUserById(id)

        const hashPass = await hashedPassword(dto.password);
        dto.password = hashPass;

        foundUser.login = dto.login;
        foundUser.password = dto.password;
        foundUser.full_name = dto.fullName;
        foundUser.company_id = dto.companyId;
        foundUser.role = dto.role;

        const updatedUser = await this.#repository.update(foundUser, id)

        const resData = new ResData("update", 200, updatedUser)
        return resData
    }

    // DELETE
    async deleteUser(id, currentUser) {
        const { data: foundUser } = await this.getOneUserById(id)
        console.log("foun",foundUser);
        console.log("creeServise", currentUser);

        if (currentUser.role !== roles.SUPERADMIN && currentUser.company_id !== foundUser.company_id) {
            throw new UserDeleteException()
        }

        const deletedUser = await this.#repository.deleteUser(id)
        const resData = new ResData("delete", 200, deletedUser)
        return resData
    }
}

module.exports = UserService