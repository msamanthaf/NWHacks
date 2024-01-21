"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const containerAnim = useAnimation();
  const imageAnim = useAnimation();
  const textAnim = useAnimation();
  const buttonContainerAnim = useAnimation();

  useEffect(() => {
    const animate = async () => {
      await containerAnim.start({ opacity: 1, y: 0 });
      await imageAnim.start({ opacity: 1, y: 0 });
      await textAnim.start({ opacity: 1, y: 0 });
      await buttonContainerAnim.start({ opacity: 1, y: 0 });
    };

    animate();
  }, [containerAnim, imageAnim, textAnim, buttonContainerAnim]);

  return (
    <div className="w-screen h-screen bg-[#EAF6FF] text-[#0D1F40] flex justify-center items-center flex-col gap-[20px]">
      <motion.div
        className="opacity-0 transform translate-y-8 transition-opacity duration-1000 ease-in-out"
        initial={{ opacity: 0, y: 50 }}
        animate={containerAnim}
      >
        <motion.div animate={imageAnim}>
          <Image alt={"logo"} src={"/logo.png"} width={221} height={221} />
        </motion.div>
      </motion.div>
      <motion.div
        className="flex justify-center items-center flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={textAnim}
      >
        <div className="text-lg font-">WELCOME TO</div>
        <div className="font-semibold text-4xl">Thirst Taps</div>
      </motion.div>
      <motion.div
        className="flex gap-4 flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={buttonContainerAnim}
      >
        <Link href="/login">
          <div className="bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
            Log in
          </div>
        </Link>
        <Link href="/signup">
          <div className="bg-white w-[244px] h-[60px] rounded-lg text-[#0D1F40] flex justify-center items-center font-semibold">
            Sign up
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
