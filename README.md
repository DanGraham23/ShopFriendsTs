# ShopFriendsTs

## Peer-to-Peer Marketplace

## Demo, https://youtu.be/CtrylePSosM

---- Techs Used ----
- Front end was built using React, TypeScript, and Redux
- Back end was built using ExpressJS, NodeJS, PostgreSQL, Knex, Stripe, AWS

---- Site Information ----

Using ShopFriends, users can create accounts to start listing their items up for sale. Items are tagged according to five different categories (hats, shoes, pants, shirts, accessories aka other). Other users can then sort by these tags to find items to add to their cart. Users can then proceed to checkout with the items in their cart. Additionally, users view and rate other users.


---- Setup ----

Frontend: http://localhost:5173/
- npm i from client directory
- npm run dev

Backend: http://localhost:3001/
- npm i from server directory
- knex migrate:latest or npx knex migrate:latest (must have a postgresql database setup and connected) This is important to setup the database tables
- npm run start
- setup .env file with configs and keys

For .env setup: 

BUCKET_NAME = AWS BUCKET NAME

BUCKET_REGION = AWS BUCKET REGION

ACCESS_KEY= AWS ACCESS KEY

SECRET_ACCESS_KEY= AWS SECRET ACCESS KEY


SERVER_PORT=3001

CLIENT_PORT=5173


DB_PORT=5432

DB_HOST= LOCAL HOST OR URL TO DB SUCH AS RDS

DB_USER= DB USER NAME

DB_PASS= DB PASSWORD

DB_DB= DB NAME


TOKEN_KEY= JWT TOKEN KEY STRING

STRIPE_KEY= STRIPE API KEY



---- Features ----

Authentication:
- Login/Register form
- JWTs and Cookies for Authorization of sensitive endpoints
- Bcrypt for password hashing
- Redux stores user id, username, and logged in status

Profiles:
- View profiles to see items, ratings, and profile picture
- Users can logout, create items, and update their profile pictures

Items:
- Cart to track current items to purchase
- Add to cart/Remove from cart
- Sort by item categories when browsing items
- Pagination

Other:
- Images hosted with AWS S3
- Checkout page is integrated with Stripe API
- Request data validation with Joi

---- Future Plans ----
- Proper displays for loading states
- Add additional tags and search functionalities
- Make checkout functionality to remove items from DB and save transactions in DB

---- Database Tables ----
![ShopFriendsTs (1)](https://user-images.githubusercontent.com/59900510/230456682-391916a0-e249-46ba-8ee2-c16498addb8c.jpeg)




