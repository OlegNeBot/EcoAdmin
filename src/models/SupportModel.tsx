import {AccountModel} from "./AccountModel";

export type SupportModel = {
    id: string;
    description: string;
    isCompleted: boolean;

    supportResponsible: {
        account: AccountModel;
    };
};
