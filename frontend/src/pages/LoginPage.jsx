
export default function LoginPage() {
  return (
    <>
      <div className="flex h-screen">
        {/* Left half with background image */}
        <div className="w-1/2 h-full bg-cover bg-center px-14" style={{ backgroundImage: "url('/images/login-bg.svg')" }} />

        {/* Right half for content */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-start px-14">
          <h1 className="text-6xl font-bold mb-4">Login</h1>
          <p className="text-[#737272] font-normal whitespace-nowrap">Don&apos;t have an account yet?
            <a className="text-[#7B00D4] hover:underline font-normal ml-1">Signup</a>.
          </p>
          <form action="#" method="post">
            <div className="mb-4 mt-4">
              <label htmlFor="email" className="block font-bold text-[#363636] mb-2">
                Email Address
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                className="bg-transparent outline-none border-2 border-[#363636] rounded-md mb-3 px-3 py-2 w-full"
                required>
              </input>
              <label htmlFor="password" className="block font-bold text-[#363636] mb-2">
                Password
              </label>
              <input 
                type="password"
                id="password"
                name="password"
                className="bg-transparent outline-none border-2 border-[#363636] rounded-md mb-5 px-3 py-2"
                required>
              </input>
              <div className="flex flex-col items-center">
                <button className="font-bold bg-[#7B00D4] text-white px-4 py-2 rounded-md mb-4 w-full">
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
    </>
  );
}