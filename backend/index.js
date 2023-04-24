const express = require('express');
const app = express();
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const mongoose = require('mongoose');

// const corsOptions = {
//   origin: 'http://localhost:4200'
// };


mongoose.connect('mongodb://localhost:27017/test-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));  

app.use(cors());

app.use(express.json());

// Mount product routes
app.use('/products', productRoutes);

// Mount auth routes
app.use('/auth', authRoutes);

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
