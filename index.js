var hapi = require('hapi');
var halacious = require('halacious');

var server = new hapi.Server();
server.connection({ port: 8080 });

server.register({
    register: halacious,
    options: {
        mediaTypes: ['application/hal+json'],
        apiPath: ''
    }
}, function(err){
    if (err) console.log(err);
});

server.route(require('./routes'));

server.start(function(err){
    if (err) return console.log(err);
    console.log('Server started at %s', server.info.uri);
});