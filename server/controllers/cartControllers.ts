import { NextFunction, Request, Response } from "express";
import { CartItem } from "../model/cartItemModel";
import knex from "knex";
const knex3 = require('../db/knex');

module.exports.addItemToCart = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {user_id, item_id} = req.params;
        const userCartObj = await knex3('cart').where('cart.user_id', user_id);
        if (userCartObj.length === 0){
            return res.status(404).json({msg:"Cannot add item, try again or refresh!"});
        }

        const cart_id = userCartObj[0].id;
        const cartItemFound = await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]).catch((err)=> {
            return res.status(404).json({msg:"Unable to find item"});
        });
        if (cartItemFound.length > 0){
            return res.status(403).json({msg:"Item already in cart"});
        }
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

module.exports.removeItemFromCart = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {user_id, item_id} = req.params;
        const userCartObj = await knex3('cart').where('cart.user_id', user_id);
        if (userCartObj.length === 0){
            return res.status(404).json({msg:"Cannot remove item, try again or refresh!"});
        }

        const cart_id = userCartObj[0].id;
        
        const itemFound = await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]);
        if (itemFound.length === 0){
            return res.status(404).json({msg:"Cannot remove item, try again or refresh!"});
        }else{
            await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]).del();
            return res.status(200).json({msg:"Item removed from cart!"});
        }
    }catch(ex){
        next(ex);
    }
}

module.exports.getCartItems = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const id = req.params.id;
        const cartObj = await knex3('cart').where({user_id:id}).catch((err) => {
            return res.status(404).json({msg: "no user found"});
        });
        if (cartObj.length === 0){
            return res.status(404).json({msg: "no user found"});
        }
        const cart = cartObj[0];
        const items = await knex3.select('items.*','users.profile_picture', 'users.username').from('cart_item').where('cart_item.cart_id', cart.id)
        .join('items', 'items.id', 'cart_item.item_id')
        .join('users', 'users.id', 'items.user_id').catch((err) => {
            return res.status(404).json({msg: "no user found"});
        });
        return res.status(200).json({items});
    }catch(ex){
        next(ex);
    }
}