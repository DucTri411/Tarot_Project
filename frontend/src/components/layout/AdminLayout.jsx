import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: '📊 Dashboard', exact: true },
    { path: '/admin/users', label: '👥 Quản lý người dùng' }
  ];

  return (
    <div className="flex h-screen bg-galaxy-darkest text-gray-200 overflow-hidden text-sm">
      {/* Sidebar */}
      <aside className="w-64 bg-galaxy-dark border-r border-galaxy-primary/30 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-galaxy-primary/30">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text flex flex-col items-center">
            <span>🐰 AstroBunny</span>
            <span className="text-xs text-galaxy-secondary mt-1 tracking-widest uppercase">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-galaxy-primary/30 border border-galaxy-light text-white shadow-lg shadow-galaxy-primary/20' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-galaxy-light'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-galaxy-primary/30">
          <Link to="/" className="block w-full text-center px-4 py-2 border border-galaxy-secondary text-galaxy-light rounded-lg hover:bg-galaxy-secondary hover:text-white transition mb-3">
            ⬅ Trở về trang chủ
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-galaxy-dark border-b border-galaxy-primary/30 flex items-center justify-between px-8 z-10 shadow-md">
          <h2 className="text-lg font-semibold text-white">Quản trị hệ thống</h2>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-galaxy-primary to-[#E9D5FF] flex items-center justify-center text-galaxy-darkest font-bold">
              {user.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </span>
            <span className="text-gray-300 font-medium">{user.username} <span className="text-xs bg-galaxy-secondary/50 px-2 py-0.5 rounded-full ml-1">Admin</span></span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-galaxy-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
