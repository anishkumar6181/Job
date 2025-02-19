import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

axios.defaults.baseURL = "https://job-ro40.onrender.com";
axios.defaults.withCredentials = true;



export const GlobalContextProvider = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  const [applicationUrl, setApplicationUrl] = useState("");

  // input state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
  const [salaryType, setSalaryType] = useState("Year");
  const [negotiable, setNegotiable] = useState(false);
  // const [hideSalary, setHideSalary] = useState(false);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);


  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('jobFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setJobTitle(parsedData.jobTitle || "");
        setJobDescription(parsedData.jobDescription || "");
        setSalary(parsedData.salary || "");
        setActiveEmploymentTypes(parsedData.activeEmploymentTypes || []);
        setSalaryType(parsedData.salaryType || "Year");
        setNegotiable(parsedData.negotiable || false);
        setTags(parsedData.tags || []);
        setSkills(parsedData.skills || []);
        setApplicationUrl(parsedData.applicationUrl || "");
        setLocation(parsedData.location || { country: "", city: "", address: "" });
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);
  
  useEffect(() => {
    const formData = {
      jobTitle,
      jobDescription,
      salary,
      activeEmploymentTypes,
      salaryType,
      negotiable,
      tags,
      skills,
      applicationUrl,
      location,
    };
    localStorage.setItem('jobFormData', JSON.stringify(formData));
  },  [
    jobTitle,
    jobDescription,
    salary,
    activeEmploymentTypes,
    salaryType,
    negotiable,
    tags,
    skills,
    applicationUrl,
    location,
  ]);


  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth");
        setIsAuthenticated(res.data.isAuthenticated);
        setAuth0User(res.data.user);
        setLoading(false);
      } catch (error) {
        console.log("Error checking auth", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //  if(!isAuthenticated){
  //   return router.push("http://localhost:8000/login")
  //  }

  const getUserProfile = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);

      // console.log("User profile", res.data);

      setUserProfile(res.data);
    } catch (error) {
      console.log("Error getting user profile", error);
    }
  };

  // In your globalContext file where loginAdmin is defined
const loginAdmin = async (email, password) => {
  try {
    const response = await fetch('https://job-ro40.onrender.com/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return { success: true, admin: data.admin };
  } catch (error) {
    return { success: false, message: 'An error occurred during login' };
  }
};

// Add these to your globalContext.js
const logout = async () => {
  try {
    await fetch('https://job-ro40.onrender.com/admin/logout', {
      method: 'POST',
      credentials: 'include'
    });
    router.push('/admin/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

  // handle input change
  const handleTitleChange = (e) => {
    setJobTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value.trimStart());
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };
  const handleApplicationUrlChange = (e) => {
    setApplicationUrl(e.target.value.trim());
  };

  const resetJobForm = () => {
    setJobTitle("");
    setJobDescription("");
    setSalary(0);
    setActiveEmploymentTypes([]);
    setSalaryType("Year");
    setNegotiable(false);
    setTags([]);
    setSkills([]);
    setApplicationUrl("");
    setLocation({
      country: "",
      city: "",
      address: "",
    });
    setApplicationUrl("");
    localStorage.removeItem('jobFormData'); 
  };

   
  useEffect(() => {
    if (isAuthenticated && auth0User) {
      getUserProfile(auth0User.sub);
    }
  }, [isAuthenticated, auth0User]);

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        auth0User,
        userProfile,
        getUserProfile,
        loginAdmin,
        logout,
        loading,
        jobTitle,
        jobDescription,
        salary,
        activeEmploymentTypes,
        salaryType,
        negotiable,
        tags,
        skills,
        location,
        applicationUrl,
        setApplicationUrl,
        handleApplicationUrlChange,
        handleTitleChange,
        handleDescriptionChange,
        handleSalaryChange,
        setActiveEmploymentTypes,
        setJobDescription,
        setSalaryType,
        setNegotiable,
        setTags,
        setSkills,
        setLocation,
        resetJobForm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

