import { Shooter } from '../models/shooter';

export const getAllShooters = async (req, res) => {
    const shooters = await Shooter.getAll();

    return res.json(shooters); 
};