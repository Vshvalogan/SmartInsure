// src/services/api.js
const baseUrl = import.meta.env.VITE_BACKEND_URL;

// the token and user are saved in localStorage
export const saveAuth = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const clearAuth = () => {
  localStorage.removeItem("auth");
};

export const getAuth = () => {
  try {
    const value = localStorage.getItem("auth");
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error("Error parsing auth from localStorage", err);
    return null;
  }
};

// Authentication API calls

export const signup = async (user) => {
  const url = `${baseUrl}/api/auth/register`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user) => {
    const url = `${baseUrl}/api/auth/login`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      console.log("login response data:", data); 
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  

// authHeader 
const authHeaders = () => {
  const auth = getAuth();
  const headers = { "Content-Type": "application/json" };
  if (auth && auth.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  return headers;
};
// Users API calls

export const getUsers = async () => {
  const auth = getAuth();
  const token = auth?.token;

  const url = `${baseUrl}/api/users`;
  console.log(url);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    console.log("response data:", data);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

  
// Policy API calls

export const getPolicies = async () => {
  const url = `${baseUrl}/api/policies`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPolicyById = async (id) => {
  const url = `${baseUrl}/api/policies/${id}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Application API calls

export const createApplication = async (appData) => {
    const auth = getAuth();
    const token = auth?.token;
  
    try {
      const response = await fetch(`${baseUrl}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(appData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("createApplication error:", data);
        return null;
      }
  
      return data;
    } catch (error) {
      console.error("createApplication fetch error:", error);
      return null;
    }
  };
  


  // GET /api/applications?search=&sort=
  export const getApplications = async (search, sort) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    let url = `${baseUrl}/api/applications`;
  
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
  
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  
    console.log(url);
  
    try {
      const auth = getAuth(); 
      const token = auth?.token;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("getApplications error:", data);
        throw new Error(`Response status: ${response.status}`);
      }
  
      console.log("response data:", data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  

export const getApplicationById = async (id) => {
  const url = `${baseUrl}/api/applications/${id}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      headers: authHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateApplicationStatus = async (id, updates) => {
  const url = `${baseUrl}/api/applications/${id}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyApplications = async () => {
  const auth = getAuth();
  const token = auth?.token;
  const url = `${baseUrl}/api/applications/mine`;
  console.log(url);

  try {
    const response = await fetch(url, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("getMyApplications error:", data);
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteApplication = async (id) => {
    const url = `${baseUrl}/api/applications/${id}`;
    console.log(url);
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),   
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("deleteApplication error:", data);
        throw new Error(`Response status: ${response.status}`);
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  