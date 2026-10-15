import { getSermons } from "@/lib/queries";
import YoutubeClient from "./YoutubeClient";

export type Sermon = {
  title: string;
  preacher: string;
  link: string;
};

export default async function Youtube() {
  const result = await getSermons();
  const youtubeSermons = result.page?.acfhomefg?.youtubeSermons;

  const sermons = youtubeSermons
    ? (Object.values(youtubeSermons).filter(
        (sermon): sermon is Sermon =>
          sermon !== null &&
          typeof sermon === "object" &&
          "title" in sermon &&
          "preacher" in sermon &&
          "link" in sermon &&
          typeof sermon.title === "string" &&
          typeof sermon.preacher === "string" &&
          typeof sermon.link === "string"
      ))
    : [];

  return <YoutubeClient sermons={sermons} />;
}