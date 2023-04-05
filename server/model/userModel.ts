const knex = require('../db/knex');

export interface User {
    id?:number,
    username:string,
    password:string,
    email:string,
    profile_picture:string,
    createdAt?: Date,
    updatedAt?: Date,
} 