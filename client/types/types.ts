interface Job {
  jobType: any;
  isAdminPost?: boolean;
  _id: string;
  title: string;
  description: string;
  location: {
    country: string;
    city?: string;
    address?: string;
  };
  salary: number;
  salaryType: "Yearly" | "Monthly" | "Weekly" | "Hourly";
  negotiable: boolean;
  // jobType: string[];
  employmentType: string[];
  tags: string[];
  likes: string[];
  skills: string[];
  applicants: string[];
  createdBy: {
    _id: string;
    profilePicture: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
export type { Job };

export interface JobFormData {
  title: string;
  description: string;
  location: {
    country: string;
    city?: string;
    address?: string;
  };
  salary: number;
  salaryType: string;
  employmentType: string[];
  skills: string[];
  tags: string[];
  negotiable: boolean;
  applicationUrl?: string;
}
