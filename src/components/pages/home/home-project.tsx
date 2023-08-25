import React from "react";
import { ProjectCard } from "~/components/atomic";
import projectList from "~/data/project-list";
import { useAOS } from "~/hooks/useAOS";
import styles from "~/styles/Home.module.scss";
import env from "~/utils/environment";
import ScrollAnimation from "~/components/template/scroll-animation/scroll-animation";
import { Heading1 } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import { headerVariants } from "./home-project.animation";

const NUM_OF_COLUMN = 2;

const HomeProject = () => {
  const { controls, ref } = useAOS();
  const { isMobile } = useResponsive();

  return (
    <div id="home-project">
      <Heading1
        animate={controls}
        id="project-section"
        initial="initial"
        isMobile={isMobile}
        ref={ref}
        style={{ marginTop: 128, marginBottom: 40 }}
        variants={headerVariants}
      >
        Selected Project
      </Heading1>
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
