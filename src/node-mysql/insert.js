let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

let stmt = 'INSERT INTO calendarDB.book(book_date, book_title, book_author, book_publisher)'
            + 'VALUES(NOW(), ?, ?, ?)';
let book = ['Abc', 'Gaskin Georgie', 'Art Books'];

connection.query(stmt, book, (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Book Id : ' + results.insertId);
});

connection.end();