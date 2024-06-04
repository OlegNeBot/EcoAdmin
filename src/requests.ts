import axios, {AxiosError} from "axios";
import authStore from "./stores/AuthStore";
import {DEV_REQUEST_URL} from "./config";

var isRefreshing = false;

var failedQueue: any[] = [];

const Queue = (token: any) => {
    for (var i = 0; i < failedQueue.length; i++) {
        failedQueue[i](token);
    }

    failedQueue = [];
};

const $api = axios.create({
    baseURL: DEV_REQUEST_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${
        authStore.remember ? localStorage.getItem("accessToken") : sessionStorage.getItem("accessToken")
    }`;

    return config;
});

$api.interceptors.response.use(
    async (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            if (isRefreshing) {
                return new Promise((token) => {
                    failedQueue.push(token);
                })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    originalRequest._isRetry = true;
                    return $api.request(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }

            originalRequest._isRetry = true;
            isRefreshing = true;
            await refreshToken().finally(() => (isRefreshing = false));
            originalRequest.headers.Authorization = `Bearer ${
                authStore.remember ? localStorage.getItem("accessToken") : sessionStorage.getItem("accessToken")
            }`;

            return await $api.request(originalRequest);
        } else if (error.config_isRetry) {
            authStore.removeAuth();
        }

        //throw error;
        console.log(error);

        return Promise.reject(error);
    }
);

async function refreshToken() {
    var rToken = localStorage.getItem("refreshToken");
    if (!rToken) {
        rToken = sessionStorage.getItem("refreshToken");
    }

    await axios
    .post(DEV_REQUEST_URL + "auth/refresh", {RToken: rToken})
    .then((response) => {
        if (authStore.remember) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);

        Queue(response.data.accessToken);
    })
    .catch((error: AxiosError) => {
        console.log(error);
        console.log(error.request);

        Queue(null);

        authStore.removeAuth();
    });
}

// Основной GET-запрос.
export async function baseGetRequest<T>(url: string): Promise<T | undefined> {
    return $api
    .get<T>(url)
    .then((response) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        console.log(error);
        return undefined;
    });
}

// Основной POST-запрос.
export async function basePostRequest<T, R>(url: string, data: T): Promise<R | string | undefined> {
    return await $api
    .post<R>(url, data)
    .then((response) => {
        if (response.status === 200) {
            return response.data;
        }
    })
    .catch((error: AxiosError) => {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 403) {
                if (typeof error.response.data === "string") {
                    return error.response.data;
                }
            }
        }

        console.log(error.response);
        return undefined;
    });
}

// Основной PUT-запрос.
export async function basePutRequest<T, R>(url: string, data: T): Promise<R | string | undefined> {
    return await $api
    .put<R>(url, data)
    .then((response) => {
        if (response.status === 201 || response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            return response.data;
        }
    })
    .catch((error: AxiosError) => {
        console.log(error);
        return undefined;
    });
}
