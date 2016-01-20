'use strict';

const daggy = require('daggy');

const {compose} = require('fantasy-combinators');
const Either = require('fantasy-eithers');
const {map} = require('fantasy-land');

const Coproduct = daggy.tagged('run');

Coproduct.left = compose(Coproduct)(Either.Left);
Coproduct.right = compose(Coproduct)(Either.Right);

Coproduct.prototype.coproduct = function(f, g) {
    return this.run.fold(f, g);
};

Coproduct.prototype[map] = function(f) {
    const go = (x) => x[map](f);
    return Coproduct(this.coproduct(compose(Either.Left)(go), compose(Either.Right)(go)));
};

module.exports = Coproduct;