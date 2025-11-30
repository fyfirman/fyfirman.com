import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AIArtPost } from "~/utils/mdx/ai-art.mdx";
import { ModalProps } from "~/interfaces/modal";
import { clsx } from "~/helpers/classname-helper";
import styles from "./ai-art-modal.module.scss";

interface AIArtModalProps extends ModalProps {
  post: AIArtPost | null;
  posts: AIArtPost[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const AIArtModal: React.FC<AIArtModalProps> = ({ visible, onClose, post, posts, currentIndex, onNavigate }) => {
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < posts.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, posts.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible) return;

      switch (e.key) {
        case "Escape":
          onClose?.();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        default:
          break;
      }
    },
    [visible, onClose, handlePrevious, handleNext],
  );

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, handleKeyDown]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "anticipate",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        ease: "anticipate",
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {visible && post ? (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={styles.modal}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>{post.title}</h2>
              <button className={styles.closeButton} onClick={onClose}>
                ×
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.imageSection}>
                <div className={styles.imageContainer}>
                  <Image
                    src={`/img/ai-art/${post.image}`}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className={styles.image}
                    priority
                  />
                </div>
              </div>

              <div className={styles.detailsSection}>
                <div className={styles.details}>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Model:</span>
                    <span className={styles.value}>{post.model}</span>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.label}>Created:</span>
                    <span className={styles.value}>{formatDate(String(post.createdAt))}</span>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.label}>Prompt:</span>
                    <div className={styles.promptContainer}>
                      <p className={styles.prompt}>{post.prompt}</p>
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.label}>Tags:</span>
                    <div className={styles.tagsContainer}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.navigation}>
              <button
                className={clsx([styles.navButton, styles.prevButton, currentIndex === 0 && styles.disabled])}
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                ← Previous
              </button>

              <span className={styles.counter}>
                {currentIndex + 1} of {posts.length}
              </span>

              <button
                className={clsx([
                  styles.navButton,
                  styles.nextButton,
                  currentIndex === posts.length - 1 && styles.disabled,
                ])}
                onClick={handleNext}
                disabled={currentIndex === posts.length - 1}
              >
                Next →
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default AIArtModal;
