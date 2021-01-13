const PROD_ENV = "https://young-bastion-09945.herokuapp.com";
const DEV_ENV = "http://localhost:8080"

//prilikom puštanja u pogon, PROD_ENV zamijeniti s https://{naziv-backenda}.herokuapp.com

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
    return fetch(`${PROD_ENV}${url}`, updateOptions(options));
};