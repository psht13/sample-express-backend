import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'any.required': 'Name is required',
  }),
  age: Joi.number().integer().min(6).max(16).required().messages({
    'number.base': 'Age should be a number',
    'number.min': 'Age must be at least 6',
    'number.max': 'Age must be at most 16',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required({
    'any.required': 'Gender is required',
    'any.only': 'Gender must be male, female or other',
  }),
  avgMark: Joi.number().min(2).max(12).required().messages({
    'number.min': 'Average mark must be at least 2',
    'number.max': 'Average mark must be at most 12',
    'any.required': 'Average mark is required',
  }),
  onDuty: Joi.boolean(),
  parentId: Joi.string().required(), // нова властивість
});
