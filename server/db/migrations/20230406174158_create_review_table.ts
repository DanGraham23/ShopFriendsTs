import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('review', function(table) {
        table.increments('id').primary();
        table.integer('receiver_user_id').notNullable().references('id').inTable('users');
        table.integer('sender_user_id').notNullable().references('id').inTable('users');
        table.integer('rating').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('review');
}

