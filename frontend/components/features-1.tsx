import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Camera, ForkKnife, Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'
import { AnimatedGroup } from './ui/animated-group'
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
export default function Features() {
    return (
      <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <div className="@container mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              Turn fridge chaos into kitchen magic!
            </h2>
          </div>
          <AnimatedGroup variants={transitionVariants} className="mt-8">
            <div className="@min-4xl:max-w-full @min-4xl:grid-cols-2 justify-center mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
              <Card className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Camera className="size-6" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">Photoshoot your fridge</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm">
                    Take/upload a photo of your fridge so that we
                    can analyse it and give you all the ingredients inside it.
                  </p>
                </CardContent>
              </Card>

              <Card className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <ForkKnife className="size-6" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">We give you amazing suggestions</h3>
                </CardHeader>

                <CardContent>
                  <p className="mt-3 text-sm">
                    From the ingridients found in your fridge, we will
                    suggest you some amazing recipes to cook.
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedGroup>
        </div>
      </section>
    );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
