import hexSystemdataFetcher from '../hexSystemDataFetcher';

export const load = async (req, res) => {
    const shooter = await hexSystemdataFetcher.getShooterInfo(18565);
    const shooting = await hexSystemdataFetcher.getShootingResult(241213);
    const resultIds = await hexSystemdataFetcher.getResultIds(2761, 2);

    res.json({
        resultIds,
        shooter,
        shooting,
    });
};
