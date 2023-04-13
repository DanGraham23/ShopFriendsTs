const knex2 = require('../db/knex');
const bcrypt=  require("bcrypt");
const s3 = require('../awsConfig');

import { Review } from "../model/reviewModel";
import { User } from "../model/userModel";
import { NextFunction, Request, Response } from "express";
import {Cart} from '../model/cartModel';
import { PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Register a user in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the user details.
 */
module.exports.register = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = {
            username: username,
            password: hashedPassword,
            email: email,
            profile_picture: "default.jpg"
        }

        //Check if the user already exists with the username or email
        const userFound: User[] = await knex2('users').where({ username}).orWhere({ email});
        if (userFound.length > 0){
            return res.status(400).json({msg:'Account creation failed! Username or Email already exists'});
        }

        //Add the user, and create a cart for them in a transaction
        const trx = await knex2.transaction();
        trx('users')
        .insert(user, '*')
        .then(function([user]) {
            const cart : Cart = {
                user_id:user.id,
            }
            const returnedUser = {
                id:user.id,
                username:user.username,
            }
            res.status(201).json({returnedUser});
            return trx('cart').insert(cart);
        }).then(trx.commit).catch(trx.rollback);
        return res;
    }catch(ex){
        next(ex);
    }
};
        
/**
 * Login an existing user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the user details.
 */
module.exports.login = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {username, password} = req.body;

        //Check if the user exists
        const userFound: User[] = await knex2('users').where({username});
        if (userFound.length == 0){
            return res.status(404).json({msg:'No user exists with those credentials'});
        }

        //Validate the user's password
        const user = userFound[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(404).json({msg:'No user exists with those credentials'});
        }
        const returnedUser = (({ id, username }) => ({ id, username }))(user);
        return res.status(201).json({returnedUser});
    }catch(ex){
        next(ex);
    }
};

/**
 * Update a user's profile picture.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.updatePfp =  async (req:any, res:Response, next:NextFunction) => {
    try{
        const {id} = req.body;
        const profile_picture = req.file;
        console.log(process.env.BUCKET_NAME);
        const params = {
            Bucket : process.env.BUCKET_NAME,
            Key: profile_picture.originalName,
            Body: profile_picture.buffer,
            ContentType: profile_picture.mimetype,
        }

        const command = new PutObjectCommand(params);

        await s3.send(command);
        return res.status(201).json({msg:'Profile picture updated!'});
        //Check if the user exists with the id
        // const userFound: User[] = await knex2('users').where({id});
        // if (userFound.length == 0){
        //     return res.status(404).json({msg:'Trying to update invalid user'});
        // }

        // //Update the user's profile picture with the new one
        // //Currently, images are stored as name.jpg,
        // //And they are in the public folders on the frontend
        // //Eventually I will host these images instead
        // knex2('users').where({id: id}).update({
        //     profile_picture: profile_picture2,
        //     updated_at: new Date()
        // }).then(() =>{
        //     return res.status(201).json({msg:'Profile picture updated!'});
        // }).catch((err:any) => {
        //     return res.status(404).json({msg:'Trying to update invalid user'});
        // });
    }catch(ex){
        next(ex);
    }
};

/**
 * Get a user's important details.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the user's details.
 */
module.exports.getUser = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const username = req.params.username;

        //Check if the user exists with the given username
        const userFoundObj: User[] = await knex2('users').where({username});
        if (userFoundObj.length == 0){
            return res.status(404).json({msg:'No user exists with that username'});
        }

        //Get their pfp, username, id, and average rating
        const receiver_user_id = userFoundObj[0].id;
        const userObj = await knex2('users').select('users.profile_picture', 'users.username','users.id', knex2.raw('AVG(review.rating) as avg_rating')).leftJoin('review', 'users.id', 'review.receiver_user_id').where('review.receiver_user_id', receiver_user_id).groupBy('users.id');

        //If the user does NOT have a rating, return their rating as 0.00
        if (userObj.length === 0){
            const tempUserObj = await knex2('users').select('id', 'username', 'profile_picture').where({username});
            const user = tempUserObj[0];
            user.avg_rating = 0.00;
            return res.status(200).json({user});
        }else{
            const user = userObj[0];
            return res.status(200).json({user});
        }
        
    }catch(ex){
        next(ex);
    }
}

/**
 * Add a review to a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.addReview = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const receiver_user_id : number = Number(req.params.receiver_user_id);
        const sender_user_id : number = Number(req.params.sender_user_id);
        const rating : number =  Number(req.params.rating);

        //Users cannot rate themselves
        if (receiver_user_id === sender_user_id){
            return res.status(403).json({msg:'Cannot update own rating'});
        }

        //Locate the current review
        const reviewFound: Review[] = await knex2('review').select('*').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]);

        //If there is a review, update the rating
        //Otherwise, add a new review
        if (reviewFound.length > 0){
            await knex2('review').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]).update({
                rating: rating
            }).catch((err) => {
                return res.status(404).json({msg:'Cannot rate unknown user'});
            });
            return res.status(200).json({msg:'Review added!'});
        }else{
            const newReview : Review = {
                receiver_user_id,
                sender_user_id,
                rating
            }
            await knex2('review').insert(newReview).catch((err) => {
                return res.status(404).json({msg:'Cannot rate unknown user'});
            });
            return res.status(200).json({msg:'Review added!'});
        }
    }catch(ex){
        next(ex);
    }
};