import {makeAutoObservable, runInAction} from "mobx";
import {AccountModel} from "../models/AccountModel";
import {baseGetRequest, basePutRequest} from "../requests";
import {EcoPlaceRequestModel} from "../models/EcoPlaceModel";
import accountStore from "./AccountStore";

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

    reviewRequest = async (epr: EcoPlaceRequestModel, isApproved: boolean) => {
        try {
            await basePutRequest<{epr: EcoPlaceRequestModel; isApproved: boolean}, null>("placerequest", {
                epr,
                isApproved,
            });
        } catch (error) {
            console.log(error);
        }
    };

    setResponsible = async (epr: EcoPlaceRequestModel) => {
        const account = accountStore.account;

        try {
            await basePutRequest<{epr: EcoPlaceRequestModel; account: AccountModel}, null>("placerequest/responsible", {
                epr,
                account,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export default new PlaceRequestStore();
