import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";


interface PaymentsData {
  id: number,
  date: string,
  txnId: string,
  amount: string,
  paymentMethod: string,
  status: string,
  invoice: string,
}

export default function Payments() {

  const paymentsData: PaymentsData[] = [
    {
      id: 1,
      date: "Today, 10:45 AM",
      txnId: "AMI-TXN-78945",
      amount: "$14.99",
      paymentMethod: "VISA **** 4242",
      status: "Pending",
      invoice: "invoiceLink",
    },
    {
      id: 2,
      date: "Today, 10:45 AM",
      txnId: "AMI-TXN-78945",
      amount: "$14.99",
      paymentMethod: "VISA **** 4242",
      status: "Complete",
      invoice: "invoiceLink",
    },
    {
      id: 3,
      date: "Today, 10:45 AM",
      txnId: "AMI-TXN-78945",
      amount: "$14.99",
      paymentMethod: "VISA **** 4242",
      status: "Complete",
      invoice: "invoiceLink",
    },
    {
      id: 4,
      date: "Today, 10:45 AM",
      txnId: "AMI-TXN-78945",
      amount: "$14.99",
      paymentMethod: "VISA **** 4242",
      status: "Complete",
      invoice: "invoiceLink",
    },
  ]

  return (
    <>
    {/* Payment History */}
    <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Payment History</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray3-bg">
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Transaction ID</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Payment Method</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            paymentsData.map((payment) => {
              return (
                <TableRow key={payment.id} className="text-[#A5A5AB] hover:bg-transparent border-gray3-bg">
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.txnId}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    {
                      payment.status == "Complete" ? <span className="text-[#2ECC71]">{payment.status}</span> : <span>{payment.status}</span>
                    }
                  </TableCell>
                  <TableCell>
                    <Link href={payment.invoice} target="_blank" className="text-primary-color underline">Invoice</Link>
                  </TableCell>
                </TableRow>
              )
            })
          }
         
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
