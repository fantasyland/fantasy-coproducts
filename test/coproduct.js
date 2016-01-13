'use strict';

const λ = require('fantasy-check/src/adapters/nodeunit');
const functor = require('fantasy-check/src/laws/functor');
const {identity} = require('fantasy-combinators');
    
const Identity  = require('fantasy-identities');
const Coproduct = require('../fantasy-coproducts');

function of(x) {
    return Coproduct.right(Identity.of(x));
}

function run(x) {
    return x.run;
}

exports.coproduct = {

    // Functor tests
    'All (Functor)': functor.laws(λ)(of, run),
    'Identity (Functor)': functor.identity(λ)(of, run),
    'Composition (Functor)': functor.composition(λ)(of, run)
};
