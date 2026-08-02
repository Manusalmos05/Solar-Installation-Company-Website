import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { KITS } from "../../data/kits.ts";

export default function KitsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">

      {/* Flecha izquierda */}

      <button
        onClick={scrollPrev}
        className="group absolute leftt-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-primary shadow-lg p-3 hover:bg-gray-100"
      >
        <ChevronLeft className="text-white group-hover:text-primary transition-colors" />
      </button>

      {/* Carrusel */}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">

          {KITS.map((k) => (
            <div
              key={k.title}
              className="
                flex-[0_0_100%]
                md:flex-[0_0_100%]
                lg:flex-[0_0_100%]
                px-10
              "
            >

              <div className="rounded-2xl shadow-xl overflow-hidden bg-white h-full">

                <div className="h-[550px] flex items-center justify-center bg-white">
                    <img
                        src={k.img}
                        alt={k.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                </div>
                  <div className="flex justify-center w-full">
                  <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-xl bg-accent mt-4 mb-2 px-5 py-3 text-white font-semibold hover:bg-accent/90 transition">
                      Solicitar presupuesto <ArrowRight size={18} />
                  </a>
                  </div>     

                </div>


              </div>

            
          ))}

        </div>
      </div>

      {/* Flecha derecha */}

      <button
        onClick={scrollNext}
        className="group absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-primary shadow-lg p-3 hover:bg-gray-100"
      >
       <ChevronRight className="text-white group-hover:text-primary transition-colors" />
      </button>
     

    </div>
  );
}