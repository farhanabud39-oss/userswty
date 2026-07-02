import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import photo1 from "../assets/photos/photo1.jpeg";
import photo2 from "../assets/photos/photo2.jpeg";
import photo3 from "../assets/photos/photo3.jpeg";
import photo4 from "../assets/photos/photo4.jpeg";
import photo5 from "../assets/photos/photo5.jpeg";
import photo6 from "../assets/photos/photo6.jpeg";


type Props = {
  onNext?: () => void;
  playMusic: () => Promise<void>;
};

type Photo = {
  src: string;
  caption: string;
  color: string;
};

export default function MessagePage3({
  onNext,
  playMusic,
}: {
  onNext: () => void;
  playMusic?: () => void;
}) {
  const photos: Photo[] = [
    {
      src: photo1,
      caption: "the smile that always makes my day better",
      color: "#6d8cff",
    },
    {
      src: photo2,
      caption: "still my favorite picture",
      color: "#a78bfa",
    },
    {
      src: photo3,
      caption: "every time i see this, i smile too",
      color: "#ec4899",
    },
    {
      src: photo4,
      caption: "beautiful, as always",
      color: "#60a5fa",
    },
    {
      src: photo5,
      caption: "one day we'll have our own photos together",
      color: "#f472b6",
    },
    {
      src: photo6,
      caption: "until then, i'll treasure these ❤️",
      color: "#22d3ee",
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStart = useRef<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const isInteracting = useRef(false);

  const rotateX = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 6,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 15,
      })),
    []
  );

  const next = () => {
    setIndex((prev) => {
      if (prev === photos.length - 1) {
        onNext?.();
        return prev;
      }

      return prev + 1;
    });
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  useEffect(() => {
  if (paused) return;

  const timer = window.setInterval(() => {
    setIndex((prev) => {
      if (prev === photos.length - 1) {
        onNext?.();
        return prev;
      }

      return prev + 1;
    });
  }, 4500);

  return () => clearInterval(timer);
}, [paused, onNext, photos.length]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", key);

    return () => window.removeEventListener("keydown", key);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;

    const diff =
      e.changedTouches[0].clientX - touchStart.current;

    if (diff > 50) prev();

    if (diff < -50) next();

    touchStart.current = null;

   window.setTimeout(() => {
  setPaused(false);
}, 400);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;

    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set((x - 0.5) * 16);

    mouseY.set(-(y - 0.5) * 16);
  };

  const [isHover, setIsHover] = useState(false);
const hoverLock = useRef(false);

const handlePointerEnter = () => {
  setIsHover(true);
};

const handlePointerLeave = () => {
  setIsHover(false);
};


  return (
        <motion.div
      className="relative min-h-screen overflow-hidden bg-[#08090c] text-white"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
  
      animate={{
        backgroundColor: "#08090c",
      }}
    >
      {/* Dynamic Color */}
      <motion.div
  className="absolute inset-0 pointer-events-none"
  animate={{
  background: `
    radial-gradient(
      circle at 50% 40%,
      ${photos[index].color}22 0%,
      transparent 60%
    )
  `,
}}
  transition={{ duration: 1.5 }}
/>

      {/* Aurora Left */}
     <motion.div
  className="absolute -left-72 top-[-250px] w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none"
  animate={{
    scale: [1, 1.08, 1],
    rotate: [0, 10, -10, 0],
  }}
  transition={{
    duration: 18,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    background:
      "radial-gradient(circle, rgba(255,255,255,.08), rgba(99,102,241,.08), transparent 70%)",
  }}
/>

      {/* Aurora Right */}
<motion.div
  className="absolute -right-72 bottom-[-300px] w-[850px] h-[850px] rounded-full blur-[180px] pointer-events-none"
  animate={{
    scale: [1, 1.08, 1],
    rotate: [0, -10, 10, 0],
    opacity: [0.35, 0.55, 0.35],
  }}
  transition={{
    duration: 18,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    background: `
      radial-gradient(
        circle,
        rgba(236,72,153,.10),
        rgba(147,197,253,.08),
        transparent 72%
      )
    `,
  }}
/>

      {/* Spotlight */}
      <motion.div
  className="absolute left-1/2 top-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 40,
    damping: 20,
  }}
  style={{
    x: rotateY,
    y: rotateX,
    background:
      "radial-gradient(circle, rgba(255,255,255,.16), transparent 70%)",
  }}
/>

      {/* Glow */}
      <motion.div
  className="absolute left-1/2 bottom-[-250px] w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none"
  animate={{
    opacity: [0.2, 0.35, 0.2],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
  }}
  style={{
    translateX: "-50%",
    background: photos[index].color,
  }}
/>

      {/* Grid */}
      <div
  className="absolute inset-0 opacity-[0.04] pointer-events-none"
  style={{
    backgroundImage: `
      linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
    `,
    backgroundSize: "70px 70px",
  }}
/>

      {/* Noise */}
      <div
  className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none"
  style={{
    backgroundImage:
      "radial-gradient(rgba(255,255,255,.35) .8px, transparent .8px)",
    backgroundSize: "5px 5px",
  }}
/>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-25, 25, -25],
            opacity: [0.1, 0.45, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Vignette */}
     <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(circle, transparent 35%, rgba(0,0,0,.65) 100%)",
  }}
/>

      {/* Main */}
     <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
            {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.45em] text-white/40">
          OUR MEMORIES
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-light tracking-wide">
          Every Picture
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">
          Some moments don't need many words.
          They only need one picture.
        </p>
      </motion.div>

      {/* Photo Card */}
      <motion.div
  onPointerEnter={handlePointerEnter}
  onPointerLeave={handlePointerLeave}
  whileTap={{ scale: 0.98 }}
  style={{
    rotateX,
    rotateY,
    transformPerspective: 1800,
  }}

        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative"
      >
        {/* Shadow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [.18, .35, .18],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-[34px] blur-[90px]"
          style={{
            background: photos[index].color,
          }}
        />

        {/* Reflection */}
        <motion.div
 animate={{
  x: ["-60%", "160%"],
}}
transition={{
  duration: 2.4,
  repeat: Infinity,
  ease: "linear",
}}
style={{
  width: "40%",
}}

          className="
            absolute
            top-0
            left-0
            z-30
            h-full
           w-32 md:w-40
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
            blur-lg
            pointer-events-none
          "
        />

        {/* Glass Border */}
        <div
          className="
            absolute
            -inset-[2px]
            rounded-[36px]
            bg-gradient-to-br
            from-white/20
            via-white/5
            to-white/15
            opacity-70
            blur-[1px]
          "
        />

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={photos[index].src}
            initial={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(16px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: .94,
              filter: "blur(16px)",
            }}
            transition={{
              duration: .8,
              ease: "easeInOut",
            }}
            className="
              relative
              z-20
              h-[470px]
              w-[330px]
              md:h-[590px]
              md:w-[410px]
              rounded-[34px]
              object-cover
              border
              border-white/10
              shadow-[0_35px_120px_rgba(0,0,0,.6)]
              select-none
            "
            draggable={false}
          />
        </AnimatePresence>

        {/* Glass Overlay */}
        <div
          className="
            absolute
            inset-0
            rounded-[34px]
            bg-gradient-to-b
            from-white/[0.04]
            via-transparent
            to-black/10
            pointer-events-none
          "
        />

        {/* Top Reflection */}
        <div
          className="
            absolute
            top-0
            left-0
            h-36
            w-full
            rounded-t-[34px]
            bg-gradient-to-b
            from-white/15
            to-transparent
            opacity-40
            pointer-events-none
          "
        />
      </motion.div>

      {/* Caption */}
      <div className="mt-10 max-w-xl text-center">

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: .45,
            }}
            className="
              text-lg
              leading-8
              text-white/90
            "
          >
            {photos[index].caption}
          </motion.p>
        </AnimatePresence>
        

        <p className="mt-5 text-sm text-white/30">
          {index + 1} / {photos.length}
        </p>

      </div>
            {/* Indicators */}
      <div className="mt-8 flex items-center gap-3">
        {photos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            animate={{
  width: index === i ? 34 : 8,
  opacity: index === i ? 1 : 0.25,
  scale: index === i ? 1 : 0.85,
}}
            transition={{
              duration: 0.35,
            }}
            className="h-2 rounded-full bg-white"
          />
        ))}
      </div>

      {/* Progress */}
      <div className="mt-8 w-[280px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          key={index}
          initial={{
            width: "0%",
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            duration: paused ? 0 : 4.5,
            ease: "linear",
          }}
          className="h-[3px]"
          style={{
            background: photos[index].color,
          }}
        />
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center gap-5">

        <motion.button
          whileHover={{
            scale: 1.08,
            y: -2,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={prev}
          className="
            h-14
            w-14
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            text-xl
            hover:bg-white/10
            transition
          "
        >
          ←
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={next}
          className="
            px-8
            h-14
            rounded-full
            text-black
            font-medium
            shadow-2xl
          "
          style={{
            background: photos[index].color,
          }}
        >
          Next
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.08,
            y: -2,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={() => {
  isInteracting.current = true;
  setPaused((p) => !p);

  window.setTimeout(() => {
    isInteracting.current = false;
  }, 300);
}}
          className="
            h-14
            w-14
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            text-xl
            hover:bg-white/10
            transition
          "
        >
          {paused ? "▶" : "❚❚"}
        </motion.button>

      </div>

           {/* Footer */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        className="mt-12 text-center"
      >
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/25">
          MADE WITH LOVE
        </p>

        <p className="mt-3 text-sm text-white/35">
          Every picture reminds me why you're always special.
        </p>
      </motion.div>

      </div> {/* ❗ CLOSE MAIN CONTENT WRAPPER (INI HARUS ADA DAN BENAR) */}

      {/* Floating Music */}
 <motion.button
  onClick={playMusic}
  className="
    fixed
    bottom-6
    right-6
    z-[99999]
    h-16
    w-16
    rounded-full
    bg-pink-500
    text-white
    text-2xl
    flex
    items-center
    justify-center
    shadow-2xl
  "
>
  🎵
</motion.button>
    </motion.div>
  );
}