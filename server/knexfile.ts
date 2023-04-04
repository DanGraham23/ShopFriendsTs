import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1234',
      database: 'ShopFriendsTs'
    }
  },
};

module.exports = config;
