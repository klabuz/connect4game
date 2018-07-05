var express = require('express');
var app  = express();
var bodyParser = require('body-parser')
var socket = require('socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


var path = require('path');
app.use(express.static(path.join(__dirname, '/public/dist/public')))
app.set('views', path.join(__dirname, '/public/dist'))


require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

var server = app.listen(4000, function(){
    console.log("listening on port 4000")
})
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    socket.on('turn', function(data){
        io.sockets.emit('update', {data: data});
    });
    socket.on('createRoom', function(data){
        console.log('createroom is here',data)
        io.sockets.emit('create', {data: data});
    });
});