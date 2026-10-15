
"use client";

import { useState, useEffect, useRef } from "react";
import { Download, Play, Pause } from "lucide-react";
import type { Message } from "@/lib/types";

type AudioMessagesProps = {
  audios: Message[];
};

const AudioMessages = ({ audios }: AudioMessagesProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  const handlePlayPause = async (sermon: Message) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "none";
    }

    const audio = audioRef.current;

    if (playingId === sermon.title) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    audio.pause();
    audio.src = sermon.audioLink;
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => setPlayingId(null);

    setPlayingId(sermon.title);

    try {
      await audio.play();
    } catch (error) {
      setPlayingId(null);
      console.error("Unable to play audio:", error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent">
            Recent Messages
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-purple-700">
            Download and listen to our latest sermon messages.
            Be blessed and inspired by the Word of God.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audios.map((audio, index) => (
            <div
              key={`${audio.title}-${index}`}
              className={`group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-700 ease-in hover:scale-105 hover:shadow-2xl ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: mounted
                  ? `${index * 100}ms`
                  : "0ms",
              }}
            >
              <div className="relative h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="line-clamp-2 text-xl font-bold text-white">
                    {audio.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 space-y-2">
                  <p className="font-semibold text-purple-700">
                    {audio.preacher}
                  </p>

                  <p className="text-sm font-semibold text-purple-600">
                    {audio.duration}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlayPause(audio)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {playingId === audio.title ? (
                      <>
                        <Pause className="h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Play
                      </>
                    )}
                  </button>

                  <a
                    href={audio.audioLink}
                    download={`${audio.title}.mp3`}
                    aria-label={`Download ${audio.title}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudioMessages;