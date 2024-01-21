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
      <div className=" text-base flex-col flex" style={{ gap: 10 }}>
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

      <Link href="/map" className="w-full flex justify-center">
        <div className=" bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
          Sign Up
        </div>
      </Link>
      <div className="flex justify-center items-center w-full flex-col">
        <div className="flex justify-center items-center w-full">
          <div
            style={{
              width: 122.82779693603516,
              height: 0,
              borderWidth: 2,
              borderColor: "rgba(215, 223, 237, 1.0)",
            }}
          />
          <div
            style={{
              width: 92.120849609375,
              fontSize: 14,
              fontWeight: "500",
              fontStyle: "normal",
              color: "#6A707C",
              margin: 5,
            }}
          >
            <text>or log in with</text>
          </div>
          <div
            style={{
              width: 122.82779693603516,
              height: 0,
              borderWidth: 2,
              borderColor: "rgba(215, 223, 237, 1.0)",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: 61.41389846801758,
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            borderWidth: 2,
            borderColor: "rgba(215, 223, 237, 1.0)",
          }}
          className="flex justify-center items-center"
        >
          <Image alt="google" src={"/google_icon.png"} width={30} height={30} />
        </div>
      </div>
      <div className="text-[#0D1F40] flex items-center justify-center">
        Already have an account? <Link href={'/login'} style={{fontWeight: 500}}>Login Now</Link>
      </div>
    </div>
  );
}
