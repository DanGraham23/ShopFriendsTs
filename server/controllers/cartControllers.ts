import { NextFunction, Request, Response } from "express";
const knex3 = require('../db/knex');
const s3_2 = require('../awsConfig');

/**
 * Adds an item to a user's cart.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.addItemToCart = async (req:any, res:Response, next:NextFunction) => {
    try{
        const {user_id, item_id} = req.params;
        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }
        //Check if the user has a cart based on their user_id
        const userCartObj = await knex3('cart').where('cart.user_id', user_id);
        if (userCartObj.length === 0){
            return res.status(404).json({msg:"Cannot find a cart for the specified user!"});
        }

        //Check if the item is already in the cart
        const cart_id = userCartObj[0].id;
        const cartItemFound = await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]).catch((err)=> {
            return res.status(404).json({msg:"Unable to find item"});
        });
        if (cartItemFound.length > 0){
            return res.status(403).json({msg:"Item already in cart"});
        }

        //Insert the item with the correct cart_id, item_id
        await knex3('cart_item').insert({
            cart_id,
            item_id
        }).catch((err)=> {
            return res.status(404).json({msg:"Unable to add item to cart"});
        });
        return res.status(200).json({msg:"Item added to cart!"});
    }catch(ex){
        next(ex);
    }
}

/**
 * Removes an item from a user's cart.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.removeItemFromCart = async (req:any, res:Response, next:NextFunction) => {
    try{
        const {user_id, item_id} = req.params;
        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }
        //Check if the user has a cart based on their user_id
        const userCartObj = await knex3('cart').where('cart.user_id', user_id);
        if (userCartObj.length === 0){
            return res.status(404).json({msg:"Cannot remove item, try again or refresh!"});
        }

        //Check if the current item is already in the cart
        const cart_id = userCartObj[0].id;
        const itemFound = await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]);
        if (itemFound.length === 0){
            return res.status(404).json({msg:"Cannot remove item, try again or refresh!"});
        }else{
            //If item is in cart, remove the correct cart_id and item_id
            await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]).del();
            return res.status(200).json({msg:"Item removed from cart!"});
        }
    }catch(ex){
        next(ex);
    }
}

/**
 * Gets all items in a user's cart.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response containing the user's cart items.
 */
module.exports.getCartItems = async (req:any, res:Response, next:NextFunction) => {
    try{
        const id = req.params.id;

        if (req.user.id != id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        //Check if the user has a cart based on their user_id
        const cartObj = await knex3('cart').where({user_id:id}).catch((err) => {
            return res.status(404).json({msg: "no user found"});
        });
        if (cartObj.length === 0){
            return res.status(404).json({msg: "no user found"});
        }

        //Get a list of the items with the corresponding user_id (from id param) and cart_id (from cart found in DB)
        //with the username and user profile picture for displaying on frontend
        const cart = cartObj[0];
        const items = await knex3.select('items.*','users.profile_picture', 'users.username').from('cart_item').where('cart_item.cart_id', cart.id)
        .join('items', 'items.id', 'cart_item.item_id')
        .join('users', 'users.id', 'items.user_id').catch((err) => {
            return res.status(404).json({msg: "no user found"});
        });
        for (const item of items){
            const profile_picture_url = s3_2.getSignedUrl('getObject', {
                Bucket : process.env.BUCKET_NAME,
                Key: item.profile_picture,
                Expires: 3600,
            });
            const item_image_url = s3_2.getSignedUrl('getObject', {
                Bucket : process.env.BUCKET_NAME,
                Key: item.item_image,
                Expires: 3600,
            });
            item.profile_picture = profile_picture_url;
            item.item_image = item_image_url;
        }
        return res.status(200).json({items});
    }catch(ex){
        next(ex);
    }
}