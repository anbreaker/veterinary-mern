import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Connect to DB
import { connectDB } from './database/db.config.js';

connectDB();

// Routes
import veterinaryRoutes from './routes/veterinary.routes.js';
import patientsRoutes from './routes/patient.routes.js';

// Initializations
export const app = express();

// middlewares

// comunications with other servers with configuration
const allowedDomains = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// Helmet can help protect your app from some well-known web vulnerabilities
// by setting HTTP headers appropriately.
app.use(helmet());

// sms servers develops
app.use(morgan('dev'));

// format json to object
app.use(json());

// Data format form
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/veterinarians', veterinaryRoutes);
app.use('/api/patients', patientsRoutes);
