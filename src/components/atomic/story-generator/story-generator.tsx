import React, { useRef, useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { toPng } from "html-to-image";
import { ImageProps } from "next/image";
import { Share2 } from "lucide-react";
import StoryTemplate from "./story-template";
import StoryPreviewModal from "./story-preview-modal";
import styles from "./story-generator.module.scss";

interface StoryGeneratorProps {
  coverImage: ImageProps["src"];
  title: string;
  fullContentText: string;
  publishedAt: Date;
  slug: string;
  isDarkMode: boolean;
  fontMode: "serif" | "sans-serif";
}

// Export button component separately
export const StoryShareButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
}> = ({ onClick, disabled, isGenerating }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick} disabled={disabled} aria-label="Share to Story">
      <Share2 size={16} />
      <span>{isGenerating ? "Generating..." : "Share"}</span>
    </button>
  );
};

const StoryGenerator: React.FC<StoryGeneratorProps> = ({
  coverImage,
  title,
  fullContentText,
  publishedAt,
  slug,
  isDarkMode,
  fontMode,
}) => {
  const templateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(500);

  // Crop content text based on character count
  const croppedDescription = useMemo(() => {
    let text = fullContentText.substring(0, charCount).trim();
    if (text.length === charCount && fullContentText.length > charCount) {
      // Try to end at a sentence boundary
      const lastPeriod = text.lastIndexOf(".");
      const lastSpace = text.lastIndexOf(" ");
      const cutPoint =
        lastPeriod > charCount * 0.8 ? lastPeriod + 1 : lastSpace > charCount * 0.8 ? lastSpace : charCount;
      text = text.substring(0, cutPoint).trim();
    }
    return text;
  }, [fullContentText, charCount]);

  // Extract image URL from ImageProps["src"]
  useEffect(() => {
    const extractImageUrl = (src: ImageProps["src"]): string => {
      if (typeof src === "string") {
        return src;
      }
      if (typeof src === "object") {
        if ("default" in src) {
          const defaultVal = src.default;
          if (typeof defaultVal === "string") {
            return defaultVal;
          }
          if (typeof defaultVal === "object" && "src" in defaultVal) {
            return (defaultVal as { src: string }).src;
          }
        }
        if ("src" in src && typeof (src as { src: unknown }).src === "string") {
          return (src as { src: string }).src;
        }
      }
      return "";
    };

    setCoverImageUrl(extractImageUrl(coverImage));
  }, [coverImage]);

  const handleGenerate = async () => {
    if (!templateRef.current || !coverImageUrl) return;

    setIsGenerating(true);
    try {
      // Wait for images inside the template to load
      const images = templateRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete && img.naturalWidth > 0) {
                resolve();
                return;
              }
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
        ),
      );

      // Wait for fonts
      await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dataUrl = await toPng(templateRef.current, {
        width: 1080,
        height: 1920,
        pixelRatio: 2,
        quality: 1,
        cacheBust: true,
      });

      setPreviewUrl(dataUrl);
      setIsModalVisible(true);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error("Failed to generate story image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement("a");
    link.download = `${slug}-story.png`;
    link.href = previewUrl;
    link.click();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setPreviewUrl(null), 300);
  };

  return (
    <>
      <StoryShareButton
        onClick={handleGenerate}
        disabled={isGenerating || !coverImageUrl}
        isGenerating={isGenerating}
      />

      {/* Render template outside wrapper using React Portal to avoid CSS conflicts */}
      {typeof document !== "undefined" && coverImageUrl
        ? ReactDOM.createPortal(
            <div style={{ position: "absolute", left: "-9999px", top: "-9999px", overflow: "hidden" }}>
              <StoryTemplate
                ref={templateRef}
                coverImageUrl={coverImageUrl}
                title={title}
                description={croppedDescription}
                publishedAt={publishedAt}
                isDarkMode={isDarkMode}
                fontMode={fontMode}
              />
            </div>,
            document.body,
          )
        : null}

      {previewUrl ? (
        <StoryPreviewModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          imageUrl={previewUrl}
          onDownload={handleDownload}
          charCount={charCount}
          onCharCountChange={setCharCount}
          onRegenerate={handleGenerate}
          isRegenerating={isGenerating}
        />
      ) : null}
    </>
  );
};

export default StoryGenerator;
