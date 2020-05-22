const joi = require('@hapi/joi');

//Validation from JOI
const loginValidation = (data) => {
    const schema = {
        username: joi.string().min(3).max(10).required(),
        password: joi.string().min(6).required(),
    };
    return joi.object(schema).validate(data);
};

const registerValidation = (data) => {
    const schema = {
        username: joi.string().min(3).max(10).required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
    };
    return joi.object(schema).validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
