import { handleError } from "@/packages/notification";
import { clearCookies, navigate } from "@/packages/actions";
import { makePath, PAGES } from "@/packages/libraries";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookies } from "cookies-next";
import qs from "query-string";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export const api = axios.create({
  baseURL,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "comma",
      skipNull: true,
      skipEmptyString: true,
    });
  },
});

function handleRequest(config: InternalAxiosRequestConfig<any>) {
  const { vHdr: header, vPl: payload, vSg: signature } = getCookies();

  if (header) {
    const value = [header, payload, signature].join(".");
    config.headers.Authorization = `Bearer ${value}`;
  }

  return config;
}

api.interceptors.request.use(handleRequest);

// function handleResponse(error: AxiosError) {
//   if (error?.response?.status == 401) {
//     clearCookies();
//     window.location.href =
//       PAGES.LOGIN + "?redirect=" + window.location.pathname;
//   }
//   return Promise.reject(error);
// }

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   handleResponse
// );
