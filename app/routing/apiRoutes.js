// var path = require('path')

var friends = require("../data/friends.js");

module.exports = function (app)
{
  app.get("/api/friends", function (req, res)
  {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res)
  {
    var input = req.body;
    var answers = input.score;
    for (var i = 0; i < answers.length; i++) {
      answers[i] = parseInt(answers[i]);
    }
    var maxDifference = 10000;
    var name = ''
    var photo = ''

    for (var i = 0; i < friends.length; i++) {
      var difference = 0;
      for (var j = 0; j < answers.length; j++) {
        difference += Math.abs(friends[i].score[j] - answers[j])
      }

      if (difference < maxDifference) {
        maxDifference = difference
        photo = friends[i].photo
        name = friends[i].name
      }
    }

    friends.push(input);

    res.json({ status: 'OK', name: name, photo: photo })

  });
};