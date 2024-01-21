import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const handleLogIn = () => {};

  return (
    <div className="w-screen h-screen bg-[#EAF6FF] text-[#0D1F40] flex justify-center items-center flex-col gap-[20px]">
      <Image alt={"logo"} src={"/logo.png"} width={221} height={221} />
      <div className=" flex justify-center items-center flex-col">
        <div className=" text-lg font-">WELCOME TO</div>
        <div className=" font-semibold text-4xl">NavUBC</div>
      </div>
      <div className="flex gap-4 flex-col">
        <Link href="/login">
          <div className=" bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
            Log in
          </div>
        </Link>
        <Link href="/signup">
          <div className=" bg-white w-[244px] h-[60px] rounded-lg text-[#0D1F40] flex justify-center items-center font-semibold">
            Sign up
          </div>
        </Link>
      </div>
    </div>
  );
}