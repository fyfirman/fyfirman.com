import type { GetStaticProps, NextPage } from "next";
import Head from "@components/template/head";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AIArtPost, getAllAIArtPosts, getAllTags } from "~/utils/mdx/ai-art.mdx";
import AIArtMasonryGrid from "~/components/organism/ai-art-masonry-grid/ai-art-masonry-grid";
import AIArtSearchFilter from "~/components/organism/ai-art-search-filter/ai-art-search-filter";
import AIArtModal from "~/components/modal/ai-art-modal/ai-art-modal";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";
import styles from "~/styles/AIArt.module.scss";

interface AIArtListProps {
  artList: AIArtPost[];
  allTags: string[];
}

const AIArtList: NextPage<AIArtListProps> = ({ artList, allTags }) => {
  const { isMobile } = useResponsive();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<AIArtPost | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every((selectedTag) =>
          post.tags.some((tag) =>
            tag.toLowerCase().includes(selectedTag.toLowerCase())
          )
        )
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

  const handleImageClick = (post: AIArtPost, index: number) => {
    setSelectedPost(post);
    setCurrentIndex(index);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPost(null);
  };

  const handleModalNavigate = (index: number) => {
    if (index >= 0 && index < filteredPosts.length) {
      setCurrentIndex(index);
      setSelectedPost(filteredPosts[index]);
    }
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

  return (
    <>
      <Head title="AI Art Gallery" />

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.headingContainer} variants={itemVariants}>
          <Heading1 isMobile={isMobile}>AI Art Gallery</Heading1>
          <Paragraph isMobile={isMobile}>
            Exploring the intersection of artificial intelligence and creativity through 
            AI-generated artwork. Each piece showcases different models, techniques, and prompts.
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
          <AIArtMasonryGrid
            posts={filteredPosts}
            onImageClick={handleImageClick}
          />
        </motion.div>

        <AIArtModal
          visible={isModalVisible}
          onClose={handleModalClose}
          post={selectedPost}
          posts={filteredPosts}
          currentIndex={currentIndex}
          onNavigate={handleModalNavigate}
        />
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