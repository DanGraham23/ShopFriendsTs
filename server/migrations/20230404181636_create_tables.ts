import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', function(table){
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('profile-picture').notNullable();
        table.timestamps(true, true);
    })
    .createTable('items', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.double('price').notNullable();
        table.string('item-image').notNullable();
        table.enum('tag', ['hat', 'shirt', 'pants', 'shoes', 'other']).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('users')
    .dropTable('items');
}

