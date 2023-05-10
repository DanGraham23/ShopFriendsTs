
exports.up = function up(knex) {
    return knex.schema
    .createTable('cart_item', function (table){
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users');
        table.integer('item_id').references('id').inTable('items');
        table.timestamps(true,true);
    });
}


exports.down = function down(knex) {
    return knex.schema.dropTable('cart_item');
}

