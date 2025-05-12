import React from "react";
import { z } from "zod";
import { ProjectCard } from "~/components/atomic";
import projectsData from "~/data/projects.json";
import { useAOS } from "~/hooks/useAOS";
import styles from "~/styles/Home.module.scss";
import ScrollAnimation from "~/components/template/scroll-animation/scroll-animation";
import { Heading1 } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import { headerVariants } from "./home-project.animation";

const ProjectSchema = z.object({
  desc: z.string(),
  href: z.string(), // Allow any string for href since we have "#" links
  imageURI: z.string(),
  stack: z.array(z.string()),
  title: z.string(),
  notAvailable: z.boolean().optional(),
});

const ProjectsDataSchema = z.object({
  projects: z.array(ProjectSchema),
});

const NUM_OF_COLUMN = 2;

// Validate the data at runtime
const validatedData = ProjectsDataSchema.parse(projectsData);
const projectList = validatedData.projects;

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
        Portfolio
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
    </div>
  );
};

export default React.memo(HomeProject);
