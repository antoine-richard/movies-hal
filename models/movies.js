
function Movie(o) {
    this.id = o.id;
    this.title = o.title;
    this.director = o.director;
    this.actors = o.actors;
}

Movie.prototype.toHal = function(rep, next) {
    rep.ignore('actors');
    next();
};

module.exports = [
    new Movie({
        id: '101',
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        actors: [
            { id: '0', name: 'John Travolta' },
            { id: '1', name: 'Samuel L. Jackson' }
        ]
    }),
    new Movie({
        id: '102',
        title: 'Jackie Brown',
        director: 'Quentin Tarantino',
        actors: [
            {id: '1', name: 'Samuel L. Jackson'},
            {id: '2', name: 'Pam Grier'}
        ]
    })
];