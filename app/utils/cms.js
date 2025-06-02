const CDN_WISATA_URL = 'https://cdn.wisata.app'
const CDN_TWITTER_URL = 'https://pbs.twimg.com'
const CDN_WISATA_IMG_SIZE = {
  TH: 'th',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
}

/**
 * TASK: Find available image size for Twitter CDN
 */
const CDN_TWITTER_IMG_SIZE = {
    MINI: 'mini',      
    NORMAL: 'normal',  
    BIGGER: 'bigger', 
    '400x400': '400x400',
}

/**
 * TASK: Replace original image URL with size-optimized image URL.
 * @example
 * For Wisata CDN URL:
 * ```
 * https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_th.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_lg.jpg
 * ```
 *
 * Note that some images may not have optimized URL variants.
 */
export function getSizeOptimizedImageUrl(originalUrl, desiredSize) {
  try {
    if (!originalUrl) return '';

    if (originalUrl.startsWith(CDN_WISATA_URL)) {
      return originalUrl.replace(/(\.[^.]+)$/, `_${desiredSize}$1`);
    }

    if (originalUrl.startsWith(CDN_TWITTER_URL)) {
      return originalUrl.replace(/_(normal|bigger|mini|400x400)(\.\w+)$/, `_${desiredSize}$2`);
    }

    return originalUrl;
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return originalUrl;
  }
}

/**
 * TASK: Extracts SEO attributes from diary content
 */
export function getDiaryContentSEOAttributes(contentData) {
    if (!contentData) return {};

  const { title, description, image, tags } = contentData;

  return {
    title: title || '',
    description: description || '',
    image: image || '',
    tags: Array.isArray(tags) ? tags : [],
  };
}

/**
 * TASK: Convert diary content to renderable data
 * 
 * The content coming from `/cms/diary` is in MDX (Markdown with Embedded Components) format. This function help render that content.
 * 
 * Known MDX components are:
 * - \<YoutubeEmbed />
 * - \<InstagramEmbed />
 * - \<TiktokEmbed />
 * - \<TwitterEmbed />
 */
export function renderDiaryContent(mdxSource) {
  if (!mdxSource) return null;
  const components = { YoutubeEmbed, InstagramEmbed, TiktokEmbed, TwitterEmbed };
  return <MDXRemote {...mdxSource} components={components} />;
}

export default {
  CDN_TWITTER_URL,
  CDN_WISATA_URL,
  CDN_WISATA_IMG_SIZE,
}