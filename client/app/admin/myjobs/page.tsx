"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MyJob from "@/Components/JobItem/MyJob";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditJobModal from "@/Components/EditJobModal";
import AdminHeader from "@/Components/admin/AdminHeader";
import AdminFooter from "@/Components/admin/AdminFooter";

// function page() {
//   const { userJobs, jobs } = useJobsContext();
//   const { isAuthenticated, loading, userProfile } = useGlobalContext();

//   const { adminJobs, fetchAdminJobs } = useJobsContext();
// //   const { isAuthenticated, loading } = useGlobalContext();
// //   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push("/admin/login");
//       return;
//     }
//     fetchAdminJobs();
//   }, [isAuthenticated, loading]);

//   if (loading) return null;

//   const [activeTab, setActiveTab] = React.useState("posts");

//   const userId = userProfile?._id;

//   const router = useRouter();

//   // Redirect to login if not authenticated
// //   useEffect(() => {
// //     if (!loading && !isAuthenticated) {
// //       router.push("http://localhost:8000/login");
// //     }
// //   }, [isAuthenticated]);

//   const likedJobs = jobs.filter((job: Job) => {
//     return job.likes.includes(userId);
//   });

//   if (loading) {
//     return null;
//   }
  
//   interface MyJobProps {
//     job: Job;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <AdminHeader />

//       <div className="mt-8 w-[90%] mx-auto flex flex-col">
//       <h1 className="text-2xl font-bold mb-6 text-foreground">Posted Jobs</h1>

//         {/* <div className="self-center flex items-center gap-6">
//           <button
//             className={`border px-8 py-2 rounded-full font-medium transition-colors
//           ${
//             activeTab === "posts"
//               ? "border-transparent bg-primary text-primary-foreground"
//               : "border-border text-foreground hover:bg-muted"
//           }`}
//             onClick={() => setActiveTab("posts")}
//           >
//             My Job Posts
//           </button>
//           <button
//             className={`border border-gray-400 px-8 py-2 rounded-full font-medium
//           ${
//             activeTab === "likes"
//               ? "border-transparent bg-[#7263F3] text-white"
//               : "border-gray-400"
//           }`}
//             onClick={() => setActiveTab("likes")}
//           >
//             Liked Jobs
//           </button>
//         </div>

//         {activeTab === "posts" && userJobs.length === 0 && (
//           <div className="mt-8 flex items-center">
//             <p className="text-2xl font-bold text-foreground">No job posts found.</p>
//           </div>
//         )}

//         {activeTab === "likes" && likedJobs.length === 0 && (
//           <div className="mt-8 flex items-center">
//             <p className="text-2xl font-bold text-foreground">No liked jobs found.</p>
//           </div>
//         )} */}
// {/* 
//         <div className="my-8 grid grid-cols-2 gap-6">
//           {activeTab === "posts" &&
//             userJobs.map((job: Job) => <MyJob key={job._id} job={job} closeModal={() => {}} />)}

//           {activeTab === "likes" &&
//             likedJobs.map((job: Job) => <MyJob key={job._id} job={job} closeModal={() => {}} />)}
//         </div> */}
//                 {adminJobs.length === 0 ? (
//           <div className="mt-8 flex items-center">
//             <p className="text-2xl font-bold text-foreground">No job posts found.</p>
//           </div>
//         ) : (
//         <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {adminJobs.map((job: Job) => (
//               <MyJob key={job._id} job={job} closeModal={() => fetchAdminJobs()} />
//             ))}
//         </div>
//         )}

//       </div>
//       {/* <AdminLogin /> */}

//       <AdminFooter />
//     </div>
//   );
// }



function page() {
  const { userJobs, jobs, adminJobs, fetchAdminJobs } = useJobsContext();
  const { isAuthenticated, loading, userProfile } = useGlobalContext();
  const router = useRouter();
  const userId = userProfile?._id;

  const [activeTab, setActiveTab] = useState("posts");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/admin/login");
        return;
      }
      fetchAdminJobs();
    }
  }, [isAuthenticated, loading, router, fetchAdminJobs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="mt-8 w-[90%] mx-auto flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Posted Jobs</h1>

        {adminJobs?.length === 0 ? (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold text-foreground">No job posts found.</p>
          </div>
        ) : (
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminJobs.map((job: Job) => (
              <MyJob 
                key={job._id} 
                job={job} 
                closeModal={fetchAdminJobs} 
              />
            ))}
          </div>
        )}
      </div>
      <AdminFooter />
    </div>
  );
}




export default page;
