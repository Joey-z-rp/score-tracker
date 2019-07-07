import {
    IGroupSize,
    IShooter,
    IShootingResultDetail,
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

export interface IHEye extends IShootingResultDetail {
    date: Date | string;
    distance: string;
    stage: number;
}

export interface IShooterStatistics {
    groupSizes: IConvertedGroupSizes,
    groupSizesError: Error | null,
    hEyes: IHEye[],
    hEyesError: Error | null,
    isFetchingGroupSizes: boolean,
    isFetchingHEyes: boolean,
}

export interface ISynchronizeState {

}