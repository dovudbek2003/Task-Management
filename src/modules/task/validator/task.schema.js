const Joi = require("joi")

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    companyId: Joi.number().integer(),
    parentId: Joi.number().integer(),
})

module.exports = taskSchema 