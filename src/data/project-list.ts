import pacisBot from "@assets/images/project/pacis-bot.jpg";
import himatifApps from "@assets/images/project/himatif-apps.jpg";
import careIn from "@assets/images/project/carein.jpg";
import terimaCurhatASI from "@assets/images/project/terima-curhat-asi.jpg";
import velocityLeague from "@assets/images/project/velocity-league.jpg";
import curhatASIWeb from "@assets/images/project/curhat-asi-web.jpg";
import { ImageProps } from "next/image";

interface Project {
  desc: string;
  href: string;
  imageURI: ImageProps["src"];
  stack: string[];
  title: string;
  notAvailable?: boolean;
}

const projectList: Project[] = [
  {
    title: "Velocity League",
    desc: "A startup that has just started its business, providing a matchmaking game platform to compete with each other.",
    href: "https://velocity-league.com",
    imageURI: velocityLeague,
    stack: ["React", "Typescript"],
  },
  {
    desc: "Auto-fill questionnaire on PACIS Unpad",
    href: "https://github.com/fyfirman/pacis-questionnaire-bot",
    imageURI: pacisBot,
    stack: ["NodeJS"],
    title: "Pacis-bot",
  },
  {
    desc: "Information system for the ‘Himatif FMIPA Unpad’ members",
    href: "https://apps.himatif.org/",
    imageURI: himatifApps,
    stack: ["Laravel", "MySQL"],
    title: "Himatif Apps",
  },
  {
    desc: "Health services in person by ordering via application",
    href: "https://play.google.com/store/apps/details?id:com.carein",
    imageURI: careIn,
    stack: ["React Native", "NodeJS", "MySQL"],
    title: "Care.in",
  },
  {
    desc: "Application to retrieve an consultation about exclusive breast feeding",
    href: "#",
    imageURI: terimaCurhatASI,
    notAvailable: true,
    stack: ["React Native", "Laravel", "MySQL"],
    title: "Terima Curhat ASI",
  },
  {
    desc: "Dashboard of Curhat ASI to analyze user activities",
    href: "#",
    imageURI: curhatASIWeb,
    notAvailable: true,
    stack: ["React", "Typescript"],
    title: "Curhat ASI Web",
  },
];

export default projectList;
