Beta Random Variables
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [matrix](https://github.com/dstructs/matrix) or array filled with draws from a [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution).


## Installation

``` bash
$ npm install distributions-beta-random
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

```javascript
var random = require( 'distributions-beta-random' );
```

#### random( [dims][, opts] )

Creates a [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) filled with draws from a [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions. If no `dims` argument is supplied,the function returns a single random draw from a [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution).

```javascript
var out;

// Set seed
random.seed = 2;

out = random( 5 );
// returns [ ~0.376, ~0.453, ~0.963, ~0.523, ~0.287 ]

out = random( [2,1,2] );
// returns [ [ [~0.684,~0.296] ], [ [~0.860,~0.646] ] ]

```


The function accepts the following `options`:

*	__alpha__: first shape parameter. Default: `1`.
*	__beta__: second shape parameter. Default: `1`.
*	__seed__: positive integer used as a seed to initialize the generator. If not supplied, uniformly distributed random numbers are generated via an underlying generator seedable by setting the `seed` property of the exported function.
*	__dtype__: output data type (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types). Default: `generic`.

The [beta](https://en.wikipedia.org/wiki/Beta_distribution) distribution is a function of two parameters: `alpha > 0`(first shape parameter) and `beta > 0`(second shape parameter). By default, `alpha` is equal to `1` and `beta` is equal to `1`. To adjust either parameter, set the corresponding option.

```javascript
var out = random( 5, {
	'alpha': 30,
	'beta': 5,
});
// returns [ ~0.898, ~0.916, ~0.892, ~0.853, ~0.752 ]

```

To be able to reproduce the generated random numbers, set the `seed` option to a positive integer.

```javascript
var out;
out = random( 3, {
	'seed': 22
});
// returns [ ~0.203, ~0.642, ~0.123 ]

out = random( 3, {
	'seed': 22
});
// returns [ ~0.203, ~0.642, ~0.123 ]

```

If no `seed` option is supplied, each function call uses a common underlying uniform number generator. A positive-integer seed for this underlying generator can be supplied by setting the seed property of the exported function.

```javascript
var out;

random.seed = 11;
out = random();
// returns ~0.211

out = random();
// returns ~0.179

random.seed = 11;
out = random();
// returns ~0.211

out = random();
// returns ~0.179

```

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option.

```javascript
var out;

out = random( 5, {
	'dtype': 'float32'
});
// returns Float32Array( [~0.687,~0.599,~0.771,~0.901,~0.942] )

out = random( [3,2], {
	'dtype': 'float64'
});
/*
	[ ~0.163 ~0.683
	  ~0.604 ~0.629
	  ~0.885 ~0.993 ]
*/

```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	```javascript
	var out = random( [2,1,3], {
		'dtype': 'float32'
	});
	// returns [ [ [~0.914,~0.264,~0.306] ], [ [~0.962,0.407,~0.966] ] ]

	```

## Method

The algorithm used to generate beta random variables depends on the parameter inputs. In cases where `alpha` equals `beta` and both exceed `1.5` or when `alpha>1` and `beta>1`, the function uses the BN and BS algorithms developed by Ahrens & Dieter.

In all other cases, the function generates gamma distributed variates `x` and `y` with parameters `alpha` and `beta` via [gamma-random](https://github.com/distributions-io/gamma-random)
and returns `x/(x+y)`.

To generate the random standard normal variates, the module internally calls the [normal-random](https://github.com/distributions-io/normal-random) which provides a very fast algorithm, the improved *Ziggurat* algorithm by Doornik, to sample from a normal distribution.

Reference:
>Ahrens, J. H., & Dieter, U. (1974). Computer methods
>for sampling from gamma, beta, poisson and
>bionomial distributions.
>Computing, 12(3), 223–246. doi:10.1007/BF02293108
>
> Doornik, J. a. (2005).
> An Improved Ziggurat Method to Generate Normal Random Samples.

## Examples

```javascript
var random = require( 'distributions-beta-random' ),
	out;

// Set seed
random.seed = 4;

// Plain arrays...

// 1x10:
out = random( 10 );

// 2x1x3:
out = random( [2,1,3] );

// 5x5x5:
out = random( [5,5,5] );

// 10x5x10x20:
out = random( [10,5,10,20] );

// Typed arrays...
out = random( 10, {
	'dtype': 'float32'
});

// Matrices...
out = random( [3,2], {
	'dtype': 'float64'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-beta-random.svg
[npm-url]: https://npmjs.org/package/distributions-beta-random

[travis-image]: http://img.shields.io/travis/distributions-io/beta-random/master.svg
[travis-url]: https://travis-ci.org/distributions-io/beta-random

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/beta-random/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/beta-random?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/beta-random.svg
[dependencies-url]: https://david-dm.org/distributions-io/beta-random

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/beta-random.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/beta-random

[github-issues-image]:  http://img.shields.io/github/issues/distributions-io/beta-random.svg
[github-issues-url]: https://github.com/distributions-io/beta-random/issues
