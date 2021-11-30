/* eslint-disable react/display-name */
import { memo } from "react";
import { useDesktopMediaQuery, useTabletAndBelowMediaQuery } from "~/hooks/useAppMediaQuery";

const BaseDesktop = ({ children }: { children: React.ReactElement }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

export const Desktop = memo(BaseDesktop);

const BaseTabletAndBelow = ({ children }: { children: React.ReactElement }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};
export const TabletAndBelow = memo(BaseTabletAndBelow);
