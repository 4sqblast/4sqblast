
import { getHeroImages } from "@/lib/queries";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const result = await getHeroImages();

  const heroCarousel = result.page?.acfhomefg?.heroCarousel;

  const images: string[] = heroCarousel
    ? Object.values(heroCarousel)
        .map((hero) => hero?.node?.mediaItemUrl)
        .filter((url): url is string => Boolean(url))
    : [];

  return <HeroClient images={images} />;
}
