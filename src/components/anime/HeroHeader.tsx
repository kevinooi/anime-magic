import { Fragment, useEffect } from "react";
import classNames from "@/utils";
import { motion, stagger, useAnimate } from "framer-motion";

const HeroHeader = () => {
  return (
    <div
      style={{ backgroundImage: "url('/cover.png')" }}
      className="pt-36 md:pt-48 lg:pt-8 pb-8 space-y-8 bg-center bg-cover bg-no-repeat w-full"
    >
      <header className="opacity-100 flex flex-col lg:flex-row items-center justify-between sm:px-16 px-8 w-full">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <TextGenerateEffect
            wordClassName="text-4xl md:text-5xl lg:text-6xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-10"
            words="Explore The Diverse Realms of Anime Magic"
            wordsCallbackClass={({ word }) => {
              if (word === "Diverse") {
                return "bg-gradient-to-r from-indigo-600 to-[#be598a] bg-clip-text text-transparent";
              }
              if (word === "Realms") {
                return "bg-gradient-to-r from-[#be598a] to-[#ff6a55] bg-clip-text text-transparent";
              }
              return "";
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="flex-1 flex justify-center items-center w-full"
        >
          <img src="/jinwoo.png" alt="anime" className="object-contain w-[80%] sm:w-[70%] md:w-[60%] lg:w-full h-auto max-w-xl" />
        </motion.div>
      </header>
    </div>
  );
};

export default HeroHeader;

type WordCallback = ({ word }: { word: string }) => string;

const TextGenerateEffect = ({
  words,
  className,
  wordClassName,
  filter = true,
  duration = 0.5,
  wordsCallbackClass
}: {
  words: string;
  className?: string;
  wordClassName?: string;
  filter?: boolean;
  duration?: number;
  wordsCallbackClass: WordCallback;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none"
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.075)
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className={wordClassName}>
        {wordsArray.map((word, idx) => (
          <Fragment key={word + idx}>
            <motion.span
              className={classNames("opacity-0", wordsCallbackClass && wordsCallbackClass({ word }))}
              style={{
                filter: filter ? "blur(10px)" : "none"
              }}
            >
              {word}{" "}
            </motion.span>

            {/* Add line breaks for lg screens */}
            {(idx === 1 || idx === 3) && <br className="hidden lg:block" />}
          </Fragment>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={classNames("font-bold", className)}>
      <div className="mt-4">
        <div className="text-white text-2xl leading-snug">{renderWords()}</div>
      </div>
    </div>
  );
};
