import hexSystemdataFetcher from '../hexSystemDataFetcher';
import { NUMBER_OF_RESULTS_KEY } from './../hexSystemDataFetcher/constants';

export const syncShooter = async (req, res) => {
    // const shooting = await hexSystemdataFetcher.getShootingResult(241213);
    // const resultIds = await hexSystemdataFetcher.getResultIds(2761, 2);
    const shooterId = req.query.shooterId;
    const shooter = await hexSystemdataFetcher.getShooterInfo(shooterId);

    if (!shooter.name) throw new Error(`Shooter Id ${shooterId} not found`);

    const numberOfResults = shooter[NUMBER_OF_RESULTS_KEY];
    const numberOfResultsInDB = 0; // TODO: get real results count from db

    if (numberOfResults === numberOfResultsInDB) return res.json({ status: 'up to date' });

    let resultIds = [];
    let page = 1;
    while (resultIds.length < numberOfResults) {
        const paginatedResultIds = await hexSystemdataFetcher.getResultIds(shooterId, page);
        resultIds = resultIds.concat(paginatedResultIds);
        page++;

        await sleep(1000); // To prevent making too many requests in a short period
    }

    if (resultIds.length !== numberOfResults) throw new Error('Number of results does not match');

    res.json({
        shooterId,
        resultIds,
    });
};

function sleep(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, time);
    });
}
