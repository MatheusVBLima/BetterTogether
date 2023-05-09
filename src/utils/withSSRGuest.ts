import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P & { [key: string]: unknown }>
): GetServerSideProps<P> {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    if (cookies["BT.token"]) {
      return {
        redirect: {
          destination: "/painel",
          permanent: false,
        },
      };
    }
    const result = await fn(ctx);
    return result;
  };
}
