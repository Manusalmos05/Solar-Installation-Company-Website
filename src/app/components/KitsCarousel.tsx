import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { KITS, formatPrice } from "../../data/kits.ts";

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

      <div className="grid -mt-6 mb-10">
        {KITS.map((k, i) => (
          <div
            key={k.title}
            aria-hidden={i !== selected}
            className={`col-start-1 row-start-1 text-center transition-opacity duration-300 ease-out ${
              i === selected ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h3 className="font-bold text-lg text-white">{k.title}</h3>
            <p className="text-2xl font-extrabold text-white mt-1">{formatPrice(k.price)}</p>
            <p className="text-xs text-white/70 mt-1">IVA incluido · Envío e instalación se presupuestan aparte</p>
          </div>
        ))}
      </div>

      <div className="relative">

        <button
          onClick={scrollPrev}
          aria-label="Ver kit anterior"
          className="group absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-primary shadow-lg p-3 hover:bg-gray-100"
        >
          <ChevronLeft className="text-white group-hover:text-primary transition-colors" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {KITS.map((k) => (
              <div key={k.title} className="flex-[0_0_100%] px-10">
                <div className="rounded-2xl shadow-xl overflow-hidden bg-white h-full">

                  <div className="h-[550px] flex items-center justify-center bg-white">
                    <img
                      src={k.img}
                      alt={k.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="flex justify-center w-full">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-xl bg-accent mt-4 mb-4 px-5 py-3 text-white font-semibold hover:bg-accent/90 transition"
                    >
                      Solicitar presupuesto <ArrowRight size={18} />
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          aria-label="Ver kit siguiente"
          className="group absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-primary shadow-lg p-3 hover:bg-gray-100"
        >
          <ChevronRight className="text-white group-hover:text-primary transition-colors" />
        </button>

      </div>
    </div>
  );
}
