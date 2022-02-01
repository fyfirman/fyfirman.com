import React from "react";
import Image from "next/image";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  href: string;
  imageURI: StaticImageData;
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
        <Image alt={`${title} Snapshot`} src={imageURI} />
      </div>
      <span className={styles["card-title"]}>{title}</span>
      <p className="text-body">{desc}</p>
      <p className="text-body">Build with : {stack.join(", ")}</p>
      <a
        className={`${styles["card-button"]} ${notAvailable ? "not-available" : ""}`}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {!notAvailable ? "See Project ›" : "Not available yet"}
      </a>
    </div>
  );
};

export default ProjectCard;
