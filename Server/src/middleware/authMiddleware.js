import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwtUtils.js';


export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.student = decoded; // Save the payload to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};


//  * Populates req.user with decoded token payload (including userType).
//  * @param {object} req - Express request object.
//  * @param {object} res - Express response object.
//  * @param {function} next - Express next middleware function.
//  */

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ success: false, message: 'Authentication token required.' });
    }

    const decodedUser = verifyToken(token);

    if (!decodedUser) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }

    // Now, req.user will contain id, email, and userType ('admin' or 'student')
    req.user = decodedUser;
    next();
};

/**
 * Middleware to authorize access based on user type.
 * Must be used AFTER authenticateToken.
 * @param {Array<string>} allowedTypes - An array of user types allowed (e.g., ['admin', 'student']).
 * @returns {function} Express middleware function.
 */
export const authorizeTypes = (allowedTypes) => { // Renamed from authorizeRoles for clarity
    return (req, res, next) => {
        if (!req.user || !req.user.userType) {
            return res.status(403).json({ success: false, message: 'User type information missing in token.' });
        }

        if (!allowedTypes.includes(req.user.userType)) {
            return res.status(403).json({ success: false, message: 'Access forbidden: Insufficient permissions.' });
        }
        next();
    };
};