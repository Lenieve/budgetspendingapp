const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./routes/authRoutes');
const spendingRoutes = require('./routes/spendingRoutes');
const fixedExpenseRoutes = require('./routes/fixedExpenseRoutes');
const flagRoutes = require('./routes/flagRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/spending', spendingRoutes);
app.use('/api/fixedexpense', fixedExpenseRoutes);
app.use('/api/flag', flagRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
