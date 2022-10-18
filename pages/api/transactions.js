import fsPromises from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const txnPath = path.join(process.cwd(), 'data/transactions.json');
  const txnData = await fsPromises.readFile(txnPath);
  const txns = JSON.parse(txnData);

  for (let index = 0; index < Math.ceil(txns.length / 1000); index++) {
    const txnPath = path.join(process.cwd(), `data/transactions_${((index * 1000) + 1).toString().padStart(5, '0')}-${((index + 1) * 1000).toString().padStart(5, '0')}.json`);
    const txns_i = txns.slice((index * 1000), (index + 1) * 1000 - 1);
    fsPromises.writeFile(txnPath, JSON.stringify(txns_i));
  }

  res.status(200).json({
    txns: txns.slice(0, 10),
    counnt: txns.length,
    page: Math.ceil(txns.length / 1000)
  });
}