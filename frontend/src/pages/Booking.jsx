import { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'tham-van-chung',
    date: '',
    time: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.post(`${apiUrl}/api/booking`, formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <div className="bg-galaxy-dark/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-galaxy-primary/30 w-full max-w-lg text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-galaxy-primary/20 rounded-full blur-[80px] -z-10"></div>
          <div className="text-6xl mb-6">🗓️✨</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-4">
            Đặt lịch thành công!
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            Cảm ơn bạn đã tin tưởng AstroBunny. Chúng tôi đã nhận được thông tin đặt lịch của bạn và sẽ liên hệ qua Email <strong>{formData.email}</strong> trong thời gian sớm nhất để xác nhận giờ linh nghiệm.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-galaxy-darkest border border-galaxy-secondary hover:bg-galaxy-primary text-white rounded-xl transition-all shadow-md shadow-galaxy-primary/20"
          >
            Đặt lịch khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
      <div className="bg-galaxy-dark/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-galaxy-primary/30 w-full max-w-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-galaxy-secondary/20 rounded-full blur-[80px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-galaxy-primary/20 rounded-full blur-[80px] -z-10"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-4 pb-2 leading-tight">
            Đặt lịch xem riêng
          </h1>
          <p className="text-gray-400">
            Kết nối 1-1 với đội ngũ Master của AstroBunny để giải mã chuyên sâu những trăn trở của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-center text-sm">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Họ & Tên <span className="text-galaxy-light">*</span></label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
                placeholder="Nguyễn Văn A"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Email liên hệ <span className="text-galaxy-light">*</span></label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Dịch vụ quan tâm</label>
            <select 
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all appearance-none"
            >
              <option value="tarot">Trải bài Tarot (45 phút) - Giải đáp thắc mắc cụ thể</option>
              <option value="thanso">Tư vấn Thần số học (60 phút) - Mở khóa tiềm năng</option>
              <option value="combo">Combo Thần số học & Tarot (90 phút) - Chuyên sâu</option>
              <option value="tham-van-chung">Tham vấn tâm linh chung</option>
            </select>
            
            {['tarot', 'thanso', 'combo'].includes(formData.service) && (
              <div className="mt-3 p-3 bg-galaxy-primary/10 border border-galaxy-primary/30 rounded-xl flex justify-between items-center transition-all">
                <span className="text-gray-300 text-sm">✨ Phí dịch vụ:</span>
                <span className="text-galaxy-light font-bold text-lg">
                  {formData.service === 'tarot' ? '100.000 VNĐ' : 
                   formData.service === 'thanso' ? '150.000 VNĐ' : '200.000 VNĐ'}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Ngày muốn xem <span className="text-galaxy-light">*</span></label>
              <input 
                type="date" 
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            {/* Time */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Giờ mong muốn</label>
              <div className="flex gap-2 w-full">
                <select
                  value={formData.time ? formData.time.split(':')[0] : ''}
                  onChange={(e) => {
                    const h = e.target.value;
                    const m = formData.time ? formData.time.split(':')[1] : '00';
                    handleChange({ target: { name: 'time', value: h ? `${h}:${m}` : '' } });
                  }}
                  className="w-1/2 bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all appearance-none"
                >
                  <option value="">Giờ</option>
                  {Array.from({ length: 16 }, (_, i) => {
                    const hour = (i + 8).toString().padStart(2, '0');
                    return <option key={hour} value={hour}>{hour}</option>;
                  })}
                </select>
                
                <span className="flex items-center text-gray-400 font-bold">:</span>

                <select
                  value={formData.time ? formData.time.split(':')[1] : ''}
                  onChange={(e) => {
                    const m = e.target.value;
                    const h = formData.time ? formData.time.split(':')[0] : '08';
                    handleChange({ target: { name: 'time', value: m ? `${h}:${m}` : h + ':' + m } });
                  }}
                  className="w-1/2 bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all appearance-none"
                >
                  <option value="">Phút</option>
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={minute} value={minute}>{minute}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Câu hỏi hoặc vấn đề cần giải quyết</label>
            <textarea 
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all resize-none"
              placeholder="Chia sẻ ngắn gọn để Master chuẩn bị năng lượng tốt nhất cho bạn..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-2 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:scale-[1.02] text-white font-bold text-lg rounded-xl shadow-lg shadow-galaxy-primary/30 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký đặt lịch'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
