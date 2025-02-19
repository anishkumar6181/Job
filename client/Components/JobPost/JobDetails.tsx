"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import { Label } from "../ui/label";
import "react-quill-new/dist/quill.snow.css";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

function MyEditor() {
  const { setJobDescription, jobDescription } = useGlobalContext();

  return (
    <ReactQuill
      value={jobDescription}
      onChange={setJobDescription}
      style={{
        minHeight: "400px",
        maxHeight: "900px",
      }}
      modules={{
        toolbar: true,
      }}
      className="custom-quill-editor dark:text-foreground"
    />
  );
}

function JobDetails() {
  const {
    handleSalaryChange,
    salary,
    salaryType,
    setSalaryType,
    setNegotiable,
    negotiable,
    applicationUrl,
    setApplicationUrl,
  } = useGlobalContext();
  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-foreground font-bold">Job Description</h3>
          <Label htmlFor="jobDescription" className="text-muted-foreground mt-2">
            Provide a detailed description of the job.
          </Label>
        </div>
        <div className="flex-1">
          <MyEditor />
        </div>
      </div>

      <Separator className="my-2" />

      <div className="relative grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-foreground font-bold">Salary</h3>
          <Label htmlFor="salary" className="text-muted-foreground mt-2">
            Enter the salary range for the job.
          </Label>
        </div>

        <div>
          <Input
            type="number"
            id="salary"
            placeholder="Enter Salary"
            value={salary}
            onChange={handleSalaryChange}
            className="mt-2 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />

          <div className="flex gap-2 mt-2 justify-between">
          <div className="flex items-center space-x-2 border border-border rounded-md p-2 bg-background">
      <Checkbox 
        id="negotiable"
        checked={negotiable}
        onCheckedChange={setNegotiable}
      />
      <Label htmlFor="negotiable" className="text-muted-foreground">
        Negotiable
      </Label>
    </div>
    <div className="flex items-center space-x-2 border border-border rounded-md p-2 bg-background">
      <Checkbox
        id="hideSalary"
        checked={negotiable}
        onCheckedChange={setNegotiable}
      />
      <Label htmlFor="hideSalary" className="text-muted-foreground">
        Hide Salary
      </Label>
    </div>

            <div>
              <Select onValueChange={setSalaryType}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="w-[120px] mt-2 bg-background border-border">
                  <SelectItem value="Yearly" className="text-foreground hover:bg-muted">Yearly</SelectItem>
                  <SelectItem value="Month" className="text-foreground hover:bg-muted">Month</SelectItem>
                  <SelectItem value="Hour" className="text-foreground hover:bg-muted">Hour</SelectItem>
                  <SelectItem value="Fixed" className="text-foreground hover:bg-muted">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-2" />

<div className="relative grid grid-cols-2 gap-6">
  <div>
    <h3 className="text-foreground font-bold">Application URL</h3>
    <Label htmlFor="applicationUrl" className="text-muted-foreground mt-2">
      Enter the URL where candidates can apply
    </Label>
  </div>

  <div className="space-y-4">
    <Input
      type="url"
      id="applicationUrl"
      placeholder="https://company.com/apply"
      value={applicationUrl}
      onChange={(e) => setApplicationUrl(e.target.value)}
      className="mt-2 bg-background border-border text-foreground placeholder:text-muted-foreground"
    />
    
    {applicationUrl && (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(applicationUrl, '_blank')}
          className="flex items-center gap-2"
        >
          <span>Preview Application Link</span>
          <ExternalLink size={16} />
        </Button>
      </div>
    )}
  </div>
</div>
    </div>
  );
}

export default JobDetails;
