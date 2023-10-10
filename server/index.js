import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';

import Product from './models/Product.js';
import KPI from './models/KPI.js';
import { kpis, products } from './data/data.js';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/kpi', kpiRoutes);
app.use('/products', productRoutes);

/* Mongoose / MongoDB SETUP */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server connected on Port ${PORT}.`));

    /* ADD DATA ONE TIME ONLY -- OR -- AS NEEDED */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
  })
  .catch((error) => console.log(`${error} did not connect.`));

/* Note
- For our server/backend API we are using ES Modules 
instead of CommonJS so in package.json - set => "type": "module"

- helmet:	api endpoint security
- morgan:	handles console logs, so that anytime we hit an endpoint 
its going to console log information

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
- the two lines above are body parsing middleware, to parse raw JSON
and to be able to send/receive form data. 
- without these two lines requests (req) will be undefined. with them
you get an object body.

- cors: handles cross origin resource sharing requests so that 
you can call from a different URL

- THIS IS A NOW OUTDATED VERSION OF CONNECTING TO MONGODB. SEE AUTH APP
FOR EX OF UP TO DATE METHOD. 

- I am seeding database with generated data. 
await mongoose.connection.db.dropDatabase();
this line will drop existing/current db so we do not have duplicate
data and run into errors. 
- For development and testing purposes this is fine.
- DO NOT DO THIS ON PRODUCTION/ENTERPRISE APPS. DO NOT DELETE DATA.
*/
