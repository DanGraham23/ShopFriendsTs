
export async function up(knex) {
    return knex.schema.alterTable('cart_item', function(table) {
        table.dropForeign('item_id');
        table.foreign('item_id').references('id').inTable('items').onDelete('CASCADE');
    });
}


export async function down(knex) {
    return knex.schema.alterTable('cart_item', function (table){
        table.dropForeign('item_id');
        table.foreign('item_id').references('id').inTable('items');
    });
}

