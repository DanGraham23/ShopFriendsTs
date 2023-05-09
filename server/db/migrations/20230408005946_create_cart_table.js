
export async function up(knex){
    return knex.schema
    .createTable('cart', function(table){
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users');
        table.timestamps(true,true);
    });
}


export async function down(knex) {
    return knex.schema.dropTable('cart');
}

