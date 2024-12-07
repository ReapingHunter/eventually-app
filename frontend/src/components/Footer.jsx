export default function Footer() {
  return (
    <footer className="bg-[#3b006a] text-white py-6 mt-4">
      <div className="flex items-center justify-center">
        <hr className="border-t border-gray-500 flex-grow mx-4" />
        <span className="text-sm">© {new Date().getFullYear()} Eventually. All rights reserved.</span>
        <hr className="border-t border-gray-500 flex-grow mx-4" />
      </div>
    </footer>
  );
}
