import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('member', function(table){
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('profile-picture').notNullable();
        table.timestamps(true, true);
    });
};


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('member');
}

