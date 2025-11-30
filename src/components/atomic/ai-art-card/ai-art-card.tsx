import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AIArtPost } from "~/utils/mdx/ai-art.mdx";
import styles from "./ai-art-card.module.scss";

interface AIArtCardProps {
  post: AIArtPost;
  onClick?: () => void;
}

const AIArtCard: React.FC<AIArtCardProps> = ({ post, onClick }) => {
  const { title, image, model, tags, slug } = post;

  return (
    <Link href={`/ai-art/${slug}`} className={styles.cardLink}>
      <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        <Image
          src={`/img/ai-art/${image}`}
          alt={title}
          width={800}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          style={{ width: '100%', height: 'auto' }}
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
    </Link>
  );
};

export default React.memo(AIArtCard);