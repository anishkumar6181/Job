"use client";
import AdminFooter from "@/Components/admin/AdminFooter";
import AdminHeader from "@/Components/admin/AdminHeader";
import Header from "@/Components/Header";
import JobForm from "@/Components/JobPost/JobForm";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { isAuthenticated, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("http://localhost:8000/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AdminHeader />

      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-foreground">
        Create a Job Post
      </h2>

      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
        <JobForm />
      </div>
      <AdminFooter />
    </div>
  );
}

export default page;