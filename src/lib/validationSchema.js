const BadRequestException = require("../common/exception/exception.js");


const validationSchema = (schema, dto) => {
    const { error } = schema.validate(dto);

    if (error) {
        throw new BadRequestException(error.message);
    }
};

module.exports = validationSchema;