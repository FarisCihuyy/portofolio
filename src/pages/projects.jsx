import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect, useState } from "react";
import Counter from "@/components/Counter";
import { projects } from "@/data/projects";
import DecryptedText from "@/components/DecryptedText";
import TextType from "@/components/TextType";
import { Link } from "react-router-dom";
import Tag from "@/components/ui/tag";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Projects = () => {
  const projectLength = projects.length;
  const [counter, setCounter] = useState(1);
  const [size, setSize] = useState(160);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 640) setSize(100);
      else if (window.innerWidth < 1024) setSize(130);
      else setSize(160);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#scroll-wrapper",
      content: "#scroll-content",
      smooth: 2,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true,
    });
  });

  useGSAP(() => {
    const sections = gsap.utils.toArray(".parallax-section");
    sections.forEach((section) => {
      const bg = section.querySelector(".parallax-bg");
      const sectionHeight = section.offsetHeight / 50;

      gsap.fromTo(
        bg,
        { yPercent: -sectionHeight },
        {
          yPercent: sectionHeight,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  });

  useGSAP(() => {
    const contents = gsap.utils.toArray(".content");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      contents.forEach((content, i) => {
        const parent = content.closest(".parent");

        ScrollTrigger.create({
          trigger: content,
          start: "top top",
          end: "+=60%",
          pin: true,
          pinSpacing: true,
          onEnter: () => setCounter(i + 1),
          onEnterBack: () => setCounter(i + 1),
          onToggle: (self) => {
            parent.classList.toggle("active", self.isActive);
          },
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      contents.forEach((content, i) => {
        const parent = content.closest(".parent");

        ScrollTrigger.create({
          trigger: content,
          start: "top 140px",
          end: "+=60%",
          pin: true,
          onEnter: () => setCounter(i + 1),
          onEnterBack: () => setCounter(i + 1),
          onToggle: (self) => {
            parent.classList.toggle("active", self.isActive);
          },
        });
      });
    });

    return () => mm.revert();
  });

  return (
    <>
      <Counter
        value={counter}
        places={[10, 1]}
        fontSize={size}
        gap={0}
        gradientFrom="transparent"
        containerStyle={{
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "9999",
        }}
        textColor="#ffffe3"
        digitStyle={{
          fontFamily: "var(--font-CabinetGrotesk)",
          fontWeight: "300",
        }}
      />

      <div className="peer/hover group fixed z-40 left-1/2 max-lg:-translate-x-1/2 bottom-4 w-full max-w-4/5 md:max-w-1/3 flex justify-between items-center rounded-md p-0.5 bg-bgPrimary/50 backdrop-blur pr-4 ml-4">
        <Link
          to="/"
          className="flex items-center justify-center absolute -left-10 size-8 rounded-full bg-txtPrimary/50 backdrop-blur lg:opacity-0 cursor-pointer transition-opacity group-hover:opacity-100"
        >
          <AiOutlineHome className="text-2xl" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-28 h-full rounded-sm overflow-hidden">
            <img
              className="aspect-4/3"
              src={projects[counter - 1].src}
              alt={projects[counter - 1].name}
            />
          </div>
          <div>
            <p className="opacity-70 text-xs font-CabinetGrotesk font-light">{`${counter <= 9 ? `0${counter}` : counter} / ${projectLength <= 9 ? `0${projectLength}` : projectLength}`}</p>
            <h2 className="text-xl">{projects[counter - 1].name}</h2>
          </div>
        </div>
        <div className="justify-self-end text-xl px-2 bg-txtPrimary rounded-full text-bgPrimary py-0.5">
          {projects[counter - 1].live ? (
            <a href={projects[counter - 1].live} target="_blank">
              <GoArrowUpRight />
            </a>
          ) : (
            <a href={projects[counter - 1].github} target="_blank">
              <FaGithub />
            </a>
          )}
        </div>
      </div>

      <main
        id="scroll-wrapper"
        className="transition-opacity peer-hover/hover:opacity-70"
      >
        <div id="scroll-content">
          {projects &&
            projects.map((projects) => (
              <section
                key={projects.name}
                className="parallax-section relative h-[calc(100vh+10rem)] overflow-hidden"
              >
                <div
                  className="parallax-bg absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${projects.src})` }}
                />
                <div className="parent absolute inset-0 flex lg:justify-end">
                  <div className="content absolute lg:left-1/2 w-full md:w-1/2 max-w-4/5 md:max-w-none p-4">
                    <DecryptedText
                      text={projects.name}
                      sequential={true}
                      speed={50}
                      animateOn="view"
                      characters="!#$%&()+/<=>?@[]{|}"
                      className="font-CabinetGrotesk font-bold uppercase text-5xl md:text-6xl"
                      encryptedClassName="text-5xl md:text-6xl text-[#b04f3a]"
                    />
                    <div className="space-y-4 mt-12">
                      <div className="flex gap-2">
                        {projects.tags.map((tag, i) => (
                          <Tag key={i} label={tag} />
                        ))}
                      </div>
                      <TextType
                        text={projects.description}
                        as="p"
                        className="font-CabinetGrotesk text-lg"
                        variableSpeed={{ min: 5, max: 20 }}
                        loop={false}
                        startOnVisible={true}
                        showCursor={false}
                      />
                    </div>
                  </div>
                </div>
              </section>
            ))}
        </div>
      </main>
    </>
  );
};

export default Projects;
