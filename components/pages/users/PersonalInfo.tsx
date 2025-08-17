import { Textarea } from "@/components/ui/textarea";

export default function PersonalInfo() {
  return (
    <>
    {/* basic information */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Basic Information</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
         <p className="text-sm">Username: <span className="font-medium">johndoe</span></p>
         <p className="text-sm">Email: <span className="font-medium">john.doe@example.com</span> <small className="text-[#2ECC71] text-xs">Verified</small></p>
         <p className="text-sm">Phone Number: <span className="font-medium">+1 (555) 123-4567</span></p>
         <p className="text-sm">Date of Birth: <span className="font-medium">15 June 1985</span></p>
         <p className="text-sm">Gender: <span className="font-medium">Male</span></p>
         <p className="text-sm">Country: <span className="font-medium">United States</span></p>
      </div>

    </div>

    {/* Account Security */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Account Secuirity</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
         <p className="text-sm">Last Login: <span className="font-medium">Today, 10:45 AM</span></p>
         <p className="text-sm">Last Login IP: <span className="font-medium">Last Login IP: 192.168.1.45</span></p>
         <p className="text-sm">Password Last Changed: <span className="font-medium">1 month ago</span></p>
      </div>

    </div>

    {/* Preferences */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Preferences</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
         <p className="text-sm">Language: <span className="font-medium">English (US)</span></p>
         <p className="text-sm">Content Preferences: <span className="font-medium">Action, Sci-Fi, Drama</span></p>
         <p className="text-sm">Notification Settings: <span className="font-medium">Email & Push</span></p>
         <p className="text-sm">Auto-play: <span className="font-medium">Enabled</span></p>
      </div>

    </div>

    {/* Notes */}
    <div className="bg-secondary-bg p-4 rounded-sm">
        <h1 className="text-base font-medium mb-4">Admin Notes</h1>

        <Textarea className="h-[100px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Customer contacted support on 10/03/2025 regarding playback issues. Issue resolved by clearing cache"/>
    </div>

    <div className="flex justify-end">
        <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Save Notes</button>
    </div>

    </>
  )
}
