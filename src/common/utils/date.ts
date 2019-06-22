import { format } from 'date-fns';
import { STANDARD_DATE_TIME_DISPLAY_FORMAT } from '../../common/constants/date';

export const convertToDisplayFormat = (date: Date): string =>
    format(date, STANDARD_DATE_TIME_DISPLAY_FORMAT);
    