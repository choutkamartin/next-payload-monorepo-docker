import { Page } from "payload-types";

type HeroBlock = Extract<Page["layout"][number], { blockType: "hero" }>;

const Hero = ({ title, subtitle }: HeroBlock) => {
  return (
    <div className="bg-[url('/home.webp')] h-screen bg-blend-multiply bg-gray-600 flex items-center justify-center flex-col text-white">
      <h1 className="text-5xl font-bold mb-12 uppercase">{title}</h1>
      <h2 className="text-xl font-light">{subtitle}</h2>
    </div>
  );
};

export default Hero;
