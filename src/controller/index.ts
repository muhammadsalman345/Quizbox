import Axios from "axios";
import { baseUrl } from "../routes/ApiRoutes";

export interface IController {
  params?: any;
  data?: any;
  token?: string;
  url?: string;
  method?: "post" | "get" | "put" | "patch" | "delete";
  contentType?: "application/json" | "multipart/form-data";
}

export default function <T>({
  data,
  params,
  method,
  url,
  token,
  contentType,
}: IController): Promise<T> {
  return new Promise<T>(function (resolve, reject) {
    try {
      Axios({
        baseURL: baseUrl,
        method: method ? method : "get",
        url,
        data,
        params,
        headers: {
          contentType: contentType ? contentType : "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response.data as T))
        .catch((error) =>
          reject(
            error?.response?.data?.message ||
              error?.data?.message ||
              error?.message ||
              error
          )
        );
    } catch (error) {
      reject(error);
    }
  });
}
