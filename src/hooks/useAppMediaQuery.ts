import { useMediaQuery } from "react-responsive";

export const useDesktopMediaQuery = () => useMediaQuery({ query: "(min-width: 992px)" });

export const useTabletAndBelowMediaQuery = () => useMediaQuery({ query: "(max-width: 991px)" });
