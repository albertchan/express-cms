// import forEach from 'lodash/array';
import _ from 'lodash';

// Expose all models
const exports = module.exports;
const models = [
  'profiles',
  'users'
];

function init() {
  models.forEach(name => {
    _.extend(exports, require('./' + name));
  });
}

// Expose init
exports.init = init;
