import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AIArtPost } from "~/utils/mdx/ai-art.mdx";
import AIArtCard from "~/components/atomic/ai-art-card/ai-art-card";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";
import styles from "./ai-art-masonry-grid.module.scss";

interface AIArtMasonryGridProps {
  posts: AIArtPost[];
  loading?: boolean;
  shouldAnimate?: boolean;
}

const AIArtMasonryGrid: React.FC<AIArtMasonryGridProps> = ({ posts, loading = false, shouldAnimate = true }) => {
  const { isMobile, isTablet } = useResponsive();
  const gridRef = useRef<HTMLDivElement>(null);

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const distributePostsToColumns = (posts: AIArtPost[], columnCount: number) => {
    const columns: AIArtPost[][] = Array.from({ length: columnCount }, () => []);
    
    posts.forEach((post, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(post);
    });

    return columns;
  };

  const columns = distributePostsToColumns(posts, getColumnCount());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "anticipate",
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingGrid}>
          {Array.from({ length: getColumnCount() }).map((_, colIndex) => (
            <div key={colIndex} className={styles.loadingColumn}>
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className={styles.loadingSkeleton}
                  style={{
                    height: Math.random() * 200 + 200 + "px",
                    animationDelay: `${(colIndex * 3 + itemIndex) * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        className={styles.emptyState}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "anticipate", duration: 0.5 }}
      >
        <div className={styles.emptyStateContent}>
          <div className={styles.emptyStateIcon}>🎨</div>
          <h3 className={styles.emptyStateTitle}>No AI Art Found</h3>
          <p className={styles.emptyStateText}>
            Try adjusting your search terms or filters
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={clsx([styles.masonryGrid])}
      ref={gridRef}
      variants={containerVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className={styles.column}>
          {column.map((post, itemIndex) => (
            <motion.div
              key={post.slug}
              className={styles.gridItem}
              variants={itemVariants}
              custom={colIndex * 3 + itemIndex}
            >
              <AIArtCard post={post} />
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default React.memo(AIArtMasonryGrid);