import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="w-screen h-screen bg-[#FFFF] text-[#0D1F40] flex flex-col gap-[20px] px-[10%] justify-center">
      {/* Header */}
      <div className="flex">
        <Image alt={"logo"} src={"/logo.png"} width={67} height={67} />
        <div className=" flex justify-center items-start flex-col ml-2">
          <div className=" text-base">WELCOME TO</div>
          <div className=" font-semibold text-3xl">Thirst Taps</div>
        </div>
      </div>

      <div className="text-[#0D1F40] font-semibold text-2xl">
        Please register to get started
      </div>

      {/* Text Fields */}
      <div className=" text-base flex-col flex" style={{gap: 10}}>
        <div>
          Name
          <TextField fullWidth placeholder="Name" />
        </div>
        <div>
          Email
          <TextField fullWidth placeholder="Email" />
        </div>
        <div>
          Password
          <TextField fullWidth placeholder="Password" />
        </div>
        <div>
          Confirm Password
          <TextField fullWidth placeholder="Confirm Password" />
        </div>
      </div>

      <Link href="/login" className="w-full flex justify-center">
        <div className=" bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
          Sign Up
        </div>
      </Link>
    </div>
  );
}
