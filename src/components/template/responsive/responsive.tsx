/* eslint-disable react/display-name */
import { memo } from "react";
import useResponsive from "~/hooks/useResponsive";

const BaseDesktop = ({ children }: { children: React.ReactElement }) => {
  const { isMobile } = useResponsive();

  return !isMobile ? children : null;
};

export const Desktop = memo(BaseDesktop);

const BaseTabletAndBelow = ({ children }: { children: React.ReactElement }) => {
  const { isMobile } = useResponsive();

  return isMobile ? children : null;
};
export const TabletAndBelow = memo(BaseTabletAndBelow);
