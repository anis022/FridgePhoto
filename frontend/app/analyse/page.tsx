import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, Folder, Upload } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
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

function Analyse() {
  return (
    <>
      <AnimatedGroup variants={transitionVariants}>
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                It's time to get cookin'
              </h2>
              <p className="mt-4">
                Please provide us with a photo of your fridge so we can start
                our analysis.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/">
                    <Camera className="size-6" aria-hidden />
                    <span>Take a photo</span>
                  </Link>
                </Button>

                <Button size="lg" variant="outline">
                  <Folder className="size-6" aria-hidden />
                  <span>Upload a photo</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedGroup>
    </>
  );
}

export default Analyse;
