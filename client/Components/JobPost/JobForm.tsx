"use client";
import { useGlobalContext } from "@/context/globalContext";
import React, { useEffect, useState } from "react";
import JobTitle from "./JobTitle";
import JobDetails from "./JobDetails";
import JobSkills from "./JobSkills ";
import JobLocation from "./JobLocation";
import { useJobsContext } from "@/context/jobsContext";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import JobSummary from "./JobSummary";
import toast from "react-hot-toast";

function JobForm() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const {
    jobTitle,
    jobDescription,
    salaryType,
    activeEmploymentTypes,
    salary,
    location,
    skills,
    negotiable,
    tags,
    applicationUrl,
    resetJobForm,
  } = useGlobalContext();
  // const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const { createJob, createAdminJob } = useJobsContext();

  const sections = ["About", "Job Details", "Skills", "Location", "Summary"];
  const [currentSection, setCurrentSection] = React.useState(sections[0]);

  // Add these types at the top of JobForm.tsx
  type jobData = {
    title: string;
    description: string;
    salaryType: string;
    employmentType: string[];
    salary: number;
    location: {
      country: string;
      city: string;
      address: string;
    };
    skills: string[];
    negotiable: boolean;
    tags: string[];
    applicationUrl: string;
  };

  type ApiResponse = {
    success: boolean;
    job?: any;
    message?: string;
  };

  // Add this to your JobForm component
  useEffect(() => {
    // Check if all required fields are filled before allowing navigation to summary
    const isFormComplete = () => {
      return (
        jobTitle &&
        jobDescription &&
        activeEmploymentTypes.length > 0 &&
        salary > 0 &&
        location.country &&
        skills.length > 0
      );
    };

    if (isMounted && !isFormComplete()) {
      router.push("/admin/post");
    }
  }, [
    isMounted,
    router,
    jobTitle,
    jobDescription,
    activeEmploymentTypes,
    salary,
    location.country,
    skills,
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const renderStages = () => {
    switch (currentSection) {
      case "About":
        return <JobTitle />;
      case "Job Details":
        return <JobDetails />;
      case "Skills":
        return <JobSkills />;
      case "Location":
        return <JobLocation />;
      case "Summary": // Add this case
        return <JobSummary />;
      default:
        return null;
    }
  };

  const getCompletedColor = (section: string) => {
    switch (section) {
      case "About":
        return jobTitle && activeEmploymentTypes.length > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Job Details":
        return jobDescription && salary > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Skills":
        return skills.length && tags.length > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Location":
        return location.address || location.city || location.country
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };
  // resetJobForm();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  

    try {
      // Validate required fields
      if (!jobTitle || !jobDescription || !salary || !location.country) {
        toast.error("Please fill in all required fields");
        return;
      }

      const jobData = {
        title: jobTitle,
        description: jobDescription,
        salaryType,
        employmentType: activeEmploymentTypes,
        salary: Number(salary),
        location: {
          country: location.country,
          city: location.city || "",
          address: location.address || "",
        },
        skills: skills.length ? skills : [],
        negotiable,
        tags: tags.length ? tags : [],
        applicationUrl: applicationUrl || "",
      };

      const promise = isAdminRoute
        ? createAdminJob(jobData)
        : createJob(jobData);

      await toast.promise(promise, {
        loading: "Creating job...",
        success: (result) => {
          
            resetJobForm();
            router.push(isAdminRoute ? "/admin/myjobs" : "/myjobs");
         
          return "Job created successfully!";
        },
        error: (err) => err.message || "Failed to create job",
      });
    } catch (error: any) {
      console.error("Job creation error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } 
  };

  return (
    <div className="w-full flex gap-6">
      <div className="self-start w-[10rem] flex flex-col bg-card rounded-md shadow-sm overflow-hidden">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`pl-4 py-3 relative flex self-start items-center gap-2 font-medium 
                ${
                  currentSection === section
                    ? "text-primary"
                    : "text-muted-foreground"
                }
                `}
            onClick={() => handleSectionChange(section)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center border border-border justify-center
                ${
                  currentSection === section ? " text-primary-foreground" : ""
                } ${getCompletedColor(section)}`}
            >
              {index + 1}
            </span>
            {section}
            {currentSection === section && (
              <span className="w-1 h-full absolute left-0 top-0 bg-[#7263F3] rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      <form
        action=""
        className="p-6 flex-1 bg-card rounded-lg self-start"
        onSubmit={handleSubmit}
      >
        {renderStages()}

        <div className="flex justify-end gap-4 mt-4">
          {currentSection !== "Summary" && (
            <button
              type="button"
              className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              onClick={() => {
                const currentIndex = sections.indexOf(currentSection);

                setCurrentSection(sections[currentIndex + 1]);
              }}
            >
              Next
            </button>
          )}

          {currentSection === "Summary" && (
            <button
              type="submit"
              className="self-end px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
              Post Job
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default JobForm;
