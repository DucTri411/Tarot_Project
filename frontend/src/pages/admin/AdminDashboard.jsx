import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error("Lỗi lấy thông tin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-galaxy-light">Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-galaxy-dark/80 backdrop-blur-sm border border-galaxy-primary/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Tổng thành viên</h3>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#E9D5FF]">
            {stats?.totalUsers || 0}
          </p>
        </div>
        <div className="bg-galaxy-dark/80 backdrop-blur-sm border border-galaxy-primary/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Quản trị viên (Admin)</h3>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-galaxy-secondary to-[#B26FCB]">
            {stats?.activeAdmins || 0}
          </p>
        </div>
        <div className="bg-galaxy-dark/80 backdrop-blur-sm border border-galaxy-primary/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Người dùng thường</h3>
          <p className="text-4xl font-bold text-white">
            {stats?.regularUsers || 0}
          </p>
        </div>
        <div className="bg-galaxy-dark/80 backdrop-blur-sm border border-galaxy-primary/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Lượt Xem Bài / Giải Mã</h3>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#855AB4] to-galaxy-light">
            {stats?.totalReadings || 0}
          </p>
        </div>
      </div>

      <div className="bg-galaxy-dark/50 border border-galaxy-primary/30 p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Chào mừng trở lại trạm điều khiển AstroBunny 🐰</h2>
        <p className="text-gray-300 leading-relaxed max-w-2xl">
          Đây là bảng điều khiển dành riêng cho nhà quản trị. Tại đây, bạn có thể theo dõi sự phát triển của hệ thống, quản lý người dùng, phân quyền truy cập và kiểm soát các chức năng nâng cao (Sắp ra mắt: Quản lý Lead, Lịch sử bói bài, Thống kê doanh thu).
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
