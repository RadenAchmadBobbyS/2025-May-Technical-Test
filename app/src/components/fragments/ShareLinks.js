import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

export function getShareLinks(shareUrl, shareTitle) {
  return [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-blue-600 w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-sky-500 w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="text-pink-500 w-5 h-5" />,
      url: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Tiktok',
      icon: <FaTiktok className="text-black w-5 h-5" />,
      url: `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`,
    },
  ];
}
