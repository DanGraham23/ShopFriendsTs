import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('cart_item', function(table) {
        table.dropForeign('item_id');
        table.foreign('item_id').references('id').inTable('items').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('cart_item', function (table){
        table.dropForeign('item_id');
        table.foreign('item_id').references('id').inTable('items');
    });
}

