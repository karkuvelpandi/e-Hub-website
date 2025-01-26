import bcrypt from 'bcrypt';

const users = []; // Mock database

// Add user
export const addUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
};

// Find user by email
export const findUser = (email) => users.find((user) => user.email === email);


