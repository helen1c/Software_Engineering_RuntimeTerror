const PROD_ENV = "https://young-bastion-09945.herokuapp.com";
const DEV_ENV = "http://localhost:8080"

const updateOptions = (options?: RequestInit | any) => {
    const update = {...options};
    update.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
    if (sessionStorage.getItem("key")) {
        update.headers["authorization"] = sessionStorage.getItem("key") as string;
    }
    return update;
};

export const fetcher = async (url: RequestInfo, options?: RequestInit) => {
    return fetch(`${DEV_ENV}${url}`, updateOptions(options));
};