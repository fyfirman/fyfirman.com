import React from "react";
import pacisBot from "@assets/images/project/pacis-bot.jpg";
import himatifApps from "@assets/images/project/himatif-apps.jpg";
import careIn from "@assets/images/project/carein.jpg";
import terimaCurhatASI from "@assets/images/project/terima-curhat-asi.jpg";
import velocityLeague from "@assets/images/project/velocity-league.jpg";
import curhatASIWeb from "@assets/images/project/curhat-asi-web.jpg";
import { ProjectCard } from "~/components/atomic";
import styles from "~/styles/Home.module.scss";
import env from "~/utils/environment";

interface IProject {
  desc: string;
  href: string;
  imageURI: StaticImageData;
  stack: string[];
  title: string;
  notAvailable?: boolean;
}

const projectList: IProject[] = [
  {
    title: "Velocity League",
    desc: "A startup that has just started its business, providing a matchmaking game platform to compete with each other.",
    href: "https://velocity-league.com",
    imageURI: velocityLeague,
    stack: ["React", "Typescript"],
  },
  {
    desc: "Auto-fill questionnare on PACIS Unpad",
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

const NUM_OF_COLUMN = 2;

const HomeProject = () => {
  return (
    <div id="home-project">
      <h2 className={styles.headings2} id="project-section">
        Selected Project
      </h2>
      {[...(Array(Math.round(projectList.length / NUM_OF_COLUMN)) as number[])].map((_, i) => (
        <div key={i} className={`${styles.projectContainer} ${i % 2 === 0 ? styles.first : styles.last}`}>
          {[...(Array(NUM_OF_COLUMN) as number[])].map((__, j) => (
            <ProjectCard key={2 * j + j} {...projectList[2 * i + j]} />
          ))}
        </div>
      ))}
      {/* <Link to="/project/">See All Project</Link> <br /> */}
      {!env.disableSpline && (
        <div className="spline-container">
          <iframe
            frameBorder="0"
            id="spline-geo-2"
            loading="lazy"
            src="spline/geometric-2/index.html"
            title="3d-spline-geo-2"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(HomeProject);
