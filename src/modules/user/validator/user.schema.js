const Joi = require("joi")
const { roles } = require("../../../common/enums/roles.js")

const rolesArray = Object.values(roles)

rolesArray.pop()

const userRegistrSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
    companyId: Joi.number().integer(),
    role: Joi.string().valid(...rolesArray).required(),
})

const userLoginSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = { userRegistrSchema, userLoginSchema }