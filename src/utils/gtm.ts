/* eslint-disable @typescript-eslint/no-unnecessary-condition */
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
