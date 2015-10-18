'use strict';

// MODULES //

var randNormal = require( 'distributions-normal-random/lib/number.js' ),
	randGamma = require( 'distributions-gamma-random/lib/number.js' ),
	randUnif = require( 'distributions-uniform-random/lib/number.js' );


// FUNCTIONS  //

var ln = Math.log,
	pow = Math.pow;


// PARTIAL //

/**
* FUNCTION: partial( alpha, beta[, rand] )
*	Partially applies `alpha` and `beta` and returns a function
*	to generate random variables from the beta distribution.
*	Reference:
*		Ahrens, J. H., & Dieter, U. (1974). Computer methods
*		for sampling from gamma, beta, poisson and
*		bionomial distributions.
*		Computing, 12(3), 223–246. doi:10.1007/BF02293108
*
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( alpha, beta, rand ) {
	var random,
		A, B, C, L,
		t,
		mu, sigma;

	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}

	if ( alpha > 1 && beta > 1 ) {
		A = alpha - 1;
		B = beta - 1;
		C = A + B;
		L = C * ln( C );
		mu = A / C;
		sigma = 0.5 / pow( C, 0.5 );
		/**
		* FUNCTION: draw( x )
		*	Generates a random draw for a beta distribution with parameters `alpha > 1` and `beta > 1`.
		*	BN algorithm by Ahrens & Dieter.
		*
		* @private
		* @returns {Number} random draw from the specified distribution
		*/
		return function draw() {
			var x, s, u;

			bn: while ( true ) {
				s = randNormal( 0, 1, random );
				x = mu + sigma * s;
				if ( x < 0 || x > 1 ) {
					continue bn;
				}
				u = randUnif( 0, 1, random );
				if ( ln( u ) > A * ln(x/A) + B * ln((1-x)/B) + L + 0.5*s*s ) {
					continue bn;
				}
				return x;
			}
		}; // end FUNCTION draw()
	}

	if ( alpha === beta && alpha > 1.5 ) {
		A = alpha - 1;
		t = pow( A + A, 0.5 );
		/**
		* FUNCTION: draw( x )
		*	Generates a random draw for a beta distribution with parameters `alpha = beta > 1.5`.
		*	BS algorithm by Ahrens & Dieter.
		*
		* @private
		* @returns {Number} random draw from the specified distribution
		*/
		return function draw() {
			var x, s, s4, u;

			bs: while ( true ) {
				s = randNormal( 0, 1, random );
				x =  0.5 * ( 1 + s/t );
				if ( x < 0 || x > 1 ) {
					continue bs;
				}
				u = randUnif( 0, 1, random );
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
		}; // end FUNCTION draw()
	}

	// GENERAL CASE //

	/**
	* FUNCTION: draw( x )
	*	Generates a random draw for a beta distribution with parameters `alpha` and `beta`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var x, y;

		x = randGamma( alpha, beta, random );
		y = randGamma( alpha, beta, random );
		return x / ( x + y );
	}; // end FUNCTION draw()
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
