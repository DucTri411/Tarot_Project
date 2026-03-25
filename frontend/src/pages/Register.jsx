import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EyeIcon = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-galaxy-light transition-colors"
    tabIndex={-1}
  >
    {visible ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    )}
  </button>
);

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/register`, {
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-4 py-2.5 pr-11 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
                placeholder="Ít nhất 6 ký tự"
              />
              <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Nhập lại mật khẩu</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-galaxy-darkest border rounded-lg px-4 py-2.5 pr-11 text-white focus:outline-none focus:ring-1 transition-all ${
                  confirmPassword && confirmPassword !== password
                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/50'
                    : 'border-galaxy-primary/40 focus:border-galaxy-light focus:ring-galaxy-light'
                }`}
                placeholder="Nhập lại mật khẩu ở trên"
              />
              <EyeIcon visible={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-400 text-xs mt-1.5">Mật khẩu không khớp</p>
            )}
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
