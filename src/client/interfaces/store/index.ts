import { IShooter } from '../../../common/types/model';

export interface IState {
    shooter: IShooterState;
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

export interface ISynchronizeDataState {

}