var _ = require('lodash');

var movies = [
    {
        id: '100',
        title: 'Reservoir Dogs',
        director: 'Quentin Tarantino',
        date: 1992,
        actors: [
            { id: '3', name: 'Harvey Keitel' },
            { id: '4', name: 'Michael Madsen' }
        ]
    },
    {
        id: '101',
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        date: 1994,
        actors: [
            { id: '0', name: 'John Travolta' },
            { id: '1', name: 'Samuel L. Jackson' },
            { id: '5', name: 'Uma Thurman' }
        ]
    },
    {
        id: '102',
        title: 'Jackie Brown',
        director: 'Quentin Tarantino',
        date: 1997,
        actors: [
            { id: '1', name: 'Samuel L. Jackson' },
            { id: '2', name: 'Pam Grier' }
        ]
    },
    {
        id: '103',
        title: 'Kill Bill',
        director: 'Quentin Tarantino',
        date: 2003,
        actors: [
            { id: '5', name: 'Uma Thurman' },
            { id: '4', name: 'Michael Madsen' }
        ]
    }
];

module.exports = {
    list: function () {
        return _.invoke(movies, function() {
            return _.pick(this, ['id', 'title']);
        });
    },
    count: function () {
        return movies.length;
    },
    get: function (i) {
        return _.chain(movies).find({id: i}).omit('actors').value();
    },
    getActors: function (i) {
        return _.chain(movies).find({id: i}).pick(['id', 'title', 'actors']).value();
    }
}