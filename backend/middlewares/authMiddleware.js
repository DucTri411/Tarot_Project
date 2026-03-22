const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Không có token được cung cấp' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token không hợp lệ' });

  jwt.verify(token, process.env.JWT_SECRET || 'astrobunny_secret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Xác thực thất bại' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Yêu cầu quyền Quản trị viên (Admin)' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
