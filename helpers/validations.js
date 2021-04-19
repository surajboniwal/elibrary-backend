const { Validator } = require('node-input-validator')

async function registrationValidation (body){
    const validation = new Validator(body, {
        email: 'email|required',
        phoneNumber: 'phoneNumber',
        password: 'required',
        name: 'required'
    })

    const valid = await validation.check();

    return {
        valid: valid,
        errors: validation.errors
    }
}

async function loginValidation (body){
    const validation = new Validator(body, {
        email: 'email|required',
        password: 'required'
    })

    const valid = await validation.check();


    return {
        valid: valid,
        errors: validation.errors
    }
}

async function addBookValidation(body){
    const validation = new Validator(body, {
        title: 'required',
        description: 'required',
        quantity: 'required'
    })

    const valid = await validation.check();


    return {
        valid: valid,
        errors: validation.errors
    }
}

module.exports = {
    registrationValidation,
    loginValidation,
    addBookValidation
}