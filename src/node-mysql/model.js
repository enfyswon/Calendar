const sql = require("./index.js");

// constructor
const BookDB = function(book) {
    this.title = book.title;
    this.author = book.author;
    this.date = book.date;
    this.publisher = book.publisher;
    this.star = book.star;
    this.review = book.review;
    this.thumbnail = book.thumbnail;
};

BookDB.create = (newBookDB, result) => {
    sql.query("INSERT INTO book SET ?", newBookDB, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        //console.log("create book : ", { id: res.})
    })
}