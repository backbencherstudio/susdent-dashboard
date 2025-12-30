import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface Payment {
    date: string;
    transactionId: string;
    amount: string;
    status: string;
    paymentMethod: string;
    action: string;
}

const paymentColumns: ColumnDef<Payment>[] = [
    {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => (
            <p className="text-[#94a3b8] text-sm">{row.original.date}</p>
        ),
    },
    {
        header: "Transaction ID",
        accessorKey: "transactionId",
        cell: ({ row }) => (
            <p className="text-[#94a3b8] text-sm">{row.original.transactionId}</p>
        ),
    },
    {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }) => (
            <p className="text-[#94a3b8] text-sm">{row.original.amount}</p>
        ),
    },
    {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        cell: ({ row }) => (
            <p className="text-[#94a3b8] text-sm">{row.original.paymentMethod}</p>
        ),
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
            /* Using the green color from your screenshot */
            <p className="text-[#10b981] text-sm font-medium">{row.original.status}</p>
        ),
    },
    {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
            /* Purple and underlined per the UI */
            <button className="text-[#7A24BC] text-sm underline hover:text-[#6a1fa3] transition-colors">
                {row.original.action}
            </button>
        ),
    },
];

const paymentData: Payment[] = [
    {
        date: "Today, 10:45 AM",
        transactionId: "AMI-TXN-78945",
        amount: "$14.99",
        paymentMethod: "VISA **** 4242",
        status: "Completed",
        action: "Invoice",
    },
    {
        date: "Today, 10:45 AM",
        transactionId: "AMI-TXN-78945",
        amount: "$14.99",
        paymentMethod: "VISA **** 4242",
        status: "Completed",
        action: "Invoice",
    },
    {
        date: "Yesterday, 8:30 PM",
        transactionId: "AMI-TXN-78945",
        amount: "$14.99",
        paymentMethod: "VISA **** 4242",
        status: "Completed",
        action: "Invoice",
    },
    {
        date: "Yesterday, 8:30 PM",
        transactionId: "AMI-TXN-78945",
        amount: "$9.99",
        paymentMethod: "Mastercard **** 5678",
        status: "Completed",
        action: "Invoice",
    },
];

const PaymentsTable = () => {
    return (
        <div className="w-full">

            <DataTable tableTitle="Payments" columns={paymentColumns} data={paymentData} />
        </div>
    );
};

export default PaymentsTable;