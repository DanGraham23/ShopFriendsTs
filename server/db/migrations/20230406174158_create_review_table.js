
exports.up = function up(knex) {
    return knex.schema
    .createTable('review', function(table) {
        table.increments('id').primary();
        table.integer('receiver_user_id').notNullable().references('id').inTable('users');
        table.integer('sender_user_id').notNullable().references('id').inTable('users');
        table.integer('rating').notNullable();
        table.timestamps(true, true);
    });
}


exports.down = function down(knex){
    return knex.schema.dropTable('review');
}

