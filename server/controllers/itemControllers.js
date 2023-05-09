const knex = require('../db/knex');

const {uploadImage, getImageUrl} = require("../common/aws");
const {validateAddItem} = require('../common/validator');
const {randomImageName} = require('../common/crypto');

/**
 * Gets items from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the corresponding items.
 */
module.exports.getItems = async (req, res, next) => {
    try{
        const {user_id, tag} = req.params;
        
        if (tag !== "profile"){
            const items = await knex.select('items.*', 'users.username', 'users.profile_picture').from('items').leftJoin('users', 'items.user_id', 'users.id').whereNot('items.user_id', user_id).andWhere('items.tag', tag);
            
            for (const item of items){
                if (item.profile_picture!= null){
                    const profile_picture_url = getImageUrl(item.profile_picture);
                    const item_image_url = getImageUrl(item.item_image)
                    item.profile_picture = profile_picture_url;
                    item.item_image = item_image_url;
                }
            }
            return res.status(200).json({items});
        }else{
            const items = await knex.select('items.*', 'users.username', 'users.profile_picture').from('items').leftJoin('users', 'items.user_id', 'users.id').where('items.user_id', user_id);
            for (const item of items){
                if (item.profile_picture!= null){
                    const profile_picture_url = getImageUrl(item.profile_picture);
                    const item_image_url = getImageUrl(item.item_image)
                    item.profile_picture = profile_picture_url;
                    item.item_image = item_image_url;
                }
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
module.exports.addItem = async (req, res, next) => {
    try{
        const {error, value} = validateAddItem(req.body);
        if (error){
            return res.status(400).json({msg:error.details[0].message});
        }

        const {user_id, name, description, price, tag} = req.body;
        const item_image = req.file;

        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        if (item_image === null){
            return res.status(403).json({msg: "Item must have an image"});
        }

        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        const item_image_name = randomImageName();

        const imageUploaded = uploadImage(item_image_name, item_image);

        if (!imageUploaded) return res.status(400).json({msg: "Failed to upload image"});

        const newItem = {
            user_id,
            description,
            name,
            price,
            item_image:item_image_name,
            tag
        }

        //Insert the newItem of type Item
        await knex('items').insert(newItem).catch((err)=>{
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
module.exports.removeItem = async (req, res, next) => {
    try{
        const {id} = req.params;

        const itemFound = await knex('items').where({id});
        if (itemFound.length === 0){
            return res.status(404).json({msg:"No item found"});
        }

        if (req.user.id != itemFound[0].user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        await knex('items').where({id}).del();
        return res.status(200).json({msg:"Item successfully deleted!"});
    }catch(ex){
        next(ex);
    }
};