
export async function up(knex) {
    return knex.schema
    .createTable('items', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.double('price').notNullable();
        table.string('item_image').notNullable();
        table.enum('tag', ['hat', 'shirt', 'pants', 'shoes', 'other']).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex) {
    return knex.schema.dropTable('items');
}

