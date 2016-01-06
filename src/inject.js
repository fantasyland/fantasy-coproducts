const daggy = require('daggy');

const {compose, identity} = require('fantasy-combinators');
const Option = require('fantasy-options');

const Coproduct = require('./coproduct');

const Inject = daggy.tagged('inj', 'prj');

Inject.reflexive = function() {
    return Inject(
        identity,
        Option.Some
    );
};

Inject.left = function() {
    return Inject(
        compose(Coproduct)(Either.Left),
        (ga) => ga.coproduct(Option.Some, constant(Option.Nothing))
    );
};

Inject.right = function() {
    // This could be wrong, as we're assuming explicit-ency and not implicit-ency!
    return Inject(
        compose(compose(Coproduct)(Either.Right))(inj),
        (ga) => ga.coproduct(constant(Option.Nothing), prj)
    );
};

if (typeof module != 'undefined')
  module.exports = Inject;
