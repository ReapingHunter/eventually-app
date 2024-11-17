import TextInput from "../components/TextInput";

export default function LoginPage() {
  return (
    <>
      <div style={{ backgroundImage: "url('/images/login-bg.svg')" }}>
        <div className="flex h-screen px-64 py-16">
          <div className="flex h-full w-full rounded-2xl overflow-hidden shadow-lg">
            {/* Left half with background image */}
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/logo-bg.svg')" }} />

            {/* Right half for content */}
            <div className="w-1/2 h-full bg-white flex flex-col justify-center items-start px-14">
              <h1 className="text-6xl font-bold mb-3">Login</h1>
              <p className="text-[#737272] font-normal whitespace-nowrap">Don&apos;t have an account yet?
                <a className="text-[#7B00D4] hover:underline font-normal ml-1">Signup</a>
              </p>
              <form action="#" method="post">
                <div className="mb-4 mt-4">
                  <TextInput 
                    label="Email Address"
                    id="email"
                    type="email"
                  />
                  <TextInput 
                    label="Password"
                    id="password"
                    type="password"
                  />
                  <div className="flex flex-col items-end">
                    <button className="font-bold bg-[#7B00D4] text-white px-4 py-2 rounded-md mb-2 w-1/3">
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