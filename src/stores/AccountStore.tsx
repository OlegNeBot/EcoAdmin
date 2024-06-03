import {makeAutoObservable, runInAction} from "mobx";
import {AccountModel} from "../models/AccountModel";
import {baseGetRequest} from "../requests";

class AccountStore {
    constructor() {
        makeAutoObservable(this, {}, {deep: true, autoBind: true});
    }

    account: AccountModel = {
        id: "",
        name: "",
        email: "",
        totalScore: 0,
        role: {
            name: "",
        },
    };

    users: AccountModel[] = [];

    loadAccount = async () => {
        try {
            await baseGetRequest<AccountModel>("account").then((result) => {
                if (result !== undefined) {
                    runInAction(() => {
                        this.account = result;
                    });
                } else {
                    console.log("Проблема с получением информации о пользователе!");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    loadUsers = async () => {
        try {
            await baseGetRequest<AccountModel[]>("account/all").then((result) => {
                if (result !== undefined) {
                    runInAction(() => {
                        this.users = result;
                    });
                } else {
                    console.log("Проблема с получением всех пользователей!");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export default new AccountStore();
