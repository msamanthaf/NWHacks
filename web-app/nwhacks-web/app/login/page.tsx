import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function LogIn() {

  return (
    <div className="w-full h-screen bg-[#FFFF] text-[#0D1F40] flex flex-col gap-[20px] px-[10%] justify-center">
      {/* Header */}
      <div className="flex">
        <Image alt={"logo"} src={"/logo.png"} width={67} height={67} />
        <div className=" flex justify-center items-start flex-col ml-2">
          <div className=" text-base">WELCOME TO</div>
          <div className=" font-semibold text-3xl">NavUBC</div>
        </div>
      </div>

      {/* Text Fields */}
      <div className=" text-base flex-col gap-[12]">
        <div>
          Email
          <TextField fullWidth placeholder="Email" />
        </div>
        <div>
          Password
          <TextField fullWidth placeholder="Password"/>
        </div>
      </div>

      <Link href="/map" className="w-full flex justify-center">
          <div className=" bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
            Log in
          </div>
        </Link>
    </div>
  );
}