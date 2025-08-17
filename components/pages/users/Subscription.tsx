import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Subscription() {
  return (
    <>
    {/* Current Plan */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Current Plan</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
         <p className="text-sm">Plan Name: <span className="font-medium">Most Popular</span></p>
         <p className="text-sm">Price: <span className="font-medium">$14.99/month</span></p>
         <p className="text-sm">Billing Cycle: <span className="font-medium">Monthly</span></p>
         <p className="text-sm">Start Date: <span className="font-medium">15 Mar 2023</span></p>
         <p className="text-sm">Next Billing Date: <span className="font-medium">15 Jul 2025</span></p>
         <p className="text-sm">Payment Method: <span className="font-medium">VISA **** 4242</span></p>
      </div>

    </div>

    {/* Registered Device */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Registered Devices (3)</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray3-bg">
            <TableHead className="text-white">Device</TableHead>
            <TableHead className="text-white">Type</TableHead>
            <TableHead className="text-white">Last Used</TableHead>
            <TableHead className="text-white">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
            <TableCell>iPhone 13 Pro</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Today, 10:45 AM</TableCell>
            <TableCell>New York, US</TableCell>
          </TableRow>
          <TableRow className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
            <TableCell>Samsung Galaxy Tab S7</TableCell>
            <TableCell>Tablet</TableCell>
            <TableCell>Yesterday, 8:30 PM</TableCell>
            <TableCell>New York, US</TableCell>
          </TableRow>
           <TableRow className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
            <TableCell>Chrome Browser</TableCell>
            <TableCell>Web</TableCell>
            <TableCell>2 days ago</TableCell>
            <TableCell>Boston, US</TableCell>
          </TableRow>
        </TableBody>
      </Table>

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
