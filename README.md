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
- Profile page to view users rating and profile picture
- Profile page displays a user's items
- Profile page to logout, update profile picture, or list an item
- Create Listing Modal
- Cart to track current items to purchase
- Add to cart/Remove from cart
- Checkout page with total price and items listed
- Sort by item categories when browsing items
- Pagination

In progress features and fixes:
- Add handling for loading states
- Add Authorization + JWTs
- Host images through cloud service (currently only using local images)

Database tables:
![ShopFriendsTs (1)](https://user-images.githubusercontent.com/59900510/230456682-391916a0-e249-46ba-8ee2-c16498addb8c.jpeg)

Current Screenshots of ShopFriends:
![shopfriends1](https://user-images.githubusercontent.com/59900510/231634708-c3fcdf40-89c8-4c76-b23c-368c6598cb37.png)
![shopfriends2](https://user-images.githubusercontent.com/59900510/231634716-05e38230-0117-43b9-afcb-17d6ab7ece1d.png)
![shopfriends3](https://user-images.githubusercontent.com/59900510/231634726-40391bf6-1676-48cd-9a51-f86056ad917f.png)
![shopfriends4](https://user-images.githubusercontent.com/59900510/231634734-d813b151-3f88-4d52-9fc0-bf5dd23d29b7.png)
![shopfriends5](https://user-images.githubusercontent.com/59900510/231634749-d32729d6-55ac-47ea-ad3d-18458be5bba6.png)



