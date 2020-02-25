import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

// routes
import postRoutes from './routes/api/posts';

const { MONGO_URI } = config;

const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const db = `${MONGO_URI}`;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/posts', postRoutes);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

export default app;