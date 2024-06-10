import {AccountModel} from "./AccountModel";

export type SupportModel = {
    id: string;
    description: string;
    account: AccountModel;
    isCompleted: boolean;

    supportResponsible?: {
        account: AccountModel;
    };
};
