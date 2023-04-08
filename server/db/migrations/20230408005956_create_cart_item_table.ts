import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('cart_item', function (table){
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users');
        table.integer('item_id').references('id').inTable('items');
        table.timestamps(true,true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cart_item');
}

