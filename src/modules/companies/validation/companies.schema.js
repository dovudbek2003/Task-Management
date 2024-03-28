const Joi = require("joi")

const companySchema = Joi.object({
    name: Joi.string().required()
})

module.exports = companySchema