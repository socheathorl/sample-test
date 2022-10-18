import fsPromises from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
	const { id } = req.query;
	console.log(id);
	const txnPath = path.join(process.cwd(), `data/${id}.json`);
	const txnData = await fsPromises.readFile(txnPath);
	const transactions = JSON.parse(txnData);
	// .map(c => {
	// 	c.beginningbalance = parseFloat(c.beginningbalance).toFixed(5);
	// 	c.enidngbalance = parseFloat(c.enidngbalance).toFixed(5);
	// 	c.enidingpoint = parseFloat(c.enidingpoint).toFixed(5);
	// 	c.details = c.details.map(d => {
	// 		d.begining = parseFloat(d.begining).toFixed(5);
	// 		d.value = parseFloat(d.value).toFixed(5);
	// 		d.ending = parseFloat(d.ending).toFixed(5);
	// 		d.exchangerate = parseFloat(d.exchangerate).toFixed(5);
	// 		return d;
	// 	});
	// 	return c;
	// });

	res.status(200).json(transactions);
}