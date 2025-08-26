import Image from "next/image";
import React from "react";

export default function SocialBtn({
  image,
  label,
  handleGoogleLogin,
}: {
  image: string;
  label: string;
  handleGoogleLogin?: (provider: string) => void;
}) {
  return (
    <button
      onClick={() => handleGoogleLogin?.('Google')}
      className="bg-[#E9EEFA] flex items-center gap-2 justify-center text-gray-900 px-[35px] lg:px-[25px] xl:px-[35px] py-[10px] rounded cursor-pointer"
    >
      <Image src={image} height={20} width={20} alt="Google Icon" />
      <span>{label}</span>
    </button>
  );
}
