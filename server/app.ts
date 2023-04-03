import express from "express";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {Pool} = require("pg");

const app = express();
require("dotenv").config();
app.use(cors({origin:'http://localhost:5173', credentials:true}));
app.use(cookieParser());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ShopFriendsTs",
    password: "1234",
    port: 5432,
});

pool.query('SELECT NOW()', (err: any, res: any) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database at', res.rows[0].now);
    }
  });
  
//   app.get('/', (req: any, res: any) => {
//     pool.query('SELECT * FROM your_table', (err: any, result: any) => {
//       if (err) {
//         console.error('Error executing query', err);
//         res.status(500).send('Error executing query');
//       } else {
//         res.send(result.rows);
//       }
//     });
//   });

app.listen(process.env.PORT, () : void => {
    console.log(`server connected on port:${process.env.PORT}`);
});