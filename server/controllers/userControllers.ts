const knex = require('../db/knex');
const bcrypt=  require("bcrypt");
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
            return res.status(400).json({error:'Account creation failed! Username or Email already exists'});
        }
        const newUser: User[] = await knex('users').insert(user).returning('*').catch((err:any)=>{
            return res.status(400).json({error:'Failed to create account, try again!'});
        });
        const returnedUser = (({ id, username }) => ({ id, username }))(newUser[0]);
        return res.status(201).json({returnedUser});
    }catch(ex){
        next(ex);
    }
};
        
module.exports.login = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {username, password} = req.body;
        const userFound: User[] = await knex('users').where({username});
        if (userFound.length == 0){
            return res.status(404).json({error:'No user exists with those credentials'});
        }
        const user = userFound[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(404).json({error:'No user exists with those credentials'});
        }
        const returnedUser = (({ id, username }) => ({ id, username }))(user);
        return res.status(201).json({returnedUser});
    }catch(ex){
        next(ex);
    }
};

module.exports.updatePfp = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {id, profile_picture} = req.body;
        const userFound: User[] = await knex('users').where({id});
        if (userFound.length == 0){
            return res.status(404).json({error:'Trying to update invalid user'});
        }
        knex('users').where({id: id}).update({
            profile_picture: profile_picture,
            updated_at: new Date()
        }).then(() =>{
            return res.status(201).json({msg:'Profile picture updated!'});
        }).catch((err:any) => {
            return res.status(404).json({error:'Trying to update invalid user'});
        });
    }catch(ex){
        next(ex);
    }
};

module.exports.addReview = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {receiver_user_id, sender_user_id, rating} = req.body;
        if (receiver_user_id === sender_user_id){
            return res.status(403).json({error:'Cannot update own rating'});
        }
        const reviewFound: Review[] = await knex('review').select('*').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]);
        if (reviewFound.length > 0){
            await knex('review').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]).update({
                rating: rating
            }).catch((err) => {
                return res.status(404).json({error:'Cannot rate unknown user'});
            });
            return res.status(200).json({msg:'Review added!'});
        }else{
            const newReview : Review = {
                receiver_user_id,
                sender_user_id,
                rating
            }
            await knex('review').insert(newReview).catch((err) => {
                return res.status(404).json({error:'Cannot rate unknown user'});
            });
            return res.status(200).json({msg:'Review added!'});
        }
    }catch(ex){
        next(ex);
    }
};

module.exports.getReviews = async (req: Request, res: Response, next:NextFunction) =>{
    try{
        const {receiver_user_id} = req.body;
        const avgObj = await knex('review').avg('rating as rating').whereRaw('receiver_user_id = ?', receiver_user_id);
        const avg = Number(avgObj[0]['rating']).toFixed(2);
        return res.status(200).json({status:true, rating: avg});
    }catch(ex){
        next(ex);
    }
};