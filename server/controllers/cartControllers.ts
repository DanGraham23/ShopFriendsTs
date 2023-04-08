import { NextFunction, Request, Response } from "express";
import { CartItem } from "../model/cartItemModel";
const knex3 = require('../db/knex');

module.exports.addItemToCart = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {cart_id, item_id} = req.body;
        const cart_item : CartItem = {
            cart_id,
            item_id
        }
        const cartItemFound = await knex3('cart_item').whereRaw('cart_id = ? AND item_id = ?', [cart_id, item_id]);
        if (cartItemFound.length > 0){
            return res.status(403).json({msg:"Item already in cart"});
        }
        await knex3('cart_item').insert(cart_item);
        return res.status(200).json({msg:"Item added to cart!"});
    }catch(ex){
        next(ex);
    }
}

module.exports.removeItemFromCart = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {cart_id, item_id} = req.body;
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