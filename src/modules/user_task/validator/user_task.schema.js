const Joi = require("joi")
const { status } = require("../../../common/enums/roles.js")

const statusArray = Object.values(status)

const userCreateTaskSchema = Joi.object({
    userId: Joi.number().integer().required(),
    taskId: Joi.number().integer().required(),
    startAt: Joi.string().required(),
    endAt: Joi.string().required()
})

const userUpdateTaskSchema = Joi.object({
    userId: Joi.number().integer().required(),
    taskId: Joi.number().integer().required(),
    startAt: Joi.string().required(),
    endAt: Joi.string().required(),
    startedDate: Joi.string(),
    endedDate: Joi.string(),
    status: Joi.string().valid(...statusArray).required()
})


module.exports = { userCreateTaskSchema, userUpdateTaskSchema }   