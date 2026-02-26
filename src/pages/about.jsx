import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useClock } from "@/hooks/useClock";
import TextType from "@/components/TextType";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoArrowRight } from "react-icons/go";
import Tag from "@/components/ui/tag";
import { journeys } from "@/data/journeys";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/data/services";
import DecryptedText from "@/components/DecryptedText";
import { SiPolestar } from "react-icons/si";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const About = () => {
  const time = useClock();
  const [activeSection, setActiveSection] = useState("intro");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#scroll-wrapper",
      content: "#scroll-content",
      smooth: 1.5,
      smoothTouch: 1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
  });

  useGSAP(() => {
    const sections = gsap.utils.toArray(".parallax-section");
    sections.forEach((section) => {
      const bg = section.querySelector(".parallax-bg");

      const animation = gsap.fromTo(
        bg,
        { yPercent: -40 },
        { yPercent: 60, ease: "none" },
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 40%",
        scrub: true,
        animation: animation,
        onToggle: (self) => {
          gsap.to(section, {
            opacity: self.isActive ? 1 : 0.6,
            duration: 0.2,
          });
        },
      });
    });
  });

  useGSAP(() => {
    if (window.innerWidth < 768) return;

    ScrollTrigger.create({
      trigger: ".label",
      start: "top -8px",
      end: "+=60%",
      pin: true,
      pinSpacing: true,
    });
  });

  return (
    <>
      <nav
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="peer/hover fixed z-50 bottom-6 right-6 flex items-center gap-2"
      >
        <div
          className={`origin-right h-10 min-w-44 px-4 flex items-center justify-between bg-bgPrimary/50 rounded border border-txtPrimary/50 transition-transform duration-300 ${isOpen ? "scale-x-100" : "scale-x-0"}`}
        >
          <Link to="/">
            <DecryptedText
              text="Home"
              sequential={true}
              speed={40}
              characters="!#$%&()+/<=>?@[]{|}"
              encryptedClassName="text-[#c0561f]"
            />
          </Link>
          <div className="absolute left-1/2">|</div>
          <Link to="/projects">
            <DecryptedText
              text="Projects"
              sequential={true}
              speed={40}
              characters="!#$%&()+/<=>?@[]{|}"
              encryptedClassName="text-[#b04f3a]"
            />
          </Link>
        </div>

        <button className="relative size-10 bg-bgPrimary/50 rounded border border-txtPrimary/50 flex items-center justify-center">
          <span
            className={`absolute w-5 h-0.5 bg-txtPrimary transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-1"}`}
          />
          <span
            className={`absolute w-5 h-0.5 bg-txtPrimary transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-1"}`}
          />
        </button>
      </nav>
      <main className="transition-opacity peer-hover/hover:opacity-70">
        <div className="hidden lg:block h-screen fixed z-50 inset-0 pointer-events-none">
          <p className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
            {activeSection}
          </p>
        </div>
        <div id="scroll-wrapper">
          <div id="scroll-content">
            <section
              id="intro"
              title="THIS DUDE IS NOT ME!"
              className="parallax-section h-screen relative bg-[radial-gradient(circle_at_25%_100%,#f3bbae_0%,#b04f3a_50%)] overflow-hidden"
            >
              <div className="parallax-bg h-full absolute left-0 -bottom-1/12 lg:bottom-0 lg:-top-[40%]">
                <img
                  src="images/about.png"
                  alt="THIS DUDE IS NOT ME!"
                  className="w-full scale-140 lg:w-[60%] h-auto grayscale-50"
                />
              </div>
              <div className="h-full bg-bgPrimary/30 lg:bg-bgPrimary/10 relative z-10 flex flex-col md:justify-center lg:flex-row">
                <h1 className="label text-8xl md:text-[12rem] w-1/2 font-CabinetGrotesk font-medium leading-none px-4">
                  About
                </h1>
                <div className="w-full lg:w-1/2 flex flex-col justify-end md:justify-start gap-12 lg:flex-row p-4 relative h-full mb-12 md:-mt-72 lg:mt-0 lg:mb-0">
                  <header className="flex justify-between w-full">
                    <h3 className="text-xl h-fit">Available</h3>
                    <a
                      href="mailto:farissulianto22@gmail.com"
                      className="text-xl h-fit hover:underline"
                    >
                      Contact
                    </a>
                    <time className="text-xl h-fit">{time}</time>
                  </header>
                  <TextType
                    text="I’m a Frontend Web Developer who’s passionate about building clean, responsive, and user-friendly interfaces using JavaScript or Typescript. I enjoy learning new technologies, improving my coding skills, and turning ideas into real, functional web experiences.

Currently, I’m focused on growing my portfolio through hands-on projects that help me learn and showcase my development journey."
                    as="p"
                    className="w-5/6 md:w-1/2 leading-tight relative lg:absolute lg:top-2/3 lg:-translate-y-1/2 font-CabinetGrotesk text-lg"
                    typingSpeed={1}
                    loop={false}
                    startOnVisible={true}
                    showCursor={false}
                  />
                </div>
              </div>
            </section>
            <section id="journey" className="flex lg:justify-end py-4 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-[90%] lg:max-w-[75%]">
                {journeys.map((journey) => (
                  <Card
                    key={journey.id}
                    className="col-span-1 bg-transparent text-txtPrimary font-CabinetGrotesk p-4 border-none"
                  >
                    <CardHeader className="px-0">
                      <CardTitle className="text-4xl uppercase leading-[1.1] min-h-[2.2em] line-clamp-2 text-ellipsis">
                        <DecryptedText
                          text={journey.title}
                          sequential={true}
                          speed={40}
                          characters="!#$%&()+/<=>?@[]{|}"
                          encryptedClassName="text-[#b04f3a]"
                          animateOn="view"
                        />
                      </CardTitle>
                      <CardAction>
                        <GoArrowRight className="text-2xl stroke-1" />
                      </CardAction>
                    </CardHeader>
                    <CardContent className="mt-4 lg:mt-12">
                      <Tag label={journey.date} className="w-fit mb-4" />
                      <TextType
                        text={journey.description}
                        as="p"
                        variableSpeed={{ min: 5, max: 20 }}
                        loop={false}
                        startOnVisible={true}
                        className="lg:min-h-36"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            <section
              id="service"
              className="min-h-[30vh] flex justify-end items-center p-4 lg:p-8"
            >
              <div className="grid grid-cols-3 w-full lg:max-w-[75%]">
                <Accordion
                  type="single"
                  collapsible={true}
                  className="col-span-3 lg:col-span-2 overflow-hidden flex flex-col gap-y-2"
                >
                  {services.map((service) => (
                    <AccordionItem
                      key={service.id}
                      value={service.id}
                      className="group px-4 rounded-md opacity-30 bg-[#292c2e] transition-opacity [&[data-state=open]]:opacity-100"
                    >
                      <AccordionTrigger className="text-2xl md:text-3xl">
                        <DecryptedText
                          text={service.name}
                          sequential={true}
                          speed={20}
                          characters="!#$%&()+/<=>?@[]{|}"
                          encryptedClassName="text-[#b04f3a]"
                          parentClassName="w-full"
                        />
                        <Tag
                          label={service.label}
                          data-label={service.label}
                          className="mr-8 group-data-[state=open]:bg-[#b04f3a] group-data-[state=open]:text-txtPrimary"
                        />
                      </AccordionTrigger>
                      <AccordionContent className="font-CabinetGrotesk">
                        <p>{service.description}</p>
                        {service.tags && (
                          <div className="mt-8 grid grid-cols-3 gap-4">
                            {service.tags.map((tag) => (
                              <div key={tag.title} className="space-y-2">
                                <Tag
                                  className="w-fit uppercase text-sm font-medium"
                                  label={tag.title}
                                ></Tag>
                                <p className="text-sm">{tag.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
            <footer className="parallax-section relative h-[60vh] md:h-screen text-bgPrimary overflow-hidden">
              <div className="parallax-bg h-full absolute w-full bg-txtPrimary px-4">
                <header className="relative text-lg top-4 flex justify-between items-end-safe">
                  <h3>Portfolio</h3>
                  <h2 className="absolute text-xl left-1/2 -translate-x-1/2">
                    Faris Sulianto
                  </h2>
                  <time>@2026</time>
                </header>
                <div className="relative top-1/2 left-1/2 -translate-1/2 w-fit px-12">
                  <span className="absolute -top-2 -left-2 opacity-60">
                    <SiPolestar className="text-3xl" />
                  </span>
                  <h1 className="text-4xl md:text-7xl text-center">
                    “ I used to avoid math. <br /> Now I solve problems for a
                    living.
                  </h1>
                  <span className="absolute -bottom-2 -right-2 opacity-60">
                    <SiPolestar className="text-3xl" />
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
