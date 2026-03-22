import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
      // Token hết hạn hoặc không hợp lệ → xóa và đăng xuất
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
  };

  return (
    <nav className="bg-galaxy-dark border-b border-galaxy-primary px-6 py-4 flex justify-between items-center shadow-lg shadow-galaxy-primary/20 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-galaxy-light to-[#E9D5FF] text-transparent bg-clip-text flex items-center gap-2">
        🐰 AstroBunny
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/numerology" className="text-gray-300 hover:text-galaxy-light transition duration-300">
          Thần số học
        </Link>
        <Link to="/tarot" className="text-gray-300 hover:text-galaxy-light transition duration-300">
          Tarot
        </Link>
        <Link to="/booking" className="text-gray-300 hover:text-galaxy-light transition duration-300">
          Đặt lịch
        </Link>

        {token && user ? (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-galaxy-primary/50">
            {user.role === 'admin' && (
              <Link to="/admin" className="px-3 py-1.5 text-xs bg-galaxy-secondary hover:bg-galaxy-light text-white font-bold rounded-lg transition-all shadow-md">
                Admin Panel
              </Link>
            )}
            <span className="text-sm font-medium text-galaxy-light">
              Xin chào, <span className="text-white">{user.username}</span>
            </span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-galaxy-darkest border border-galaxy-secondary hover:bg-galaxy-primary transition-all duration-300 rounded-lg text-white"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="flex gap-3 ml-4 pl-4 border-l border-galaxy-primary/50">
            <Link 
              to="/login"
              className="px-4 py-2 text-sm text-galaxy-light hover:text-white transition duration-300"
            >
              Đăng nhập
            </Link>
            <Link 
              to="/register"
              className="px-4 py-2 text-sm bg-galaxy-primary hover:bg-galaxy-secondary transition-all duration-300 rounded-lg text-white shadow-md shadow-galaxy-primary/40"
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
