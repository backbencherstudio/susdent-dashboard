import Image from "next/image";

export default function SocialBtn({image, label}: {image: string, label: string}) {
  return (
    <button className="bg-[#E9EEFA] flex items-center gap-2 justify-center text-gray-900 px-[35px] lg:px-[25px] xl:px-[35px] py-[10px] rounded cursor-pointer">
        <Image src={image} height={20} width={20} alt="Google Icon" />
        <span>{label}</span>
    </button>
  )
}
