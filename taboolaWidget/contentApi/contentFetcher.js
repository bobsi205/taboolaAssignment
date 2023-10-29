import {API_BASE_URL, RECOMMENDATION_GET, API_PARAMETERS} from "./config/apiConfig.js";

export const fetchContent = () => {
    return new Promise((resolve, reject) => {
        let url = buildApiUrl();
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    console.error("Failed to fetch content", xhr.statusText);
                    reject(xhr.statusText);
                }
            }
        };

        xhr.onerror = () => {
            console.error("Failed to fetch content");
            reject("Request failed.");
        };

        xhr.open("GET", url, true);
        xhr.send();
    });
};


export const buildApiUrl = () => {
    const baseUrl = `${API_BASE_URL}${API_PARAMETERS.publisher}${RECOMMENDATION_GET}`;
    const queryString = parametersToQueryString(API_PARAMETERS.params);
    return baseUrl + queryString;
};

const parametersToQueryString = (params) => {
    return Object.keys(params)
        .map(
            (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");
};
