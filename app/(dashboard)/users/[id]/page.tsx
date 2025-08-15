import BannedIcon from "@/components/icons/BannedIcon";
import Calendar from "@/components/icons/Calendar";
import Clock from "@/components/icons/Clock";
import EditIcons from "@/components/icons/EditIcons";
import IdCard from "@/components/icons/IdCard";
import TrashBin from "@/components/icons/TrashBin";
import Video from "@/components/icons/Video";
import Image from "next/image";
import Link from "next/link";

export default function UserDetails({params}: {params: {id: number}}) {
  const id = params.id;
  return (
   <>
    {/* Header */}
    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <h1 className="text-base font-medium">User Details</h1>

        <div className="flex flex-wrap items-center gap-4">
            <Link href='#' className="flex items-center gap-2 px-[14px] py-[7px] bg-primary-color text-white rounded">
              <EditIcons/>
              <span className="text-sm font-normal">Edit</span>
            </Link>

            <Link href='#' className="flex items-center gap-2 px-[14px] py-[7px] bg-[#F39C12] text-white rounded">
              <BannedIcon />
              <span className="text-sm font-normal">Suspend</span>
            </Link>

            <Link href='#' className="flex items-center gap-2 px-[14px] py-[7px] bg-[#E63946] text-white rounded">
              <TrashBin />
              <span className="text-sm font-normal">Delete</span>
            </Link>
        </div>
    </div>

    {/* Profile Era */}
    <div className="bg-[#131824] rounded-sm p-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
      <div>
        <Image src='/images/user-profile-2.svg' height={300} width={300} alt="User Profile" className="h-[100px] min-w-[100px] w-[100px] rounded-full" />
      </div>
      <div>
        <h1 className="text-base font-semibold">John Doe</h1>
        <div className="my-4 flex items-center gap-4">
            <p className="text-[#2ECC71] text-xs">Active</p>
            <span className="text-xs px-[10px] py-[5px] bg-[#1D1A33] rounded-[2px]">Premium Member</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
                <IdCard className="w-6 h-6"/>
                <p className="text-sm">ID:AMI-USER-78945</p>
            </div>

            <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6"/>
                <p className="text-sm">Joined: 15 Mar 2023</p>
            </div>

            <div className="flex items-center gap-2">
                <Clock className="w-6 h-6"/>
                <p className="text-sm">Last active: 2 hours ago</p>
            </div>

            <div className="flex items-center gap-2">
                <Video className="w-6 h-6"/>
                <p className="text-sm">Total watch time: 142 hrs</p>
            </div>
        </div>
      </div>
    </div>
   
   </>
  )
}
