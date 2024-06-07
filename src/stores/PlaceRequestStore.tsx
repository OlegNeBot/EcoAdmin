import {makeAutoObservable, runInAction} from "mobx";
import {AccountModel} from "../models/AccountModel";
import {baseGetRequest, basePutRequest} from "../requests";
import {EcoPlaceRequestModel} from "../models/EcoPlaceModel";
import accountStore from "./AccountStore";

type RequestApproved = {
    eprId: string;
    isApproved: boolean;
};

type EcoPlaceRequestResponsible = {
    eprId: string;
    accountId: string;
};

class PlaceRequestStore {
    constructor() {
        makeAutoObservable(this, {}, {deep: true, autoBind: true});
    }

    placeRequests: EcoPlaceRequestModel[] = [];

    loadRequests = async () => {
        try {
            await baseGetRequest<EcoPlaceRequestModel[]>("placerequest").then((result) => {
                if (result !== undefined) {
                    runInAction(() => {
                        this.placeRequests = result;
                    });
                } else {
                    console.log("Проблема с получением заявок по эко-местам!");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    reviewRequest = async (eprId: string, isApproved: boolean) => {
        try {
            await basePutRequest<RequestApproved, null>("placerequest", {
                eprId,
                isApproved,
            });
        } catch (error) {
            console.log(error);
        }
    };

    setResponsible = async (eprId: string) => {
        const accountId = accountStore.account.id;

        try {
            await basePutRequest<EcoPlaceRequestResponsible, null>("placerequest/responsible", {
                eprId,
                accountId,
            }).then(() => {
                runInAction(() => {
                    this.loadRequests();
                });
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export default new PlaceRequestStore();
