import HeaderDashboard from "@/components/headerDashboard/HeaderDashboard";
import PainelContent from "@/components/painelContent/PainelContent";
import { setupApiClient } from "@/services/api";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { withSSRGuest } from "@/utils/withSSRGuest";
import Head from "next/head";
import React from "react";

type userExperiences = {
  id: number;
  name: string;
};

type userMe = {
  id: number;
  name: string;
  email: string;
  projects: [];
  experiences: userExperiences[];
};

type userVacancies = {
  name: string;
  email: string;
  user_id: number;
};

type vacancies = {
  id: number;
  name: string;
  description: string;
  contact: string;
  user: userVacancies;
  experiences: [];
};

interface Props {
  userMe: userMe;
  vacancies: vacancies[];
}

export default function dashboard({ userMe, vacancies }: Props) {
  return (
    <div>
      <Head>
        <title>BT | Painel</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/*  <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <HeaderDashboard />
      <PainelContent userMe={userMe} vacancies={vacancies} />
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  let userMe = null;
  let vacancies = [];
  try {
    const responseUserMe = await apiClient.get("/me");
    userMe = responseUserMe.data;
    const responseVacancies = await apiClient.get(
      `/users/${userMe.id}/vacancies`
    );
    vacancies = responseVacancies.data.vacancies;
  } catch (err) {}
  return {
    props: {
      userMe: userMe,
      vacancies: vacancies,
    },
  };
});
