var mongoose = require("mongoose");
var Game = mongoose.model("Game");

module.exports = {
  createGames: function(req, res) {
    // console.log(req.body)
    // console.log(req.params)
   
        var game = new Game({
          player1: req.body.player1,
          player2: req.body.player2,
          creator: req.body.creator,
          size: req.body.size,
          state: req.body.state,
          finished: req.body.finished,
          winner: req.body.winner,
        });
        game.save(function(err) {
          if (err) {
            res.json({ message: game.errors });
          } else {
            res.json({ message: "success", game: game });
          }
        });
      

  },
  getAll: function(req, res) {
    Game.find({}, function(err, games) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({message: "success", games: games });
      }
    });
  },
  deleteGame: function(req, res) {
    Game.remove({ _id: req.params.id }, function(err) {
      if (err) {
        res.json({ status: "error" });
      } else {
        Game.find({}, function(err, games) {
          if (err) {
            res.json({ status: "error" });
          } else {
            res.json({ status: "success", games: games });
          }
        });
      }
    });
  },
  getGameById: function(req, res) {
    Game.findOne({ _id: req.params.id }, function(err, game) {
      if (err) {
        res.json({ status: "error" });
      } else {
        res.json({ status: "success", game: game });
      }
    });
  },
  updateGame: function(req, res) {
    Game.findOne({ _id: req.params.id }, function(err, game) {
      if (err) {
        console.log("error");
        res.json({ status: "error" });
      } else {
        console.log(req);
        game.name = req.body.name;
        game.player1 = req.body.player1,
        game.player2 = req.body.player2,
        game.creator = req.body.creator,
        game.size = req.body.size,
        game.state = req.body.state,
        game.finished = req.body.finished,
        game.winner = req.body.winner,
        console.log(game);
        game.save(function(err) {
          if (err) {
            console.log(err);
            res.json({ status: "error" });
          } else {
            console.log("success");
            res.json({ status: "success" });
          }
        });
      }
    });
  },
  likeGame: function(req, res) {
    Game.findOne({ _id: req.params.id }, function(err, game) {
      if (err) {
        console.log("error");
        res.json({ status: "error" });
      } else {
        console.log(req);
        if (!game.likes) {
          game.likes = 1;
        } else {
          game.likes++;
        }
        console.log(game);
        game.save(function(err) {
          if (err) {
            // console.log(err)
            res.json({ status: "error" });
          } else {
            // console.log('success')
            res.json({ status: "success", game: game });
          }
        });
      }
    });
  },
  joinGame(request, response) {
    var id = request.params.id; //or request.params['id'];
    console.log("The game id requested is:", id);
    Game.update(
      { _id: id },
      {
        $inc: {
          join: 1
        }
      },
      function(err, doc) {
        if (doc.nModified == 1) {
          response.json({ updated: doc });
        } else {
          response.json({ error: err });
        }
      }
    );
  }
};
