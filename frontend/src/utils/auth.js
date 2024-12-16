import axios from "axios";

export const isAuthenticated = async() => {
  try {
    const token = localStorage.getItem("token")
    if(!token) return null

    const response = await axios.get("http://localhost:3000/api/users/check-login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  window.location.href = "/"
}

  