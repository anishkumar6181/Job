import { useGlobalContext } from "@/context/globalContext";
import React, { useState } from "react";
import { useJobsContext } from "@/context/jobsContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import formatCurrency from "@/utils/formatCurrency";

function JobSummary() {
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

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
    resetJobForm,
    applicationUrl,
  } = useGlobalContext();

  const { createJob } = useJobsContext();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   createJob({
  //     title: jobTitle,
  //     description: jobDescription,
  //     salaryType,
  //     jobType: activeEmploymentTypes,
  //     salary,
  //     location: `${location.address ? location.address + ", " : ""}${
  //       location.city ? location.city + ", " : ""
  //     }${location.country}`,
  //     skills,
  //     negotiable,
  //     tags,
  //     applicationUrl
  //   });

  //   resetJobForm();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);
    try {
      await createJob({
        title: jobTitle,
        description: jobDescription,
        salaryType,
        jobType: activeEmploymentTypes,
        salary,
        location: `${location.address ? location.address + ", " : ""}${
          location.city ? location.city + ", " : ""
        }${location.country}`,
        skills,
        negotiable,
        tags,
        applicationUrl, // Add this line
      });
      resetJobForm();
      router.push("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Job Summary</h2>

      <div className="grid gap-6">
        {/* Basic Information */}
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Basic Information
          </h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Job Title
                </label>
                <p className="font-medium">{jobTitle}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Location
                </label>
                <p className="font-medium">
                  {location.address && `${location.address}, `}
                  {location.city && `${location.city}, `}
                  {location.country}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Employment Type
                </label>
                <p className="font-medium">
                  {activeEmploymentTypes.join(", ")}
                </p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Salary</label>
                <p className="font-medium">
                  {formatCurrency(salary)} per {salaryType.toLowerCase()}
                  {negotiable && " (Negotiable)"}
                </p>
              </div>
            </div>

            {applicationUrl && (
              <div>
                <label className="text-sm text-muted-foreground">
                  Application URL
                </label>
                <p className="font-medium break-all">{applicationUrl}</p>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Job Description
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-muted-foreground">
              {jobDescription.replace(/<[^>]*>|&[^;]+;/g, "")}
            </p>
          </div>
        </div>

        {/* Skills & Requirements */}
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Skills & Tags
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Required Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        {/* <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-border hover:bg-muted 
                     transition-colors rounded-md text-muted-foreground"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPosting}
            className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md"
          >
            {isPosting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Posting Job...
              </span>
            ) : (
              "Post Job"
            )}
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default JobSummary;
