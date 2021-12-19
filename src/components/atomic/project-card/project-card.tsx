import React from "react";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  href: string;
  imageURI: any;
  title: string;
  desc: string;
  stack: string[];
  notAvailable?: boolean;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { href, imageURI, title, desc, stack, notAvailable = false } = props;

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-image"]}>
        <img alt={`${title} Snapshot`} src={imageURI} />
      </div>
      <span className={styles["card-title"]}>{title}</span>
      <p className="text-body">{desc}</p>
      <p className="text-body">Build with : {stack.join(", ")}</p>
      <a className={`${styles["card-button"]} ${notAvailable ? "not-available" : ""}`} href={href}>
        {!notAvailable ? "See Project ›" : "Not available yet"}
      </a>
    </div>
  );
};

export default ProjectCard;
