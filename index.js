var hapi = require('hapi');
var halacious = require('halacious');
//require('hapi-negotiator');

var server = new hapi.Server();
server.connection({ port: 8080 });

server.register(halacious, function(err){
    if (err) console.log(err);
});

function Movie(id, firstName, lastName, actors) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.actors = actors;
    // this.googlePlusId = googlePlusId;
}

Movie.prototype.toHal = function(rep, next) {
    // if (this.googlePlusId) {
    //     rep.link('home', 'http://plus.google.com/' + this.googlePlusId);
    //     rep.ignore('googlePlusId');
    // }
    next();
};

var actors = [
    { id: 0, name: 'John Travolta'},
    { id: 1, name: 'Samuel Jackson'},
    { id: 2, name: 'Pam Grier'}
];

server.route([
    {
        method: 'get',
        path: '/movies',
        config: {
            handler: function (req, reply) {
                reply({
                    start: 0,
                    count: 2,
                    limit: 2,
                    items: [
                        new Movie(101, 'Pulp Fiction', [0, 1]),
                        new Movie(102, 'Jackie Brown', [1, 2])
                    ]
                });
            },
            plugins: {
                //'hapi-negotiator': {
                //    mediaTypes: {
                //        'application/xml': false,
                //        'application/json': false,
                //        'application/hal+json': true
                //    }
                //},
                hal: {
                    embedded: {
                        item: {
                            path: 'items',
                            href: './{item.id}'
                        }
                    }
                }
            }
        }
    },
    {
        method: 'get',
        path: '/actors/{actorId}',
        config: {
            handler: function (req, reply) {
                reply(actors[req.params.userId]);
            }
        }
    }
]);


server.start(function(err){
    if (err) return console.log(err);
    console.log('Server started at %s', server.info.uri);
});