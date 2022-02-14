import React from "react";
import { ProjectCard } from "~/components/atomic";
import projectList from "~/data/project-list";
import styles from "~/styles/Home.module.scss";
import env from "~/utils/environment";

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
