const knex = require('../db/knex');
const bcrypt=  require("bcrypt");
import { User } from '../model/userModel';
import { Request, Response } from "express";

module.exports.register = async (req: Request, res: Response, next:any) => {
    try{
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = {
            username: username,
            password: hashedPassword,
            email: email,
            profile_picture: "default.png"
        }
        const [newUser] = await knex('users').insert(user).returning('*').catch((err:any)=>{
            console.log(err);
            return res.json({status:false});
        });
        const {id} = newUser;
        return res.json({status:true, id});
    }catch(ex){
        next(ex);
    }
};

module.exports.login = async (req: Request, res: Response, next:any) => {
    try{
        const {username, password} = req.body;
        const userFound = await knex('users').select('*').where({username}).first();
        if (!userFound){
            return res.json({status:false});
        }
        const user = await knex('users').select('*').where({username}).first();
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.json({status:false});
        }
        const {id} = user;
        return res.json({status:true, id});
    }catch(ex){
        next(ex);
    }
};