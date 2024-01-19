// NewsController.js

const News = require("../models/News");

class NewsController {
  index(req, res) {
    News.all((err, news) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
      }
      if (news.length > 0) {
        return res.status(200).json({ message: "Get All Resource", data: news });
      } else {
        return res.status(200).json({ message: "Data is empty" });
      }
    });
  }

  store(req, res) {
    const newNews = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      url: req.body.url,
      url_image: req.body.url_image,
      published_at: req.body.published_at,
      category: req.body.category,
      timestamp: req.body.timestamp,
    };

    News.create(newNews, (err, createdNews) => {
      if (err) {
        return res.status(422).json({ message: "All fields must be filled correctly", error: err });
      }
      return res.status(201).json({ message: "Resource is added successfully", data: createdNews });
    });
  }

  update(req, res) {
    const id = req.params.id;
    const updatedNews = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      url: req.body.url,
      url_image: req.body.url_image,
      published_at: req.body.published_at,
      category: req.body.category,
      timestamp: req.body.timestamp,
    };

    News.update(id, updatedNews, (err) => {
      if (err) {
        return res.status(404).json({ message: "Resource not found", error: err });
      }
      return res.status(200).json({ message: "Resource is update successfully", data: updatedNews });
    });
  }

  destroy(req, res) {
    const id = req.params.id;

    News.delete(id, (err) => {
      if (err) {
        return res.status(404).json({ message: "Resource not found", error: err });
      }
      return res.status(200).json({ message: "Resource is delete successfully" });
    });
  }

  show(req, res) {
    const id = req.params.id;

    News.find(id, (err, news) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message, error: err });
      }
      return res.status(200).json({ message: "Get Detail Resource", data: news });
    });
  }

  search(req, res) {
    const title = req.params.title;

    News.search(title, (err, news) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message, error: err });
      }
      return res.status(200).json({ message: "Get searched resource", data: news });
    });
  }

  sport(req, res) {
    News.findByCategory("sport", (err, news) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message, error: err });
      }
      return res.status(200).json({ message: "Get sport resource", total: news.length, data: news });
    });
  }

  finance(req, res) {
    News.findByCategory("finance", (err, news) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message, error: err });
      }
      return res.status(200).json({ message: "Get finance resource", total: news.length, data: news });
    });
  }

  automotive(req, res) {
    News.findByCategory("automotive", (err, news) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message, error: err });
      }
      return res.status(200).json({ message: "Get automotive resource", total: news.length, data: news });
    });
  }
}

module.exports = new NewsController();
