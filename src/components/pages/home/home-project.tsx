import React from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "~/components/atomic";
import projectList from "~/data/project-list";
import { useAOS } from "~/hooks/useAOS";
import styles from "~/styles/Home.module.scss";
import env from "~/utils/environment";
import ScrollAnimation from "~/components/template/scroll-animation/scroll-animation";
import { headerVariants } from "./home-project.animation";

const NUM_OF_COLUMN = 2;

const HomeProject = () => {
  const { controls, ref } = useAOS();
  return (
    <div id="home-project">
      <motion.h2
        animate={controls}
        className={styles.headings2}
        id="project-section"
        initial="initial"
        ref={ref}
        variants={headerVariants}
      >
        Selected Project
      </motion.h2>
      {[...(Array(Math.round(projectList.length / NUM_OF_COLUMN)) as number[])].map((_, i) => (
        <div key={i} className={`${styles.projectContainer} ${i % 2 === 0 ? styles.first : styles.last}`}>
          {[...(Array(NUM_OF_COLUMN) as number[])].map((__, j) => (
            <ScrollAnimation
              key={2 * j + j}
              style={{
                flex: 1,
              }}
              variants={headerVariants}
            >
              <ProjectCard {...projectList[2 * i + j]} />
            </ScrollAnimation>
          ))}
        </div>
      ))}
      {/* <Link to="/project/">See All Project</Link> <br /> */}
      {!env.disableSpline ? (
        <div className="spline-container">
          <iframe
            frameBorder="0"
            id="spline-geo-2"
            loading="lazy"
            src="spline/geometric-2/index.html"
            title="3d-spline-geo-2"
          />
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(HomeProject);
