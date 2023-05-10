
exports.up = function up(knex) {
    return knex.schema.alterTable('cart_item', function(table) {
        table.dropForeign('item_id');
        table.foreign('item_id').references('id').inTable('items').onDelete('CASCADE');
    });
}


exports.down = function down(knex) {
    return knex.schema.alterTable('cart_item', function (table){
        table.dropForeign('item_id');
        table.foreign('item_id').references('id').inTable('items');
    });
}

