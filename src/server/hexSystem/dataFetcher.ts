import { getResultIds } from './getResultIds';
import { getShooterInfo } from './getShooterInfo';
import { getShootingResult } from './getShootingResult';

const hexSystemDataFetcher = {
    getResultIds: (shooterId: number, pageNumber: number) => getResultIds(shooterId, pageNumber),
    getShooterInfo: (shooterId: number) => getShooterInfo(shooterId),
    getShootingResult: (resultId: number) => getShootingResult(resultId),
};

export default hexSystemDataFetcher;