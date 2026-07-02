import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import photo1 from "../assets/photos/photo1.jpeg";
import photo2 from "../assets/photos/photo2.jpeg";
import photo3 from "../assets/photos/photo3.jpeg";
import photo4 from "../assets/photos/photo4.jpeg";
import photo5 from "../assets/photos/photo5.jpeg";
import photo6 from "../assets/photos/photo6.jpeg";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

export default function EndingPage() {
  const [step, setStep] = useState(0);
  const [heartbeat, setHeartbeat] = useState(false);

  const beatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const photos = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
  ];

  // Timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 4200),
      setTimeout(() => setStep(3), 8200),
      setTimeout(() => setStep(4), 12500),
      setTimeout(() => setStep(5), 17500),
      setTimeout(() => setStep(6), 24500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Heartbeat
  useEffect(() => {
    if (step < 5) return;

    beatRef.current = setInterval(() => {
      setHeartbeat(true);

      setTimeout(() => {
        setHeartbeat(false);
      }, 260);
    }, 1700);

    return () => {
      if (beatRef.current) clearInterval(beatRef.current);
    };
  }, [step]);

  // Floating particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#030303] flex items-center justify-center"
      onClick={() => {
        if (step >= 6) {
          window.location.reload();
        }
      }}
    >
    {/* Background Glow (FINAL VERSION) */}

<motion.div
  animate={{
    scale: heartbeat ? 1.15 : 1,
    opacity: heartbeat ? 0.35 : 0.15,
    x: [0, 10, -10, 0],
    y: [0, -8, 8, 0],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
  }}
  className="absolute w-[900px] h-[900px] rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 blur-[220px]"
/>

<motion.div
  animate={{
    scale: heartbeat ? 1.05 : 1,
    opacity: heartbeat ? 0.18 : 0.08,
    x: [0, -6, 6, 0],
    y: [0, 6, -6, 0],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
  }}
  className="absolute w-[500px] h-[500px] rounded-full bg-pink-300 blur-[140px]"
/>

<motion.div
  animate={{
    scale: heartbeat ? 1.08 : 1,
    opacity: heartbeat ? 0.12 : 0.05,
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
  }}
  className="absolute w-[300px] h-[300px] rounded-full bg-white/20 blur-[100px]"
/>

<motion.div
  animate={{
    scale: heartbeat ? 1.08 : 1,
    opacity: heartbeat ? 0.12 : 0.05,
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
  }}
  className="absolute w-[300px] h-[300px] rounded-full bg-white/20 blur-[100px]"
/>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.15, 0.8, 0.15],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-200"
            style={{
              width: 2,
              height: 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_25%,rgba(0,0,0,0.98)_100%)]"/>

      {/* Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0.5px, transparent 0.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">

          {/* STEP 1 */}
{step === 1 && (
  <motion.div
    key="intro"
    initial={{ opacity: 0, filter: "blur(20px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, filter: "blur(20px)" }}
    transition={{ duration: 1.4 }}
    className="text-center"
  >
    <p className="uppercase tracking-[0.55em] text-white/35 text-sm">
      one last memory
    </p>

    <motion.div
      animate={{
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="mt-8 text-white/20 text-xs"
    >
      ...
    </motion.div>
  </motion.div>
)}

{/* STEP 2 */}
{step === 2 && (
  <motion.div
    key="thanks"
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -25 }}
    transition={{ duration: 1 }}
    className="text-center"
  >
    <motion.h1
      className="text-6xl md:text-7xl font-extralight text-white"
      animate={{
        scale: heartbeat ? 1.03 : 1,
      }}
    >
      thank you.
    </motion.h1>

    <p className="mt-8 text-white/45 text-lg">
      for staying.
    </p>
  </motion.div>
)}

{/* STEP 3 */}
{step === 3 && (
  <motion.div
    key="message"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2 }}
    className="text-center max-w-2xl"
  >
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl leading-relaxed text-white"
    >
      I couldn’t give you everything,
but I gave you this instead.
      <br />
      everything.
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-12 text-white/50 leading-8"
    >
      But I could spend my time,
      <br />
      writing every animation,
      <br />
      choosing every color,
      <br />
      and thinking about you
      <br />
      while building this.
    </motion.p>
  </motion.div>
)}

{/* STEP 4 */}
{step === 4 && (
  <motion.div
    key="collage"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative w-full h-[720px]"
  >
    {photos.map((photo, i) => {
      const layout = [
        { left: "4%", top: "10%", rotate: -10 },
        { right: "5%", top: "7%", rotate: 8 },
        { left: "10%", bottom: "10%", rotate: -8 },
        { right: "10%", bottom: "15%", rotate: 10 },
        { left: "26%", top: "40%", rotate: -6 },
        { right: "26%", top: "45%", rotate: 6 },
      ];

      const pos = layout[i];

      return (
        <motion.img
          key={i}
          src={photo}
          initial={{
            opacity: 0,
            scale: 0.6,
            y: 120,
            rotate: pos.rotate,
          }}
          animate={{
           opacity: 0.18,
            scale: 1,
            y: 0,
            rotate: pos.rotate,
          }}
          transition={{
            delay: i * 0.35,
            duration: 1,
          }}
          whileHover={{
            opacity: 1,
            scale: 1.08,
            zIndex: 50,
          }}
          style={pos}
          className="absolute w-40 md:w-52 rounded-3xl shadow-2xl"
        />
      );
    })}

    

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 2.5,
        duration: 1.5,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{
          scale: heartbeat ? 1.15 : 1,
        }}
        className="text-8xl"
      >
        ❤️
      </motion.div>

      <p className="mt-6 text-white/55 tracking-[0.35em] uppercase text-xs">
        every memory matters
      </p>
    </motion.div>
  </motion.div>
)}
{/* STEP 5 */}
{step >= 5 && (
  <motion.div
    key="final"
    initial={{
      opacity: 0,
      scale: 0.85,
      filter: "blur(20px)",
    }}
    animate={{
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    }}
    transition={{
      duration: 2,
    }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
  >
    <motion.div
  animate={{
    scale: heartbeat ? 1.01 : 1,
  }}
  transition={{
    duration: 0.6,
  }}
  className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
>

</motion.div>
    {/* Heart */}
    <motion.div
  animate={{
    scale: heartbeat ? [1, 1.25, 1] : 1,
    rotate: heartbeat ? [-2, 2, -1, 0] : 0,
  }}
  transition={{
    duration: 0.4,
  }}
  className="text-7xl"
>
  ❤️
</motion.div>

    {/* Happy Birthday */}
    <motion.h1
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.5,
        duration: 1.5,
      }}
     className="mt-8 text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-200"
    >
      Happy Birthday
    </motion.h1>

    {/* Name */}
    <motion.h2
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1.8,
      }}
      className="mt-5 text-2xl md:text-4xl text-white/80 font-light tracking-wide italic"
    >
      Fiolaa 
    </motion.h2>

    {/* Final Message */}
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 3,
      }}
      className="mt-12 max-w-2xl space-y-5"
    >
      <p className="text-white/70 leading-8 text-lg">
        I hope today reminds you
        of how loved,
        appreciated,
        and special you truly are.
      </p>

      <p className="text-white/45 leading-8">
        Thank you for spending a few minutes
        inside this little world I made.
      </p>
    </motion.div>

    {/* Divider */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 140 }}
      transition={{
        delay: 4.2,
        duration: 1,
      }}
      className="h-px bg-white/20 mt-16"
    />

    {/* Credits */}
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 5,
      }}
      className="mt-10 text-center"
    >
      <p className="uppercase tracking-[0.45em] text-xs text-white/35">
        MADE WITH LOVE
      </p>

      <p className="mt-3 text-xl text-white/70 tracking-[0.25em]">
        @usrswty
      </p>
    </motion.div>

    {/* Replay */}
    {step >= 6 && (
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => window.location.reload()}
        className="mt-20 px-8 py-3 rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur-md hover:bg-white/10 transition"
      >
        Replay ✨
      </motion.button>
    )}
  </motion.div>
)}

</AnimatePresence>
      </div>
    </div>
  );
}