import { SyncStatus } from '../constants/database';

export interface IShooter {
    club: string;
    createdAt: string | Date;
    defaultDiscipline: string;
    gradeClubFOpen: string;
    gradeClubFStd: string;
    gradeClubFTR: string;
    gradeClubTRifle: string;
    name: string;
    nickName: string;
    numberOfResult: number;
    shooterId: number;
    synchronizedAt: string | Date;
    syncStatus: SyncStatus;
    updatedAt: string | Date;
}

export interface IGroupSize {
    date: string | Date;
    groupSizeInMM: number;
    distance: string;
}

export interface IShootingResultDetail {
    createdAt: string | Date;
    resultXInMM: string;
    resultYInMM: string;
    resultNumber: string;
    score: string;
    shooterId: number;
    shootingResultId: number;
    shotTime: string;
    temperature: string;
    updatedAt: string | Date;
}
