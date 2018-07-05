var mongoose = require('mongoose');
var Player = mongoose.model('Player');
// var session = require('../../server.js')

module.exports = {
    createUser : function(req, res){
        // console.log(req.body)
        // console.log(req.params)
        console.log("got to the controller")
        Player.find({email: req.body.email}, function(err, player){
            console.log('player',player)
            if(player.length > 0){
                res.json({message : "That email is taken"})
            }
            else{
                var player = new Player({username : req.body.username, email: req.body.email, password: req.body.password})
                console.log("new player is",player._id)
                var id = player._id
                player.save(function(err){
                    if(err){
                        console.log('error', player.errors)
                        res.json({message : player.errors})
                    }
                    else{
                        // console.log(req)
                        
                        // req.session.id = id;
                        console.log("your request",req)
                        console.log("your player id is",player)
                        res.json({message : "success"})
                    }
                })
               
            }
        })
        
    },
    getAll : function(req, res){
        Player.find({}, function(err, players){
            if(err){
                res.json({error : err})
            }
            else{
                res.json({players : players})
            }
        })
    },
    deletePlayer : function(req, res){
        Player.remove({_id: req.params.id}, function(err){
            if(err){
                res.json({status : 'error'})
            }
            else{
                Player.find({}, function(err, players){
                    if(err){
                        res.json({status : 'error'})
                    }
                    else{
                        res.json({status: 'success', players : players})
                    }
                })
            }
        })
    },
    getUser : function(req, res){
        console.log(req.body.email)
        Player.findOne({email : req.body.email}, function(err, player){
            if(err){
                res.json({status : 'error'})
            }
            else{
                console.log("player is",player)
                // res.session.id = player._id;    
                // console.log("response is",res)
                // console.log("your request",req.socket.id)
                res.json({status : 'success', player : player, session: player._id})
            }
        })
    },
    getPlayerById : function(req, res){
        console.log(req.params.id)
        Player.findOne({_id : req.params.id}, function(err, player){
            if(err){
                res.json({status : 'error'})
            }
            else{
                console.log("player is",player)
                // res.session.id = player._id;    
                // console.log("response is",res)
                // console.log("your request",req.socket.id)
                res.json({status : 'success', player : player, session: player._id})
            }
        })
    },
    updatePlayer : function(req, res){
        Player.findOne({_id : req.params.id}, function(err, player){
            if(err){
                console.log('error')
                res.json({status : 'error'})
            }
            else{
                console.log(req)
                player.name = req.body.name;
                player.type = req.body.type
                player.des = req.body.des
                player.skill1 = req.body.skill1
                player.skill2 = req.body.skill2
                player.skill3 = req.body.skill3
                console.log(player)
                player.save(function(err){
                    if(err){
                        console.log(err)
                        res.json({status : 'error'})
                    }
                    else{
                        console.log('success')
                        res.json({status : 'success'})
                    }
                })
            }
        })
    },
    likePlayer : function(req, res){
        Player.findOne({_id : req.params.id}, function(err, player){
            if(err){
                console.log('error')
                res.json({status : 'error'})
            }
            else{
                console.log(req)
                if(!player.likes){
                    player.likes = 1
                }else{
                    player.likes++

                }
                console.log(player)
                player.save(function(err){
                    if(err){
                        // console.log(err)
                        res.json({status : 'error'})
                    }
                    else{
                        // console.log('success')
                        res.json({status : 'success', player: player})
                    }
                })
            }
        })
    }
}