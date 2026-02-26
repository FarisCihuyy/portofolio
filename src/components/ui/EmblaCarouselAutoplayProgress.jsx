import { useCallback, useEffect, useRef, useState } from "react";

export const useAutoplayProgress = (emblaApi, progressNode) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);
  const lastTime = useRef(null);

  const startProgress = useCallback((timeUntilNext) => {
    if (!progressNode.current) return;
    if (timeUntilNext === null) return;
    if (lastTime.current === timeUntilNext) return;

    lastTime.current = timeUntilNext;

    const node = progressNode.current;
    if (!node) return;
    if (timeUntilNext === null) return;

    if (!animationName.current) {
      const style = window.getComputedStyle(node);
      animationName.current = style.animationName;
    }

    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current;
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });

    setShowAutoplayProgress(true);
  }, []);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    startProgress(autoplay.timeUntilNext());

    const reset = () => startProgress(autoplay.timeUntilNext());
    const stop = () => setShowAutoplayProgress(false);

    emblaApi.on("autoplay:timerset", reset);
    emblaApi.on("autoplay:timerstopped", stop);
    emblaApi.on("select", reset);

    return () => {
      emblaApi.off("autoplay:timerset", reset);
      emblaApi.off("autoplay:timerstopped", stop);
      emblaApi.off("select", reset);
    };
  }, [emblaApi, startProgress]);
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    showAutoplayProgress,
  };
};
