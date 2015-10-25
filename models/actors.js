var _ = require('lodash');

var actors = [
    {
        id: '0',
        name: 'John Travolta',
        birth: '02-18-1954',
        photo: 'http://ia.media-imdb.com/images/M/MV5BMTUwNjQ0ODkxN15BMl5BanBnXkFtZTcwMDc5NjQwNw@@._V1_UY317_CR11,0,214,317_AL_.jpg'
    },
    {
        id: '1',
        name: 'Samuel L. Jackson',
        birth: '12-21-1948',
        photo: 'http://ia.media-imdb.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg'
    },
    {
        id: '2',
        name: 'Pam Grier',
        birth: '05-26-1949',
        photo: 'http://ia.media-imdb.com/images/M/MV5BMTcxNDEwNDA0N15BMl5BanBnXkFtZTcwOTY1NjgyNA@@._V1_UX214_CR0,0,214,317_AL_.jpg'
    },
    {
        id: '3',
        name: 'Harvey Keitel',
        birth: '05-13-1939',
        photo: 'http://ia.media-imdb.com/images/M/MV5BMTcxMDcxMjgxOV5BMl5BanBnXkFtZTcwODc2NTk2MQ@@._V1_UY317_CR4,0,214,317_AL_.jpg'
    },
    {
        id: '4',
        name: 'Michael Madsen',
        birth: '09-25-1958',
        photo: 'http://ia.media-imdb.com/images/M/MV5BMTI4ODA5NzY2N15BMl5BanBnXkFtZTYwNjc3NTI1._V1_UY317_CR6,0,214,317_AL_.jpg'
    },
    {
        id: '5',
        name: 'Uma Thurman',
        birth: '04-29-1970',
        photo: 'http://ia.media-imdb.com/images/M/MV5BMjMxNzk1MTQyMl5BMl5BanBnXkFtZTgwMDIzMDEyMTE@._V1_UX214_CR0,0,214,317_AL_.jpg'
    }
];

module.exports = {
    list: function () {
        return _.invoke(actors, function() {
            return _.pick(this, ['id', 'name']);
        });
    },
    count: function () {
        return actors.length;
    },
    get: function (i) {
        return _.find(actors, {id: i});
    }
}