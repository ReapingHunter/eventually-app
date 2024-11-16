
export default function LoginPage() {
  return (
    <>
      <div className="flex h-screen">
        {/* Left half with background image */}
        {/* <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/login-bg.svg')" }} /> */}

        {/* Right half for content */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold mb-4">Login</h1>
          <p className="text-sm text-[#737272] font-normal whitespace-nowrap">Don&apos;t have an account yet?
            <a className="text-[#7B00D4] font-normal"> Signup</a>.
          </p>
          <form action="#" method="post">
            <div className="mb-4 mt-4">
              <label htmlFor="email" className="block text-sm font-bold text-[#363636] mb-2">
                Email Address
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                className="bg-transparent outline-none border-2 border-[#363636] rounded-md mb-3 px-3 py-2"
                required>
              </input>
              <label htmlFor="password" className="block text-sm font-bold text-[#363636] mb-2">
                Password
              </label>
              <input 
                type="password"
                id="password"
                name="password"
                className="bg-transparent outline-none border-2 border-[#363636] rounded-md mb-5 px-3 py-2"
                required>
              </input>
              <button className="font-bold bg-[#7B00D4] text-white px-4 py-2 rounded-md">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}