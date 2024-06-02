import {EcoPlaceRequestModel} from "./EcoPlaceModel";

export type AccountModel = {
    id: string;
    name: string;
    email: string;
    totalScore: number;
    role: {
        name: string;
    };
    ecoPlaceRequest?: EcoPlaceRequestModel;
};
