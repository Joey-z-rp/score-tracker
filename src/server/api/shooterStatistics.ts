import {
    BULL_RING_RADIUS,
    BULLET_DIAMETER,
} from '../../common/constants/target';
import {
    DATE_KEY,
    DISCIPLINE_KEY,
    DISTANCE_KEY,
    RESULT_DETAILS_NUMBER_KEY,
    RESULT_DETAILS_X_KEY,
    RESULT_DETAILS_Y_KEY,
    SHOOTER_ID_KEY,
    SHOOTING_RESULT_ID_KEY,
    STAGE_KEY,
} from '../../common/constants/database';
import { ShootingResult } from '../models/shootingResult';
import { ShootingResultDetail } from '../models/shootingResultDetail';

export const getGroupSizes = async (req, res) => {
    const shooterId = req.params.shooterId;
    const groupSizes = await ShootingResult.getGroupSizes(shooterId);

    return res.json(groupSizes); 
};

export const getHEyes = async (req, res) => {
    const shooterId = req.params.shooterId;
    const [results, resultDetails] = await Promise.all([
        ShootingResult.getInfoForHEyes(shooterId),
        ShootingResultDetail.getAllForShooter(shooterId),
    ]);

    const resultDistanceMap = results.reduce((map, result) => {
        if (result[DISCIPLINE_KEY] === 'T-Rifle') {
            map[result[SHOOTING_RESULT_ID_KEY]] = result[DISTANCE_KEY];
        }

        return map;
    }, {});

    const hEyes = resultDetails.filter(detail => {
        const distance = resultDistanceMap[detail[SHOOTING_RESULT_ID_KEY]];

        if (!distance) return false;

        return isHEye(detail, distance);
    });

    const processedHEyes = hEyes.map(hEye => {
        const correspondingResult = results.find(result =>
            result[SHOOTING_RESULT_ID_KEY] === hEye[SHOOTING_RESULT_ID_KEY]);

        return {
            ...hEye,
            date: correspondingResult[DATE_KEY],
            distance: correspondingResult[DISTANCE_KEY],
            stage: correspondingResult[STAGE_KEY],
        };
    });
    
    return res.json(processedHEyes); 
};

function isHEye(detail: object, distance: string): boolean {
    const resultNumber = detail[RESULT_DETAILS_NUMBER_KEY];
    if (resultNumber === 'A' || resultNumber === 'B') return false;

    const x = detail[RESULT_DETAILS_X_KEY];
    const y = detail[RESULT_DETAILS_Y_KEY];
    const distanceFromBulletCenter = Math.sqrt((x * x) + (y * y));
    const distanceFromBulletOutmost = distanceFromBulletCenter - BULLET_DIAMETER / 2;
    const innerBullRing = BULL_RING_RADIUS[distance].inner;
    const outerBullRing = BULL_RING_RADIUS[distance].outer;

    return distanceFromBulletOutmost > innerBullRing && distanceFromBulletOutmost < outerBullRing;
}

// This function is only used for updating shooterId for rows inserted before
// add_shooterId_to_shootingResultDetails migration
async function updateShooterIds() {
    const [shootingResults, shootingResultDetails] = await Promise.all([
        ShootingResult.getAll(),
        ShootingResultDetail.getAll(),
    ]);

    const updatedShootingResultDetails = shootingResultDetails.map(detail => {
        const shootingResult = shootingResults.find(result =>
            result[SHOOTING_RESULT_ID_KEY] === detail[SHOOTING_RESULT_ID_KEY]);
        const shooterId = (shootingResult || {})[SHOOTER_ID_KEY];
        
        return {
            ...detail,
            [SHOOTER_ID_KEY]: shooterId,
        };
    });

    const updatingResult = await ShootingResultDetail.batchUpdateShooterId(updatedShootingResultDetails);

    return updatingResult;
}
