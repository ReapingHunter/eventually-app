import cron from 'node-cron';
import Event from '../src/models/event.model.js';
import RSVP from '../src/models/rsvp.model.js';
import Notification from '../src/models/notification.model.js';

cron.schedule('0 9 * * *', async () => {
  try {
    const upcomingEvents = await Event.findUpcoming(); // Events in next 24 hours

    for (const event of upcomingEvents) {
      const rsvpList = await RSVP.findByEventId(event.event_id);

      const message = `Reminder: The event "${event.title}" is happening soon!`;

      await Promise.all(
        rsvpList.map(async (rsvp) => {
          await Notification.create({
            rsvp_id: rsvp.rsvp_id,
            message,
          });
        })
      );

      console.log(`Notifications sent for event "${event.title}"`);
    }
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
});