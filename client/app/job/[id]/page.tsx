"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import JobCard from "@/Components/JobItem/JobCard";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";

import { formatDates } from "@/utils/fotmatDates";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";
import formatCurrency from "@/utils/formatCurrency";

function page() {
  const { jobs, likeJob, applyToJob } = useJobsContext();
  const { userProfile, isAuthenticated } = useGlobalContext();
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [isLiked, setIsLiked] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);

  const job = jobs.find((job: Job) => job._id === id);
  const otherJobs = jobs.filter((job: Job) => job._id !== id);

  useEffect(() => {
    if (job) {
      setIsApplied(job.applicants.includes(userProfile._id));
    }
  }, [job, userProfile._id]);

  useEffect(() => {
    if (job) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job, userProfile._id]);

  if (!job) return null;

  const {
    title,
    location,
    description,
    salary,
    createdBy,
    applicants,
    jobType,
    createdAt,
    salaryType,
    negotiable,
    applicationUrl,
  } = job;

  const name = createdBy?.name || 'Anonymous';
  const profilePicture = createdBy?.profilePicture || '/user.png';

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };


  const formatLocation = (location: any) => {
    if (!location) return 'Location not specified';
    const { country, city, address } = location;
    return [city, country].filter(Boolean).join(', ') || country || 'Location not specified';
  };


  return (
    <main className="bg-background min-h-screen">
      <Header />

      <div className="p-8 mb-8 mx-auto w-[90%] rounded-md flex gap-8">
        <div className="w-[26%] flex flex-col gap-8">
          <JobCard activeJob job={job} />

          {otherJobs.map((job: Job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>

        <div className="flex-1 bg-background border border-border p-6 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 relative overflow-hidden rounded-md flex items-center justify-center bg-muted">
                  <Image
                    src={profilePicture || "/user.png"}
                    alt={name || "User"}
                    width={45}
                    height={45}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <p className="font-bold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground">Recruiter</p>
                </div>
              </div>
              <button
                className={`text-2xl  ${
                  isLiked ? "text-primary" : "text-muted-foreground"
                }hover:text-primary transition-colors`}
                onClick={() => {
                  isAuthenticated
                    ? handleLike(job._id)
                    : router.push("http://localhost:8000/login");
                }}
              >
                {isLiked ? bookmark : bookmarkEmpty}
              </button>
            </div>

            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            <div className="flex gap-4 items-center">
              <p className="text-muted-foreground">{formatLocation(location)}</p>
            </div>

            <div className="mt-2 flex gap-4 justify-between items-center">
              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/10 dark:bg-green-500/20 rounded-xl text-foreground">
                <span className="text-sm text-muted-foreground">Salary</span>

                <span>
                  <span className="font-bold">
                    {formatCurrency(salary)}
                  </span>
                  <span className="font-medium text-muted-foreground text-lg">
                    /
                    {salaryType
                      ? `${
                          salaryType === "Yearly"
                            ? "pa"
                            : salaryType === "Monthly"
                            ? "pcm"
                            : salaryType === "Weekly"
                            ? "pw"
                            : "ph"
                        }`
                      : ""}
                  </span>
                </span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl text-foreground">
                <span className="text-sm">Posted</span>
                <span className="font-bold">{formatDates(createdAt)}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl text-foreground">
                <span className="text-sm">Applicants</span>
                <span className="font-bold">{applicants.length}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl text-foreground">
                <span className="text-sm">Job Type</span>
                <span className="font-bold">{jobType[0]}</span>
              </p>
            </div>

            <h2 className="font-bold text-2xl mt-2 text-foreground">
              Job Description
            </h2>
          </div>

          <div className="wysiwyg mt-2 text-foreground">
            {description.replace(/<[^>]*>|&[^;]+;/g, "")}
          </div>
        </div>

        <div className="w-[26%] flex flex-col gap-8">
          {/* <button
            className={`text-primary-foreground py-4 rounded-full transition-colors ${
              isApplied ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
            }`}
            onClick={() => {
              if (isAuthenticated) {
                if (!isApplied) {
                  applyToJob(job._id);
                  setIsApplied(true);
                } else {
                  toast.error("You have already applied to this job");
                }
              } else {
                router.push("http://localhost:8000/login");
              }
            }}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button> */}

          <button
            className={`text-primary-foreground py-4 rounded-full transition-colors ${
              isApplied
                ? "bg-green-500 hover:bg-green-600"
                : "bg-primary hover:bg-primary/90"
            }`}
            onClick={() => {
              if (applicationUrl) {
                // If there's an application URL, redirect directly without auth check
                window.open(applicationUrl, "_blank");
              } else {
                // Only require authentication for internal applications
                if (isAuthenticated) {
                  if (!isApplied) {
                    applyToJob(job._id);
                    setIsApplied(true);
                    toast.success("Application submitted successfully!");
                  } else {
                    toast.error("You have already applied to this job");
                  }
                }
              }
            }}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>

          <div className="p-6 flex flex-col gap-2 bg-background border border-border rounded-md">
            <h3 className="text-lg font-semibold text-foreground">
              Other Information
            </h3>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-bold">Posted:</span>{" "}
                {formatDates(createdAt)}
              </p>

              <p>
                <span className="font-bold">Salary negotiable: </span>
                <span
                  className={`${
                    negotiable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {negotiable ? "Yes" : "No"}
                </span>
              </p>

              <p>
                <span className="font-bold">Location:</span> {formatLocation(location)}
              </p>

              <p>
                <span className="font-bold">Job Type:</span> {jobType[0]}
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-2 bg-background border border-border rounded-md">
            <h3 className="text-lg font-semibold text-foreground">Tags</h3>
            <p className="text-muted-foreground">
              Other relevant tags for the job position.
            </p>

            <div className="flex flex-wrap gap-4">
              {job.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-2 bg-background border border-border rounded-md">
            <h3 className="text-lg font-semibold text-foreground">Skills</h3>
            <p>
              This is a full-time position. The successful candidate will be
              responsible for the following:
            </p>

            <div className="flex flex-wrap gap-4">
              {job.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-[#7263f3]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default page;
