import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import styles from "../styles/Blog.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head title="Blog" />

      <div className={styles.main}>blog list</div>
    </>
  );
};

export default React.memo(Home);
