import express from 'express';
import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
// import { resolve, dirname } from 'path';

import userRoute from './routes/user.js';
import companyRoute from './routes/company.js';
import reservRoute from './routes/reservation.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
mongoose.connect(`mongodb+srv://${process.env.VITE_MONGO_USR}:${process.env.VITE_MONGO_PWD}@cluster0.71wjekv.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0`,
  { serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/users', userRoute);
app.use('/api/companies', companyRoute);
app.use('/api/reservations', reservRoute);

//app.use('/images', express.static(resolve(dirname(import.meta.url))));

export default app;