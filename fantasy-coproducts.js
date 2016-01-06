var Coproduct = require('./src/coproduct'),
    Inject    = require('./src/inject');

if (typeof module != 'undefined')
    module.exports = {
        Coproduct: Coproduct,
        Inject   : Inject
    };
