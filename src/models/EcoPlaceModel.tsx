import {AccountModel} from "./AccountModel";

type EcoPlaceModel = {
    id: string;
    name: string;
    coordinates: {
        x: number;
        y: number;
    };
    description: string;
    startTime: Date;
    endTime: Date;
    isApproved: boolean;
    ecoPlaceType: {
        Name: string;
    };
};

export type EcoPlaceRequestModel = {
    id: string;
    description: string;
    isReviewed: boolean;
    ecoPlace: EcoPlaceModel;
    placeResponsible?: {
        account: AccountModel;
    };
    account?: AccountModel;
};
