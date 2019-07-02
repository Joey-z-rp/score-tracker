import {
    IShooter,
    IGroupSize,
} from '../../common/types/model';

export interface IAction {
    type: string;
    payload: any;
}

export interface IState {
    shooterList: IShooterListState;
    shooterStatistics: IShooterStatistics;
    synchronize: ISynchronizeState;
}

export interface IShooterListState {
    error: Error | null,
    isFetching: boolean,
    shooters: IConvertedShooter[],
}

export interface IConvertedShooter extends IShooter {
    synchronizedAt: Date;
    updatedAt: Date;
    createdAt: Date;
}

export interface IGroupSizeWithDate extends IGroupSize {
    date: Date;
}

export interface IConvertedGroupSizes {
    [key: string]: IGroupSizeWithDate[];
}

export interface IShooterStatistics {
    error: Error | null,
    groupSizes: IConvertedGroupSizes,
    isFetchingGroupSizes: boolean,
}

export interface ISynchronizeState {

}