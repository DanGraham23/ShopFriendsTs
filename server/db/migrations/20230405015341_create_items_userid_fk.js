
export async function up(knex) {
    return knex.schema.table('items', function(table) {
        table.integer('user_id').references('id').inTable('users');
    });
}


export async function down(knex) {
    return knex.schema.table('items', function (table){
        table.dropForeign('user_id');
        table.dropColumn('user_id');
    });
}

