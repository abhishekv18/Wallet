

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p className="flex items-center gap-2">
          Designed & Developed by 
          <span className="font-bold text-white hover:text-yellow-400 transition">Abhishek</span>
          <p className="text-red-500 animate-pulse">❤️</p>
        </p>

        <p className="mt-2 md:mt-0">&copy; {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}

