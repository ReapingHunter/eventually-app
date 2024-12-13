
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"

export default function SignupPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint (e.g., 768px for mobile)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])
  return (
    <>
      <div style={{ backgroundImage: "url('/images/login-bg.svg')" }} 
           className="min-h-screen bg-cover bg-center flex justify-center items-center px-2 sm:px-8 md:px-10">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Left half with background image */}
          <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />
          
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
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Already have an account?{" "}
              <a className="text-[#7B00D4] hover:underline font-normal" href="/login">Login</a>
            </p>
            <form action="#" method="post">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="text"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Confirm your password"
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
    </>
  );
}
