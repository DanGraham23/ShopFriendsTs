const knex = require('../db/knex');
const bcrypt=  require("bcrypt");
import { User } from "../model/userModel";
import { NextFunction, Request, Response } from "express";

module.exports.register = async (req: Request, res: Response, next:NextFunction) => {
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
        
module.exports.login = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {username, password} = req.body;
        const userFound: User = await knex('users').select('*').where({username}).first();
        if (!userFound){
            return res.json({status:false});
        }
        const validPassword = await bcrypt.compare(password, userFound.password);
        if (!validPassword){
            return res.json({status:false});
        }
        const {id} = userFound;
        return res.json({status:true, id});
    }catch(ex){
        next(ex);
    }
};

module.exports.updatepfp = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {id, profile_picture} = req.body;
        const user = await knex('users').where({id: id}).first();
        if (!user){
            return res.json({status:false});
        }
        knex('users').where({id: id}).update({
            profile_picture: profile_picture,
            updated_at: new Date()
        }).then(() =>{
            return res.json({status:true});
        }).catch((err:any) => {
            return res.json({status:false});
        });
    }catch(ex){
        next(ex);
    }
};