var path = require('path');
var games = require('../controllers/games.js')
var players = require('../controllers/players.js')
module.exports = function(app){
    app.post('/api/login', function(req, res){
        players.getUser(req, res)
    })
    app.post('/api/registration', function(req, res){
        console.log("go to the routes")
        players.createUser(req, res)
    })
    app.post('/api/games', function(req, res){
        games.createGames(req, res)
    })  
    app.get('/api/games', function(req, res){
        games.getAll(req, res)
    })
    app.get('/api/users/:id', function(req, res){
        players.getPlayerById(req, res)
    })
    app.delete('/api/games/:id', function(req, res){
        games.deletePet(req, res)
    })
    app.get('/api/games/:id', function(req, res){
        games.getGameById(req, res)
    })
    app.put('/api/games/:id', function(req, res){
        games.updatePet(req, res)
    })
    app.patch('/api/games/like/:id', function(req, res){
        games.likePet(req, res)
    })
    app.get('/api/join/:id', function(request,response){
        Pets.joinGame(request,response);
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/src/app/app.component.html"))
      });

    app.post('/api/players', function(req, res){
        players.create(req, res)
    })  
    app.get('/api/players', function(req, res){
        players.getAll(req, res)
    })
    app.delete('/api/players/:id', function(req, res){
        players.deletePet(req, res)
    })
    app.get('/api/players/:id', function(req, res){
        players.getPetById(req, res)
    })
    app.put('/api/players/:id', function(req, res){
        players.updatePet(req, res)
    })
    app.patch('/api/players/like/:id', function(req, res){
        players.likePet(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/src/app/app.component.html"))
      })
}