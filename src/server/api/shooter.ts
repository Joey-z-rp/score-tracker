import { Shooter } from '../models/shooter';

export const getAllShooters = async (req, res) => {
    const shooters = await Shooter.getAll();

    return res.json(shooters); 
};

// Club champ:
// best of all ranges + best of 2nd best (<=600y) + best 2nd best (>=800y)