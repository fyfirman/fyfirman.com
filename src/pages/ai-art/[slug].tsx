import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Head from "~/components/template/head";
import AIArtModal from "~/components/modal/ai-art-modal/ai-art-modal";
import { getAllAIArtPosts, AIArtPost } from "~/utils/mdx/ai-art.mdx";

interface AIArtDetailProps {
  post: AIArtPost;
  allPosts: AIArtPost[];
  currentIndex: number;
}

const AIArtDetail = ({ post, allPosts, currentIndex }: AIArtDetailProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/ai-art");
  };

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < allPosts.length) {
      router.push(`/ai-art/${allPosts[index].slug}`);
    }
  };

  // Structured data for individual artwork
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      name: post.title,
      description: post.prompt,
      image: `https://fyfirman.com/img/ai-art/${post.image}`,
      dateCreated: post.createdAt,
      keywords: post.tags.join(", "),
      creator: {
        "@type": "Person",
        name: "Firmansyah Yanuar",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://fyfirman.com/ai-art/${post.slug}`,
      },
    }),
    [post],
  );

  const canonicalUrl = `https://fyfirman.com/ai-art/${post.slug}`;
  const ogImageUrl = `/img/ai-art/${post.image}`;
  const promptPreview = post.prompt.length > 155 ? `${post.prompt.substring(0, 155)}...` : post.prompt;

  return (
    <>
      <Head
        title={`${post.title} - AI Art`}
        desc={promptPreview}
        canonical={canonicalUrl}
        ogImage={ogImageUrl}
        ogType="article"
        keywords={post.tags.join(", ")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AIArtModal
        visible={true}
        onClose={handleClose}
        post={post}
        posts={allPosts}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
        showBackButton={true}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<AIArtDetailProps> = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== "string") {
    return {
      notFound: true,
    };
  }

  const allPosts = getAllAIArtPosts().filter((post) => !post.hide);
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) {
    return {
      notFound: true,
    };
  }

  const currentIndex = allPosts.findIndex((post) => post.slug === params.slug);

  return {
    props: {
      post: currentPost,
      allPosts,
      currentIndex,
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllAIArtPosts().filter((post) => !post.hide);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default AIArtDetail;
