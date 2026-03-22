import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa user ${username} không?`)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Refresh list
    } catch (error) {
      alert("Xóa thất bại!");
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Đổi role của người dùng thành ${newRole.toUpperCase()}?`)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/admin/users/${id}/role`, 
        { role: newRole }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(); // Refresh list
    } catch (error) {
      alert("Đổi quyến thất bại!");
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/admin/users/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Xử lý dạng file
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'astrobunny_users.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert("Xuất CSV thất bại!");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-galaxy-light">Đang tải danh sách...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý Thành viên</h1>
          <p className="text-gray-400">Xem danh sách, phân quyền và xuất dữ liệu Data CSV.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="px-5 py-2.5 bg-gradient-to-r from-[#217346] to-[#107c41] text-white hover:shadow-[0_0_15px_rgba(33,115,70,0.5)] rounded-lg font-medium flex items-center gap-2 transition-all"
        >
          <span>📊</span> Export CSV
        </button>
      </div>

      <div className="bg-galaxy-darkest border border-galaxy-primary/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-galaxy-dark border-b border-galaxy-primary/30 text-gray-300 text-sm">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Tên hiển thị</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Vai trò (Role)</th>
                <th className="p-4 font-semibold">Ngày tham gia</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-galaxy-primary/20">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-galaxy-primary/10 transition-colors">
                  <td className="p-4 text-gray-400 text-sm">#{user.id}</td>
                  <td className="p-4 font-medium text-white">{user.username}</td>
                  <td className="p-4 text-gray-300">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      user.role === 'admin' 
                        ? 'bg-galaxy-secondary/20 border-galaxy-secondary text-galaxy-light' 
                        : 'bg-white/5 border-gray-600 text-gray-400'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-4 text-right space-x-2 flex justify-end">
                    <button 
                      onClick={() => handleChangeRole(user.id, user.role)}
                      className="px-3 py-1.5 bg-galaxy-dark border border-galaxy-secondary text-galaxy-light text-xs rounded hover:bg-galaxy-secondary hover:text-white transition"
                    >
                      Đổi Role
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id, user.username)}
                      className="px-3 py-1.5 bg-galaxy-dark border border-red-500/50 text-red-400 text-xs rounded hover:bg-red-500 hover:text-white transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">Chưa có người dùng nào (rất lạ)</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
