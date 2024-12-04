import mysql from 'mysql2'

const dbConn = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '', //ERASE BEFORE COMMIT
    database: 'eventuallydb'
});

dbConn.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
    console.log('Connected to Database');
});

export default dbConn;