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
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
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
    const url = `${baseUrl}/api/users`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
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

export const createApplication = async (application) => {
  const url = `${baseUrl}/api/applications`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(application),
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

export const getApplications = async () => {
  const url = `${baseUrl}/api/applications`;
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
