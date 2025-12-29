import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";

// 1. Define the TypeScript type for your data
export type ActivityLog = {
    id: string;
    timestamp: string; // Using string ISO for date
    title: string;
    category: string;
    duration: string;
    uploadDate: string; // Matches your "Upload date" header
    status: "Approve" | "Reject";
};

export const columns: ColumnDef<ActivityLog>[] = [
    {
        header: "Date",
        accessorKey: "timestamp",
        cell: ({ row }) => (

            <p className="text-[#94a3b8] text-sm">{row.original.timestamp}</p>
        ),
    },
    {
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => (
            <p className="text-sm font-medium max-w-[250px] line-clamp-2 break-words overflow-hidden">
                {row.original.title}
            </p>
        ),
    },
    {
        header: "Category",
        accessorKey: "category",
        cell: ({ row }) => <p className="text-[#94a3b8] text-sm">{row.original.category}</p>,
    },
    {
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => <p className="text-[#94a3b8] text-sm">{row.original.duration}</p>,
    },
    {
        header: "Upload date",
        accessorKey: "uploadDate",
        cell: ({ row }) => <p className="text-[#94a3b8] text-sm">{row.original.uploadDate}</p>,
    },
    {
        header: "Actions",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.original.status;
            // Conditional styling: Reject is red, Approve is the same gray as other text
            return (
                <p className={`text-sm font-medium ${status === "Reject" ? "text-[#D4183D]" : "text-green-400/80"}`}>
                    {status}
                </p>
            );
        },
    },
];

const activityData: ActivityLog[] = [
    {
        id: "1",
        timestamp: "Today, 10:45 AM",
        title: "The Midnight Heist - Episode 4",
        category: "Web series",
        duration: "42 mins",
        uploadDate: "20-04-25",
        status: "Approve",
    },
    {
        id: "2",
        timestamp: "Today, 09:15 AM",
        title: "Understanding React Server Components",
        category: "Education",
        duration: "1h 32m",
        uploadDate: "20-04-25",
        status: "Approve",
    },
    {
        id: "3",
        timestamp: "Yesterday, 8:30 PM",
        title: "Top 10 Travel Destinations in 2025",
        category: "Travel",
        duration: "1h 02m",
        uploadDate: "19-04-25",
        status: "Approve",
    },
    {
        id: "4",
        timestamp: "Yesterday, 04:20 PM",
        title: "Unreleased Music Video (Draft) - Long Title Test",
        category: "Music",
        duration: "1h 42m",
        uploadDate: "19-04-25",
        status: "Reject",
    },
    {
        id: "5",
        timestamp: "27 Dec, 11:00 AM",
        title: "Cooking with Chef G - Italian Pasta",
        category: "Lifestyle",
        duration: "1h 42m",
        uploadDate: "18-04-25",
        status: "Reject",
    },
];
 const ActiveVideoTable = () => {
    return <>
        <DataTable tableTitle="All Activity" columns={columns} data={activityData} />
    </>
}

export default ActiveVideoTable
