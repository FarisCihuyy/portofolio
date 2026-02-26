import { Route, Routes, useLocation } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import Home from "./pages/home";
import Projects from "./pages/projects";
import About from "./pages/about";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const location = useLocation();
  const container = useRef(null);
  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from("#intro-slider", {
        delay: 0.5,
      })
        .from("#title", {
          opacity: 0,
          y: 30,
        })
        .to("#title", {
          opacity: 0,
          y: -30,
          delay: 1,
        })
        .to("#intro-slider", {
          xPercent: -100,
          duration: 1.3,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { opacity: 0 },
      {
        opacity: 1,
        delay: 0.2,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }, [location.pathname]);

  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen p-8 bg-txtPrimary text-bgPrimary absolute top-0 left-0 font-CabinetGrotesk z-10 w-full flex justify-center items-center tracking-tight"
      >
        <h1 id="title" className="text-[14cqw]">
          Hi There!
        </h1>
      </div>
      <div id="page" ref={container}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
