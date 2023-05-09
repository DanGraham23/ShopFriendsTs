
export async function up(knex) {
    await knex.schema.alterTable('users', function(table) {
        table.unique(['email']).unique(['username']);
      });
}


export async function down(knex) {
    await knex.schema.alterTable('users', function(table) {
        table.dropUnique(['email']).dropUnique(['username']);
      });
}

