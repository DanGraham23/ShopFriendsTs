const knex = require('../db/knex');
const bcrypt=  require("bcrypt");
const jwt = require('jsonwebtoken');

const {validateLogin, validateRegister} = require('../common/validator');
const {uploadImage, getImageUrl, deleteImage} = require("../common/aws");
const {randomImageName} = require('../common/crypto');

/**
 * Register a user in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the user details.
 */
module.exports.register = async (req, res, next) => {
    try{
        const {error, value} = validateRegister(req.body);
        if (error){
            return res.status(400).json({msg:error.details[0].message});
        }

        const {username, password, email} = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username: username,
            password: hashedPassword,
            email: email,
            profile_picture: "default.jpg"
        }

        //Check if the user already exists with the username or email
        const userFound = await knex('users').where({ username}).orWhere({ email});
        if (userFound.length > 0){
            return res.status(400).json({msg:'Account creation failed! Username or Email already exists'});
        }

        //Add the user, and create a cart for them in a transaction
        const trx = await knex.transaction();
        trx('users')
        .insert(user, '*')
        .then(function([user]) {
            const cart = {
                user_id:user.id,
            }
            const returnedUser = {
                id:user.id,
                username:user.username,
            }
            const token = jwt.sign({username:user.username, id:user.id}, process.env.TOKEN_KEY, {
                expiresIn:30000,
            });
            res.cookie("token", token, {
                httpOnly: true,
            });
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
module.exports.login = async (req, res, next) => {
    try{
        const {error, value} = validateLogin(req.body);
        if (error){
            return res.status(400).json({msg:error.details[0].message});
        }

        const {username, password} = req.body;

        //Check if the user exists
        const userFound = await knex('users').where({username});
        if (userFound.length == 0){
            return res.status(404).json({msg:'No user exists with those credentials'});
        }

        //Validate the user's password
        const user = userFound[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(404).json({msg:'No user exists with those credentials'});
        }
        const returnedUser = {
            id:user.id,
            username:user.username,
        }
        const token = jwt.sign({username:user.username, id:user.id}, process.env.TOKEN_KEY, {
            expiresIn:30000,
        });
        res.cookie("token", token, {
            httpOnly: true,
        });
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
module.exports.updatePfp =  async (req, res, next) => {
    try{
        const {id} = req.body;
        const profile_picture_file = req.file;

        if (req.user.id != id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }

        // Check if the user exists with the id
        const userFound = await knex('users').where({id});
        if (userFound.length == 0){
            return res.status(404).json({msg:'Trying to update invalid user'});
        }

        const profile_picture_name = randomImageName();

        const imageUploaded = uploadImage(profile_picture_name, profile_picture_file);
        if (!imageUploaded) return res.status(400).json({msg: "Failed to upload image"});
        deleteImage(userFound[0].profile_picture);


        knex('users').where({id: id}).update({
            profile_picture: profile_picture_name,
            updated_at: new Date()
        }).then(() =>{
            return res.status(201).json({msg:'Profile picture updated!'});
        }).catch((err) => {
            return res.status(404).json({msg:'Trying to update invalid user'});
        });
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
module.exports.getUser = async (req, res, next) => {
    try{
        const username = req.params.username;

        //Check if the user exists with the given username
        const userFoundObj = await knex('users').where({username});
        if (userFoundObj.length === 0){
            return res.status(404).json({msg:'No user exists with that username'});
        }
        
        //Get their pfp, username, id, and average rating
        const receiver_user_id = userFoundObj[0].id;
        const userObj = await knex('users').select(knex.raw('AVG(review.rating) as avg_rating')).leftJoin('review', 'users.id', 'review.receiver_user_id').where('review.receiver_user_id', receiver_user_id).groupBy('users.id');

        let avg_rating = 0.0;
        if (userObj.length > 0){
            avg_rating = userObj[0].avg_rating;
        }

        const userTemp = await knex('users').select('id', 'username', 'profile_picture').where({username});
        const user = userTemp[0];
        user.avg_rating = avg_rating;

        const url = getImageUrl(user.profile_picture);

        user.profile_picture = url;
        return res.status(200).json({user});        
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
module.exports.addReview = async (req, res, next) => {
    try{

        const receiver_user_id = Number(req.params.receiver_user_id);
        const sender_user_id = Number(req.params.sender_user_id);
        const rating =  Number(req.params.rating);
        if (req.user.id != sender_user_id){
            return res.status(403).json({msg: "Cannot perform that operation"});
        }
        //Users cannot rate themselves
        if (receiver_user_id === sender_user_id){
            return res.status(403).json({msg:'Cannot update own rating'});
        }

        //Locate the current review
        const reviewFound = await knex('review').select('*').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]);

        //If there is a review, update the rating
        //Otherwise, add a new review
        if (reviewFound.length > 0){
            await knex('review').whereRaw('receiver_user_id = ? AND sender_user_id = ?', [receiver_user_id, sender_user_id]).update({
                rating: rating
            }).catch((err) => {
                return res.status(404).json({msg:'Cannot rate unknown user'});
            });
            return res.status(200).json({msg:'Review added!'});
        }else{
            const newReview = {
                receiver_user_id,
                sender_user_id,
                rating
            }
            await knex('review').insert(newReview).catch((err) => {
                return res.status(404).json({msg:'Cannot rate unknown user'});
            });
            return res.status(200).json({msg:'Review added!'});
        }
    }catch(ex){
        next(ex);
    }
};