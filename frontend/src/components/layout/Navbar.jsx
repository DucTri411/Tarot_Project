import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hàm kiểm tra token hết hạn
  const isTokenExpired = (t) => {
    if (!t) return true;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (storedToken && !isTokenExpired(storedToken) && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-galaxy-dark border-b border-galaxy-primary px-6 py-4 flex justify-between items-center shadow-lg shadow-galaxy-primary/20 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-galaxy-light to-[#E9D5FF] text-transparent bg-clip-text flex items-center gap-2">
        🐰 AstroBunny
      </Link>

      {/* Hamburger Icon for Mobile */}
      <button 
        className="md:hidden text-galaxy-light hover:text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navigation Links */}
      <div className={`absolute top-full left-0 w-full bg-galaxy-dark border-b border-galaxy-primary/50 md:static md:w-auto md:bg-transparent md:border-none md:flex items-center gap-6 transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'flex flex-col py-4 scale-y-100 opacity-100 px-6' : 'scale-y-0 opacity-0 md:scale-y-100 md:opacity-100 hidden'}`}>
        <Link to="/numerology" onClick={() => setIsMenuOpen(false)} className="block w-full text-center md:w-auto md:inline-block text-gray-300 hover:text-galaxy-light transition duration-300 py-2 md:py-0">
          Thần số học
        </Link>
        <Link to="/tarot" onClick={() => setIsMenuOpen(false)} className="block w-full text-center md:w-auto md:inline-block text-gray-300 hover:text-galaxy-light transition duration-300 py-2 md:py-0">
          Tarot
        </Link>
        <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block w-full text-center md:w-auto md:inline-block text-gray-300 hover:text-galaxy-light transition duration-300 py-2 md:py-0">
          Đặt lịch
        </Link>

        {token && user ? (
          <div className="flex flex-col md:flex-row items-center gap-4 md:ml-4 md:pl-4 border-t md:border-t-0 md:border-l border-galaxy-primary/50 pt-4 md:pt-0 mt-2 md:mt-0 w-full md:w-auto">
            {user.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="px-3 py-1.5 text-xs bg-galaxy-secondary hover:bg-galaxy-light text-white font-bold rounded-lg transition-all shadow-md">
                Admin Panel
              </Link>
            )}
            <span className="text-sm font-medium text-galaxy-light hidden md:inline">
              Xin chào, <span className="text-white">{user.username}</span>
            </span>
            <button 
              onClick={handleLogout}
              className="w-full md:w-auto px-4 py-2 text-sm bg-galaxy-darkest border border-galaxy-secondary hover:bg-galaxy-primary transition-all duration-300 rounded-lg text-white"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-3 md:ml-4 md:pl-4 border-t md:border-t-0 md:border-l border-galaxy-primary/50 pt-4 md:pt-0 mt-2 md:mt-0 w-full md:w-auto">
            <Link 
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center md:w-auto px-4 py-2 text-sm text-galaxy-light hover:text-white transition duration-300"
            >
              Đăng nhập
            </Link>
            <Link 
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center md:w-auto px-4 py-2 text-sm bg-galaxy-primary hover:bg-galaxy-secondary transition-all duration-300 rounded-lg text-white shadow-md shadow-galaxy-primary/40"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
