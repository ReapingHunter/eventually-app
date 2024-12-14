import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to sign up.");
        return;
      }

      // Redirect to the dashboard after successful signup
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ backgroundImage: "url('/images/login-bg.svg')" }} 
         className="min-h-screen bg-cover bg-center flex justify-center items-center px-2 sm:px-8 md:px-10">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start md:items-start">
          {isMobile && (
            <div className="flex justify-center">
              <img
                src="/images/dashboard-logo-2.png"
                className="w-40 h-auto"
                alt="Dashboard Logo"
              />
            </div>
          )}
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Already have an account?{" "}
            <a className="text-[#7B00D4] hover:underline font-normal" href="/login">Login</a>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center lg:items-end md:items-end">
              <Button className="font-bold w-1/2 bg-purple-700 text-white hover:bg-purple-600">
                SIGNUP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
