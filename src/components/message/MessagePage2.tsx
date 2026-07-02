import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const letter: string[] = [
  "Hi, Baby.",
  "Happy Birthday. ❤️",

  "Today is your day.",
  "I just hope today feels a little softer, a little warmer, a little more special than the rest.",

  "I hope you feel loved today... even from far away.",

  "Sometimes I still can't believe you exist.",
  "Someone who makes everything feel calmer just by being there.",

  "We haven't held hands.",
  "We haven't watched sunsets together.",

  "But somehow... you still feel close.",

  "Every message from you matters more than you know.",

  "You made my days lighter.",
  "You became someone I always look forward to.",

  "This website is just code...",
  "But everything in it was made while thinking about you.",

  "Late at night... when everything was quiet...",
  "I kept building this just to make you smile.",

  "Not because I had to.",
  "But because I wanted to.",

  "I wanted to give you something personal.",
  "Something that stays.",
  "Something that says what I can't always say directly.",

  "Time will pass.",
  "Things will change.",

  "But I hope one thing stays the same.",

  "That somewhere out there...",
  "there was someone who really cared about you.",

  "I love you.",
  "Not just today.",
  "But always.",

  "Happy Birthday, my love. ❤️",

  "And I hope next year...",
  "I won't be writing this through a screen anymore.",

  "I hope I'll be there beside you."
];

export default function MessagePage2({ onNext }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // ⚡ MAX SPEED AUTO CAMERA
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let y = 0;
    let frame: number;

    const step = () => {
      const max = el.scrollHeight - el.clientHeight;

      const p = y / max;

      // 🚀 FAST MODE (balanced cinematic but quick)
      let speed = 1.35;

      if (p < 0.1) speed = 1.1;        // awal masuk
      else if (p < 0.25) speed = 1.3;  // mulai naik
      else if (p < 0.8) speed = 1.4;   // main speed
      else speed = 1.65;               // finish cepat biar sync musik

      y += speed;

      el.scrollTop = y;
      setProgress(p);

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff4da620,transparent_60%)] animate-pulse" />

      {/* PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-pink-300/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* TITLE */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 text-center">
        <p className="uppercase tracking-[14px] text-pink-400 text-sm">
          A LETTER FOR YOU, BABY
        </p>
        <div className="mt-5 text-2xl animate-bounce">❤️</div>
      </div>

      {/* 🎥 CAMERA STAGE */}
      <div
        ref={ref}
        className="absolute inset-0 overflow-y-auto"
      >
        <div className="min-h-[420vh] flex justify-center items-end px-8 pb-64">

          <div className="w-full max-w-2xl space-y-12 text-center">

            {letter.map((line, index) => {

              const emotional =
                line.includes("I love you") ||
                line.includes("Happy Birthday");

              // ⚡ SUPER FAST REVEAL
              const revealStart = index * 0.0065;
              const visible = progress > revealStart;

              return (
                <motion.p
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 90,
                    filter: "blur(14px)",
                    scale: 0.96,
                  }}
                  animate={
                    visible
                      ? {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          y: 90,
                          filter: "blur(14px)",
                        }
                  }
                  transition={{
                    duration: emotional ? 1.2 : 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`leading-10 ${
                    emotional
                      ? "text-3xl text-pink-300 font-light"
                      : "text-white/80 text-xl"
                  }`}
                >
                  {line}
                </motion.p>
              );
            })}

            {/* FINAL BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={progress > 0.88 ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 1.2 }}
              className="pt-56"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-16 py-6 rounded-full border border-pink-400/40 bg-pink-500/10 text-pink-100 backdrop-blur-xl hover:bg-pink-500/20"
              >
                One Last Surprise ❤️
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}