import {
    BERDAN_STRING_IN_MM_KEY,
    CLUB_KEY,
    COMPETITION_CLUB_KEY,
    DEFAULT_DISCIPLINE_KEY,
    DELAY_KEY,
    GRADE_CLUB_F_OPEN_KEY,
    GRADE_CLUB_F_STD_KEY,
    GRADE_CLUB_F_TR_KEY,
    GRADE_CLUB_T_RIFLE_KEY,
    GROUP_SIZE_RAW_DATA_KEY,
    NICK_NAME_KEY,
    NICK_NAME_WITH_CLUB_KEY,
    NUMBER_OF_RESULTS_KEY,
    RESULT_DETAILS_NUMBER_KEY,
    RESULT_DETAILS_SCORE_KEY,
    RESULT_DETAILS_SHOT_TIME_KEY,
    RESULT_DETAILS_TEMPERATURE_KEY,
    RESULT_DETAILS_X_KEY,
    RESULT_DETAILS_Y_KEY,
    SHOOTER_ID_KEY,
    SHOTS_COUNT_KEY,
    SIGHTERS_COUNT_KEY,
    STAGE_KEY,
    TARGET_NUMBER_KEY,
    X_SIZE_IN_MM_KEY,
    Y_SIZE_IN_MM_KEY,
} from '../../common/constants/database';

export const HEX_SYSTEM_BASE_URL = 'http://shooting.hexsystems.com.au';

// Shooter information
export const NICK_NAME_DESC = 'nick name';
export const CLUB_DESC = 'club';
export const DEFAULT_DISCIPLINE_DESC = 'default discipline';
export const NUMBER_OF_RESULTS_DESC = 'number of results';
export const GRADE_CLUB_T_RIFLE_DESC = 'grade (club) t-rifle';
export const GRADE_CLUB_F_STD_DESC = 'grade (club) f-std';
export const GRADE_CLUB_F_OPEN_DESC = 'grade (club) f-open';
export const GRADE_CLUB_F_TR_DESC = 'grade (club) f-tr';

export const SHOOTER_INFO_DESCRIPTION_MAP = {
    [NICK_NAME_DESC]: NICK_NAME_KEY,
    [CLUB_DESC]: CLUB_KEY,
    [DEFAULT_DISCIPLINE_DESC]: DEFAULT_DISCIPLINE_KEY,
    [NUMBER_OF_RESULTS_DESC]: NUMBER_OF_RESULTS_KEY,
    [GRADE_CLUB_T_RIFLE_DESC]: GRADE_CLUB_T_RIFLE_KEY,
    [GRADE_CLUB_F_STD_DESC]: GRADE_CLUB_F_STD_KEY,
    [GRADE_CLUB_F_OPEN_DESC]: GRADE_CLUB_F_OPEN_KEY,
    [GRADE_CLUB_F_TR_DESC]: GRADE_CLUB_F_TR_KEY,
};

// Shooting result
export const SHOOTER_ID_DESC = 'shooter id';
export const COMPETITION_CLUB_DESC = 'competition club';
export const NICK_NAME_WITH_CLUB_DESC = 'nick name';
export const STAGE_DESC = 'stage';
export const TARGET_NUMBER_DESC = 'target num.';
export const SHOTS_COUNT_DESC = 'shots count';
export const SIGHTERS_COUNT_DESC = 'sighters count';
export const GROUP_SIZE_RAW_DATA_DESC = 'group size';
export const BERDAN_STRING_IN_MM_DESC = 'berdan string';
export const X_SIZE_IN_MM_DESC = 'x size';
export const Y_SIZE_IN_MM_DESC = 'y size';
export const DELAY_DESC = 'delay';

export const SHOOTING_INFO_DESCRIPTION_MAP = {
    [SHOOTER_ID_DESC]: SHOOTER_ID_KEY,
    [COMPETITION_CLUB_DESC]: COMPETITION_CLUB_KEY,
    [NICK_NAME_WITH_CLUB_DESC]: NICK_NAME_WITH_CLUB_KEY,
    [STAGE_DESC]: STAGE_KEY,
    [TARGET_NUMBER_DESC]: TARGET_NUMBER_KEY,
    [SHOTS_COUNT_DESC]: SHOTS_COUNT_KEY,
    [SIGHTERS_COUNT_DESC]: SIGHTERS_COUNT_KEY,
    [GROUP_SIZE_RAW_DATA_DESC]: GROUP_SIZE_RAW_DATA_KEY,
    [BERDAN_STRING_IN_MM_DESC]: BERDAN_STRING_IN_MM_KEY,
    [X_SIZE_IN_MM_DESC]: X_SIZE_IN_MM_KEY,
    [Y_SIZE_IN_MM_DESC]: Y_SIZE_IN_MM_KEY,
    [DELAY_DESC]: DELAY_KEY,
};

// Shooting result details
export const RESULT_DETAILS_NUMBER_DESC = '#';
export const RESULT_DETAILS_X_DESC = 'x (mm)';
export const RESULT_DETAILS_Y_DESC = 'y (mm)';
export const RESULT_DETAILS_SCORE_DESC = 'score';
export const RESULT_DETAILS_TEMPERATURE_DESC = '°с';
export const RESULT_DETAILS_SHOT_TIME_DESC = 'shot time';

export const RESULT_DETAILS_DESCRIPTION_MAP = {
    [RESULT_DETAILS_NUMBER_DESC]: RESULT_DETAILS_NUMBER_KEY,
    [RESULT_DETAILS_X_DESC]: RESULT_DETAILS_X_KEY,
    [RESULT_DETAILS_Y_DESC]: RESULT_DETAILS_Y_KEY,
    [RESULT_DETAILS_SCORE_DESC]: RESULT_DETAILS_SCORE_KEY,
    [RESULT_DETAILS_TEMPERATURE_DESC]: RESULT_DETAILS_TEMPERATURE_KEY,
    [RESULT_DETAILS_SHOT_TIME_DESC]: RESULT_DETAILS_SHOT_TIME_KEY
};