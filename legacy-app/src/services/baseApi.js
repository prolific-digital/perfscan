import axios from "axios";
import { API_URL } from "../typeCodes";
import https from "https";

if (process.env.NODE_ENV === 'development') {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    // eslint-disable-next-line no-console
    console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)
}

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': "application/json, text/plain, */*",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' :  '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

// 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',

// axios.defaults.baseURL = API_URL;

// axios.defaults.headers.common["Accept"] = "application/json, text/plain, */*";
// axios.defaults.headers.post["Content-Type"] = "application/json";

