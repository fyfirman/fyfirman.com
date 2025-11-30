import type { GetStaticProps, NextPage } from "next";
import Head from "@components/template/head";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AIArtPost, getAllAIArtPosts, getAllTags } from "~/utils/mdx/ai-art.mdx";
import AIArtMasonryGrid from "~/components/organism/ai-art-masonry-grid/ai-art-masonry-grid";
import AIArtSearchFilter from "~/components/organism/ai-art-search-filter/ai-art-search-filter";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import styles from "~/styles/AIArt.module.scss";

interface AIArtListProps {
  artList: AIArtPost[];
  allTags: string[];
}

const AIArtList: NextPage<AIArtListProps> = ({ artList, allTags }) => {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Check if we've visited this page before to prevent re-animation on back navigation
  const shouldAnimate = useMemo(() => {
    if (typeof window === "undefined") return true;
    const hasVisited = sessionStorage.getItem("ai-art-visited");
    if (!hasVisited) {
      sessionStorage.setItem("ai-art-visited", "true");
      return true;
    }
    return false;
  }, []);

  // Mark that we've navigated to a detail page when leaving
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.startsWith("/ai-art/") && url !== "/ai-art") {
        // Mark that we've navigated to a detail page
        sessionStorage.setItem("ai-art-visited", "true");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = artList.filter((post) => !post.hide);

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.prompt.toLowerCase().includes(searchLower) ||
          post.model.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every((selectedTag) =>
          post.tags.some((tag) => tag.toLowerCase().includes(selectedTag.toLowerCase())),
        ),
      );
    }

    return filtered;
  }, [artList, searchTerm, selectedTags]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.25,
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

  // Structured data for AI Art Gallery
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AI Art Gallery",
      description:
        "A gallery showcasing AI-generated artwork with prompts, models, and tags. Explore unique collaborations between human vision and AI capability.",
      url: "https://fyfirman.com/ai-art",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: filteredPosts.length,
        itemListElement: filteredPosts.slice(0, 10).map((post, index) => ({
          "@type": "ImageObject",
          position: index + 1,
          name: post.title,
          description: post.prompt,
          image: `https://fyfirman.com/img/ai-art/${post.image}`,
          dateCreated: post.createdAt,
          keywords: post.tags.join(", "),
          creator: {
            "@type": "Person",
            name: "Firmansyah Yanuar",
          },
        })),
      },
      keywords: Array.from(
        new Set([
          ...allTags,
          "AI art",
          "AI-generated artwork",
          "AI art prompts",
          "digital art",
          "machine learning art",
        ]),
      ).join(", "),
    }),
    [filteredPosts, allTags],
  );

  // Generate keywords from all tags and common AI art terms
  const metaKeywords = useMemo(() => {
    const commonTerms = ["AI art", "AI-generated artwork", "AI art prompts", "digital art", "machine learning art"];
    return Array.from(new Set([...allTags, ...commonTerms])).join(", ");
  }, [allTags]);

  return (
    <>
      <Head
        title="AI Art Gallery"
        desc="Explore AI-generated artwork with prompts, models, and tags. Discover unique digital art created through collaboration between human vision and AI capability."
        keywords={metaKeywords}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.div className={styles.headingContainer} variants={itemVariants}>
          <Heading1 isMobile={isMobile}>AI Art Gallery</Heading1>
          <Paragraph isMobile={isMobile}>
            Step into a gallery where machines dream in pixels. Each artwork represents a unique collaboration between
            human vision and AI capability, showcasing the diverse techniques and models shaping the future of digital
            creativity.
          </Paragraph>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AIArtSearchFilter
            searchTerm={searchTerm}
            selectedTags={selectedTags}
            allTags={allTags}
            onSearchChange={handleSearchChange}
            onTagToggle={handleTagToggle}
            onClearFilters={handleClearFilters}
            resultsCount={filteredPosts.length}
          />
        </motion.div>

        <motion.div className={styles.galleryContainer} variants={itemVariants}>
          <AIArtMasonryGrid posts={filteredPosts} shouldAnimate={shouldAnimate} />
        </motion.div>
      </motion.div>
    </>
  );
};

export const getStaticProps: GetStaticProps<AIArtListProps> = async () => {
  const artList = getAllAIArtPosts();
  const allTags = getAllTags();

  return {
    props: {
      artList,
      allTags,
    },
  };
};

export default React.memo(AIArtList);
