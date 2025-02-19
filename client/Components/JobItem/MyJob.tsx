"use client";
import React, { useEffect, useState } from "react";
import { Job } from "@/types/types";
import { useJobsContext } from "@/context/jobsContext";
import Image from "next/image";
import { CardTitle } from "../ui/card";
import { formatDates } from "@/utils/fotmatDates";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useGlobalContext } from "@/context/globalContext";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";
import EditJobModal from "../EditJobModal";
import toast from "react-hot-toast";
import axios from "axios";


interface JobProps {
  job: Job;
  closeModal: () => void;
}

function MyJob({ job }: JobProps) {
  const { deleteJob, likeJob, UpdateJobData } = useJobsContext();
  const { userProfile, isAuthenticated, getUserProfile } = useGlobalContext();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const router = useRouter();

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    if (isAuthenticated && job?.createdBy?._id) {
      getUserProfile(job.createdBy._id);
    }
  }, [isAuthenticated, job?.createdBy?._id]);

  useEffect(() => {
    if (userProfile?._id && job?.likes) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job?.likes, userProfile?._id]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleEditSubmit = async (updatedData: Partial<Job>) => {
    try {
      console.log("Sending request to:", `/api/jobs/${job._id}`);
      console.log("Payload:", updatedData);
      
      const response = await axios.patch(`/api/jobs/${job._id}`, updatedData);
      
      console.log("Update successful:", response.data);
    } 
    catch (error: any) {
      console.error("Update job error:", {
        message: error.message,
        status: error.response?.status || "No Status",
        data: error.response?.data || "No Response Data",
        fullError: error,
      });
    
  
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };
  
  


  return (
    <div className="p-8 bg-background border border-border rounded-xl flex flex-col gap-5">
      <div className="flex justify-between">
      <div
          className="flex items-center space-x-4 mb-2 cursor-pointer"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <Image
            alt={`logo`}
            src={job.createdBy?.profilePicture || "/user.png"}
            width={48}
            height={48}
            className="rounded-full shadow-sm"
          />

          <div>
          <CardTitle className="text-xl font-bold truncate text-foreground">
              {job.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {job.createdBy?.name || 'Recuiter '}
            </p>
          </div>
        </div>
        <button
          className={`text-2xl ${
            isLiked ? "text-primary" : "text-muted-foreground"
          } `}
          onClick={() => {
            isAuthenticated
              ? handleLike(job._id)
              : router.push("http://localhost:8000/login");
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">{`${job.location.city || ''}, ${job.location.country}`}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Posted {formatDates(job.createdAt)}
        </p>

        <div className="flex justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          {job.createdBy?._id === userProfile?._id && (
          <div className="self-end">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary"
              onClick={handleEdit}
            >
              <Pencil size={14} />
              <span className="sr-only">Edit job</span>
            </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => deleteJob(job._id)}
              >
                <Trash size={14} />
                <span className="sr-only">Delete job</span>
              </Button>
            </div>
          )}
        </div>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
            </DialogHeader>
            <EditJobModal 
              job={job} 
              closeModal={() => setIsEditModalOpen(false)}
              onSubmit={handleEditSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default MyJob;
