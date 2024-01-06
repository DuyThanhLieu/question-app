import axios from "axios";
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing: 'ease',
    // speed: 200,
    // trickleRate: 0.02,
    trickleSpeed: 100,
});//customize lai loding bar speed
//customize axios
const instance = axios.create({
    baseURL: 'http://localhost:8081/', // duong link goi api
    // timeout: 1000,// phan hoi api
    // headers: { 'x-Custom-Header': 'foobar' },
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // console.log('>>> intercepting response', response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response; //check data tra ve co data thi lay
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error('>>>> run error', error.response);
    return error && error.response && error.response.data
        ? error.response.data : Promise.reject(error);
});
export default instance;