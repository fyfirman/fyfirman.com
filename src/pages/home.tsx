import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import HomeHeader from "~/components/pages/home/home-header";
import HomeWeapon from "~/components/pages/home/home-weapon";
import HomeProject from "~/components/pages/home/home-project";
import HomeContact from "~/components/pages/home/home-contact";

const Home: NextPage = () => {
  return (
    <>
      <Head title="Home" />

      <HomeHeader />
      <HomeWeapon />
      <HomeProject />
      <HomeContact />
    </>
  );
};

export default React.memo(Home);
