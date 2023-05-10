
exports.up = function up(knex) {
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


exports.down = function down(knex) {
    return knex.schema.dropTable('items');
}

