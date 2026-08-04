import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { KITS, formatPrice } from "../../data/kits.ts";
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

  useEffect(() => {
    if (!emblaApi) return;
    const syncSelected = () => setSelected(emblaApi.selectedScrollSnap());
    syncSelected();
    emblaApi.on("select", syncSelected).on("reInit", syncSelected);
    return () => {
      emblaApi.off("select", syncSelected).off("reInit", syncSelected);
    };
  }, [emblaApi]);

  return (
    <div>

      <div className="relative -mt-6 mb-10">

        <button
          onClick={scrollPrev}
          aria-label="Ver kit anterior"
          className="group absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white sm:p-3"
        >
          <ChevronLeft className="text-white transition-colors group-hover:text-primary" />
        </button>

        <div className="grid px-12 sm:px-16">
          {KITS.map((k, i) => (
            <div
              key={k.title}
              aria-hidden={i !== selected}
              className={`col-start-1 row-start-1 text-center transition-opacity duration-300 ease-out ${
                i === selected ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <h3 className="text-lg font-bold text-white">{k.title}</h3>
              <p className="mt-1 text-2xl font-extrabold text-white">{formatPrice(k.price)}</p>
              <p className="mt-1 text-xs text-white/70">
                IVA incluido
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Ver kit siguiente"
          className="group absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white sm:p-3"
        >
          <ChevronRight className="text-white transition-colors group-hover:text-primary" />
        </button>

      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {KITS.map((k) => {
            const spec = k.slug ? KIT_SPECS[k.slug] : undefined;
            return (
              <div key={k.title} className="flex-[0_0_100%] px-1 sm:px-4 lg:px-8">
                {spec ? (
                  <KitInfographic spec={spec} price={k.price} />
                ) : (
                  <div className="h-full overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="flex h-[420px] items-center justify-center bg-white sm:h-[550px]">
                      <img
                        src={k.img}
                        alt={k.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex w-full justify-center">
                      <a
                        href="#contacto"
                        className="mb-4 mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition hover:bg-accent/90"
                      >
                        Solicitar presupuesto <ArrowRight size={18} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
