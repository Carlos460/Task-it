const joi = require('@hapi/joi');

//Validation from JOI
const register = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().min(5).max(30).required().email(),
    password: joi.string().min(5).required(),
});

const registerValidation = (data) => {
    const schema = {
        username: joi.string().min(3).max(30).required(),
        email: joi.string().min(5).max(30).required().email(),
        password: joi.string().min(5).required(),
    };
    return joi.object(schema).validate(data);
};

module.exports.registerValidation = registerValidation;
