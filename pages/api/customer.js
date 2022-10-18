import fsPromises from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const cardPath = path.join(process.cwd(), 'data/cards.json');
  const cardData = await fsPromises.readFile(cardPath);
  const cards = JSON.parse(cardData);
  const detailPath = path.join(process.cwd(), 'data/card-details.json');
  const detailData = await fsPromises.readFile(detailPath);
  const details = JSON.parse(detailData);

  let transactions = cards.map(c => {
    let dts = details.filter(d => d.transactionid === c.id);
    c["details"] = dts;
    return c;
  });

  const txnPath = path.join(process.cwd(), 'data/transactions.json');
  fsPromises.writeFile(txnPath, JSON.stringify(transactions));

  res.status(200).json(transactions.slice(0, 10));
}