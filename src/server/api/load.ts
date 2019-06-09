import hexSystemdataFetcher from '../hexSystemDataFetcher';

export const load = async (req, res) => {
    const shooter = await hexSystemdataFetcher.getShooterInfo(18565);
    const shooting = await hexSystemdataFetcher.getShootingResult(241213);

    res.json({
        shooting,
        ...shooter,
    });
};
