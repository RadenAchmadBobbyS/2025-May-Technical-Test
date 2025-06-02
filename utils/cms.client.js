"use client";
import { MDXRemote } from "next-mdx-remote";

const YoutubeEmbed = () => null;
const InstagramEmbed = () => null;
const TwitterEmbed = () => null;
const TiktokEmbed = () => null;

export function renderDiaryContent(mdxSource) {
  if (!mdxSource) return null;
  const components = { YoutubeEmbed, InstagramEmbed, TwitterEmbed, TiktokEmbed };
  return <MDXRemote {...mdxSource} components={components} />;
}
