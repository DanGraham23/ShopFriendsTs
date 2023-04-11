# ShopFriendsTs

## Peer-to-Peer Marketplace

This entire project is currently *working* but has many bugs that I am actively fixing.
- Front end was built using React, TypeScript, and Redux
- Back end was built using ExpressJS, NodeJS, PostgreSQL, TypeScript, Knex

Using ShopFriends, users can create accounts to start listing their items up for sale. Items are tagged according to five different categories (hats, shoes, pants, shirts, accessories aka other). Other users can then sort by these tags to find items to add to their cart. Users can then proceed to checkout with the items in their cart. Additionally, users can review other users.

Frontend : http://localhost:5173/
- npm i from client directory
- npm run dev

Backend : http://localhost:3001/
- npm i from server directory
- knex migrate:latest or npx knex migrate:latest (must have a postgresql database setup and connected) This is important to setup the database tables
- The database config files are in the .env and knexfile.ts for setup
- npm run start

Features:
- Login/Register form
- Profile page to view users rating and profile picture
- Profile page to logout or update profile picture
- Create Listing Modal
- Cart to track current items to purchase
- Add to cart/Remove from cart
- Checkout page with total price and total items calculator
- Sort by item categories when browsing items
- Pagination when browsing item categories

In progress features and fixes:
- Add a users items to their profile page
- Adding better error handling and error message displays to frontend
- Fix edge cases for some of the API calls that are returning errors
- Optimize the backend queries
- Reduce the number of useEffects in the frontend
- Add handling for loading states
- Redirect users based on their authentication
- Add Authorization + JWTs

Database tables:
![ShopFriendsTs (1)](https://user-images.githubusercontent.com/59900510/230456682-391916a0-e249-46ba-8ee2-c16498addb8c.jpeg)

Current Screenshots of ShopFriends:
![shopfriends1](https://user-images.githubusercontent.com/59900510/231064040-59645782-47f8-439e-a437-7a7e7ec11731.JPG)
![shopfriends2](https://user-images.githubusercontent.com/59900510/231064047-b132fbb4-3495-49e8-b5ca-ae39d81f88cb.JPG)
![shopfriends3](https://user-images.githubusercontent.com/59900510/231064054-cae642dd-05f7-4e53-b850-ad490e888ae8.JPG) ![shopfriends5](https://user-images.githubusercontent.com/59900510/231064101-9a769ce4-1e9f-4c2d-9040-e77730853743.JPG)
![shopfriends4](https://user-images.githubusercontent.com/59900510/231064078-2c2f3dc6-6c56-4d3b-b5b5-83c70a7264e3.JPG)


