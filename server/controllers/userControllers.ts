const knex = require('../db/knex');
const bcrypt=  require("bcrypt");
import { send } from "process";
import { Review } from "../model/reviewModel";
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
        const userFound: User[] = await knex('users').where({ username}).orWhere({ email});
        if (userFound.length > 0){
            return res.json({status:false});
        }
        const newUser: User[] = await knex('users').insert(user).returning('*').catch((err:any)=>{
            return res.json({status:false});
        });
        const returnedUser = (({ id, username }) => ({ id, username }))(newUser[0]);
        return res.json({status:true, returnedUser});
    }catch(ex){
        next(ex);
    }
};
        
module.exports.login = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {username, password} = req.body;
        const userFound: User[] = await knex('users').where({username});
        if (userFound.length == 0){
            return res.json({status:false});
        }
        const user = userFound[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.json({status:false});
        }
        const returnedUser = (({ id, username }) => ({ id, username }))(user);
        return res.json({status:true, returnedUser});
    }catch(ex){
        next(ex);
    }
};

module.exports.updatePfp = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {id, profile_picture} = req.body;
        const userFound: User[] = await knex('users').where({id});
        if (userFound.length == 0){
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

module.exports.addReview = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {receiver_user_id, sender_user_id, rating} = req.body;
        if (receiver_user_id === sender_user_id){
            return res.json({status:false});
        }
        const reviewFound: Review[] = await knex('review').select('*').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]);
        if (reviewFound.length > 0){
            await knex('review').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]).update({
                rating: rating
            }).catch((err) => {
                return res.json({status:false, msg: "unknown user"});
            });
            return res.json({status: true});
        }else{
            const newReview : Review = {
                receiver_user_id,
                sender_user_id,
                rating
            }
            await knex('review').insert(newReview).catch((err) => {
                return res.json({status:false, msg: "unknown user"});
            });
            return res.json({status: true});
        }
    }catch(ex){
        next(ex);
    }
};

module.exports.getReviews = async (req: Request, res: Response, next:NextFunction) =>{
    try{
        const {receiver_user_id} = req.body;
        const reviewsFound: Review[] = await knex('review').select('*').whereRaw('receiver_user_id = ?', receiver_user_id);
        if (reviewsFound.length > 0){
            let score = 0;
            reviewsFound.forEach((review) => score += review.rating);
            score /= reviewsFound.length;
            return res.json({status:true, rating:score});
        }else{
            //Default rating of 3, which is fairly neutral
            return res.json({status:true, rating:3})
        }
    }catch(ex){
        next(ex);
    }
};