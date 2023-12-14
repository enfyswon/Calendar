let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "192.168.0.174",
  user: "root",
  password: "P@ssword1!",
  database: "calendarDB",
});

connection.connect(function (err) {
  if (err) {
    return console.error("error : " + err.message);
  }

  let createBook =
    "create table if not exists book(" +
    "    book_id int PRIMARY KEY AUTO_INCREMENT," +
    "    book_date date NOT NULL," +
    "    book_title varchar(450) NOT NULL," +
    "    book_author varchar(450) NOT NULL," +
    "    book_publisher varchar(450) NOT NULL," +
    "    book_star varchar(45) DEFAULT NULL," +
    "    book_review varchar(4000) DEFAULT NULL," +
    "    book_thumbnail varchar(450) DEFAULT NULL)";
  connection.query(createBook, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});
