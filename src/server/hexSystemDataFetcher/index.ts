import { getResultIds } from './getResultIds';
import { getShooterInfo } from './getShooterInfo';
import { getShootingResult } from './getShootingResult';

const hexSystemDataFetcher = {
    getResultIds: (shooterId: number, pageNumber: number) => getResultIds(shooterId, pageNumber),
    getShooterInfo: (shooterId: number): Promise<any> => getShooterInfo(shooterId),
    getShootingResult: (resultId: number): Promise<any> => getShootingResult(resultId),
};

export default hexSystemDataFetcher;