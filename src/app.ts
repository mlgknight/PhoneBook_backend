const express = require('express');
import { contactRouter } from './routes/contact.routes';
import infoRouter from './routes/info.routes';
import { Request, Response } from 'express';
const morgan = require('morgan');

const app = express();
const hostname = 'localhost';

const PORT = process.env.PORT || 3001;

// middleware to parse JSON bodies
app.use(express.static('dist'))
app.use(express.json());
morgan.token('body', (req : Request) => JSON.stringify(req.body));

// Custom format: dev format + request body at the end
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use('/api/contacts', contactRouter);
app.use('/api/info', infoRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('New Contact API');
});

app.listen(PORT, hostname, () => {
	console.log(`Server started on port ${hostname} ${PORT}`);
});

export default app;
