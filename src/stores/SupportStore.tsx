import {makeAutoObservable, runInAction} from "mobx";
import {AccountModel} from "../models/AccountModel";
import {baseGetRequest, basePutRequest} from "../requests";
import accountStore from "./AccountStore";
import {SupportModel} from "../models/SupportModel";

type SupportRequestResponsible = {
    sr: SupportModel;
    account: AccountModel;
};

class SupportStore {
    constructor() {
        makeAutoObservable(this, {}, {deep: true, autoBind: true});
    }

    supportRequests: SupportModel[] = [];

    loadSupportRequests = async () => {
        try {
            await baseGetRequest<SupportModel[]>("supportrequest").then((result) => {
                if (result !== undefined) {
                    runInAction(() => {
                        this.supportRequests = result;
                    });
                } else {
                    console.log("Проблема с получением заявок для тех. поддержки!");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    completeRequest = async (sr: SupportModel) => {
        try {
            await basePutRequest<SupportModel, null>("supportrequest", sr);
        } catch (error) {
            console.log(error);
        }
    };

    setResponsible = async (sr: SupportModel) => {
        const account = accountStore.account;

        try {
            await basePutRequest<SupportRequestResponsible, null>("supportrequest/responsible", {
                sr,
                account,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export default new SupportStore();
