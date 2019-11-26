var express = require("express");
var router = express.Router();
var config = require("../config.js");
const request = require("request");
const cheerio = require("cheerio");

/* GET articles. */
router.get("/articles", async function(req, res, next) {
  const reporter = req.query.reporter;

  request(
    "https://muckrack.com/" + reporter + "/articles",
    { json: true },
    (err, resp, body) => {
      if (err) {
        console.log("Error!");
        return console.log(err);
      }
      const $ = cheerio.load(body);
      let reporterData = [];
      $(".news-story").each(function(i, elm) {
        const title = $(elm)
          .children(".news-story-title")
          .text();
        const link = $(elm)
          .children(".news-story-title")
          .children("a")
          .attr("href");
        let description = $(elm)
          .children(".row")
          .children(".news-story-body.col-xs-12")
          .text();
        const offset = description.indexOf("—") + 1;
        description = description.substring(offset).trim();
        const published = $(elm)
          .children("div.row")
          .children(".news-story-meta.col-xs-12")
          .children("a")
          .attr("title");
        reporterData.push({
          title: title,
          link: link,
          description: description,
          published: published
        });
      });
      res.json(reporterData);
    }
  );
});

module.exports = router;
