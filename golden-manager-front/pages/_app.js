import React from "react";
import Head from "next/head";

import "../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/dashboard.css";
import "../assets/css/custom-style.css";
import Dashboard from "../layouts/Dashboard";
import axios from "axios";

export default function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = "https://localhost:5001";
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Golden Manager</title>
      </Head>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </>
  );
}
