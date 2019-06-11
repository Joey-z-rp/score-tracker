import hexSystemdataFetcher from '../hexSystemDataFetcher';

export const syncShooter = async (req, res) => {
    // const shooter = await hexSystemdataFetcher.getShooterInfo(18565);
    // const shooting = await hexSystemdataFetcher.getShootingResult(241213);
    // const resultIds = await hexSystemdataFetcher.getResultIds(2761, 2);
    const shooterId = req.query.shooterId;

    res.json({
        shooterId,
    });
};
