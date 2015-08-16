var combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    Either = require('fantasy-eithers'),

    compose = combinators.compose,

    Coproduct = daggy.tagged('x');

Coproduct.left = compose(Coproduct)(Either.Left);
Coproduct.right = compose(Coproduct)(Either.Right);

Coproduct.prototype.run = function() {
    return this.x;
};

Coproduct.prototype.coproduct = function(f, g) {
    return this.run().fold(f, g);
};

Coproduct.prototype.map = function(f) {
    function go(x) {
        return x.map(f);
    }
    return Coproduct(this.coproduct(
        compose(Either.Left)(go),
        compose(Either.Right)(go)
    ));
};

if (typeof module != 'undefined')
  module.exports = Coproduct;