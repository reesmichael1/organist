module.exports = function(num_pieces) {
    this.pieces = Array.from({length: num_pieces});

    this.add_pieces = function(num_to_add) {
        for (var i = 1; i <= num_to_add; i++) {
            this.pieces.push(0);
        }
    };

    this.number_of_pieces = function() {
        return this.pieces.length;
    };
}
