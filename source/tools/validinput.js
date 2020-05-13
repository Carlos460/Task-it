const joi = require('@hapi/joi');

//Validation from JOI
const loginValidation = (data) => {
    const schema = {
        username: joi.string().min(3).max(30).required(),
        password: joi.string().min(5).required(),
    };
    return joi.object(schema).validate(data);
};

const registerValidation = (data) => {
    const schema = {
        username: joi.string().min(3).max(30).required(),
        email: joi.string().min(5).max(30).required().email(),
        password: joi.string().min(5).required(),
    };
    return joi.object(schema).validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
