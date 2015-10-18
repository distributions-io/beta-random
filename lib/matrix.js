'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, alpha, beta[, rand] )
*	Creates a matrix of beta distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Matrix} matrix filled with beta random numbers
*/
function random( dims, dt, alpha, beta, rand ) {
	var out,
		draw,
		i;

	draw = partial( alpha, beta, rand );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
