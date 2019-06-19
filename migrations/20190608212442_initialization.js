
exports.up = function(knex, Promise) {
    return knex.schema.createTable('shooters', function(table) {
        table.integer('shooterId').notNull().primary();
        table.integer('numberOfResult').notNull();
        table.string('name').notNull();
        table.string('nickName');
        table.string('club');
        table.string('defaultDiscipline');
        table.string('gradeClubFOpen');
        table.string('gradeClubFStd');
        table.string('gradeClubFTR');
        table.string('gradeClubTRifle');
        table.string('syncStatus');
        table.datetime('createdAt');
        table.datetime('updatedAt');
    })
    .createTable('shootingResults', function(table) {
        table.integer('shootingResultId').notNull().primary();
        table.integer('shooterId').references('shooterId').inTable('shooters');
        table.decimal('berdanStringInMM');
        table.string('competitionClub');
        table.datetime('date');
        table.string('delay');
        table.string('discipline');
        table.string('distance');
        table.integer('edgeShotOne');
        table.integer('edgeShotTwo');
        table.string('grade');
        table.decimal('groupSizeInMM');
        table.string('name');
        table.string('nickNameWithClub');
        table.string('scoreNumber');
        table.string('scoreString');
        table.integer('shotsCount');
        table.integer('sightersCount');
        table.integer('stage');
        table.integer('targetNumber');
        table.decimal('xSizeInMM');
        table.decimal('ySizeInMM');
        table.boolean('isInvalid');
        table.datetime('createdAt');
        table.datetime('updatedAt');
    })
    .createTable('shootingResultDetails', function(table) {
        table.primary(['shootingResultId', 'resultNumber']);
        table.integer('shootingResultId').references('shootingResultId').inTable('shootingResults');
        table.string('resultNumber').notNull();
        table.decimal('resultXInMM');
        table.decimal('resultYInMM');
        table.string('score');
        table.string('shotTime');
        table.decimal('temperature');
        table.datetime('createdAt');
        table.datetime('updatedAt');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shootingResultDetails')
        .then(() => knex.schema.dropTable('shootingResults'))
        .then(() => knex.schema.dropTable('shooters'));
};
