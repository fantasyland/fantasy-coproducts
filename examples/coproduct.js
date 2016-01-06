'use strict';

const {Coproduct} = require('../fantasy-coproducts');
const Identity = require('fantasy-identities');
const Option = require('fantasy-options');
const {identity} = require('fantasy-combinators');

// Coproduct[Option[Int], Identity[Int]]
console.log(Coproduct.left(Option.of(1)).map(identity));
console.log(Coproduct.right(Identity.of(1)).map(identity));
