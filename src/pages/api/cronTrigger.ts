import { NextApiRequest, NextApiResponse } from  'next/types';
import { sendScheduledEmails } from './schedule';
// Assuming schedule.ts is in the same directory
import cron from 'node-cron';

// Schedule the function to run every minute
cron.schedule('* * * * *', sendScheduledEmails);

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('Cron job is running.');
};
