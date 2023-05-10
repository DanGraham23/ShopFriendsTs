
exports.up = function up(knex) {
    return knex.schema
    .createTable('users', function(table){
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('profile_picture').notNullable();
        table.timestamps(true, true);
    });
}


exports.down = function down(knex) {
    return knex.schema.dropTable('users');
}

