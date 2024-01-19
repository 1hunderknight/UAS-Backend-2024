const db = require("../config/database");

class News {
  constructor(news) {
    this.id = news.id;
    this.title = news.title;
    this.author = news.author;
    this.content = news.content;
    this.url = news.url;
    this.url_image = news.url_image;
    this.published_at = news.published_at;
    this.category = news.category;
    this.timestamp = news.timestamp;
  }

  static all(callback) {
    db.query("SELECT * FROM news", (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const news = results.map((result) => new News(result));
      callback(null, news);
    });
  }

  static create(newNews, callback) {
    db.query("INSERT INTO news SET ?", newNews, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const createdNews = new News({ id: result.insertId, ...newNews });
      callback(null, createdNews);
    });
  }

  static update(id, updatedNews, callback) {
    db.query("UPDATE news SET ? WHERE id = ?", [updatedNews, id], (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }

  static delete(id, callback) {
    db.query("DELETE FROM news WHERE id = ?", id, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }

  static find(id, callback) {
    db.query("SELECT * FROM news WHERE id = ?", id, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback({ message: "Resource not found", statusCode: 404 }, null);
      }
      const news = new News(results[0]);
      callback(null, news);
    });
  }

  static search(title, callback) {
    db.query("SELECT * FROM news WHERE title LIKE ?", `%${title}%`, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback({ message: "Resource not found", statusCode: 404 }, null);
      }
      const news = results.map((result) => new News(result));
      callback(null, news);
    });
  }

  static findByCategory(category, callback) {
    db.query("SELECT * FROM news WHERE category = ?", category, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback({ message: "Resource not found", statusCode: 404 }, null);
      }
      const news = results.map((result) => new News(result));
      callback(null, news);
    });
  }
}

module.exports = News;
