import {makeAutoObservable} from "mobx";

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    isAuth: boolean = false;
    remember: boolean = false;

    setAuth = () => {
        this.isAuth = true;
    };

    removeAuth = () => {
        if (this.remember) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        this.isAuth = false;
    };

    setRemember = (remember: boolean) => {
        this.remember = remember;
    };
}

export default new AuthStore();
