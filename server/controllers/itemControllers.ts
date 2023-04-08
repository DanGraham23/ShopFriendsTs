import { Request, Response, NextFunction } from "express";
import { Item } from "../model/itemModel";
const knex = require('../db/knex');

module.exports.getItems = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {user_id, tag} = req.body;
        if (tag != ""){
            const items: Item[] = await knex('items').whereRaw('user_id != ? AND tag = ?', [user_id, tag]);
            return res.status(200).json({items});
        }else{
            const items: Item[] = await knex('items').whereRaw('user_id = ?', user_id);
            return res.status(200).json({items});
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
            return res.status(404).json({msg:"Cannot create this item!"});
        });
        return res.status(200).json({msg:"Item successfully created!"});
    }catch(ex){
        next(ex);
    }
};

module.exports.removeItem = async (req:Request, res:Response, next :NextFunction) => {
    try{
        const {id} = req.body;
        const itemFound = await knex('items').where({id});
        if (itemFound.length === 0){
            return res.status(404).json({msg:"No item found"});
        }
        await knex('items').where({id}).del();
        return res.status(200).json({msg:"Item successfully deleted!"});
    }catch(ex){
        next(ex);
    }
};