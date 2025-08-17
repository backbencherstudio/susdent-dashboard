import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Activity() {
  return (
    <>
    {/* Recent Activity */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Recent Activity</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray3-bg">
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Activity</TableHead>
            <TableHead className="text-white">Content</TableHead>
            <TableHead className="text-white">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
            <TableCell>Today, 10:45 AM</TableCell>
            <TableCell>Watched movie</TableCell>
            <TableCell>Avengers: Endgame</TableCell>
            <TableCell>42 mins</TableCell>
          </TableRow>
          <TableRow className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
            <TableCell>Today, 10:45 AM</TableCell>
            <TableCell>Started watching</TableCell>
            <TableCell>Stranger Things S3E5</TableCell>
            <TableCell>18 mins</TableCell>
          </TableRow>
          <TableRow className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
            <TableCell>Today, 10:45 AM</TableCell>
            <TableCell>Watched movie</TableCell>
            <TableCell>Avengers: Endgame</TableCell>
            <TableCell>42 mins</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>

    {/* Statistic */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Statistic</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
         <p className="text-sm">Total Watch Time: <span className="font-medium">142 hours</span></p>
         <p className="text-sm">Favorite Genre: <span className="font-medium">Action</span></p>
         <p className="text-sm">Average Daily Usage: <span className="font-medium">1.2 hours</span></p>
         <p className="text-sm">Peak Usage Time: <span className="font-medium">8:00 PM - 10:00 PM </span></p>
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
