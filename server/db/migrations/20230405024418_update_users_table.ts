import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', function(table) {
        table.unique(['email']).unique(['username']);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', function(table) {
        table.dropUnique(['email']).dropUnique(['username']);
      });
}

