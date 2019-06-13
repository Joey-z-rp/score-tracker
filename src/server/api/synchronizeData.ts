import hexSystemdataFetcher from '../hexSystemDataFetcher';
import { NUMBER_OF_RESULTS_KEY } from './../hexSystemDataFetcher/constants';
import { Shooter } from '../models/shooter';

export const syncShooter = async (req, res) => {
    const shooterId = req.query.shooterId;
    const shooter = await getShooterInfo(shooterId);
    // const result = await Shooter.create({ ...shooter, id: shooterId });

    const numberOfResults = shooter[NUMBER_OF_RESULTS_KEY];
    const numberOfResultsInDB = 0; // TODO: get real results count from db
    if (numberOfResults === numberOfResultsInDB) return res.json({ status: 'up to date' });

    const resultIds = await getResultIds(shooterId, numberOfResults);

    const results = await getShootingResults(resultIds);

    res.json({
        shooter,
        shooterId,
        results,
        resultIds,
    });
};

async function getShooterInfo(shooterId: number) {
    const shooter = await hexSystemdataFetcher.getShooterInfo(shooterId);

    if (!shooter.name) throw new Error(`Shooter Id ${shooterId} not found`);

    return shooter;
}

async function getResultIds(shooterId: number, numberOfResults: number) {
    let resultIds = [];
    let page = 1;

    while (resultIds.length < numberOfResults) {
        const paginatedResultIds = await hexSystemdataFetcher.getResultIds(shooterId, page);
        resultIds = resultIds.concat(paginatedResultIds);
        page++;

        await sleep(1000); // To prevent making too many requests in a short period
    }

    if (resultIds.length !== numberOfResults) throw new Error('Number of results does not match');

    return resultIds;
}

async function getShootingResults(resultIds: string[]) {
    let index = 0;
    const results: any[] = [];

    while (index < resultIds.length) {
        const result = await hexSystemdataFetcher.getShootingResult(resultIds[index]);
        results.push(result);
        index++;

        await sleep(1000);
    }

    return results;
}

function sleep(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, time);
    });
}
