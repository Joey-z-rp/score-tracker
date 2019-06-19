import hexSystemdataFetcher from '../hexSystemDataFetcher';
import {
    NUMBER_OF_RESULTS_KEY,
    SHOOTER_ID_KEY,
    SHOOTING_RESULT_ID_KEY,
    SyncStatus,
} from '../../common/constants/database';
import { Shooter } from '../models/shooter';
import { ShootingResultAndDetail } from '../models/shootingResultAndDetail';
import { ShootingResult } from '../models/shootingResult'

export const syncShooter = async (req, res) => {
    const shooterId = req.query.shooterId;
    const [shooter, shooterInDB] = await Promise.all([
        getShooterInfo(shooterId),
        Shooter.get(shooterId),
    ]);

    const isCreating = shooterInDB.length === 0;
    if (isCreating) {
        await Shooter.create({
            ...shooter,
            [SHOOTER_ID_KEY]: shooterId,
        });
    }

    const numberOfResults = shooter[NUMBER_OF_RESULTS_KEY];
    const numberOfResultsInDB = await ShootingResult.getResultCount(shooterId);

    if (numberOfResults === numberOfResultsInDB) return res.json({ status: SyncStatus.UpToDate });

    const syncStatus = isCreating ? SyncStatus.Creating : SyncStatus.Synchronizing;
    await Shooter.setSyncStatus(shooterId, syncStatus);
    console.info(`Shooter ${shooterId} sync status: ${syncStatus}`);
    // The sychronization process may take a long time, so just returning status here
    res.json({ status: syncStatus });

    try {
        const {
            results,
            allScoreDetails,
        } = await getResultsAndScoreDetails(shooterId, numberOfResults, numberOfResultsInDB);

        await ShootingResultAndDetail.batchCreate(results, allScoreDetails);
        await Shooter.setSyncStatus(shooterId, SyncStatus.Succeeded);
        console.info(`Shooter ${shooterId} sync status: ${SyncStatus.Succeeded}`);
    }
    catch(error) {
        await Shooter.setSyncStatus(shooterId, SyncStatus.Failed);
        console.error(error)
        console.error(`Shooter ${shooterId} sync status: ${SyncStatus.Failed}`);
    }
};

async function getShooterInfo(shooterId: number) {
    const shooter = await hexSystemdataFetcher.getShooterInfo(shooterId);

    if (!shooter.name) throw new Error(`Shooter Id ${shooterId} not found`);

    return shooter;
}

async function getResultsAndScoreDetails(
    shooterId: number,
    numberOfResults: number,
    numberOfResultsInDB: number,
): Promise<any> {
    const resultIdsInDB = numberOfResultsInDB !== 0
        ? await ShootingResult.getRestultIds(shooterId)
        : [];
    const resultIdsInHex = await getResultIds(shooterId, numberOfResults);
    const resultIdsToFetch = resultIdsInHex.filter(id => !resultIdsInDB.includes(id));

    const rawResults = await getRawResults(resultIdsToFetch);
    let allScoreDetails: any[] = [];
    const results = rawResults.map((result, index) => {
        const scoreDetails = result.scoreDetails.map(scoreDetail => ({
            ...scoreDetail,
            [SHOOTING_RESULT_ID_KEY]: resultIdsToFetch[index],
        }));
        allScoreDetails = allScoreDetails.concat(scoreDetails);

        delete result.scoreDetails;

        return {
            ...result,
            [SHOOTING_RESULT_ID_KEY]: resultIdsToFetch[index],
        };
    });

    return { allScoreDetails, results };
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

    if (resultIds.length !== numberOfResults) {
        throw new Error(`Shooter ${shooterId}: Number of results does not match resultIds length`);
    }

    return resultIds;
}

async function getRawResults(resultIds: string[]) {
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
