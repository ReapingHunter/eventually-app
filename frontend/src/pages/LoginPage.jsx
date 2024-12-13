import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false)

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
      <div style={{ backgroundImage: "url('/images/login-bg.svg')" }} className="min-h-screen bg-cover bg-center">
        <div className="flex h-screen px-56 py-24">
          {/* Flex container with rounded corners */}
          <div className="flex h-full w-full rounded-2xl overflow-hidden shadow-lg">
            {/* Left half with background image */}
            <div
              className="hidden md:block w-1/2 h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/images/logo-bg.svg')" }}
            />
            
            {/* Right half for content */}
            <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-start px-20">
              {isMobile && <img
                              src="/images/dashboard-logo-2.png"
                              className="w-72 h-auto"
                              alt="Dashboard Logo"
                            />
              }
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Login</h1>
              <p className="text-sm md:text-base text-[#737272] font-normal whitespace-nowrap mb-4">
                Don&apos;t have an account yet?
                <a className="text-[#7B00D4] hover:underline font-normal ml-1" href="/signup">
                  Signup
                </a>
              </p>
              <form action="#" method="post">
                <div className="mb-4 mt-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" placeholder="Enter your email" />
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" />
                  <div className="flex flex-col mt-4 items-end">
                    <Button className="font-bold w-1/2 bg-[#7B00D4] text-white hover:bg-[#5b00a6]">
                      LOGIN
                    </Button>
                    <a
                      className="text-[#737272] hover:text-[#7B00D4] hover:underline font-normal mt-4"
                      href="/resetpassword"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
