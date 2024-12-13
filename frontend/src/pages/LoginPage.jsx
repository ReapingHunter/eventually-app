import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirecting after login

export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate(); // For redirecting user after login

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint (e.g., 768px for mobile)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      // If login is successful, store the JWT token in localStorage (or handle as needed)
      localStorage.setItem("token", response.data.token);

      // Redirect user to the dashboard or home page
      navigate("dashboard"); // Adjust the redirect path as needed

    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: "url('/images/login-bg.svg')" }}
        className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-8 md:px-16"
      >
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Left half with background image */}
          <div
            className="hidden md:block md:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/logo-bg.svg')",
              height: "auto",
            }}
          ></div>

          {/* Right half for content */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start md:items-start">
            {/* Logo for Mobile */}
            {isMobile && (
              <div className="flex justify-center">
                <img
                  src="/images/dashboard-logo-2.png"
                  className="w-40 h-auto"
                  alt="Dashboard Logo"
                />
              </div>
            )}

            <h1 className="text-2xl md:text-4xl font-bold mb-2">Login</h1>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Don&apos;t have an account yet?{" "}
              <a
                className="text-purple-700 hover:underline font-medium"
                href="/signup"
              >
                Signup
              </a>
            </p>

            {/* Error Message Display */}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-2">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                />
              </div>
              <div className="flex flex-col space-y-4 items-center lg:items-end md:items-end">
                <Button className="font-bold w-1/2 bg-purple-700 text-white hover:bg-purple-600">
                  LOGIN
                </Button>
                <a
                  className="text-gray-600 hover:text-purple-700 hover:underline text-sm text-center"
                  href="/resetpassword"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
