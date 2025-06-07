import { Router } from 'express';
import { Request, Response } from 'express';
import type { contact } from '../types/types';

export let contacts: contact[] = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

export const contactRouter = Router();

contactRouter.get('/', (req: Request, res: Response) => {
	console.log(contacts);
	res.json(contacts);
});

contactRouter.post('/', (req: Request, res: Response) => {
	const userFound = contacts.find((contact) => contact.name == req.body.name);

	if (!req.body.name) {
		return res.status(400).json({ error: 'Name data is required' });
	} else if (!req.body.number) {
		return res.status(400).json({ error: 'Number data is required' });
	} else if (userFound) {
		return res.status(400).json({
			error: `Cannot add user as ${userFound.name} is already in the database`,
		});
	}
	const newContact = { id: (contacts.length + 1).toString(), ...req.body };
	contacts.push(newContact);
	res.status(201).json(newContact);
});

contactRouter.get('/:id', (req: Request, res: Response) => {
	const userId = req.params.id;
	const user = contacts.find((contact) => contact.id === userId);

	if (user) {
		res.send(user);
	} else {
		res.status(404).json({ error: 'User not found' });
	}
});

contactRouter.delete('/:id', (req: Request, res: Response) => {
	const userId = req.params.id;

	const initialLength = contacts.length;
	contacts = contacts.filter((contact) => contact.id !== userId);

	if (contacts.length < initialLength) {
		console.log(contacts);
		res.status(204).end();
	} else {
		res.status(404).json({ error: 'User not found' });
	}
});
