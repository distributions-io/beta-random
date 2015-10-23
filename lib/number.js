'use strict';

// MODULES //

var randNormal = require( 'distributions-normal-random/lib/number.js' ),
	randGamma = require( 'distributions-gamma-random/lib/number.js' ),
	randUnif = require( 'distributions-uniform-random/lib/number.js' );


// FUNCTIONS //

var ln = Math.log,
	pow = Math.pow;


// GENERATE BETA RANDOM NUMBERS //

/**
* FUNCTION random( alpha, beta[, rand] )
*	Generates a random draw from a beta distribution with parameters `alpha` and `beta`.
*	Reference:
*		Ahrens, J. H., & Dieter, U. (1974). Computer methods
*		for sampling from gamma, beta, poisson and
*		bionomial distributions.
*		Computing, 12(3), 223–246. doi:10.1007/BF02293108
*
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( alpha, beta, randp ) {
	var x, y, s, s4, u,
		A, B, C, L,
		mu, sigma, t,
		rand;

	rand = randp ? randp : Math.random;
	if ( alpha > 1 && beta > 1 ) {
		A = alpha - 1;
		B = beta - 1;
		C = A + B;
		L = C * ln( C );
		mu = A / C;
		sigma = 0.5 / pow( C, 0.5 );
		bn: while ( true ) {
			s = randNormal( 0, 1, rand );
			x = mu + sigma * s;
			if ( x < 0 || x > 1 ) {
				continue bn;
			}
			u = randUnif( 0, 1, rand );
			if ( ln( u ) > A * ln(x/A) + B * ln((1-x)/B) + L + 0.5*s*s ) {
				continue bn;
			}
			return x;
		}
	}

	if ( alpha === beta && alpha > 1.5 ) {
		A = alpha - 1;
		t = pow( A + A, 0.5 );
		bs: while ( true ) {
			s = randNormal( 0, 1, rand );
			x =  0.5 * ( 1 + s/t );
			if ( x < 0 || x > 1 ) {
				continue bs;
			}
			u = randUnif( 0, 1, rand );
			s4 = pow( s, 4 );
			if ( u <= 1 - s4 / ( 8*alpha - 12 ) ) {
				return x;
			}
			if ( u >= 1 - s4 / (8*alpha-12) + 0.5 * pow( s4/(8*alpha-8), 2 ) ) {
				continue bs;
			}
			if ( ln(u) > A * ln( 4 * x * (1-x) ) + s*s / 2 ) {
				continue bs;
			}
			return x;
		}
	}

	// GENERAL CASE //
	x = randGamma( alpha, beta, rand );
	y = randGamma( alpha, beta, rand );
	return x / ( x + y );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
