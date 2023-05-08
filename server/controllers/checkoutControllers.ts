import { NextFunction, Request, Response } from "express";
import { Item } from "../model/itemModel";

const stripe = require('stripe')(process.env.STRIPE_KEY);

/**
 * Register a user in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Object} A JSON response with the checkout url.
 */
module.exports.checkoutItems = async (req:Request, res:Response, next:NextFunction) => {
    try{
      const items:Item[]  = req.body;

      const lineItems = await Promise.all(
        items.map(async (item) => {
          const { id, name, price, item_image,description } = item;
          const product = await stripe.products.create({
            name: name,
            images: [item_image],
            description,
          });
          const priceData = {
            currency: 'usd',
            unit_amount: price * 100, // convert the price to cents
            product: product.id,
          };
          const stripePrice = await stripe.prices.create(priceData);
    
          return {
            price:stripePrice.id,
            quantity:1,
          };
        })
      );
        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          mode: 'payment',
          success_url: `http://localhost:5173/?success=true`,
          cancel_url: `http://localhost:5173/?canceled=true`,
        });
        return res.json({url:session.url});
    }catch(ex){
      next(ex);
    }
    }