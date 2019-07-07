import { SHOOTER_ID_KEY, SHOOTING_RESULT_ID_KEY } from '../../common/constants/database';
import { ShootingResult } from '../models/shootingResult';
import { ShootingResultDetail } from '../models/shootingResultDetail';

export const getGroupSizes = async (req, res) => {
    const shooterId = req.params.shooterId;
    const groupSizes = await ShootingResult.getGroupSizes(shooterId);

    return res.json(groupSizes); 
};

export const getHEyes = async (req, res) => {
    const shooterId = req.params.shooterId;
    
    return res.json({}); 
};

// This function is only used for Adding shooterId for rows inserted before
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
