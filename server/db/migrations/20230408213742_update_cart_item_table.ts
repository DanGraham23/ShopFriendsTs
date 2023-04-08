import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('cart_item', function(table) {
        table.dropForeign('user_id');
        table.dropColumn('user_id');
        table.integer('cart_id').references('id').inTable('cart');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('cart_item', function(table){
        table.dropForeign('cart_id');
        table.dropColumn('cart_id');
        table.integer('user_id').references('id').inTable('users');
    })

}

