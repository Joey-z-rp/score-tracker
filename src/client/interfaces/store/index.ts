import { IShooter } from '../../../common/types/model';

export interface IState {
    shooter: IShooterState;
    shooterStatistics: IShooterStatistics;
    synchronizeData: ISynchronizeDataState;
}

export interface IShooterState {
    error: Error | null,
    isFetching: boolean,
    shooters: IConvertedShooter[],
}

export interface IConvertedShooter extends IShooter {
    synchronizedAt: Date;
    updatedAt: Date;
    createdAt: Date;
}

export interface IShooterStatistics {
    error: Error | null,
    groupSizes: IConvertedGroupSize[],
    isFetchingGroupSizes: boolean,
}

export interface IConvertedGroupSize {
    date: Date;
    groupSizeInMM: number;
}

export interface ISynchronizeDataState {

}