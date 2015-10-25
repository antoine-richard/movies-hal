var movies = require('./models/movies');
var actors = require('./models/actors');
var Collection = require('./collection');

module.exports = function () {
    return [
        {
            method: 'GET',
            path: '/movies',
            config: {
                handler: function (req, reply) {
                    var start = Number(req.query.start) || 0;
                    var limit = Number(req.query.limit) || 10;
                    var items = movies.list().slice(start, start+limit);
                    reply(new Collection(items, start, movies.count()));
                },
                plugins: {
                    hal: {
                        api: 'movies',
                        query: '{?start,limit}',
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
                    reply(movies.get(req.params.movieId));
                },
                plugins: {
                    hal: {
                        api: 'movie',
                        links: {
                            actors: '/movies/{id}/actors'
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/movies/{movieId}/actors',
            config: {
                handler: function (req, reply) {
                    reply(movies.getActors(req.params.movieId));
                },
                plugins: {
                    hal: {
                        api: 'movie_actors',
                        links: {
                            movie: '/movies/{id}'
                        },
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
            path: '/actors',
            config: {
                handler: function (req, reply) {
                    var start = Number(req.query.start) || 0;
                    var limit = Number(req.query.limit) || 10;
                    var items = actors.list().slice(start, start+limit);
                    reply(new Collection(items, start, actors.count()));
                },
                plugins: {
                    hal: {
                        api: 'actors',
                        query: '{?start,limit}',
                        embedded: {
                            actor: {
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
            path: '/actors/{actorId}',
            config: {
                handler: function (req, reply) {
                    reply(actors.get(req.params.actorId));
                },
                plugins: {
                    hal: {
                        api: 'actor',
                    }
                }
            }
        }
    ];
}();