
exports.up = function(knex, Promise) {
    return knex.schema.table('shootingResultDetails', function(table) {
        table.integer('shooterId').references('shooterId').inTable('shooters');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('shootingResultDetails', function(table) {
        table.dropColumn('shooterId');
    });
};
