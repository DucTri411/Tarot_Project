const User = require('../models/User');
const { Parser } = require('json2csv');

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await User.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thống kê' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteUser(id);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa người dùng' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role không hợp lệ' });
    }
    
    await User.updateRole(id, role);
    res.json({ message: 'Cập nhật quyền thành công' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật quyền' });
  }
};

exports.exportUsersCSV = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const fields = ['id', 'username', 'email', 'role', 'created_at'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(users);

    res.header('Content-Type', 'text/csv');
    res.attachment('astrobunny_users.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error exporting users:', error);
    res.status(500).json({ message: 'Lỗi server khi xuất dữ liệu' });
  }
};
