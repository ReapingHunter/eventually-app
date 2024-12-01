import mysql from 'mysql';

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '{password here}s', //ERASE BEFORE COMMIT
    database: 'eventuallyDB'
});

dbConn.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
    console.log('Connected to Database');
});

export default dbConn;