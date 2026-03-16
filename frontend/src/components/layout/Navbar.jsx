import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-galaxy-dark border-b border-galaxy-primary px-6 py-4 flex justify-between items-center shadow-lg shadow-galaxy-primary/20 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-galaxy-light to-[#E9D5FF] text-transparent bg-clip-text flex items-center gap-2">
        🐰 AstroBunny
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/numerology" className="text-gray-300 hover:text-galaxy-light transition duration-300">
          Thần Số Học
        </Link>
        <Link to="/tarot" className="text-gray-300 hover:text-galaxy-light transition duration-300">
          Tarot
        </Link>

        {token && user ? (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-galaxy-primary/50">
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
