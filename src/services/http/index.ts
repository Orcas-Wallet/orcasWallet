import axios, { AxiosResponse } from "axios";

const request = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "https://demo.keysafe.network/ks"
            : "https://demo.keysafe.network/ks",
});

request.interceptors.request.use((config) => {
    const { data = {}, headers } = config;
    return {
        ...config,
        headers: {
            ...headers,
        },
        data: {
            ...data,
        },
    };
});

request.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;
        switch (data.status) {
            case "success":
                return data;
            case "fail":
                throw Error(data);
            default:
                return data;
        }
    },
    (error: any) => {
        if (error.response.status === 401) {
            // window.location.href = `#${ROUTES.LOGIN_HOME}`;
        } else {
            // message({
            //     content: error?.response?.data || error?.message,
            // });
        }
        throw Error(error);
    }
);

export default request;