import { useEffect, useState } from "react";

export default function SpotlightCarousel({ images }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getStyle = (index) => {
    const diff = (index - active + images.length) % images.length;

    if (diff === 0) {
      // tengah
      return "scale-110 opacity-100 z-20";
    }

    if (diff === 1 || diff === images.length - 1) {
      // kiri / kanan
      return "scale-90 opacity-60 z-10";
    }

    // sisanya disembunyikan
    return "scale-75 opacity-0 pointer-events-none";
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center h-[420px] z-10 overflow-hidden">
      <div className="flex items-center gap-8">
        {images.map((src, i) => (
          <div
            key={i}
            className={`
              w-72 h-96 rounded-2xl bg-cover bg-center
              transition-all duration-700 ease-out
              shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]
              ${getStyle(i)}
            `}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
    </div>
  );
}
