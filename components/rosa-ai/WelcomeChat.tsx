import { suggestions } from "@/utils/suggestion";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type WelcomeChatProps = {
  setSuggestion: Dispatch<SetStateAction<string>>;
};

export default function WelcomeChat({ setSuggestion }: WelcomeChatProps) {
  const [randomSuggestion, setRandomSuggestion] = useState<string[]>([]);
  const [isHoveringRosa, setIsHoveringRosa] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setRandomSuggestion(
      Array.from(
        { length: 3 },
        () => suggestions[Math.floor(Math.random() * suggestions.length)],
      ),
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className="relative mt-14"
        onHoverStart={() => setIsHoveringRosa(true)}
        onHoverEnd={() => setIsHoveringRosa(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-purple/20"
            style={{
              scale: 1.2 + i * 0.3,
              rotateX: i * 15,
              rotateY: currentTime.getSeconds() * 6 + i * 45,
            }}
            animate={{
              rotateZ: 360,
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              rotateZ: {
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
            }}
          />
        ))}

        <motion.div
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="https://cdn.ruangobat.id/statics/images/apoteker-rosa/APOTEKER-ROSA-7.webp"
            alt="apoteker rosa image"
            width={600}
            height={600}
            className="relative z-10 h-36 w-auto lg:h-40"
            priority
          />
        </motion.div>

        <motion.div
          className="via-blue/20 absolute inset-0 scale-150 rounded-full bg-gradient-to-r from-purple/20 to-purple/20 blur-xl"
          animate={{
            scale: isHoveringRosa ? [1.5, 2, 1.5] : [1.3, 1.7, 1.3],
            opacity: isHoveringRosa ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-purple/60"
            style={{
              left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 60}%`,
              top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 60}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              x: [0, Math.cos(i) * 15, 0],
              y: [0, Math.sin(i) * 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="grid -space-y-1 text-center">
        <p className="text-2xl font-black -tracking-wide text-purple">ROSA</p>
        <p className="text-2xl font-black -tracking-wide text-purple">
          (Ruang Obat Smart Assistant)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            icon: "💡",
            title: "Interaktif",
            desc: "Diskusi dua arah untuk pemahaman lebih baik",
          },
          {
            icon: "⚡",
            title: "Cepat",
            desc: "Respon real-time untuk semua pertanyaan",
          },
          {
            icon: "🤝",
            title: "Supportif",
            desc: "Bantu mempersiapkan ujian dan praktik farmasi",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="to-blue/5 flex items-start gap-2 rounded-xl border border-purple/10 bg-gradient-to-br from-purple/5 [padding:1rem_0.5rem]"
          >
            <div className="text-3xl">{feature.icon}</div>

            <div className="grid flex-1">
              <h3 className="font-extrabold text-purple">{feature.title}</h3>
              <p className="text-xs text-gray">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 text-center">
        <h2 className="text-lg font-extrabold text-black">
          Apa yang ingin kamu tanyakan?
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {randomSuggestion.map((suggestion, i) => (
            <button
              key={i}
              className="rounded-full bg-purple/10 text-sm font-medium text-purple transition-colors [padding:0.5rem_1rem] hover:bg-purple hover:text-white"
              onClick={() => setSuggestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
