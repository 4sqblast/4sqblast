import { gql, GraphQLClient } from "graphql-request";
import type {
  HeroCarousel,
  Programmes,
  Accounts,
  YoutubeSermons,
  AudioMessages,
  Fathers,
  Ministries,
  GrowthGroups,

} from "./types";

const baseUrl = process.env.WORDPRESS_URL;
const client = new GraphQLClient(`${baseUrl}/graphql`);

export function getHeroImages(): Promise<HeroCarousel> {
  const query = gql`
    query GetHeroImages {
      page(id: "/acfhome/", idType: URI) {
        title
        acfhomefg {
          heroCarousel {
            hero1 {
              node {
                mediaItemUrl
              }
            }
            hero2 {
              node {
                mediaItemUrl
              }
            }
            hero3 {
              node {
                mediaItemUrl
              }
            }
            hero4 {
              node {
                mediaItemUrl
              }
            }
            hero5 {
              node {
                mediaItemUrl
              }
            }
            hero6 {
              node {
                mediaItemUrl
              }
            }
            hero7 {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `;

  return client.request<HeroCarousel>(query);
}

export function getProgrammes(): Promise<Programmes> {
  const query = gql`
    query GetProgrammes {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          programmesCarousel {
            blastConnect {
              title
              day
              time
            }
            audaciousPrayers {
              title
              day
              time
            }
            byk {
              title
              day
              time
            }
            freshOilPrayers {
              title
              day
              time
            }
          }
        }
      }
    }
  `;

  return client.request<Programmes>(query);
}

export function getAccounts(): Promise<Accounts> {
  const query = gql`
    query GetAccounts {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          give {
            titheAndOffering {
              name
              accountNumber
              bank
            }
            buildingProject {
              name
              accountNumber
              bank
            }
            dollarAccount {
              name
              accountNumber
              bank
            }
          }
        }
      }
    }
  `;

  return client.request<Accounts>(query);
}

export function getSermons(): Promise<YoutubeSermons> {
  const query = gql`
    query GetYoutubeSermons {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          youtubeSermons {
            youtubeSermon1 {
              title
              preacher
              link
            }
            youtubeSermon2 {
              title
              preacher
              link
            }
            youtubeSermon3 {
              title
              preacher
              link
            }
          }
        }
      }
    }
  `;

  return client.request<YoutubeSermons>(query);
}

export function getAudioMessages(): Promise<AudioMessages> {
  const query = gql`
    query GetAudioMessages {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          audioMessages {
            audioMessage1 {
              title
              preacher
              duration
              audioLink
            }
            audioMessage2 {
              title
              preacher
              duration
              audioLink
            }
            audioMessage3 {
              title
              preacher
              duration
              audioLink
            }
            audioMessage4 {
              title
              preacher
              duration
              audioLink
            }
            audioMessage5 {
              title
              preacher
              duration
              audioLink
            }
            audioMessage6 {
              title
              preacher
              duration
              audioLink
            }
          }
        }
      }
    }
  `;

  return client.request<AudioMessages>(query);
}

export function getFathers(): Promise<Fathers> {
  const query = gql`
    query GetFathers {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          fathers {
            father1 {
              name
              tenure
              bio
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            father2 {
              name
              tenure
              bio
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            father3 {
              name
              tenure
              bio
              image {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  `;

  return client.request<Fathers>(query);
}

export function getMinistries(): Promise<Ministries> {
  const query = gql`
    query GetMinistries {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          ministries {
            ministry1 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry2 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry3 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry4 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry5 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry6 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry7 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            ministry8 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  `;

  return client.request<Ministries>(query);
}

export function getGrowthGroups(): Promise<GrowthGroups> {
  const query = gql`
    query GetGrowthGroups {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          growthGroups {
            growthGroup1 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
              coordinator {
                name
                title
                email
                image {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
            growthGroup2 {
              title
              details
              image {
                node {
                  mediaItemUrl
                }
              }
              coordinator {
                name
                title
                email
                image {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return client.request<GrowthGroups>(query);
}
