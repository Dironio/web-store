import { body } from "express-validator";

export const authValidate = [
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    body('username').isLength({ min: 3 })
];

export const loginValidate = [
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 3 }),
];