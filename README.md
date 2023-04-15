# ShopFriendsTs

## Peer-to-Peer Marketplace

## Techs Used:
- Front end was built using React, TypeScript, and Redux
- Back end was built using ExpressJS, NodeJS, PostgreSQL, TypeScript, Knex

Using ShopFriends, users can create accounts to start listing their items up for sale. Items are tagged according to five different categories (hats, shoes, pants, shirts, accessories aka other). Other users can then sort by these tags to find items to add to their cart. Users can then proceed to checkout with the items in their cart. Additionally, users can rview eachothers profile and add ratings.

Frontend: http://localhost:5173/
- npm i from client directory
- npm run dev

Backend: http://localhost:3001/
- npm i from server directory
- knex migrate:latest or npx knex migrate:latest (must have a postgresql database setup and connected) This is important to setup the database tables
- The database config files are in the .env and knexfile.ts for setup
- npm run start

Features:
- Login/Register form
- JWTs and Cookies for Authorization
- Profile page to view users rating and profile picture
- Profile page displays a user's items
- Profile page to logout, update profile picture, or list an item
- Images hosted with AWS S3
- Create Listing Modal
- Cart to track current items to purchase
- Add to cart/Remove from cart
- Checkout page with total price and items listed
- Sort by item categories when browsing items
- Pagination

Future plans:
- Add handling and displays for loading states
- Utilize Stripe API
- Redesign item cards and profile pages to look more modern
- Add additional tags and search functionalities
- Have checkout feature that removes items from DB and saves transactions

Database tables:
![ShopFriendsTs (1)](https://user-images.githubusercontent.com/59900510/230456682-391916a0-e249-46ba-8ee2-c16498addb8c.jpeg)

Current Screenshots of ShopFriends:
![shopfriends1](https://user-images.githubusercontent.com/59900510/231634708-c3fcdf40-89c8-4c76-b23c-368c6598cb37.png)
![shopfriends2](https://user-images.githubusercontent.com/59900510/232174390-2b59ae8a-4301-4c41-9e7e-74a765064d5d.png)
![shopfriends3](https://user-images.githubusercontent.com/59900510/231634726-40391bf6-1676-48cd-9a51-f86056ad917f.png)
![shopfriends4](https://user-images.githubusercontent.com/59900510/232174397-ad95f40f-dfe7-48e3-a971-8e952156fda7.png)
![shopfriends5](https://user-images.githubusercontent.com/59900510/231634749-d32729d6-55ac-47ea-ad3d-18458be5bba6.png)



