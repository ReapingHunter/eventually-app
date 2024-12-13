import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"

export default function ResetPasswordPage() {
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
          <div className=" hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />
          
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
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Reset Password</h1>
            <form action="#" method="post">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your new password"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Confirm New Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Confirm your new password"
                  className="mt-1"
                />
              </div>
              <div className="flex flex-col space-y-4 items-center">
                <Button className="font-bold w-full bg-purple-700 text-white hover:bg-purple-600">
                  CHANGE PASSWORD
                </Button>
                <a className="text-sm md:text-base text-[#737272] font-normal whitespace-nowrap hover:underline hover:text-[#7B00D4]" href="/login">
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
