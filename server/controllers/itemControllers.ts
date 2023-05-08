import { Request, Response, NextFunction } from "express";
import { Item } from "../model/itemModel";
import crypto from 'crypto';
const knex1 = require('../db/knex');
const s3_3 = require('../awsConfig');

/**
 * Gets items from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the corresponding items.
 */
module.exports.getItems = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {user_id, tag} = req.params;
        
        if (tag !== "profile"){
            const items: Item[] = await knex1.select('items.*', 'users.username', 'users.profile_picture').from('items').leftJoin('users', 'items.user_id', 'users.id').whereNot('items.user_id', user_id).andWhere('items.tag', tag);
            
            for (const item of items){
                const profile_picture_url = s3_3.getSignedUrl('getObject', {
                    Bucket : process.env.BUCKET_NAME,
                    Key: item.profile_picture,
                    Expires: 3600,
                });
                const item_image_url = s3_3.getSignedUrl('getObject', {
                    Bucket : process.env.BUCKET_NAME,
                    Key: item.item_image,
                    Expires: 3600,
                });
                item.profile_picture = profile_picture_url;
                item.item_image = item_image_url;
            }
            return res.status(200).json({items});
        }else{
            const items: Item[] = await knex1.select('items.*', 'users.username', 'users.profile_picture').from('items').leftJoin('users', 'items.user_id', 'users.id').where('items.user_id', user_id);
            for (const item of items){
                const profile_picture_url = s3_3.getSignedUrl('getObject', {
                    Bucket : process.env.BUCKET_NAME,
                    Key: item.profile_picture,
                    Expires: 3600,
                });
                const item_image_url = s3_3.getSignedUrl('getObject', {
                    Bucket : process.env.BUCKET_NAME,
                    Key: item.item_image,
                    Expires: 3600,
                });
                item.profile_picture = profile_picture_url;
                item.item_image = item_image_url;
            }
            return res.status(200).json({items});
        }
    }catch(ex){
        next(ex);
    }
};

/**
 * Add an item to the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.addItem = async (req:any, res:Response, next:NextFunction) => {
    try{
        const {user_id, name, description, price, tag} = req.body;
        const item_image = req.file;
        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        // //Set a random, unique image name in s3 bucket
        const randomImageName = (btyes:number = 32) => {
            return crypto.randomBytes(btyes).toString('hex');
        }

        const item_image_name = randomImageName();

        const params = {
            Bucket : process.env.BUCKET_NAME,
            Key: item_image_name,
            Body: item_image.buffer,
            ContentType: item_image.mimetype,
        }

        const newItem:Item = {
            user_id,
            description,
            name,
            price,
            item_image:item_image_name,
            tag
        }
        // //Send our put request to the s3 bucket
        s3_3.putObject(params, (err, data)=> {
            if (err){
                console.log(err);
                return res.status(404).json({msg:'Failed to upload PFP'});
            }
        });

        //Insert the newItem of type Item
        await knex1('items').insert(newItem).catch((err:any)=>{
            return res.status(404).json({msg:"Cannot create this item!"});
        });
        return res.status(200).json({msg:"Item successfully created!"});
    }catch(ex){
        next(ex);
    }
};

/**
 * Remove an item from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.removeItem = async (req:any, res:Response, next :NextFunction) => {
    try{
        const {id} = req.params;
        if (req.user.id != id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }
        //Check if the id is a valid item_id, and remove it
        const itemFound = await knex1('items').where({id});
        if (itemFound.length === 0){
            return res.status(404).json({msg:"No item found"});
        }
        await knex1('items').where({id}).del();
        return res.status(200).json({msg:"Item successfully deleted!"});
    }catch(ex){
        next(ex);
    }
};