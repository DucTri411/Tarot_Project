import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/admin/feedbacks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFeedbacks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách phản hồi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/admin/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi khi xóa!');
    }
  };

  if (loading) return <div className="text-center py-20 text-galaxy-light animate-pulse">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-500/30 text-center">{error}</div>;

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">Phản Hồi Từ Người Dùng</h2>
      <p className="text-gray-400 text-sm mb-8">Đọc và quản lý những đóng góp từ phía người dùng.</p>

      {feedbacks.length === 0 ? (
        <div className="bg-galaxy-darkest/50 border border-galaxy-primary/20 rounded-xl p-8 text-center text-gray-400">
          Chưa có phản hồi nào từ người dùng.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((f) => (
            <div key={f.id} className="bg-galaxy-dark border border-galaxy-primary/30 rounded-xl p-6 shadow-lg shadow-galaxy-primary/5 hover:border-galaxy-light transition-colors relative group">
              <button 
                onClick={() => handleDelete(f.id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Xóa phản hồi"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex justify-between items-start mb-4 pr-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{f.name}</h3>
                  <p className="text-xs text-galaxy-light">{f.email}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < f.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-galaxy-darkest/50 p-4 rounded-lg text-gray-300 text-sm italic mb-4 max-h-40 overflow-y-auto custom-scrollbar">
                "{f.content}"
              </div>
              
              <div className="text-right text-xs text-gray-500">
                {new Date(f.created_at).toLocaleString('vi-VN')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbacks;
