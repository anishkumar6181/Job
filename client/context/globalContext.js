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


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



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
      const response = await axios.post('/admin/login', { email, password });
      
      if (response.data.success) {
        // Store token
        localStorage.setItem('adminToken', response.data.token);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

// Add these to your globalContext.js
  const logout = async () => {
    try {
      await axios.post('/admin/logout');
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

    useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const response = await axios.get('/admin/check-auth');
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

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

