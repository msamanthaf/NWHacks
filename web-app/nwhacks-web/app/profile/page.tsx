import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="bg-[#FFFF] flex w-screen h-screen flex-col p-[15]">
      <Link href="/" className="w-full flex justify-center m-[20]">
        <div
          className=" bg-[#0D1F40] w-[100px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold "
          style={{ position: "absolute", right: 10, top: 20 }}
        >
          Back
        </div>
      </Link>
      <div
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#0D1F40",
          padding: 30,
        }}
      >
        User Profile
      </div>
      <div className="w-[100%] h-[60%] flex justify-center items-center flex-col">
        <Image
          src={"/profile_image.png"}
          alt="profile"
          width={215}
          height={466}
        />
      </div>
    </div>
  );
}
