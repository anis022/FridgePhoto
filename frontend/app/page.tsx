"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedGroup } from "@/components/ui/animated-group";
import Features from "@/components/features-1";
import AnimatedButton from "@/components/ui/animated-button";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-background text-center">
        {/* 📸 Full-screen blurred background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg_accueil.png"
            alt="background"
            fill
            priority
            className="object-cover blur-lg brightness-75"
          />
        </div>

        <section className="relative z-10 pt-24 md:pt-36 px-4">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    delayChildren: 1,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.3,
                    duration: 2,
                  },
                },
              },
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              Meet Your Fridge Assistant
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Just snap a photo of your fridge, and we’ll tell you what you can
              cook.
            </p>
          </AnimatedGroup>

          <div className="mt-16">
            <Features />
          </div>

          <AnimatedButton />

          {/* 🎥 Demo video */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="relative mt-16 max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="FridgePhoto Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-white/80 mt-4 text-sm">
                Watch how FridgePhoto turns your fridge into a smart cooking
                assistant.
              </p>
            </div>
          </AnimatedGroup>
        </section>
      </main>
    </>
  );
}

export default Home;
