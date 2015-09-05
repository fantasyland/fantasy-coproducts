var combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    Coproduct = require('./coproduct'),
    Option = require('fantasy-options'),

    compose = combinators.compose,
    identity = combinators.identity,

    Inject = daggy.tagged('inj', 'prj');

Inject.reflexive = function() {
    return Inject(
        identity,
        Option.Some
    );
};

Inject.left = function() {
    return Inject(
        Coproduct.left(fa),
        function(ga) {
            return ga.run().fold(Option.Some, constant(Option.Nothing));
        }
    );
};

Inject.right = function() {
    // This could be wrong, as we're assuming explicit-ency and not implicit-ency!
    return Inject(
        function(fa) {
            return Coproduct.right(Inject.right().inj(fa));
        },
        function(ga) {
            return ga.run().fold(constant(Option.Nothing), function(x) {
                return Inject.right().prj(x);
            });
        }
    );
};

if (typeof module != 'undefined')
  module.exports = Inject;
