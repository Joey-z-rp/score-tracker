
exports.up = function(knex, Promise) {
    return knex.schema.createTable('shooters', function(table) {
        table.integer('shooterId').notNull().primary();
        table.dateTime('createdAt').notNull();
        table.dateTime('updatedAt').nullable();
        table.dateTime('deletedAt').nullable();

        table.string('name').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shooters');
};
