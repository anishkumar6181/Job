"use client";
import { useJobsContext } from "@/context/jobsContext";
import { location } from "@/utils/Icons";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

// function SearchForm() {
//   const { searchJobs, handleSearchChange, searchQuery } = useJobsContext();
//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     <form
//       className="relative flex items-center"
//       onSubmit={(e) => {
//         e.preventDefault();
//         searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
//       }}
//     >
//       <div className="flex-1 relative">
//         <input
//           type="text"
//           id="job-title"
//           name="title"
//           value={searchQuery.title}
//           onChange={(e) => handleSearchChange("title", e.target.value)}
//           placeholder="Job Title or Keywords"
//           className="w-full py-7 text-2xl text-foreground bg-background border border-border  pl-[5rem] rounded-tl-full rounded-bl-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground"
//           data-has-listeners={isMounted ? "true" : undefined}
//         />
//         <span>
//           <Search
//             size={30}
//             className="text-muted-foreground text-2xl absolute left-8 top-[50%] translate-y-[-50%]"
//           />
//         </span>
//       </div>
//       <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-11 bg-gray-300"></div>

//       <div className="flex-1 relative">
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={searchQuery.location}
//           onChange={(e) => handleSearchChange("location", e.target.value)}
//           placeholder="Enter Location"
//           className="w-full py-7 text-2xl text-foreground bg-background border border-border pl-[4rem] rounded-tr-full rounded-br-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground"
//         />
//         <span className="text-muted-foreground text-3xl absolute left-6 top-[50%] translate-y-[-50%]">
//           {location}
//         </span>
//       </div>

//       <button
//         type="submit"
//         className="bg-primary hover:bg-primary/90 text-primary-foreground text-2xl px-14 py-2 rounded-full absolute right-2 top-[50%] transform translate-y-[-50%] h-[calc(100%-1rem)] transition-colors"
//       >
//         Search
//       </button>
//     </form>
//   );
// }



interface SearchFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

function SearchForm({ onSubmit }: SearchFormProps) {
  const { searchQuery, handleSearchChange } = useJobsContext();

  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Job Title"
        value={searchQuery.title}
        onChange={(e) => handleSearchChange('title', e.target.value)}
        className="flex-1 p-4 rounded-md bg-background border border-border"
      />
      <input
        type="text"
        placeholder="Location"
        value={searchQuery.location}
        onChange={(e) => handleSearchChange('location', e.target.value)}
        className="flex-1 p-4 rounded-md bg-background border border-border"
      />
      <input
        type="text"
        placeholder="Skills/Tags"
        value={searchQuery.tags}
        onChange={(e) => handleSearchChange('tags', e.target.value)}
        className="flex-1 p-4 rounded-md bg-background border border-border"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}



export default SearchForm;
