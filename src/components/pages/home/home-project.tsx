import React from "react";
import pacisBot from "@assets/images/project/pacis-bot.jpg";
import himatifApps from "@assets/images/project/himatif-apps.jpg";
import careIn from "@assets/images/project/carein.jpg";
import terimaCurhatASI from "@assets/images/project/terima-curhat-asi.jpg";
import { ProjectCard } from "~/components/atomic";
import styles from "~/styles/Home.module.scss";

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
];

const HomeProject = () => {
  return (
    <>
      <h2 className={styles.headings2} id="project-section">
        Selected Project
      </h2>
      {[...(Array(2) as number[])].map((_, i) => (
        <div key={i} className={`${styles.projectContainer} ${i % 2 === 0 ? styles.first : styles.last}`}>
          {[...(Array(2) as number[])].map((__, j) => (
            <ProjectCard key={2 * i + j} {...projectList[2 * i + j]} />
          ))}
        </div>
      ))}
      {/* <Link to="/project/">See All Project</Link> <br /> */}
      <div className="spline-container">
        <iframe
          allowTransparency={true}
          frameBorder="0"
          id="spline-geo-2"
          src="spline/geometric-2/index.html"
          title="3d-spline-geo-2"
        />
      </div>
    </>
  );
};

export default React.memo(HomeProject);
