import { useState, useEffect } from 'react';
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

  const [myBookings, setMyBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const resetForm = () => {
    const userStr = localStorage.getItem('user');
    let defaultName = '';
    let defaultEmail = '';
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        defaultName = u.username || u.name || '';
        defaultEmail = u.email || '';
      } catch (e) {}
    }
    setFormData({
      name: defaultName,
      email: defaultEmail,
      service: 'tham-van-chung',
      date: '',
      time: '',
      notes: ''
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      setShowForm(false);
      fetchMyBookings(token);
      resetForm();
    } else {
      setIsAuth(false);
      setShowForm(true);
    }
    setIsAuthLoading(false);
  }, []);

  const fetchMyBookings = async (token) => {
    try {
      setLoadingBookings(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/booking/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy lịch này?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/booking/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMyBookings(myBookings.filter((b) => b.id !== id));
    } catch (err) {
      alert('Không thể hủy lịch.');
    }
  };

  const handlePayBooking = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/booking/${id}/pay`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setToastMessage('Đã thanh toán! Chúng mình sẽ gửi email xác nhận chi tiết đến bạn sớm nha.');
      setTimeout(() => setToastMessage(''), 5000);
      fetchMyBookings(localStorage.getItem('token'));
    } catch (err) {
      setToastMessage('Lỗi thanh toán.');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleEditClick = (b) => {
    setEditingId(b.id);
    const apiDateMatch = b.date?.match(/^(\d{4}-\d{2}-\d{2})/);
    const formattedDate = apiDateMatch ? apiDateMatch[1] : (b.date || '');
    setEditFormData({ date: formattedDate, time: b.time || '', notes: b.notes || '' });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/booking/${id}`, editFormData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEditingId(null);
      fetchMyBookings(localStorage.getItem('token'));
    } catch (err) {
      alert('Cập nhật thất bại');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.post(`${apiUrl}/api/booking`, formData);
      if (isAuth) {
        await fetchMyBookings(localStorage.getItem('token'));
        setShowForm(false);
        resetForm();
      } else {
        setSubmitted(true);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <p className="text-galaxy-light animate-pulse text-lg font-medium">Đang kiểm tra kết nối vũ trụ...</p>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
        <div className="bg-galaxy-dark/60 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-galaxy-primary/30 w-full max-w-lg text-center relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-galaxy-secondary/20 rounded-full blur-[80px] -z-10"></div>
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-4">
            Vui lòng đăng nhập
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Bạn cần có tài khoản để tiến hành đặt lịch, quản lý lịch hẹn cá nhân và trải nghiệm dịch vụ trọn vẹn nhất tại AstroBunny.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-8 py-3 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:scale-105 text-white font-bold rounded-xl shadow-lg shadow-galaxy-primary/20 transition-all inline-block"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  if (submitted && !isAuth) {
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
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-emerald-500/90 backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-2xl border border-emerald-400 font-medium flex items-center gap-3">
            <span className="text-xl">✨</span>
            {toastMessage}
          </div>
        </div>
      )}

      {isAuth && !showForm ? (
        <div className="bg-galaxy-dark/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-galaxy-primary/30 w-full max-w-3xl relative overflow-hidden min-h-[60vh]">
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-galaxy-secondary/20 rounded-full blur-[80px] -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-galaxy-primary/30 pb-6 mb-8 gap-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text">
              Lịch đã đặt của bạn
            </h2>
            <button 
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:scale-105 text-white font-bold rounded-xl shadow-lg transition-all whitespace-nowrap"
            >
              + Thêm lịch mới
            </button>
          </div>
          
          {loadingBookings ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-400 animate-pulse text-lg">Đang tải biểu đồ vận mệnh...</p>
            </div>
          ) : myBookings.length === 0 ? (
            <div className="bg-galaxy-darkest/50 border border-galaxy-primary/20 rounded-2xl p-16 text-center flex flex-col items-center justify-center m-auto mt-8">
              <div className="text-6xl mb-6 opacity-80">🌙</div>
              <p className="text-gray-300 text-xl font-medium">Chưa có lịch hẹn nào. Hãy đăng ký ngay bên trên nhé!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {myBookings.map((b) => {
                const displayStatus = b.status === 'pending' ? 'Chưa thanh toán' : (b.status || 'Chưa thanh toán');
                return (
                  <div key={b.id} className="bg-galaxy-darkest border border-galaxy-primary/30 p-6 rounded-2xl shadow-lg relative transform hover:-translate-y-1 transition-all">
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        displayStatus === 'Đã thanh toán' 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                          : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
                      }`}>
                        {displayStatus}
                      </span>
                    </div>
                    
                    <div className="mb-4 pr-32">
                      <h3 className="text-lg font-bold text-white uppercase bg-galaxy-primary/20 inline-block px-3 py-1 rounded-md text-sm cursor-default">
                        {b.service}
                      </h3>
                    </div>

                    {editingId === b.id ? (
                      <div className="space-y-4 bg-galaxy-primary/10 p-5 rounded-xl border border-galaxy-primary/30 mb-4 animate-fade-in-up">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-400 text-xs mb-1 font-bold">Ngày mới</label>
                            <input 
                              type="date" 
                              value={editFormData.date} 
                              onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                              className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-galaxy-light transition-colors"
                              style={{ colorScheme: 'dark' }}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-xs mb-1 font-bold">Giờ mới</label>
                            <div className="flex gap-2 w-full">
                              <select
                                value={editFormData.time ? editFormData.time.split(':')[0] : ''}
                                onChange={(e) => {
                                  const h = e.target.value;
                                  const m = editFormData.time ? editFormData.time.split(':')[1] : '00';
                                  setEditFormData({...editFormData, time: h ? `${h}:${m}` : ''});
                                }}
                                className="w-1/2 bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-2 py-2 text-sm text-gray-300 focus:outline-none focus:border-galaxy-light transition-colors appearance-none"
                              >
                                <option value="">Giờ</option>
                                {Array.from({ length: 16 }, (_, i) => {
                                  const hour = (i + 8).toString().padStart(2, '0');
                                  return <option key={hour} value={hour}>{hour}</option>;
                                })}
                              </select>
                              <span className="flex items-center text-gray-400 font-bold">:</span>
                              <select
                                value={editFormData.time ? editFormData.time.split(':')[1] : ''}
                                onChange={(e) => {
                                  const m = e.target.value;
                                  const h = editFormData.time ? editFormData.time.split(':')[0] : '08';
                                  setEditFormData({...editFormData, time: m ? `${h}:${m}` : `${h}:00`});
                                }}
                                className="w-1/2 bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-2 py-2 text-sm text-gray-300 focus:outline-none focus:border-galaxy-light transition-colors appearance-none"
                              >
                                <option value="">Phút</option>
                                {['00', '15', '30', '45'].map(minute => (
                                  <option key={minute} value={minute}>{minute}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">Ghi chú thêm</label>
                          <textarea 
                            value={editFormData.notes} 
                            onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                            className="w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-galaxy-light transition-colors resize-none h-20"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setEditingId(null)} className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Hủy</button>
                          <button onClick={() => handleSaveEdit(b.id)} className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-galaxy-primary to-galaxy-secondary text-white rounded-lg shadow-lg hover:shadow-galaxy-primary/50 transition-all"> Lưu lại</button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Ngày hẹn</p>
                          <p className="text-sm text-gray-200 font-medium">{new Date(b.date).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Giờ hẹn</p>
                          <p className="text-sm text-galaxy-light font-bold">{b.time || '--:--'}</p>
                        </div>
                        <div className="sm:col-span-3 bg-white/5 p-3 rounded-lg border border-white/10">
                          <p className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Ghi chú</p>
                          <p className="text-sm text-gray-300 italic whitespace-pre-wrap">{b.notes || 'Không có ghi chú'}</p>
                        </div>
                      </div>
                    )}

                    {!editingId && displayStatus !== 'Đã thanh toán' && (
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-galaxy-primary/20">
                        <button 
                          onClick={() => handlePayBooking(b.id)}
                          className="px-5 py-2.5 bg-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/50 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/10 transition-all flex-[1_1_auto] sm:flex-none text-center transform hover:scale-105"
                        >
                          💳 Thanh toán
                        </button>
                        <button 
                          onClick={() => handleEditClick(b)}
                          className="px-5 py-2.5 bg-galaxy-secondary/20 hover:bg-galaxy-secondary hover:text-white text-galaxy-light border border-galaxy-secondary/50 rounded-xl text-sm font-bold shadow-lg shadow-galaxy-secondary/10 transition-all flex-[1_1_auto] sm:flex-none text-center"
                        >
                          ✎ Chỉnh sửa
                        </button>
                        <button 
                          onClick={() => handleCancelBooking(b.id)}
                          className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/50 rounded-xl text-sm font-bold shadow-lg shadow-red-500/10 transition-all flex-[1_1_auto] sm:flex-none text-center"
                        >
                          ❌ Hủy lịch
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-galaxy-dark/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-galaxy-primary/30 w-full max-w-2xl relative overflow-hidden">
          {isAuth && (
            <div className="absolute top-4 left-4 z-10">
              <button 
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm bg-galaxy-darkest/50 px-4 py-2 rounded-lg border border-galaxy-primary/20"
              >
                <span>← Trở lại Danh sách</span>
              </button>
            </div>
          )}
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-galaxy-secondary/20 rounded-full blur-[80px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-galaxy-primary/20 rounded-full blur-[80px] -z-10"></div>
          
          <div className={`text-center mb-10 ${isAuth ? 'mt-10' : ''}`}>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-4 pb-2 leading-tight">
              {isAuth ? 'Thêm lịch hẹn mới' : 'Đặt lịch xem riêng'}
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
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Email liên hệ <span className="text-galaxy-light">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  required
                  readOnly={isAuth}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-galaxy-darkest border border-galaxy-primary/40 rounded-xl px-4 py-3 text-white focus:outline-none transition-all ${isAuth ? 'opacity-70 cursor-not-allowed' : 'focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light'}`}
                  placeholder="email@example.com"
                />
              </div>
            </div>

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
      )}
    </div>
  );
};

export default Booking;
