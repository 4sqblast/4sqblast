export type HeroImage = {
  node: {
    mediaItemUrl: string;
  } | null;
} | null;

export type HeroCarousel = {
  page: {
    title: string;
    acfhomefg: {
      heroCarousel: {
        hero1: HeroImage;
        hero2: HeroImage;
        hero3: HeroImage;
        hero4: HeroImage;
        hero5: HeroImage;
        hero6: HeroImage;
        hero7: HeroImage;
      };
    } | null;
  } | null;
};

export type Programme = {
  title: string;
  day: string;
  time: string;
} | null;

export type Programmes = {
  page: {
    acfhomefg: {
      programmesCarousel: {
        blastConnect: Programme;
        audaciousPrayers: Programme;
        byk: Programme;
        freshOilPrayers: Programme;
      };
    } | null;
  } | null;
};

export type Account = {
  name: string;
  accountNumber: string;
  bank: string;
};

export type Accounts = {
  page: {
    acfhomefg: {
      give: {
        titheAndOffering: Account;
        buildingProject: Account;
        dollarAccount: Account;
      };
    } | null;
  } | null;
};

export type Sermon = {
  title: string;
  preacher: string;
  link: string;
};

export type YoutubeSermons = {
  page: {
    acfhomefg: {
      youtubeSermons: {
        youtubeSermon1: Sermon;
      };
    } | null;
  } | null;
};

export type Message = {
  title: string;
  preacher: string;
  duration: string;
  audioLink: string;
};

export type AudioMessages = {
  page: {
    acfhomefg: {
      audioMessages: {
        audioMessage1: Message;
      };
    } | null;
  } | null;
};

export type Father = {
  name: string;
  tenure: string;
  bio: string;
  image: {
    node: {
      mediaItemUrl: string;
    };
  };
};

export type Fathers = {
  page: {
    acfhomefg: {
      fathers: {
        father1: Father;
        father2: Father;
        father3: Father;
      };
    } | null;
  } | null;
};

export type Ministry = {
  title: string;
  details: string;
  image: {
    node: {
      mediaItemUrl: string;
    };
  };
};

export type Ministries = {
  page: {
    acfhomefg: {
      ministries: {
        ministry1: Ministry;
        ministry2: Ministry;
        ministry3: Ministry;
        ministry4: Ministry;
        ministry5: Ministry;
        ministry6: Ministry;
        ministry7: Ministry;
        ministry8: Ministry;
      };
    } | null;
  } | null;
};

export type GrowthGroup = {
  title: string;
  details: string;
  image: {
    node: {
      mediaItemUrl: string;
    };
  };
  coordinator: {
    name: string;
    title: string;
    email: string;
    image: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
};

export type GrowthGroups = {
  page: {
    acfhomefg: {
      growthGroups: {
        growthGroup1: GrowthGroup;
        growthGroup2: GrowthGroup;
      };
    } | null;
  } | null;
};
