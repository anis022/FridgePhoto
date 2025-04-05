import Features from "@/components/features-1";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { ThemeProvider } from "@/components/theme-providers";
import { ModeToggle } from "@/components/toggle";
import AnimatedButton from "@/components/ui/animated-button";

export default function Home() {
  return (
    <>
      <Features />
      <AnimatedButton />
    </>
  );
}
