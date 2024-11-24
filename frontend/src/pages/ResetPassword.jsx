import TextInput from "../components/TextInput";

export default function ResetPasswordPage() {
  return (
    <>
      <div style={{ backgroundImage: "url('/images/login-bg.svg')" }} className="min-h-screen bg-cover bg-center">
        <div className="flex h-screen px-4 md:px-16 lg:px-32 py-16">
          {/* Flex container with rounded corners */}
          <div className="flex h-full w-full rounded-2xl overflow-hidden shadow-lg">
            
            {/* Left half with background image */}
            <div className=" hidden md:block w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />
            
            {/* Right half for content */}
            <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center px-8 sm:px-16 md:px-20 lg:px-28">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Reset Password</h1>
              <form action="#" method="post">
                <div className="mb-4 mt-4">
                  <TextInput label="Email Address" id="email" type="email" />
                  <TextInput label="New Password" id="password" type="password" />
                  <TextInput label="Confirm New Password" id="password" type="password" />
                  <div className="flex flex-col mt-4 items-center">
                    <button className="font-bold bg-[#7B00D4] text-white px-4 py-2 rounded-md mb-4 w-full ">
                      CHANGE PASSWORD
                    </button>
                    <a className="text-sm md:text-base text-[#737272] font-normal whitespace-nowrap mb-4 hover:underline hover:text-[#7B00D4]" href="/login">
                      Back to Login
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
