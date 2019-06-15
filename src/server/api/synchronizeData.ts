import hexSystemdataFetcher from '../hexSystemDataFetcher';
import { NUMBER_OF_RESULTS_KEY } from './../hexSystemDataFetcher/constants';
import { Shooter } from '../models/shooter';
import { ShootingResultAndDetail } from '../models/shootingResultAndDetail';
import { ShootingResult } from '../models/shootingResult'

export const syncShooter = async (req, res) => {
    const shooterId = req.query.shooterId;
    // const count = await ShootingResult.getResultCount(shooterId);
    // const dbShooter = await Shooter.get(shooterId);
    // const ids = await ShootingResult.getRestultIds(shooterId);
    const shooter = await getShooterInfo(shooterId);
    const shooterInsert = await Shooter.create({ ...shooter, id: shooterId });

    const numberOfResults = shooter[NUMBER_OF_RESULTS_KEY];
    const numberOfResultsInDB = 0; // TODO: get real results count from db
    if (numberOfResults === numberOfResultsInDB) return res.json({ status: 'up to date' });

    const resultIds = await getResultIds(shooterId, numberOfResults);

    const rawResults = await getShootingResults(resultIds);fd
    let allScoreDetails: any[] = [];
    const results = rawResults.map((result, index) => {
        const scoreDetails = result.scoreDetails.map(scoreDetail => ({
            ...scoreDetail,
            shootingResultId: resultIds[index],
        }));
        allScoreDetails = allScoreDetails.concat(scoreDetails);

        delete result.scoreDetails;

        return {
            ...result,
            shootingResultId: resultIds[index],
        };
    });

    await ShootingResultAndDetail.batchCreate(results, allScoreDetails);

    // const shootingResultInsert = await ShootingResult.batchCreate(results);
    // const shootingResultDetailInsert = await ShootingResultDetail.batchCreate(allScoreDetails);

    res.json({
        allScoreDetails,
        shooter,
        shooterId,
        results,
        resultIds,
        shooterInsert,
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
