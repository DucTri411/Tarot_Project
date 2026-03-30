import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await axios.get(`${apiUrl}/api/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách đặt lịch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lịch đặt này?')) return;
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.delete(`${apiUrl}/api/admin/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter(b => b.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi khi xóa!');
    }
  };

  const serviceMap = {
    'thanso': 'Thần Số Học',
    'tarot': 'Tarot',
    'combo': 'Combo Thần Số & Tarot',
    'tham-van-chung': 'Tham vấn chung'
  };

  const priceMap = {
    'thanso': '150.000 VNĐ',
    'tarot': '100.000 VNĐ',
    'combo': '200.000 VNĐ',
    'tham-van-chung': ''
  };

  if (loading) return <div className="text-center py-20 text-galaxy-light animate-pulse">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-500/30 text-center">{error}</div>;

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">Quản lý đặt lịch</h2>
      <p className="text-gray-400 text-sm mb-8">Danh sách khách hàng đăng ký tư vấn riêng.</p>

      {bookings.length === 0 ? (
        <div className="bg-galaxy-darkest/50 border border-galaxy-primary/20 rounded-xl p-8 text-center text-gray-400">
          Chưa có yêu cầu đặt lịch nào.
        </div>
      ) : (
        <div className="bg-galaxy-darkest border border-galaxy-primary/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-galaxy-dark border-b border-galaxy-primary/30 text-gray-300 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold text-center w-12">STT</th>
                  <th className="p-4 font-semibold">Khách hàng</th>
                  <th className="p-4 font-semibold">Dịch vụ</th>
                  <th className="p-4 font-semibold">Thời gian hẹn</th>
                  <th className="p-4 font-semibold">Ghi chú</th>
                  <th className="p-4 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-galaxy-primary/10">
                {[...bookings].sort((a,b) => new Date(a.created_at || a.date) - new Date(b.created_at || b.date)).map((b, index) => (
                  <tr key={b.id} className="hover:bg-galaxy-primary/5 transition-colors">
                    <td className="p-4 text-center text-gray-400 font-bold text-sm">{index + 1}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{b.name}</div>
                      <div className="text-xs text-galaxy-light">{b.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="px-2 py-1 bg-galaxy-primary/20 text-galaxy-light text-[10px] font-bold rounded uppercase">
                          {serviceMap[b.service] || b.service}
                        </span>
                        {priceMap[b.service] && (
                          <span className="text-xs text-white font-bold bg-white/10 px-2 py-0.5 rounded">
                            {priceMap[b.service]}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300 text-sm">
                      <div>{new Date(b.date).toLocaleDateString('vi-VN')}</div>
                      <div className="text-xs text-gray-500">{b.time || '--:--'}</div>
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-gray-400 max-w-xs truncate" title={b.notes}>
                        {b.notes || 'Không có ghi chú'}
                      </p>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(b.id)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        title="Xóa"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
