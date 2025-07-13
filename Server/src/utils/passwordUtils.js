// src/utils/passwordUtils.js
import bcrypt from 'bcryptjs';

// Number of salt rounds. Higher value means more secure but slower hashing.
// 10 is a good default for most applications.
const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 * @param {string} plainPassword - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password string.
 * @throws {Error} If hashing fails.
 */
export const hashPassword = async (plainPassword) => {
    try {
        if (!plainPassword || typeof plainPassword !== 'string') {
            throw new Error('Password must be a non-empty string.');
        }
        return await bcrypt.hash(plainPassword, SALT_ROUNDS);
    } catch (error) {
        console.error('Error hashing password:', error.message);
        throw new Error('Failed to hash password.');
    }
};

/**
 * Compares a plain text password with a stored hashed password.
 * @param {string} plainPassword - The plain text password provided by the user.
 * @param {string} hashedPassword - The hashed password retrieved from the database.
 * @returns {Promise<boolean>} A promise that resolves to true if passwords match, false otherwise.
 * @throws {Error} If comparison fails (e.g., invalid hash format).
 */
export const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        if (!plainPassword || typeof plainPassword !== 'string') {
            throw new Error('Plain password must be a non-empty string for comparison.');
        }
        if (!hashedPassword || typeof hashedPassword !== 'string') {
            throw new Error('Hashed password must be a non-empty string for comparison.');
        }
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error.message);
        throw new Error('Failed to compare passwords.');
    }
};