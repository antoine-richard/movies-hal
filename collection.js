var URI = require('URIjs');
var hoek = require('hoek');

function Collection(items, start, total) {
    this.items = items || [];
    this.start = start || 0;
    this.count = this.items.length;
    this.total = total || this.items.count;
}

Collection.prototype.toHal = function(rep, done) {
    var limit = Number(rep.request.query.limit) || 10;
    var uri = new URI(rep.self);
    var prev = Math.max(0, this.start - limit);
    var next = Math.min(this.total, this.start + limit);

    var query = uri.search(true);

    if (this.start > 0) {
        rep.link('prev', uri.search(hoek.applyToDefaults(query, { start: prev, limit: limit })).toString());
    }
    if (this.start + this.count < this.total) {
        rep.link('next', uri.search(hoek.applyToDefaults(query, { start: next, limit: limit })).toString());
    }
    done();
};

module.exports = Collection;