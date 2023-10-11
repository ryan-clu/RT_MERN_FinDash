import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;

/* Notes
const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
- limit to 50 entries, sorted by/taking the latest entries 

*/