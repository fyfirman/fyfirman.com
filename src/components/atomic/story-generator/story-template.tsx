import React, { forwardRef } from "react";

interface StoryTemplateProps {
  coverImageUrl: string;
  title: string;
  description: string;
  publishedAt: Date;
  isDarkMode: boolean;
  fontMode: "serif" | "sans-serif";
}

const StoryTemplate = forwardRef<HTMLDivElement, StoryTemplateProps>(
  ({ coverImageUrl, title, description, publishedAt, isDarkMode, fontMode }, ref) => {
    const bgColor = isDarkMode ? "#141414" : "#ffffff";
    const textHeadings = isDarkMode ? "#ffffff" : "#000000";
    const textBody = isDarkMode ? "#ffffffd9" : "#000000d9";
    const textSecondary = isDarkMode ? "#ffffffaa" : "#000000aa";
    const fontFamily =
      fontMode === "serif"
        ? "Merriweather, Georgia, 'Times New Roman', serif"
        : "Manrope, 'Helvetica Neue', sans-serif";

    // Format date as "dd MMM yyyy" (e.g., "09 Feb 2026")
    const formattedDate = publishedAt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: bgColor,
          fontFamily,
          width: "1080px",
          height: "1920px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "607.5px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "144px",
          }}
        >
          <img
            src={coverImageUrl}
            alt={title}
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: bgColor,
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 40px",
            boxSizing: "border-box",
            minHeight: "0",
          }}
        >
          <h1
            style={{
              color: textHeadings,
              fontFamily,
              fontWeight: 700,
              fontSize: "72px",
              lineHeight: "1.2",
              letterSpacing: "-0.025em",
              margin: "0 0 16px 0",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              color: textSecondary,
              fontFamily,
              fontWeight: 400,
              fontSize: "28px",
              marginBottom: "24px",
            }}
          >
            {formattedDate}
          </div>
          <p
            style={{
              color: textBody,
              fontFamily,
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "1.4",
              margin: "0",
              flex: "1",
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
          <div
            style={{
              color: textSecondary,
              fontFamily,
              fontWeight: 400,
              fontSize: "28px",
              marginTop: "24px",
              textAlign: "center",
            }}
          >
            fyfirman.com
          </div>
        </div>
      </div>
    );
  },
);

StoryTemplate.displayName = "StoryTemplate";

export default StoryTemplate;
