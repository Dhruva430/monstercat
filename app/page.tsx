"use client";
import Image from "next/image";
import monsterCat from "@/public/monster-cat.webp";
import { Button } from "@/components/ui/button";

// import { Montserrat } from "next/font/google";

import {
  Apple,
  Cloud,
  Compass,
  Play,
  Pause,
  Share2,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Track = {
  title: string;
  src: string;
};
// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
//   display: "swap",
// });

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDurations, setTrackDurations] = useState<Record<string, string>>(
    {}
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracks: Track[] = [
    {
      title: "Demon Slayer",
      src: "/tracks/demonslayer.mp3",
    },
    {
      title: "Call of Silence",
      src: "/tracks/callofsilence.mp3",
    },
  ];
  const playTrack = (track: Track) => {
    console.log("Playing track:", track.title);
    if (!audioRef.current) return;

    if (audioRef.current.src.includes(track.src) && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = track.src;
    audioRef.current.play();
    setIsPlaying(true);
  };
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const formattedLength = formatTrackLength(audioRef.current.duration);
    console.log("Track length:", formattedLength);
  };
  useEffect(() => {
    tracks.forEach((track) => {
      const tempAudio = new Audio(track.src);
      tempAudio.addEventListener("loadedmetadata", () => {
        setTrackDurations((prev) => ({
          ...prev,
          [track.src]: formatTrackLength(tempAudio.duration),
        }));
      });
    });
  }, []);

  return (
    <>
      <div className="absolute overflow-hidden h-screen w-screen">
        <Image
          src={monsterCat}
          alt="Monstercat Release Cover"
          className="w-full h-full absolute object-cover object-center inset-0 blur-xs"
        />
        <div className="absolute -inset-2  bg-gradient-to-t from-black via-black/80 to-black/50"></div>
      </div>

      <div className="pb-[100px] max-w-[1500px] mx-auto ">
        <section className="relative pt-[190px] pb-[112px]">
          <div className="md:grid md:grid-cols-2 md:gap-8 w-full items-center mx-auto ">
            <div className="flex text-white gap-1">
              <h1 className="[writing-mode:vertical-rl] rotate-180 text-xl text-button-primary-background italic flex">
                Instinct---
                <p className="text-white">Released May 22, 2023</p>
              </h1>
              <Image
                src={monsterCat}
                alt="Monstercat Release Cover"
                className="w-full h-auto max-w-[680px] object-cover"
              />
            </div>
            <div className="text-white text-5xl font-bold">
              <h1 className="mb-[16px] text-transparent [-webkit-text-stroke-color:white] [-webkit-text-stroke-width:1px]">
                LEVEL DAYS
              </h1>
              <h2 className={`text-3xl mb-[32px] `}>CONRO</h2>
              <Button
                variant="primary"
                size="button"
                className="text-xl text-white"
              >
                <Play className="size-5" />
                Listen Now
              </Button>
              <Button
                variant="secondary"
                size="buttonSecondary"
                className="text-xl text-white ml-3 "
              >
                <Share2 className="size-5" />
                Share
              </Button>
            </div>
          </div>
        </section>
        <section className=" relative max-w-[1500px]">
          <div className="mx-auto ">
            <h1 className="md:text-5xl text-white mb-10 font-bold">
              STREAM IT IN YOUR WAY
            </h1>
            <ul className="text-white flex mb-20">
              <li className=" flex gap-2 items-center border border-white p-4">
                <Compass className="size-6 text-white" />
                <p className="font-bold">Player</p>
              </li>
              <li className="border border-white p-6 ">
                <Compass className="size-6 text-white" />
              </li>
              <li className="border border-white p-6 ">
                <Cloud className="size-6 text-white" />
              </li>
              <li className="border border-white p-6 ">
                <Apple className="size-6 text-white" />
              </li>
              <li className="border border-white p-6 ">
                <Youtube className="size-6 text-white" />
              </li>
            </ul>
            <h1 className="text-4xl text-white">Track List</h1>
          </div>
        </section>

        <section>
          <div className="mx-auto ">
            <h1>Track List</h1>
            {tracks.map((track, idx) => (
              <div
                key={track.src}
                className="text-white px-6 py-4 flex items-center justify-between w-full mb-2"
              >
                <div className="text-white/70 text-lg font-medium min-w-[20px]">
                  {idx + 1}
                </div>

                <div className="flex items-center gap-4 flex-1 ml-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-8 w-8 p-0 hover:bg-white/10 text-white"
                    onClick={() => playTrack(track)}
                  >
                    {isPlaying && audioRef.current?.src.includes(track.src) ? (
                      <Pause className="h-4 w-4 fill-white" />
                    ) : (
                      <Play className="h-4 w-4 fill-white" />
                    )}
                  </Button>

                  <div className="flex flex-col">
                    <h3 className="text-white font-medium text-base leading-tight">
                      {track.title}
                    </h3>
                    <p className="text-white/70 text-sm">Artist: Muffin</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-white/70 text-lg font-medium">
                    {trackDurations[track.src] || "--:--"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-white/10 text-white/70 hover:text-white"
                  >
                    <Share2 className="size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <audio ref={audioRef} onLoadedMetadata={handleLoadedMetadata} />
        </section>
      </div>
    </>
  );
}

function formatTrackLength(duration: number): string {
  const totalSeconds = Math.floor(duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
