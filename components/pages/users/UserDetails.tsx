// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";
// import PersonalInfo from "@/components/pages/users/PersonalInfo";
// import Subscription from "@/components/pages/users/Subscription";
// import Payments from "@/components/pages/users/Payments";
// import UserDetTop from "@/components/pages/users/UserDetTop";
// import { useQuery } from "@tanstack/react-query";
// import { privateAxios } from "@/components/axiosInstance/axios";
// import Loader from "@/components/reusable/Loader";
// import { error } from "console";
// import { useParams } from "next/navigation";

// // interface UserDetailsProps {
// //   id: string;
// // }

// export default function UserDetails() {

  
  
//   // console.log(id);

//   const id = "cmm1f55zl00yjl0d6sob4dk58";
 

//   const { data: userDet, isLoading, error } = useQuery({
//     queryKey: ["userDet", id],
//     queryFn: async () => {
//       const res = await privateAxios.get(`/admin/user/users/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loader />;
//   if (error) return <div>Error: {error.message}</div>;  

//   const tabs = [
//     { name: "Personal Info", value: "personal-info" },
//     { name: "Subscription", value: "subscription" },
//     { name: "Payments", value: "payments" },
//   ];

//   const [activeTab, setActiveTab] = useState(tabs[0].value);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <>
//       <UserDetTop id={id} userDet={userDet} />

//       <div className="my-4">
//         <Tabs defaultValue="personal-info" className="usersTab">
//           <TabsList className="bg-transparent w-full sm:w-fit overflow-x-auto tabs_wrapper">
//             {tabs.map((tab, index) => (
//               <TabsTrigger
//                 key={index}
//                 value={tab.value}
//                 onClick={() => setActiveTab(tab.value)}
//                 className={`text-xs sm:text-sm font-medium whitespace-nowrap border-0 border-b transition-all duration-300 text-white cursor-pointer ${
//                   activeTab === tab.value
//                     ? "border-primary-color"
//                     : "border-transparent"
//                 }`}
//                 style={{ padding: "10px 16px", borderRadius: "0" }}
//               >
//                 {tab.name}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           <div className="mt-2">
//             <TabsContent value="personal-info" className="space-y-4">
//               <PersonalInfo userDet={userDet} />
//             </TabsContent>
//             <TabsContent value="subscription" className="space-y-4">
//               <Subscription />
//             </TabsContent>
//             <TabsContent value="payments" className="space-y-4">
//               <Payments />
//             </TabsContent>
//           </div>
//         </Tabs>
//       </div>
//     </>
//   );
// }
