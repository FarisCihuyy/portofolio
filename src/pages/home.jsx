import DecryptedText from "@/components/DecryptedText";
import { SiPolestar } from "react-icons/si";
import { Link } from "react-router-dom";
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import { projects } from "@/data/projects";
import { useClock } from "@/hooks/useClock";

const Home = () => {
  const time = useClock();

  return (
    <>
      <nav className="peer/hover fixed z-20 bottom-4 left-1/2 -translate-x-1/2 min-w-60 flex justify-between font-InterTight text-xl p-4 backdrop-blur-[80px] rounded-sm">
        <Link to="/projects">
          <DecryptedText
            text="Projects"
            sequential={true}
            speed={40}
            characters="!#$%&()+/<=>?@[]{|}"
            encryptedClassName="text-[#c0561f]"
          />
        </Link>
        <div className="absolute left-1/2">=</div>
        <Link to="/about">
          <DecryptedText
            text="About"
            sequential={true}
            speed={40}
            characters="!#$%&()+/<=>?@[]{|}"
            encryptedClassName="text-[#b04f3a]"
          />
        </Link>
      </nav>
      <main
        title="HIREE MEEEE!!!!"
        className="h-screen grid grid-rows-11 peer-hover/hover:opacity-75 transition-opacity duration-500"
      >
        <div className="row-span-6 flex flex-col justify-between px-6 py-4">
          <header className="relative flex justify-between items-end-safe">
            <h3>Portfolio</h3>
            <h2 className="absolute text-xl left-1/2 -translate-x-1/2">
              Faris Sulianto
            </h2>
            <time>@2026</time>
          </header>
          <div className="relative">
            <span className="absolute -top-2 -left-2 opacity-60">
              <SiPolestar className="text-3xl" />
            </span>
            <h1 className="text-5xl md:text-7xl text-center">
              Independent & <br /> creative frontend <br /> developer
            </h1>
            <span className="absolute -bottom-2 -right-2 opacity-60">
              <SiPolestar className="text-3xl" />
            </span>
          </div>
          <div className="relative flex justify-between items-end-safe">
            <h3>available</h3>
            <a
              href="mailto:farissulianto22@gmail.com"
              className="absolute text-xl left-1/2 -translate-x-1/2 hover:underline"
            >
              Contact
            </a>
            <time>{time}</time>
          </div>
        </div>

        <section className="row-span-5 h-full">
          <EmblaCarousel slides={projects}></EmblaCarousel>
        </section>
      </main>
      {/* <div
        className="fixed top-0 left-0 w-full h-full z-99999 pointer-events-none opacity-[calc(10/100)]"
        style={{
          backgroundImage: `url(https://static.tildacdn.one/tild3265-3261-4333-a361-353739633737/noise.gif)`,
          backgroundSize: "70px",
        }}
      ></div> */}
    </>
  );
};

export default Home;
