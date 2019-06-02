import hexSystemdataFetcher from '../hexSystemDataFetcher';

export const load = async (req, res) => {
    const result = await hexSystemdataFetcher.getShooterInfo(18633);

    res.send(result);
};
