// Table names
export const SHOOTERS_TABLE = 'shooters';
export const SHOOTING_RESULTS_TABLE = 'shootingResults';
export const SHOOTING_RESULT_DETAILS_TABLE = 'shootingResultDetails';

// Shooters table
export const NAME_KEY = 'name';
export const NICK_NAME_KEY = 'nickName';
export const CLUB_KEY = 'club';
export const DEFAULT_DISCIPLINE_KEY = 'defaultDiscipline';
export const NUMBER_OF_RESULTS_KEY = 'numberOfResult';
export const GRADE_CLUB_T_RIFLE_KEY = 'gradeClubTRifle';
export const GRADE_CLUB_F_STD_KEY = 'gradeClubFStd';
export const GRADE_CLUB_F_OPEN_KEY = 'gradeClubFOpen';
export const GRADE_CLUB_F_TR_KEY = 'gradeClubFTR';
export const SYNC_STATUS_KEY = 'syncStatus';
export const SYNCHRONIZED_AT_KEY = 'synchronizedAt';

// Shooting results table
export const SHOOTING_RESULT_ID_KEY = 'shootingResultId';
export const SHOOTER_ID_KEY = 'shooterId';
export const COMPETITION_CLUB_KEY = 'competitionClub';
export const DATE_KEY = 'date';
export const DISCIPLINE_KEY = 'discipline';
export const DISTANCE_KEY = 'distance';
export const GRADE_KEY = 'grade';
export const NICK_NAME_WITH_CLUB_KEY = 'nickNameWithClub';
export const STAGE_KEY = 'stage';
export const TARGET_NUMBER_KEY = 'targetNumber';
export const SHOTS_COUNT_KEY = 'shotsCount';
export const SIGHTERS_COUNT_KEY = 'sightersCount';
export const GROUP_SIZE_RAW_DATA_KEY = 'groupSizeRaw';
export const GROUP_SIZE_IN_MM_KEY = 'groupSizeInMM';
export const EDGE_SHOT_ONE_KEY = 'edgeShotOne';
export const EDGE_SHOT_TWO_KEY = 'edgeShotTwo';
export const BERDAN_STRING_IN_MM_KEY = 'berdanStringInMM';
export const X_SIZE_IN_MM_KEY = 'xSizeInMM';
export const Y_SIZE_IN_MM_KEY = 'ySizeInMM';
export const DELAY_KEY = 'delay';
export const IS_INVALID = 'isInvalid';

// Shooting result details table
export const RESULT_DETAILS_NUMBER_KEY = 'resultNumber';
export const RESULT_DETAILS_X_KEY = 'resultXInMM';
export const RESULT_DETAILS_Y_KEY = 'resultYInMM';
export const RESULT_DETAILS_SCORE_KEY = 'score';
export const RESULT_DETAILS_TEMPERATURE_KEY = 'temperature';
export const RESULT_DETAILS_SHOT_TIME_KEY = 'shotTime';

// Common
export const CREATED_AT_KEY = 'createdAt';
export const UPDATED_AT_KEY = 'updatedAt';

// Enums
export enum SyncStatus {
    Creating = 'creating',
    Failed = 'failed',
    Succeeded = 'succeeded',
    Synchronizing = 'synchronizing',
    UpToDate = 'upToDate',
}