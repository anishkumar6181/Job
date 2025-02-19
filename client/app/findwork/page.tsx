"use client";
import Filters from "@/Components/Filters";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import JobCard from "@/Components/JobItem/JobCard";
import SearchForm from "@/Components/SearchForm";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { grip, list, table } from "@/utils/Icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AdminLogin from "@/Components/AdminLogin";

function page() {
  const { jobs, filters, getJobs, loading, searchQuery  } = useJobsContext();
  const [columns, setColumns] = useState(2);
  const [mounted, setMounted] = useState(false);

  // Move useMemo to the top level with other hooks
  const filteredJobs = React.useMemo(() => {
    if (!jobs) return [];
    
    return    jobs.filter((job: Job) => {
            
              const matchesSearch = (
                (!searchQuery.title || job.title.toLowerCase().includes(searchQuery.title.toLowerCase())) &&
                (!searchQuery.location || 
                  (job.location?.country?.toLowerCase().includes(searchQuery.location.toLowerCase()) ||
                   job.location?.city?.toLowerCase().includes(searchQuery.location.toLowerCase()))) &&
                (!searchQuery.tags || job.tags?.some(tag => 
                  tag.toLowerCase().includes(searchQuery.tags.toLowerCase())))
              );
        
              if (!matchesSearch) return false;
      // Then apply checkbox filters
      if (filters.fullTime || filters.partTime || filters.contract || filters.internship) {
        const jobTypeFilters = [
          { enabled: filters.fullTime, type: "Full Time" },
          { enabled: filters.partTime, type: "Part Time" },
          { enabled: filters.contract, type: "Contract" },
          { enabled: filters.internship, type: "Internship" },
        ];

        const hasMatchingJobType = jobTypeFilters.some(
          filter => filter.enabled && job.employmentType?.includes(filter.type)
        );

        if (!hasMatchingJobType) return false;
      }
      // Apply tag filters
      if (filters.fullStack || filters.backend || filters.devOps || filters.uiUx) {
        const tagFilters = [
          { enabled: filters.fullStack, tag: "Full Stack" },
          { enabled: filters.backend, tag: "Backend" },
          { enabled: filters.devOps, tag: "DevOps" },
          { enabled: filters.uiUx, tag: "UI/UX" },
        ];

        const hasMatchingTag = tagFilters.some(
          filter => filter.enabled && job.tags?.includes(filter.tag)
        );

        if (!hasMatchingTag) return false;
      }

            if (filters.minSalary || filters.maxSalary) {
              const salary = Number(job.salary);
              const minSalary = filters.minSalary || 0;
              const maxSalary = filters.maxSalary || Infinity;
              
              if (salary < minSalary || salary > maxSalary) return false;
            }
      
            return true;
          });
        }, [jobs, filters, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getJobs(); // Refresh jobs with current search params
  };

  useEffect(() => {
    setMounted(true);
    if (typeof getJobs === 'function') {
      getJobs();
    }
  }, [getJobs]);

  const toggleGridColumns = () => {
    setColumns((prev) => (prev === 2 ? 1 : 2));
  };

  const getIcon = () => {
    return columns === 2 ? table : list;
  };

  const isAdminJob = (job: Job) => job.isAdminPost === true;

  // Don't render anything until client-side
  if (!mounted) return null;
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <p className="text-xl text-foreground">Loading jobs...</p>
  //     </div>
  //   );
  // }

  // ... rest of your component code ...

  // interface SearchFormProps {
  //   onSubmit: (e: React.FormEvent) => void;
  // }


  return (
    <main className="bg-background min-h-screen">
      <Header />

      <div className="relative px-16 bg-muted overflow-hidden">
        <h1 className="py-8 text-foreground font-bold text-3xl">
          Find Your Next Job Here
        </h1>

        <div className="pb-8 relative z-10">
          <SearchForm  onSubmit={handleSearch}/>
        </div>

        <Image
          src="/woman-on-phone.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path w-[15rem] absolute z-0 top-[0] right-[10rem] h-full object-cover"
        />

        <Image
          src="/team.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path-2 rotate-6 w-[15rem] absolute z-0 top-[0] right-[32rem] h-full object-cover"
        />
      </div>

      {/* <div className="w-[90%] mx-auto mb-14">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-foreground py-8">Recent Jobs</h2>

          <button
            onClick={toggleGridColumns}
            className="flex items-center gap-4 border border-border px-8 py-2 rounded-full font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span>
              {columns === 2 ? "Table View" : "List View"}
            </span>
            <span className="text-lg">{getIcon()}</span>
          </button>
        </div>

        <div className="flex gap-8">
          <Filters />

          <div
            className={`self-start flex-1 grid gap-8 ${
              columns === 2 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
              {jobs.length > 0 ? (
              <div className="bg-muted">
                {filetredJobs.length > 0 ? (
                  filetredJobs.map((job: Job) => (
                    <div key={job._id} className="relative">
                      <JobCard job={job} />
                      {isAdminJob(job) && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Admin Post
                          </span>
                        </div>
                      )}
                    </div>
                  ))
    ) : (
      <div className="mt-1 flex items-center">
      <p className="text-2xl font-bold text-foreground">
        No matching jobs found!
      </p>
    </div>
  )}
</div>
            ) : (
              <div className="mt-1 flex items-center">
                <p className="text-2xl font-bold text-foreground">
                  No Jobs Found!
                </p>
              </div>
            )}
          </div>
        </div>
      </div> */}

      <div className="w-[90%] mx-auto mb-14">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-foreground py-8">
            Recent Jobs
          </h2>
          <button
            onClick={toggleGridColumns}
            className="flex items-center gap-4 border border-border px-8 py-2 rounded-full font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span>{columns === 2 ? "Table View" : "List View"}</span>
            <span className="text-lg">{getIcon()}</span>
          </button>
        </div>

        <div className="flex gap-8">
          <Filters />
          <div
            className={`self-start flex-1 grid gap-8 ${
              columns === 2 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {!jobs?.length ? (
              <div className="mt-1 flex items-center">
                <p className="text-2xl font-bold text-foreground">
                  No Jobs Found!
                </p>
              </div>
            ) : !filteredJobs.length ? (
              <div className="mt-1 flex items-center">
                <p className="text-2xl font-bold text-foreground">
                  No matching jobs found!
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredJobs.map((job: Job) => (
                  <div key={job._id} className="relative">
                    <JobCard job={job} />
                    {isAdminJob(job) && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Admin Post
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default page;
