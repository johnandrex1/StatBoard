import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASEURL,
    timeout: 5000
});


export const articleInstance: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_NEWS_BASEURL,
    timeout: 5000
});