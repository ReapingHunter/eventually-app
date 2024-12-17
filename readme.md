
Eventually
==========

***

An event management web application 

### Features:
- [ ] User authentication (sign up, log in, reset password)
- [ ] Create, update, and delete events
- [ ] RSVP functionality and event reminders
- [ ] Notification system for upcoming events
- [ ] Event filtering (date, location, category)
- [ ] (Optional) Integration with Google Calendar or Apple Calendar

### Installation:
#### Prerequisites:
- NodeJS
- Xampp
- GitBash

#### Installation Steps:
1. Enter git bash
2. Change directory to desired path with `cd`
3. Copy and paste with `https://github.com/ReapingHunter/eventually-app.git`

#### Set up and run the backend
1. Open XAMPP
2. Enable Apache and MySQL
3. Enter admin on MySQL
4. Import `eventuallydb.sql`
5. Open Git Bash
6. Proceed to the repository's backend folder with `cd eventually-app/backend`
7. Install dependencies with `npm ci`
(if there are warnings, run `npm audit fix` if prompted. The backend should still run.)
8. Run the backend with `node index`
   
#### Set up the frontend
1. Open Git Bash
2. Proceed to repository's frontend folder with `cd eventually-app/frontend`
3. Install dependencies with `npm ci`
(if there are warnings, run `npm audit fix` if prompted. The backend should still run.)
4. run the frontend with `npm run dev`
