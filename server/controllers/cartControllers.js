const knex = require('../db/knex');

const {getImageUrl} = require("../common/aws");

/**
 * Adds an item to a user's cart.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response indicating success or failure.
 */
module.exports.addItemToCart = async (req, res, next) => {
    try{
        const {user_id, item_id} = req.params;
        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }
        //Check if the user has a cart based on their user_id
        const userCart = await knex('cart').where('cart.user_id', user_id).first();
        if (!userCart){
            return res.status(404).json({msg:"Cannot find a cart for the specified user!"});
        }

        //Check if the item is already in the cart
        const cartItemFound = await knex('cart_item').whereRaw('cart_id = ? AND item_id = ?', [userCart.id, item_id]).catch((err)=> {
            return res.status(404).json({msg:"Unable to find item"});
        });
        if (cartItemFound.length > 0){
            return res.status(403).json({msg:"Item already in cart"});
        }

        //Insert the item with the correct cart_id, item_id
        await knex('cart_item').insert({
            cart_id:userCart.id,
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
module.exports.removeItemFromCart = async (req, res, next) => {
    try{
        const {user_id, item_id} = req.params;
        if (req.user.id != user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }
        //Check if the user has a cart based on their user_id
        const userCart = await knex('cart').where('cart.user_id', user_id).first();
        if (!userCart){
            return res.status(404).json({msg:"Cannot remove item, try again or refresh!"});
        }

        //Check if the current item is already in the cart
        const itemFound = await knex('cart_item').whereRaw('cart_id = ? AND item_id = ?', [userCart.id, item_id]).first();
        if (!itemFound){
            return res.status(404).json({msg:"Cannot remove item, try again or refresh!"});
        }else{
            //If item is in cart, remove the correct cart_id and item_id
            await knex('cart_item').whereRaw('cart_id = ? AND item_id = ?', [userCart.id, item_id]).del();
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
module.exports.getCartItems = async (req, res, next) => {
    try{
        const id = req.params.id;

        if (req.user.id != id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        //Check if the user has a cart based on their user_id
        const userCart = await knex('cart').where({user_id:id}).first().catch((err) => {
            return res.status(404).json({msg: "no user found"});
        });
        if (!userCart){
            return res.status(404).json({msg: "no user cart found"});
        }

        //Get a list of the items with the corresponding user_id (from id param) and cart_id (from cart found in DB)
        //with the username and user profile picture for displaying on frontend
        const items = await knex.select('items.*','users.profile_picture', 'users.username').from('cart_item').where('cart_item.cart_id', userCart.id)
        .join('items', 'items.id', 'cart_item.item_id')
        .join('users', 'users.id', 'items.user_id').catch((err) => {
            return res.status(404).json({msg: "no user found"});
        });
        for (const item of items){
            const profile_picture_url = getImageUrl(item.profile_picture);
            const item_image_url = getImageUrl(item.item_image)
            item.profile_picture = profile_picture_url;
            item.item_image = item_image_url;
        }
        return res.status(200).json({items});
    }catch(ex){
        next(ex);
    }
}