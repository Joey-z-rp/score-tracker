import { getShooterInfo } from './getShooterInfo';
import { getShootingResult } from './getShootingResult';

const hexSystemDataFetcher = {
    getShooterInfo: (shooterId: number): Promise<any> => getShooterInfo(shooterId),
    getShootingResult: (resultId: number): Promise<any> => getShootingResult(resultId),
};

export default hexSystemDataFetcher;