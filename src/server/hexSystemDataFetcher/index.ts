import { getShooterInfo } from './getShooterInfo';

const hexSystemDataFetcher = {
    getShooterInfo: (shooterId: number): Promise<any> => getShooterInfo(shooterId),
};

export default hexSystemDataFetcher;