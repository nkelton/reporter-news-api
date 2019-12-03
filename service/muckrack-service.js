const request = require("request");
const cheerio = require("cheerio");
const config = require("../config");

module.exports = {
  getStoriesFor
};

async function getStoriesFor(res, next, reporter) {
  request(
    config.muckHost + reporter + "/articles",
    { json: true },
    (err, resp, body) => {
      if (err) {
        next(err);
      }
      const reporterData = scapeStoryData(body);
      res.json(reporterData);
    }
  );
}

function scapeStoryData(body) {
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
  return reporterData;
}
