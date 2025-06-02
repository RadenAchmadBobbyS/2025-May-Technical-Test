import { getDiaryFeed } from "../../../../api/cms";
import { serialize } from "next-mdx-remote/serialize";
import { getDiaryContentSEOAttributes } from "../../../../utils/cms";
import DetailContentClient from "@/components/fragments/DetailContentClient";
import DetailBackButton from "@/components/layout/DetailBackButton";
import ShareButton from "@/components/layout/ShareButton";

export async function generateMetadata(props) {
  const { id } = await props.params;
  const data = await getDiaryFeed();
  const post = (data.content || []).find((item) => item.id === id);
  if (!post) return { title: "Not Found" };
  const meta = getDiaryContentSEOAttributes(post.meta || {});
  const url = `https://wisata.app/detail/${post.id}`;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: url,
      type: 'article',
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  };
}

export default async function DetailPage(props) {
  const { id } = await props.params;
  let data;
  let post;
  try {
    data = await getDiaryFeed();
    post = (data.content || []).find((item) => item.id === id);
  } catch (e) {
    post = null;
  }
  if (!post) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="block w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" aria-label="Loading" />
    </div>
  );
  const mdxSource = await serialize(post.content);
  const date = post?.created_dt ? new Date(post.created_dt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "";
  const shareUrl = `https://wisata.app/detail/${id}`;
  const shareTitle = post?.meta?.title || '';
  return (
    <div className="relative min-h-screens">
      {/* Hero Section */}
      <div className="relative w-full h-[260px] md:h-[420px] flex items-end justify-center overflow-hidden mb-5">
        <img
          src={post.meta?.image}
          alt={post.meta?.title}
          className="absolute w-full h-full object-cover object-center scale-110 blur-[7px] brightness-70 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <div className="relative z-20 w-full max-w-2xl px-4 md:px-6 pb-8 md:pb-10 flex flex-col gap-4 md:gap-6 items-center text-center animate-fadeInUp mb-5">
          <img
            src="https://wisata.app/img/logo/pwa-icon.png"
            alt="User Avatar"
            className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg border-4 border-white/80 mb-2 md:mb-3 mx-auto"
          />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg leading-tight mb-1 md:mb-2 break-words">
            {post.meta?.title}
          </h1>
        </div>
      </div>
      {/* Content Section */}
      <div className="relative z-30 max-w-4xl mx-auto -mt-12 md:-mt-20 px-2 md:px-4">
        <div className="flex flex-col gap-4 md:gap-6 bg-white rounded-3xl shadow-[0_4px_16px_0_rgba(31,38,135,0.18),0_1px_4px_0_rgba(0,0,0,0.10)] p-4 md:p-10 border border-white/80">
          <div>
            <DetailBackButton variant="hero" />
          </div>
          <div className="w-full flex flex-col justify-start">
            <p className="text-base md:text-2xl font-semibold mb-4 md:mb-6 px-2 md:px-4 py-2 md:py-3 leading-relaxed tracking-wide text-justify">
              {post.meta?.description}
            </p>
            <ShareButton shareUrl={shareUrl} shareTitle={shareTitle} />
            <article className="prose prose-base md:prose-lg max-w-none w-full bg-transparent text-gray-800 px-0 pb-6 md:pb-8 text-justify space-y-4 md:space-y-6">
              <DetailContentClient mdxSource={mdxSource} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}