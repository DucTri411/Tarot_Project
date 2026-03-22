import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Đăng ký thất bại. Gặp lỗi phía server.');
      } else {
        setError('Không thể kết nối máy chủ. Hãy thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
      <div className="bg-galaxy-dark/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-galaxy-primary/30 w-full max-w-md relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-galaxy-secondary/30 rounded-full blur-[60px] pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-galaxy-light">
          Đăng ký tài khoản
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-200 p-3 rounded-lg mb-6 text-sm text-center">
            Đăng ký thành công! Đang chuyển hướng...
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Tên hiển thị</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
              placeholder="VD: AstroBunny"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
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
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
              placeholder="Ít nhất 6 ký tự"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#855AB4] to-[#68388D] hover:scale-[1.02] text-white font-semibold rounded-lg shadow-lg shadow-galaxy-primary/20 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Đang tạo...' : 'Lập lá số ngay'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Đã có tài khoản? <Link to="/login" className="text-galaxy-light hover:text-white transition-colors">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
