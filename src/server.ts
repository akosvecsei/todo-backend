import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
