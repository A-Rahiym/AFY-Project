import jwt from 'jsonwebtoken';

const studentProfileMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Replace 'your_jwt_secret' with your actual JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    if (!decoded?.reg_number) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token payload' });
    }

  // Ensure req.body is initialized
    req.body = req.body || {};
    req.body.reg_number = decoded.reg_number;

    next();
  } catch (err) {
    console.error('Token decoding error:', err.message);
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};
export default studentProfileMiddleware;
