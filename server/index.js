import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

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

/* Mongoose / MongoDB SETUP */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server connected on Port ${PORT}.`));
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
*/
