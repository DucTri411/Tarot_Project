import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
      window.location.reload(); // Refresh to update Navbar state
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Đăng nhập thất bại. Kiểm tra lại thông tin.');
      } else {
        setError('Không thể kết nối máy chủ. Hãy đảm bảo Backend đang chạy.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
      <div className="bg-galaxy-dark/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-galaxy-primary/30 w-full max-w-md relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-galaxy-primary/40 rounded-full blur-[50px] pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-galaxy-light to-white">
          Đăng Nhập
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Email của bạn</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
              placeholder="nhap@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Mật khẩu</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:from-galaxy-secondary hover:to-galaxy-primary text-white font-semibold rounded-lg shadow-lg shadow-galaxy-primary/20 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Bắt đầu hành trình'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Bạn chưa có tài khoản? <Link to="/register" className="text-galaxy-light hover:text-white transition-colors">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
