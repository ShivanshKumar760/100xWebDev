import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory database
const db = {//mongodb data base with two collection users and quizzes
  users: [],
  quizzes: []
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password && u.role === role);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, role } = req.body;
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  const user = { id: Date.now(), email, password, role };
  db.users.push(user);
  res.json({ success: true, user });
});

// Quiz routes
app.get('/api/quizzes', (req, res) => {
  res.json(db.quizzes);
});

app.post('/api/quizzes', (req, res) => {
  const quiz = { id: Date.now(), ...req.body };
  db.quizzes.push(quiz);
  res.json(quiz);
});

app.put('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const index = db.quizzes.findIndex(q => q.id === parseInt(id));
  if (index !== -1) {
    db.quizzes[index] = { ...db.quizzes[index], ...req.body };
    res.json(db.quizzes[index]);
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
});

app.delete('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const index = db.quizzes.findIndex(q => q.id === parseInt(id));
  if (index !== -1) {
    db.quizzes.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});