import { Request, Response, NextFunction } from "express";
import { Item } from "../model/itemModel";
const knex = require('../db/knex');

module.exports.getItems = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {user_id, tag} = req.body;
        if (tag != ""){
            const items: Item[] = await knex('items').whereRaw('user_id != ? AND tag = ?', [user_id, tag]);
            return res.json({status: true, items});
        }else{
            const items: Item[] = await knex('items').whereRaw('user_id = ?', user_id);
            return res.json({status: true, items});
        }
    }catch(ex){
        next(ex);
    }
};

module.exports.addItem = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {user_id, name, description, price, item_image, tag} = req.body;
        const newItem:Item = {
            user_id,
            description,
            name,
            price,
            item_image,
            tag
        }
        await knex('items').insert(newItem).catch((err:any)=>{
            return res.json({status:false});
        });
        return res.json({status:true})
    }catch(ex){
        next(ex);
    }
};