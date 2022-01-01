import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import styles from "../styles/Home.module.scss";
import HomeHeader from "~/components/pages/home/home-header";
import HomeWeapon from "~/components/pages/home/home-weapon";
import HomeProject from "~/components/pages/home/home-project";
import HomeContact from "~/components/pages/home/home-contact";

const Home: NextPage = () => {
  return (
    <>
      <Head title="Home" />

      <div className={styles.main}>
        <HomeHeader />
        <HomeWeapon />
        <HomeProject />
        <HomeContact />
      </div>
    </>
  );
};

export default React.memo(Home);
