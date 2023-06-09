import CadastroContent from "@/components/cadastroContent/CadastroContent";
import HeaderAuth from "@/components/headerAuth/HeaderAuth";
import { withSSRGuest } from "@/utils/withSSRGuest";
import Head from "next/head";
import React from "react";

export default function cadastro() {
  return (
    <>
      <Head>
        <title>BT | Cadastro</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <HeaderAuth />
      <CadastroContent />
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
