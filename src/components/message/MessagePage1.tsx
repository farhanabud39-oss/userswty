import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function MessagePage1({ onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 bg-black"
    >
      {/* Ambient background glow (soft netflix style) */}
      <div className="absolute w-[800px] h-[800px] bg-white/5 blur-[180px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-3xl text-center"
      >
        {/* small label */}
        <p className="text-white/40 tracking-[0.4em] uppercase text-xs">
          A Memory Story
        </p>

        {/* main title */}
        <h1 className="mt-10 text-5xl md:text-7xl font-light leading-tight text-white">
          For the girl
          <br />
          who changed
          <br />
          my ordinary days
        </h1>

        {/* subtitle */}
        <p className="mt-8 text-white/40 text-sm md:text-base">
          Some stories don’t need sound.
          <br />
          Just feeling.
        </p>

        {/* button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="
            mt-14
            px-10 py-3
            rounded-md
            bg-white
            text-black
            font-medium
            tracking-wide
            hover:bg-white/90
            transition
          "
        >
          next bb
        </motion.button>
      </motion.div>
    </motion.div>
  );
}