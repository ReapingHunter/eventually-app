import TextInput from "../components/TextInput";

export default function LoginPage() {
  return (
    <>
      <div style={{ backgroundImage: "url('/images/login-bg.svg')" }} className="min-h-screen bg-cover bg-center">
        <div className="flex h-screen px-4 md:px-16 lg:px-32 py-16">
          {/* Flex container with rounded corners */}
          <div className="flex h-full w-full rounded-2xl overflow-hidden shadow-lg">
            
            {/* Left half with background image */}
            <div className=" hidden md:block w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />
            
            {/* Right half for content */}
            <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center lg:items-start md: items-center sm:items-center px-8 sm:px-16 md:px-20 lg:px-28">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Login</h1>
              <p className="text-sm md:text-base text-[#737272] font-normal whitespace-nowrap mb-4">
                Don&apos;t have an account yet?
                <a className="text-[#7B00D4] hover:underline font-normal ml-1">Signup</a>
              </p>
              <form action="#" method="post">
                <div className="mb-4 mt-4">
                  <TextInput label="Email Address" id="email" type="email" />
                  <TextInput label="Password" id="password" type="password" />
                  <div className="flex flex-col mt-4 lg:items-end md:items-center sm:items-center">
                    <button className="font-bold bg-[#7B00D4] text-white px-4 py-2 rounded-md mb-4 w-full lg:w-1/2 md:w-1/2 ">
                      LOGIN
                    </button>
                    <a className="text-[#737272] hover:text-[#7B00D4] font-normal">
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
