/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import Cookies from 'universal-cookie';

type ApiHookState<T> = {
    data: any | null;
    loading: boolean;
    isFetching: boolean;
    error: Error | null;
};

type ApiResponse<T> = ApiHookState<T> & {
    request: (options: ApiRequestOptions<T>) => void;
};

type ApiRequestOptions<T> = {
    method: string;
    url: string;
    data?: any;
    options?: AxiosRequestConfig;
    bearerToken?: string | null;
    contentType?: string;
    cacheExpiry?: number; // Cache expiry time in milliseconds
};

function useApi<T>(defaultBearerToken?: string): ApiResponse<T> {
    const baseUrl = 'https://dummyjson.com'; // Your base URL
    const [state, setState] = useState<ApiHookState<T>>({
        data: null,
        loading: true,
        isFetching: false,
        error: null,
    });

    const cookies = new Cookies();
    const defaultToken = defaultBearerToken || cookies.get('accessToken');

    const request = (options: ApiRequestOptions<T>) => {
        const { method, url, data, options: axiosOptions, bearerToken, contentType, cacheExpiry = 300000 } = options;
        const headers: any = { 'Content-Type': 'application/json' };

        if (bearerToken) {
            headers.Authorization = `Bearer ${bearerToken}`;
        } else if (defaultToken) {
            headers.Authorization = `Bearer ${defaultToken}`;
        }

        // if (contentType && contentType === 'application/json') {
        //     headers['Content-Type'] = 'application/json';
        // }

        const cacheKey = `${method}-${url}`;
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData && new Date().getTime() - Number(JSON.parse(cachedData).timestamp) < cacheExpiry) {
            setState({
                data: JSON.parse(cachedData).data,
                loading: false,
                isFetching: false,
                error: null,
            });
        } else {
            setState(prevState => ({ ...prevState, isFetching: true }));

            axios.request<T>({
                method,
                url: `${baseUrl}/${url}`,
                data,
                headers,
                ...axiosOptions,
            })
                .then((response: AxiosResponse<T>) => {
                    setState({
                        data: response.data,
                        loading: false,
                        isFetching: false,
                        error: null,
                    });

                    const cacheData = { data: response.data, timestamp: new Date().getTime() };
                    sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
                })
                .catch((error: AxiosError) => {
                    setState({
                        data: null,
                        loading: false,
                        isFetching: false,
                        error: error,
                    });
                });
        }
    };


    return { ...state, request };
}

export default useApi;
