'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, alpha, beta[, rand] )
*	Creates a multidimensional array of beta distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with beta random numbers
*/
function random( dims, alpha, beta, rand ) {
	var draw = partial( alpha, beta, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
