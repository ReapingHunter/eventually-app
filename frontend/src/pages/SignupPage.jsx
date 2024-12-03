
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <>
      <div style={{ backgroundImage: "url('/images/login-bg.svg')" }} className="min-h-screen bg-cover bg-center">
        <div className="flex h-screen px-4 md:px-16 lg:px-32 py-8">
          {/* Flex container with rounded corners */}
          <div className="flex h-full w-full rounded-2xl overflow-hidden shadow-lg">
            
            {/* Left half with background image */}
            <div className=" hidden md:block w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />
            
            {/* Right half for content */}
            <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center px-8 sm:px-16 md:px-20 lg:px-28">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Create Account</h1>
              <p className="text-sm md:text-base text-[#737272] font-normal whitespace-nowrap mb-4">
                Already have an account?
                <a className="text-[#7B00D4] hover:underline font-normal ml-1" href="/login">Login</a>
              </p>
              <form action="#" method="post">
                <div className="mb-4 mt-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" />

                  <Label htmlFor="username">Username</Label>
                  <Input type="text" id="text" />

                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" />

                  <Label htmlFor="password">Confirm Password</Label>
                  <Input type="password" id="password" />

                  <div className="flex flex-col mt-4 lg:items-end md:items-center sm:items-center">
                    <Button className="font-bold w-full lg:w-1/2 md:w-1/2 bg-[#7B00D4] text-white hover:bg-[#5b00a6]">
                      SIGNUP
                    </Button>
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
