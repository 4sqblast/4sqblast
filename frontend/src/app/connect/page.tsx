import React from "react";

import LiveStreamSection from "@/components/Livestream";
import Youtube from "@/components/Youtube";
import AudioMessagesSection from "@/components/AudioMessagesSection";

const Connect = () => {
  return (
    <div>
      <LiveStreamSection />
      <Youtube />
      <AudioMessagesSection />
    </div>
  );
};

export default Connect;
