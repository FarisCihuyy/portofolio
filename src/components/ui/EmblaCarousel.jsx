import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";
import clsx from "clsx";

const EmblaCarousel = ({ slides }) => {
  const [grap, setGrap] = useState(false);

  const progressNode = useRef(null);
  const [mainRef, mainApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    loop: true,
  });

  const [thumbRef, thumbApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);

  const { showAutoplayProgress } = useAutoplayProgress(thumbApi, progressNode);
  const onThumbClick = (index) => {
    thumbApi?.scrollTo(index);
    mainApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const sync = () => {
      const index = thumbApi.selectedScrollSnap();
      mainApi.scrollTo(index);
    };

    thumbApi.on("select", sync);
    sync();

    return () => thumbApi.off("select", sync);
  }, [mainApi, thumbApi]);

  return (
    <section className="relative w-full h-full">
      <div className="absolute inset-0 overflow-hidden">
        <div ref={mainRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                style={{ backgroundImage: `url(${slide.src})` }}
                className="shrink-0 size-full bg-cover bg-center"
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 backdrop-blur">
        <div className="max-md:w-11/12 w-full max-w-150 absolute top-1/2 left-1/2 -translate-1/2 h-52 bg-bgPrimary/80 rounded-sm overflow-hidden">
          <div className="absolute w-[calc(50%+8px)] rounded h-full border-[1.5px] left-1/2 -translate-x-1/2" />
          <div className="rounded-sm overflow-hidden flex h-full p-1.5">
            <div className="relative w-full h-full rounded overflow-hidden">
              <div className="overflow-hidden h-full" ref={thumbRef}>
                <div className="h-full flex gap-3">
                  {slides.map((slide, i) => (
                    <div
                      className={clsx("shrink-0 h-full w-1/2 last:mr-3", {
                        "cursor-grab": !grap,
                        "cursor-grabbing": grap,
                      })}
                      key={i}
                      onMouseDown={() => setGrap(true)}
                      onMouseUp={() => setGrap(false)}
                      onClick={() => onThumbClick(i)}
                    >
                      <div className="h-full">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          title={slide.name}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-1 z-50 w-[47%]">
                <div
                  className={`rounded-2xl bg-transparent relative h-0.5 w-full overflow-hidden`.concat(
                    showAutoplayProgress ? "" : " opacity-0",
                  )}
                >
                  <div
                    ref={progressNode}
                    className="animate-autoplay-progress bg-txtPrimary h-full w-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
