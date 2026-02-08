import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalProps } from "~/interfaces/modal";
import styles from "./story-preview-modal.module.scss";

interface StoryPreviewModalProps extends ModalProps {
  imageUrl: string;
  onDownload: () => void;
  charCount: number;
  onCharCountChange: (count: number) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
};

const StoryPreviewModal: React.FC<StoryPreviewModalProps> = ({ visible, onClose, imageUrl, onDownload, charCount, onCharCountChange, onRegenerate, isRegenerating }) => {
  return (
    <AnimatePresence>
      {visible && (
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
            <div className={styles.header}>
              <h2 className={styles.title}>Preview</h2>
              <button className={styles.closeButton} onClick={onClose}>
                ×
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.imageContainer}>
                <img src={imageUrl} alt="Story preview" className={styles.image} />
              </div>
            </div>

            <div className={styles.controls}>
              <div className={styles.charCountControl}>
                <label htmlFor="charCount" className={styles.label}>
                  Character Count: {charCount}
                </label>
                <input
                  id="charCount"
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={charCount}
                  onChange={(e) => onCharCountChange(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.charCountInput}>
                  <input
                    type="number"
                    min="100"
                    max="1000"
                    step="50"
                    value={charCount}
                    onChange={(e) => {
                      const value = Math.min(1000, Math.max(100, Number(e.target.value)));
                      onCharCountChange(value);
                    }}
                    className={styles.numberInput}
                  />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.regenerateButton} onClick={onRegenerate} disabled={isRegenerating}>
                {isRegenerating ? "Regenerating..." : "Regenerate"}
              </button>
              <button className={styles.downloadButton} onClick={onDownload}>
                Download
              </button>
              <button className={styles.closeButtonFooter} onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryPreviewModal;
