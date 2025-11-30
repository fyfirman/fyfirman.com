import React from "react";
import Image from "next/image";
import { AIArtPost } from "~/utils/mdx/ai-art.mdx";
import { clsx } from "~/helpers/classname-helper";
import styles from "./ai-art-card.module.scss";

interface AIArtCardProps {
  post: AIArtPost;
  onClick: () => void;
}

const AIArtCard: React.FC<AIArtCardProps> = ({ post, onClick }) => {
  const { title, image, model, tags } = post;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        <Image
          src={`/img/ai-art/${image}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.model}>{model}</p>
            <div className={styles.tags}>
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className={styles.tagMore}>+{tags.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AIArtCard);