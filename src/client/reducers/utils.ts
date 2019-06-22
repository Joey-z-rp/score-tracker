import {
    CREATED_AT_KEY,
    SYNCHRONIZED_AT_KEY,
    UPDATED_AT_KEY
} from '../../common/constants/database';

export const convertDateString = (object: object): object => {
    const keysToConvert = [CREATED_AT_KEY, SYNCHRONIZED_AT_KEY, UPDATED_AT_KEY];
    const convertedDates = keysToConvert.map(key => {
        if (object[key]) {
            return { [key]: new Date(object[key]) };
        }
    }).reduce((accumulator, date) => ({ ...accumulator, ...date }));

    return { ...object, ...convertedDates };
};