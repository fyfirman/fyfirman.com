import { useEffect } from "react";
import { Router } from "next/router";
import { GTMPageView } from "~/utils/gtm";

const useGTM = () => {
  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url);
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
};

export default useGTM;
