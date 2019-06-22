import { SyncStatus } from '../constants/database';

export interface IShooter {
    club: string;
    createdAt: Date;
    defaultDiscipline: string;
    gradeClubFOpen: string;
    gradeClubFStd: string;
    gradeClubFTR: string;
    gradeClubTRifle: string;
    name: string;
    nickName: string;
    numberOfResult: number;
    shooterId: number;
    synchronizedAt: Date;
    syncStatus: SyncStatus;
    updatedAt: Date;
}