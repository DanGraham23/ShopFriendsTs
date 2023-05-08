const Joi = require('joi');

const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false});

const itemTypes = ["shirt", "other", "shoes", "hat", "pants"]

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(8).max(24).required(),
});

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(8).max(24).required(),
    email: Joi.string().email().min(8).max(24).required(),
});

const addItemSchema = Joi.object({
    user_id: Joi.number().integer(3).required(),
    description: Joi.string().min(3).max(200).required(),
    name: Joi.string().min(3).max(20).required(),
    price: Joi.number().precision(2).required(),
    tag: Joi.string().valid(...itemTypes).required()
    
});

const checkoutItemSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    item_image: Joi.string().required(),
    tag: Joi.string().valid(...itemTypes).required(),
    created_at: Joi.string().required(),
    updated_at: Joi.string().required(),
    user_id: Joi.number().integer().required(),
    profile_picture: Joi.string().required(),
    username: Joi.string().required(),
});

const checkoutSchema = Joi.array().items(checkoutItemSchema);

exports.validateLogin = validator(loginSchema);
exports.validateRegister = validator(registerSchema);
exports.validateAddItem = validator(addItemSchema);
exports.validateCheckout = validator(checkoutSchema);