"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Separator } from "../ui/separator";
import formatMoney from "@/utils/formatCurrency";
import { formatDates } from "@/utils/fotmatDates";
import { bookmark, bookmarkEmpty, whatsappIcon } from "@/utils/Icons";

interface JobProps {
  job: Job;
  activeJob?: boolean;
}

function JobCard({ job, activeJob }: JobProps) {
  const { likeJob } = useJobsContext();
  const { userProfile, isAuthenticated } = useGlobalContext();
  const [isLiked, setIsLiked] = React.useState(false);

  const {
    title,
    employmentType = [],
    salaryType,
    salary,
    createdBy,
    applicants,
    // jobType,
    createdAt,
  } = job;

  const name = createdBy?.name || "Unknown";
  const profilePicture = createdBy?.profilePicture || "/user.png";

  const locationString = React.useMemo(() => {
    if (!job.location) return 'Location not specified';
    if (typeof job.location === 'string') return job.location;
    const { country, city, address } = job.location;
    return [address, city, country].filter(Boolean).join(', ');
  }, [job.location]);

  const router = useRouter();

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    setIsLiked(job.likes.includes(userProfile._id));
  }, [job.likes, userProfile._id]);

  // const companyDescription =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.";

  const jobTypeBg = (type: string) => {
    switch (type) {
      case "Full Time":
        return "bg-green-500/20 text-green-600";
      case "Part Time":
        return "bg-purple-500/20 text-purple-600";
      case "Contract":
        return "bg-red-500/20 text-red-600";
      case "Internship":
        return "bg-indigo-500/20 text-indigo-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  return (
    <div
      className={`p-8 rounded-xl flex flex-col gap-5 transition-all duration-200 cursor-pointer
    hover:shadow-lg hover:scale-[1.01] hover:border-primary
    ${
      activeJob
        ? "bg-muted border-b-2 border-primary shadow-md"
        : "bg-background border border-border hover:bg-accent/50"
    }`}
      onClick={() => router.push(`/job/${job._id}`)}
    >
      <div className="flex justify-between">
        <div
          className="group flex gap-1 items-center cursor-pointer"
          // onClick={() => router.push(`/job/${job._id}`)}
        >
          <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
            <Image
              src={profilePicture || "/user.png"}
              alt={name || "User"}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="group-hover:underline font-bold text-foreground">
              {title}
            </h4>
            <p className="ext-xs text-muted-foreground">
              {name}: {applicants.length}{" "}
              {applicants.length > 1 ? "Applicants" : "Applicant"}
            </p>
          </div>

          {/* <div className="flex flex-wrap gap-2">
        {employmentType.map((type: string, index: number) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-medium ${jobTypeBg(type)}`}
          >
            {type}
          </span>
        ))}
      </div> */}
        </div>

        <button
          className={`text-2xl ${
            isLiked ? "text-primary" : "text-muted-foreground"
          } hover:scale-110 transition-transform`}
          onClick={() => {
            isAuthenticated
              ? handleLike(job._id)
              : router.push("http://localhost:8000/login");
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {employmentType.map((type, index) => (
          <span
            key={index}
            className={`py-1 px-3 text-xs font-medium rounded-md border ${jobTypeBg(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{locationString}</span>
      </div>

      <p className="text-muted-foreground">
        {job.description && job.description.length > 100
          ? `${job.description.substring(0, 100)}...`
          : job.description || "No description available"}
      </p>

      <Separator className="bg-border" />

      <div className="flex justify-between items-center gap-6">
        <p>
          <span className="font-bold text-foreground">
            {formatMoney(salary)}
          </span>
          <span className="font-medium text-muted-foreground text-lg">
            /
            {salaryType === "Yearly"
              ? "pa"
              : salaryType === "Monthly"
              ? "pcm"
              : salaryType === "Weekly"
              ? "pw"
              : "ph"}
          </span>
        </p>

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-lg">
            <Calendar size={16} />
          </span>
          Posted: {formatDates(createdAt)}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `https://wa.me/?text=Check out this job: ${title} at ${window.location.origin}/job/${job._id}`,
              "_blank"
            );
          }}
          className="text-green-500 hover:text-green-600 hover:scale-110 transition-transform"
          title="Share on WhatsApp"
        >
          {whatsappIcon}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
