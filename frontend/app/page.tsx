"use client"; // Declare this as a client component to use React hooks and browser APIs

// Import necessary modules and custom components
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedGroup } from "@/components/ui/animated-group";
import Features from "@/components/features-1";
import AnimatedButton from "@/components/ui/animated-button";

// Optional: Define transition variants for animations (if used by your AnimatedGroup)
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

// Main Home component
export default function Home() {
  return (
    // The main container is relative and takes at least the full screen height.
    // Note: Removed any potentially opaque background classes (like bg-background) to avoid covering the image.
    <main className="relative min-h-screen overflow-hidden text-center">
      
      {/* 
        Background image container:
        - absolute: positions it relative to the nearest positioned ancestor (here, main).
        - inset-0: makes it fill the entire main container.
        - -z-10: places it behind all other content.
      */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg_accueil.png"    // Ensure the image is in /public with this exact name
          alt="Background"         // Descriptive alt text for accessibility
          fill                    // Tells Next.js to fill the parent container's dimensions
          priority                // Loads the image quickly, useful for background images
          className="object-cover blur-lg brightness-75"
          // object-cover: ensures the image covers the container while maintaining its aspect ratio.
          // blur-lg & brightness-75: apply a heavy blur and reduce brightness. 
          // If the blur makes it hard to see, you might try reducing/removing it for testing.
        />
      </div>
      
      {/* 
        Content section:
        - relative with z-10 to ensure it appears above the background.
        - pt-24 md:pt-36 adds top padding for spacing.
        - px-4 adds horizontal padding.
      */}
      <section className="relative z-10 pt-24 md:pt-36 px-4">
        
        {/* AnimatedGroup for title and subtitle */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  delayChildren: 1, // Delays the animation of children
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", bounce: 0.3, duration: 2 },
              },
            },
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Meet Your Fridge Assistant
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Just snap a photo of your fridge, and we’ll tell you what you can cook.
          </p>
        </AnimatedGroup>

        {/* Features section */}
        <div className="mt-16">
          <Features />
        </div>

        {/* Animated call-to-action button */}
        <AnimatedButton />

        {/* Animated group wrapping the demo video */}
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
              {/* 
                Embedded YouTube video:
                - Replace YOUR_VIDEO_ID with your actual YouTube video ID.
              */}
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="FridgePhoto Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-white/80 mt-4 text-sm">
              Watch how FridgePhoto turns your fridge into a smart cooking assistant.
            </p>
          </div>
        </AnimatedGroup>
      </section>
    </main>
  );
}
