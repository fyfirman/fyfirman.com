/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import env from "~/utils/environment";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string;
    page: string;
  }

  const pageEvent: PageEventProps = {
    event: "pageview",
    page: url,
  };
  //@ts-expect-error: TODO: define data layer
  window?.dataLayer?.push(pageEvent);
  return pageEvent;
};

export const getScriptGTM = () => {
  if (!!env.firebaseConfig.gtmAuth && !!env.firebaseConfig.gtmEnvId) {
    return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=
            ${env.firebaseConfig.gtmAuth}&gtm_preview=env-${env.firebaseConfig.gtmEnvId}
            &gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WMCCR8J');`;
  }
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${env.firebaseConfig.gtmId}');`;
};

export const getNoScriptGTM = () => {
  if (!!env.firebaseConfig.gtmAuth && !!env.firebaseConfig.gtmEnvId) {
    return `<iframe src="https://www.googletagmanager.com/ns.html?id=${env.firebaseConfig.gtmId}
            &gtm_auth=${env.firebaseConfig.gtmAuth}&gtm_preview=env-${env.firebaseConfig.gtmEnvId}&gtm_cookies_win=x"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  }
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=${env.firebaseConfig.gtmId}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
};
