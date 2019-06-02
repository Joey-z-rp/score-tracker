import hexSystemdataFetcher from '../hexSystemDataFetcher';

export const load = async (req, res) => {
    const shooter = await hexSystemdataFetcher.getShooterInfo(18633);
    const shooting = await hexSystemdataFetcher.getShootingResult(236739);

    res.json({
        shooting,
        ...shooter,
    });
};
