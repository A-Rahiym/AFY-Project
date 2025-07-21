// src/utils/jwtUtils.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // **CHANGE THIS IN PRODUCTION!**
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

/**
 * Generates a JWT token for a given user.
 * It now explicitly includes 'userType' (e.g., 'admin', 'student').
 * @param {object} user - The user object (must contain id, email).
 * @param {string} userType - 'admin' or 'student'.
 * @returns {string} The signed JWT token.
 */
export const generateToken = (user, userType) => {
    const payload = {
        id: user.id,
        email: user.email,
        userType: userType, // Explicitly state the type of user
        // role: userType // You can also use 'role' if you prefer that naming in JWT
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} The decoded payload if valid (including userType), null otherwise.
 */


export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // This will now contain id, email, userType
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return null;
    }
};