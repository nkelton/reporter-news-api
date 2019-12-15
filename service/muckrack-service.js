const request = require("request");
const cheerio = require("cheerio");
const config = require("../config");
const Story = require("../models/Story");
const Reporter = require("../models/Reporter");

module.exports = {
  getStoriesFor
};

async function getStoriesFor(res, next, reporter) {
  await request(
    config.muckHost + reporter + "/articles",
    { json: true },
    (err, resp, body) => {
      if (err) {
        next(err);
      }
      const reporterData = scapeStoryData(body);
      saveStories(reporter, reporterData);

      return res.json(reporterData);
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

async function saveStories(name, stories) {
  const reporter = await Reporter.findOne({ name: name });

  let reporterId;
  if (reporter === null) {
    const newReporter = new Reporter({ name: name, description: null });
    await newReporter.save();
    reporterId = await Reporter.findOne({ name: name })._id;
  } else {
    reporterId = reporter._id;
  }

  for (const story of stories) {
    story.creatorId = reporterId;
    if (
      (await Story.findOne({
        creatorId: story.creatorId,
        link: story.link
      })) === null
    ) {
      const newStory = new Story(story);
      await newStory.save();
    }
  }
}
