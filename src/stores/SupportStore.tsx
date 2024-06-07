import {makeAutoObservable, runInAction} from "mobx";
import {AccountModel} from "../models/AccountModel";
import {baseGetRequest, basePutRequest} from "../requests";
import accountStore from "./AccountStore";
import {SupportModel} from "../models/SupportModel";

type SupportRequestResponsible = {
    srId: string;
    accountId: string;
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

    completeRequest = async (srId: string) => {
        try {
            await basePutRequest<string, null>("supportrequest", srId);
        } catch (error) {
            console.log(error);
        }
    };

    setResponsible = async (srId: string) => {
        const accountId = accountStore.account.id;

        try {
            await basePutRequest<SupportRequestResponsible, null>("supportrequest/responsible", {
                srId,
                accountId,
            }).then(() => {
                runInAction(() => {
                    this.loadSupportRequests();
                });
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export default new SupportStore();
