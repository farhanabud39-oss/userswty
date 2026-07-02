import { motion } from "framer-motion";

export default function Confetti() {
  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            opacity: 0,
            rotate: 0,
            scale: Math.random() * 0.7 + 0.6,
          }}
          animate={{
            y: window.innerHeight + 120,
            rotate: 720,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            delay: Math.random() * 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="fixed top-0 left-0 pointer-events-none"
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              background: [
                "#ff5c8d",
                "#ffd166",
                "#7dd3fc",
                "#f9a8d4",
                "#ffffff",
              ][i % 5],
            }}
          />
        </motion.div>
      ))}
    </>
  );
}