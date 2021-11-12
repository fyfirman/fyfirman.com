import {
  useDesktopMediaQuery,
  useTabletAndBelowMediaQuery,
} from "~/hooks/useAppMediaQuery";

export const Desktop = ({ children }: { children: React.ReactElement }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

export const TabletAndBelow = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};
