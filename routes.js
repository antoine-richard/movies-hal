var _ = require('lodash');
var movies = require('./models/movies');
var actors = require('./models/actors');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/movies',
            config: {
                handler: function (req, reply) {
                    reply({
                        count: movies.size,
                        items: movies
                    });
                },
                plugins: {
                    hal: {
                        embedded: {
                            movies: {
                                path: 'items',
                                href: './{item.id}'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/movies/{movieId}',
            config: {
                handler: function (req, reply) {
                    reply(_.find(movies, { id: req.params.movieId }));
                },
                plugins: {
                    hal: {
                        embedded: {
                            actors: {
                                path: 'actors',
                                href: '/actors/{item.id}'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/actors/{actorId}',
            config: {
                handler: function (req, reply) {
                    reply(_.find(actors, { id: req.params.actorId }));
                }
            }
        }
    ];
}();