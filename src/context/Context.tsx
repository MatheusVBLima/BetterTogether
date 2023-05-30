import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import axios from "axios";

type User = {
  permissions: string[];
  roles: string[];
} | null;

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

type recoverCredentials = {
  email: string;
};

type changePasswordCredentials = {
  password: string;
  password_confirmation: string;
};

type redefinePasswordCredentials = {
  password: string;
  password_confirmation: string;
  solicitation: string;
};

type ContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;

  user: User;
  isAuthenticated: boolean;
  recover(credentials: recoverCredentials): Promise<void>;
  changePassword(credentials: changePasswordCredentials): Promise<void>;
  redefinePassword(credentials: redefinePasswordCredentials): Promise<void>;
};

export const Context = createContext({} as ContextData);

type ProviderProps = {
  children: ReactNode;
};

export function signOut() {
  destroyCookie(undefined, "BT.token");
  destroyCookie(undefined, "BT.refreshToken");

  Router.push("/");
}

export function Provider({ children }: ProviderProps) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "BT.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { permissions, roles } = response.data;
          setUser({ permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("/signin", {
      email,
      password,
    });

    const { token, refreshToken, permissions, roles } = response.data;

    setCookie(undefined, "BT.token", token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    setCookie(undefined, "BT.refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    setUser({
      permissions,
      roles,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    Router.push("/painel");
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    await api.post("/signup", {
      name,
      email,
      password,
    });
    signIn({ email, password });
  }

  async function recover({ email }: recoverCredentials) {
    await api.post("/solicitations/forgot-password", {
      email,
    });
  }

  async function redefinePassword({
    password,
    password_confirmation,
    solicitation,
  }: redefinePasswordCredentials) {
    await api.patch("/solicitation", {
      password,
      password_confirmation,
      solicitation,
    });

    signOut();
  }

  async function changePassword({
    password,
    password_confirmation,
  }: changePasswordCredentials) {
    await api.put("/me", {
      password,
      password_confirmation,
    });

    signOut();
  }

  return (
    <Context.Provider
      value={{
        signIn,
        signUp,
        signOut,
        recover,
        changePassword,
        redefinePassword,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
}
