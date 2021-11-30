import type { NextPage } from "next";
import { Head } from "@components/template";
import React from "react";
import styles from "../styles/Home.module.scss";
import { HomeContact, HomeHeader, HomeProject, HomeWeapon } from "~/components/pages/home";

const Home: NextPage = () => {
  return (
    <>
      <Head title="Home" />

      <main className={styles.main}>
        <HomeHeader />
        <HomeWeapon />
        <HomeProject />
        <HomeContact />
      </main>
    </>
  );
};

export default React.memo(Home);
