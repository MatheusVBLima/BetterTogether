import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../context/AuthContext";

let isRefreshing = false;
let failedRequestsQueue = [];

interface AxiosErrorResponse {
  code?: string;
}

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${cookies["BT.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx);
          const { "BT.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "BT.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });
                setCookie(ctx, "BT.refreshToken", response.data.refreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });

                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );
                failedRequestsQueue = [];
                if (typeof window !== "undefined") {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (typeof window !== "undefined") {
            signOut();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

/* import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../context/AuthContext";
import jwtDecode, { JwtPayload } from "jwt-decode";

export function setupApiBTient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  let refreshToken = cookies["BT.refreshToken"];

  // Função para atualizar o token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/refresh-token",
        {
          refreshToken,
        }
      );
      const newAccessToken = response.data.accessToken;
      // Atualiza o cabeçalho de autorização com o novo token
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      // Atualiza o cookie com o novo token
      setCookie(ctx, "accessToken", newAccessToken);
    } catch (error) {
      // Trate o erro de atualização do token conforme sua lógica de negócio
      console.error("Erro ao atualizar o token:", error);
    }
  };

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${cookies["BT.token"]}`,
    },
  });

  // Intercepta as respostas do servidor para verificar se ocorreu um erro de autenticação
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        // Erro de autenticação, tenta atualizar o token e reenviar a requisição
        await refreshAccessToken();
        // Reenvia a requisição original com o novo token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${cookies["BT.token"]}`;
        return api(originalRequest);
      }
      // Caso contrário, retorna o erro original
      return Promise.reject(error);
    }
  );

  // Verifica se o token expirou e atualiza-o se necessário ao carregar a página
  const accessToken = cookies["accessToken"];
  if (!accessToken) {
    // Caso o token não esteja presente nos cookies, realiza a autenticação normalmente
    return api;
  }

  // Verifica se o token está expirado
  const decodedToken: JwtPayload = jwtDecode(accessToken);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decodedToken && decodedToken.exp && decodedToken.exp < currentTimestamp) {
    // Token expirado, atualiza-o
    refreshAccessToken();
  } else {
    // Token válido, utiliza-o normalmente
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return api;
}
 */
