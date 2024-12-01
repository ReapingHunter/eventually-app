import mysql from 'mysql';

const dbConn = mysql.createConnection({
    host    : 'localhost',
    user    : 's20100901_eventuallyDB',
    password: '', //ERASE BEFORE COMMIT
    database: 's20100901_eventuallyDB'
});

dbConn.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
    console.log('Connected to Database');
});

export default dbConn;