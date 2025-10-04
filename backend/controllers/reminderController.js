import Reminder from '../models/Reminder.js';
import SocialMediaApp from '../models/SocialMediaApp.js';

async function createReminder(req, res) {
  try {
    const appId = req.headers.authorization.split(' ')[1];

    if (!appId) {
      return res.status(400).json({ error: 'appId is required.' });
    }

    const { reminder, date } = req.body;

    if (!reminder || !date) {
      return res.status(400).json({ error: 'Reminder text and date are required.' });
    }

    // Prevent reminders with past dates
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return res.status(400).json({ error: 'Reminder date cannot be before today.' });
    }

    // Find the social media app
    const socialMediaApp = await SocialMediaApp.findById(appId);
    if (!socialMediaApp) {
      return res.status(404).json({ error: 'Social media app not found.' });
    }

    // Create a new reminder
    const newReminder = new Reminder({ app: appId, reminder, date });
    await newReminder.save();

    // Add the reminder ID to the social media app
    socialMediaApp.reminders.push(newReminder._id);
    await socialMediaApp.save();

    // Fetch all reminders for this app and return them
    const updatedReminders = await Reminder.find({ app: appId });

    res.status(201).json({
      message: 'Reminder added successfully',
      reminders: updatedReminders, // Return all reminders
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding reminder:', error);
    res.status(500).json({ error: error.message });
  }
}



async function getRemindersByApp(req, res) {
  try {
    // Fetch all reminders for the given appId
    const reminders = await Reminder.find({ app: req.params.appId });

    // If no reminders are found, return an empty array
    if (reminders.length === 0) {
      return res.json([]);
    }

    // Respond with the list of reminders
    res.json(reminders);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching reminders:', error);
    res.status(500).json({ error: error.message });
  }
}

export { createReminder, getRemindersByApp };
