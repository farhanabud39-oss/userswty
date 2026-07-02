import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";

import HeartScene from "./components/HeartScene";
import TextHeart from "./components/TextHeart";

import MessagePage1 from "./components/message/MessagePage1";
import MessagePage2 from "./components/message/MessagePage2";
import MessagePage3 from "./components/message/MessagePage3";
import EndingPage from "./components/message/EndingPage";

const Typewriter = ({
  text,
  delay = 50,
  onComplete,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const completed = useRef(false);

  useEffect(() => {
    setCurrentText("");
    setIndex(0);
    completed.current = false;
  }, [text]);

  useEffect(() => {
    if (index >= text.length) {
      if (onComplete && !completed.current) {
        completed.current = true;
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText(text.slice(0, index + 1));
      setIndex((p) => p + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index, text, delay, onComplete]);

  return <span className="font-mono">{currentText}</span>;
};

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/birthday.mp3");
    audio.loop = true;
    audio.volume = 0.45;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const playMusic = async () => {
  if (!audioRef.current) return;

  try {
    // Mulai dari 1 menit 20 detik
    audioRef.current.currentTime = 80;

    await audioRef.current.play();
  } catch (err) {
    console.log(err);
  }
};

  const [stage, setStage] = useState<
    "console" | "decrypt" | "heart" | "message"
  >("console");

  const [consoleFinished, setConsoleFinished] = useState(false);

  const [letterPage, setLetterPage] = useState(1);

  const [pulse, setPulse] = useState(false);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(12px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(14px)",
    },
  };

  const handleReveal = useCallback(() => {
    if (stage === "console" && consoleFinished) {
      setStage("decrypt");
    }
  }, [stage, consoleFinished]);

  useEffect(() => {
    if (stage === "console") {
      setConsoleFinished(false);
    }
  }, [stage]);

  return (
  <div
    onClick={handleReveal}
    className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden"
  >
    {/* VIGNETTE */}
    <div className="pointer-events-none fixed inset-0 z-[999]">
      <div className="w-full h-full bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
    </div>

    <div className="scanline" />

    <AnimatePresence mode="wait">

      {/* ================= CONSOLE ================= */}
      {stage === "console" && (
        <motion.div
          key="console"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6 }}
          className="relative min-h-screen w-full flex items-center justify-center"
        >
          <motion.div className="w-full max-w-2xl p-8 font-mono text-white/80 space-y-4">

            <div className="flex gap-2 text-pink-300/60">
              <span>[system]</span>

              <Typewriter
                text="haii sayang, aku ada hadiah kecil buat kamu, semoga kamu suka yaa ❤️"
                delay={30}
                onComplete={() => setConsoleFinished(true)}
              />
            </div>

            <div className="flex gap-2 h-6">
              <span>[status]</span>

              {consoleFinished && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400"
                >
                  LOVE U BABY ❤️
                </motion.span>
              )}
            </div>

            {consoleFinished && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 flex flex-col gap-6"
              >
                <p className="text-white/40 italic">
                  {">"} One encrypted package found for you.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  onClick={() => setStage("decrypt")}
                  className="px-6 py-3 border border-pink-500/30 bg-pink-500/10"
                >
                  <Lock className="inline mr-2" size={14} />
                  Decrypt Message
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ================= DECRYPT ================= */}
      {stage === "decrypt" && (
        <motion.div
          key="decrypt"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-pink-200 font-mono bg-[#050505]"
        >
          <motion.p
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{ duration: 2 }}
          >
            This isn't just a website. It's a piece of my heart.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStage("heart")}
            className="mt-8 px-6 py-2 border border-pink-500/30"
          >
            Continue ❤️
          </motion.button>
        </motion.div>
      )}

            {/* ================= HEART ================= */}
      {stage === "heart" && (
        <motion.div
          key="heart"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />

          {/* Heart */}
          <motion.div
            animate={{ scale: pulse ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              if (!pulse) setPulse(true);
            }}
            onAnimationComplete={() => setPulse(false)}
          >
            <HeartScene active={true} />
          </motion.div>

          {/* Text */}
          <TextHeart />

          {/* Continue */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLetterPage(1);
              setStage("message");
            }}
            className="absolute bottom-10 px-6 py-3 border border-pink-500/30 bg-pink-500/10 text-white rounded-lg backdrop-blur-sm"
          >
            Continue →
          </motion.button>
        </motion.div>
      )}

      {/* ================= MESSAGE ================= */}
      {stage === "message" && (
        <motion.div
          key="message"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen"
        >
          {letterPage === 1 && (
            <MessagePage1
              onNext={() => setLetterPage(2)}
            />
          )}

          {letterPage === 2 && (
            <MessagePage3
              onNext={() => setLetterPage(3)}
              playMusic={playMusic}
            />
          )}

          {letterPage === 3 && (
            <MessagePage2
              onNext={() => setLetterPage(4)}
            />
          )}

          {letterPage === 4 && (
            <EndingPage />
          )}
        </motion.div>
      )}

    </AnimatePresence>
  </div>
);
}