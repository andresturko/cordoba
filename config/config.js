import 'dotenv/config';
//require('dotenv').config();

export const config = {
    secretKey: process.env.JWT_SECRET,
    tokenExpiresIn: process.env.JWT_EXPIRATION
};