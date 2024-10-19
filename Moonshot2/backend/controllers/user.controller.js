import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = [];

// Signup
export const signup = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User created');
};

// Login
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.send('Login successful');
};

// Logout
export const logout = (req, res) => {
    res.clearCookie('token');
    res.send('Logout successful');
};
