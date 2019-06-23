import { ShootingResult } from '../models/shootingResult';

export const getGroupSizes = async (req, res) => {
    const shooterId = req.params.shooterId;
    const groupSizes = await ShootingResult.getGroupSizes(shooterId);

    return res.json(groupSizes); 
};