var assert = require('assert');
var English = require('yadda').localisation.English;
var Repertoire = require('../../app/repertoire/repertoire.js')

module.exports = (function() {
    return English.library()
        .given("a repertoire with $NUM pieces", function(number, next) {
            repertoire = new Repertoire(number);
            next();
        })
        .when("$NUM pieces are added", function(number, next) {
            repertoire.add_pieces(number);
            next();
        })
        .then("there are $NUM pieces in the repertoire", function(number, next) {
            assert.equal(number, repertoire.number_of_pieces());
            next();
        });
})();
