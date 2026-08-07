import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { KITS } from "../../data/kits.ts";
import { KIT_SPECS } from "../../data/kitSpecs.ts";
import KitInfographic from "./KitInfographic.tsx";

export default function KitsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
  });

  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const syncSelected = () => setSelected(emblaApi.selectedScrollSnap());
    syncSelected();
    emblaApi.on("select", syncSelected).on("reInit", syncSelected);
    return () => {
      emblaApi.off("select", syncSelected).off("reInit", syncSelected);
    };
  }, [emblaApi]);

  const specs = KITS.map((k) => (k.slug ? KIT_SPECS[k.slug] : undefined));

  return (
    <div>

      <div className="relative pb-16 lg:pb-12">

        <button
          onClick={scrollPrev}
          aria-label="Ver kit anterior"
          className="group absolute bottom-0 left-0 z-20 rounded-full bg-primary p-2.5 shadow-lg transition-colors hover:bg-white lg:bottom-auto lg:top-[calc(50%-1.5rem)] lg:-translate-y-1/2 lg:p-3"
        >
          <ChevronLeft aria-hidden="true" className="text-white transition-colors group-hover:text-primary" />
        </button>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Kits solares"
        >
          <div className="flex">
          {KITS.map((k, i) => {
            const spec = specs[i];
            return (
              <div
                key={k.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${KITS.length}: ${k.title}`}
                aria-hidden={i !== selected}
                className="flex-[0_0_100%] px-1 sm:px-4 lg:px-12"
              >
                {spec ? (
                  <KitInfographic spec={spec} price={k.price} />
                ) : (
                  <div className="h-full overflow-hidden rounded-2xl bg-card shadow-xl">
                    <div className="flex h-[420px] items-center justify-center sm:h-[550px]">
                      <img
                        src={k.img}
                        alt={k.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>

        <button
          onClick={scrollNext}
          aria-label="Ver kit siguiente"
          className="group absolute bottom-0 right-0 z-20 rounded-full bg-primary p-2.5 shadow-lg transition-colors hover:bg-white lg:bottom-auto lg:top-[calc(50%-1.5rem)] lg:-translate-y-1/2 lg:p-3"
        >
          <ChevronRight aria-hidden="true" className="text-white transition-colors group-hover:text-primary" />
        </button>

        <div aria-label="Elegir kit" className="mt-5 flex justify-center gap-2.5">
          {KITS.map((k, i) => (
            <button
              key={k.title}
              aria-current={i === selected}
              aria-label={`Kit ${i + 1} de ${KITS.length}: ${k.title}`}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-6 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <a
          href="#contacto"
          className="absolute bottom-0 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-xl bg-accent-deep px-6 py-3 font-semibold text-accent-deep-foreground shadow-lg transition hover:bg-accent-deep/90 lg:py-2.5"
        >
          Solicitar presupuesto <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

    </div>
  );
}
