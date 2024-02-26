import axios, { AxiosError, type AxiosInstance } from 'axios';
const API_URL = 'https://localhost:44311/api/';

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

function isAxiosUnauthorizedError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === 401;
}

function isAxiosForbiddenError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === 403;
}

function isAxiosNotFoundError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === 404;
}

function isAxiosServerError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status >= 500;
}

class HttpService {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = localStorage.getItem('token');
    this.instance = axios.create({
      baseURL: `${API_URL}`,
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        const { result } = response.data;

        if (url === `${API_URL}TokenAuth/Authenticate`) {
          this.accessToken = result.accessToken;
          localStorage.setItem('token', result.accessToken);
        }

        // if (url === ENDPOINTS.LOGOUT) {
        //   this.accessToken = ''
        //   clearIsAuthLS()
        // }
        return response;
      },
      (error: AxiosError) => {
        /* Todo */
        // Unauthorize (401) has many types.
        // - Wrong Token
        // - No Token
        // - Expired Token

        // If 401 Error
        /* Todo 401 */

        //Type: Wrong Token || No Token || Expired Token but Failed Request RefreshToken => ClearLS
        // if (isAxiosUnauthorizedError(error)) {
        //   clearIsAuthLS();
        //   this.accessToken = '';
        //   localStorage.removeItem('token');
        // }
        // if (isAxiosForbiddenError(error)) {
        //   window.dispatchEvent(
        //     new CustomEvent('errorEvent', { detail: { status: 403 } })
        //   );
        // }

        // if (isAxiosNotFoundError(error)) {
        //   window.dispatchEvent(
        //     new CustomEvent('errorEvent', { detail: { status: 404 } })
        //   );
        // }

        // if (isAxiosServerError(error)) {
        //   window.dispatchEvent(
        //     new CustomEvent('errorEvent', { detail: { status: 500 } })
        //   );
        // }

        return Promise.reject(error);
      }
    );
  }
}

const http = new HttpService().instance;

export default http;

export const ENDPOINTS = Object.freeze({
    
});

export const clearIsAuthLS = () => {
  //localStorage.removeItem('token')
};
