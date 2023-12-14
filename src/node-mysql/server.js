const express = require("express"); // npm i express | yarn add express
const cors = require("cors"); // npm i cors | yarn add cors
const mysql = require("mysql"); // npm i mysql | yarn add mysql
const app = express();
const PORT = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
  host: "localhost", // 호스트
  user: "root", // 데이터베이스 계정
  password: "0000", // 데이터베이스 비밀번호
  db: "calendarDB", // 사용할 데이터베이스
});

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// post 요청 시 값을 객체로 바꿔줌
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.get(`/api/booklist`, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery =
    "SELECT" +
    "    book_id" +
    "    , DATE_FORMAT(BOOK_DATE, '%Y-%m-%d')	AS book_date" +
    "    , book_title" +
    "    , book_author" +
    "    , book_publisher" +
    "    , book_star" +
    "    , book_review" +
    "    , book_thumbnail" +
    "  FROM calendardb.book" +
    " ORDER BY book_date DESC";

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/bookday/:date", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { date } = req.params;
  const sqlQuery =
    "SELECT" +
    "    book_id" +
    "    , DATE_FORMAT(BOOK_DATE, '%Y-%m-%d')	AS book_date" +
    "    , book_title" +
    "    , book_author" +
    "    , book_publisher" +
    "    , book_star" +
    "    , book_review" +
    "    , book_thumbnail" +
    "  FROM calendardb.book" +
    " WHERE book_date = ?" +
    " ORDER BY book_id";

  db.query(sqlQuery, [date], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //res.send("Select Day Success");
      res.send(result);
    }
  });
});

app.get("http://172.30.1.33/api/bookid/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const sqlQuery =
    "SELECT" +
    "    book_id" +
    "    , DATE_FORMAT(BOOK_DATE, '%Y-%m-%d')	AS book_date" +
    "    , book_title" +
    "    , book_author" +
    "    , book_publisher" +
    "    , book_star" +
    "    , book_review" +
    "    , book_thumbnail" +
    "  FROM calendardb.book" +
    " WHERE book_id = ?";

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //res.send("Select Day Success");
      res.send(result);
    }
  });
});

app.post("/api/insertBook", (req, res) => {
  console.log(req.body);
  const date = req.body.date;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const star = req.body.star;
  const review = req.body.review;
  const thumbnail = req.body.thumbnail;

  console.log(author.size);

  db.query(
    "INSERT INTO CALENDARDB.BOOK (BOOK_DATE, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_STAR, BOOK_REVIEW, BOOK_THUMBNAIL)" +
      "VALUES (?, ?, ?, ?, ?, ?, ?)",
    [date, title, author, publisher, star, review, thumbnail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insert Success");
      }
    }
  );
});

app.put("/api/updateBook", (req, res) => {
  console.log("update");
  console.log(req.body);
  const id = req.body.book_id;
  const date = req.body.date;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const review = req.body.review;
  const thumbnail = req.body.thumbnail;

  db.query(
    "UPDATE CALENDARDB.BOOK SET BOOK_DATE = ?" +
      "                       , BOOK_TITLE = ?" +
      "                       , BOOK_AUTHOR = ?" +
      "                       , BOOK_PUBLISHER = ?" +
      "                       , BOOK_REVIEW = ?" +
      "                       , BOOK_THUMBNAIL = ?" +
      "WHERE BOOK_ID = ?",
    [date, title, author, publisher, review, thumbnail, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("Update Success");
      }
    }
  );
});

app.put("/api/updateBook", (req, res) => {
  console.log("update");
  console.log(req.body);
  const id = req.body.book_id;
  const date = req.body.date;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const review = req.body.review;
  const thumbnail = req.body.thumbnail;

  db.query(
    "UPDATE CALENDARDB.BOOK SET BOOK_DATE = ?" +
      "                       , BOOK_TITLE = ?" +
      "                       , BOOK_AUTHOR = ?" +
      "                       , BOOK_PUBLISHER = ?" +
      "                       , BOOK_REVIEW = ?" +
      "                       , BOOK_THUMBNAIL = ?" +
      "WHERE BOOK_ID = ?",
    [date, title, author, publisher, review, thumbnail, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("Update Success");
      }
    }
  );
});

app.delete("/api/delete/:book_id", (req, res) => {
  const { book_id } = req.params;
  db.query(
    "DELETE FROM CALENDARDB.BOOK WHERE BOOK_ID = ?",
    [book_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Delete Success");
      }
    }
  );
});
