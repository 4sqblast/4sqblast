import { ClientError, gql, GraphQLClient } from "graphql-request";
import type {
  HeroCarousel,
  Programmes,
  Accounts,
  YoutubeSermons,
  AudioMessages,
  Fathers,
  Ministries,
  GrowthGroups,
  FooterDetails,
} from "./types";

const baseUrl = process.env.WORDPRESS_URL?.trim();

if (!baseUrl) {
  throw new Error(
    "WORDPRESS_URL is not configured. Check your .env.local and deployment environment variables.",
  );
}

const endpoint = `${baseUrl.replace(/\/+$/, "").replace(/\/graphql$/i, "")}/graphql`;

const client = new GraphQLClient(endpoint);

/**
 * Retry temporary WordPress/server failures without hiding
 * GraphQL errors, configuration errors, or other permanent failures.
 */
async function requestWithRetry<T>(
  query: string,
  operationName: string,
  maxAttempts = 3,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await client.request<T>(query);
    } catch (error: unknown) {
      const status =
        error instanceof ClientError ? error.response.status : undefined;

      const isTemporaryServerError =
        status !== undefined && [502, 503, 504].includes(status);

      if (!isTemporaryServerError || attempt === maxAttempts) {
        console.error(`[WPGraphQL] ${operationName} failed.`, {
          status:
            error instanceof ClientError ? error.response.status : undefined,
          errors:
            error instanceof ClientError ? error.response.errors : undefined,
          message: error instanceof Error ? error.message : String(error),
        });

        throw error;

        throw error;
      }

      const delay = 1000 * 2 ** (attempt - 1);

      console.warn(
        `[WPGraphQL] ${operationName} returned HTTP ${status}. ` +
          `Retrying in ${delay}ms (attempt ${attempt + 1}/${maxAttempts}).`,
      );

      await new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
      });
    }
  }

  throw new Error(
    `[WPGraphQL] ${operationName} failed after ${maxAttempts} attempts.`,
  );
}

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

  return requestWithRetry<HeroCarousel>(query, "GetHeroImages");
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

  return requestWithRetry<Programmes>(query, "GetProgrammes");
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

  return requestWithRetry<Accounts>(query, "GetAccounts");
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

  return requestWithRetry<YoutubeSermons>(query, "GetYoutubeSermons");
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

  return requestWithRetry<AudioMessages>(query, "GetAudioMessages");
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

  return requestWithRetry<Fathers>(query, "GetFathers");
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
            ministry9 {
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

  return requestWithRetry<Ministries>(query, "GetMinistries");
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

  return requestWithRetry<GrowthGroups>(query, "GetGrowthGroups");
}

export function getFooterDetails(): Promise<FooterDetails> {
  const query = gql`
    query GetFooterDetails {
      page(id: "/acfhome/", idType: URI) {
        acfhomefg {
          footerDetails {
            address
            contact
            email
            youtube
            instagram
            x
            facebook
          }
        }
      }
    }
  `;

  return requestWithRetry<FooterDetails>(query, "GetFooterDetails");
}
