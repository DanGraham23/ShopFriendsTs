# ShopFriendsTs

Peer-to-Peer Marketplace (*In progress*)
- Front end was built using React, TypeScript, and Redux
- Back end was built using ExpressJS, NodeJS, PostgreSQL, TypeScript, Knex

Using ShopFriends, users can create accounts to start listing their items up for sale. Items are tagged according to five different categories (hats, shoes, pants, shirts, accessories aka other). Other users can then sort by these tags to find items to add to their cart. Users can then proceed to checkout with the items in their cart. Additionally, users can review other users.

Frontend : http://localhost:5173/
npm run dev

Backend : http://localhost:3001/
npm run start + 
knex migrate:latest or npx knex migrate:latest (must have a postgresql database setup and connected)

Database : PostgreSQL, setup in knexfile.ts and .env

Features:
- Login/Register form
- MyProfile page to update profile image and see user's own listings and rating
- View other users profiles to see their items and rating
- Create Listing Modal
- Cart to track current items to purchase, with the option to remove an item
- Checkout page with total price calculator
- Sort by item categories when browsing items
- Pagination when browsing item categories

Database tables (Might make changes to these still):
![ShopFriendsTs (1)](https://user-images.githubusercontent.com/59900510/230456682-391916a0-e249-46ba-8ee2-c16498addb8c.jpeg)


