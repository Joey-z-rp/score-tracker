
exports.up = function(knex, Promise) {
    return knex.schema.createTable('shooters', function(table) {
        table.integer('id').notNull().primary();
        table.integer('numberOfResult').notNull();
        table.string('name').notNull();
        table.string('nickName');
        table.string('club');
        table.string('defaultDiscipline');
        table.string('gradeClubFOpen');
        table.string('gradeClubFStd');
        table.string('gradeClubFTR');
        table.string('gradeClubTRifle');
        table.timestamps();
    })
    .createTable('shootingResults', function(table) {
        table.integer('shooterId').notNull().primary();
        table.decimal('berdanStringInMM');
        table.string('competitionClub');
        table.date('date').notNull();
        table.string('delay');
        table.string('discipline');
        table.string('distance');
        table.integer('edgeShotOne');
        table.integer('edgeShotTwo');
        table.string('grade');
        table.decimal('groupSizeInMM');
        table.string('name');
        table.string('nickNameWithClub');
        table.string('scoreNumber').notNull();
        table.string('scoreString').notNull();
        table.integer('shotsCount').notNull();
        table.integer('sightersCount').notNull();
        table.integer('stage').notNull();
        table.integer('targetNumber').notNull();
        table.decimal('xSizeInMM').notNull();
        table.decimal('ySizeInMM').notNull();
    })
    .createTable('shootingResultDetails', function(table) {
        table.integer('shootingId').notNull().primary();
        table.string('resultNumber');
        table.decimal('resultXInMM');
        table.decimal('resultYInMM');
        table.string('score');
        table.string('shotTime');
        table.decimal('temperature');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shooters');
};