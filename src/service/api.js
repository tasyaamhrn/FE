import axios from "axios";

const apiGet = (url, data, headers) => {
    return axios.get(url, {
        params: data,
    }, headers)
};
export { apiGet }