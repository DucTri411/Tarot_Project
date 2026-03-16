import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const GlobalLayout = () => {
  return (
    <div className="min-h-screen bg-galaxy-darkest text-gray-100 flex flex-col font-sans selection:bg-galaxy-primary selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-galaxy-dark border-t border-galaxy-primary/30 py-6 text-center text-sm text-gray-400 mt-20">
        <p>© 2026 AstroBunny - Tính Thần Số Học & Rút Bài Tarot. Mọi quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default GlobalLayout;
