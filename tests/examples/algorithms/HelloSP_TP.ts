/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013-2015, Numenta, Inc.  Unless you have an agreement
 * with Numenta, Inc., for a separate license for this software code, the
 * following terms and conditions apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero Public License for more details.
 *
 * You should have received a copy of the GNU Affero Public License
 * along with this program.  If not, see http://www.gnu.org/licenses.
 *
 * http://numenta.org/licenses/
 * ---------------------------------------------------------------------
 */
import { Cells4, Real, spatial_pooler, Timer, UInt } from "../../../typings/index";
import SpatialPooler  = spatial_pooler.SpatialPooler;

// #include <iostream>
// #include <Array>
// #include <algorithm>    // std::generate
// #include <ctime>        // std::time
// #include <cstdlib>      // std::rand, std::srand
// #include <cmath> 	// pow

// #include "nupic/algorithms/SpatialPooler.hpp"
// #include "nupic/algorithms/Cells4.hpp"
// #include "nupic/os/Timer.hpp"

// using namespace std;
// using namespace nupic;
// using nupic::algorithms::spatial_pooler::SpatialPooler;
// using nupic::algorithms::Cells4::Cells4;

// function generator:
function RandomNumber01(): number {
	return (Math.random() % 2);
} // returns random (binary) numbers from {0,1}

// int main(int argc, const char * argv[])
// 	{
const  DIM = 2048; // number of columns in SP, TP
const  DIM_INPUT = 10000;
const  TP_CELLS_PER_COL = 10; // cells per column in TP
const  EPOCHS = Math.pow(10, 4); // number of iterations (calls to SP/TP compute() )

const inputDim = [ DIM_INPUT ];
const colDim = [ DIM ];

// generate random input
const input = new Array < UInt >(DIM_INPUT);
const outSP = new Array < UInt > (DIM); // active array, output of SP/TP
const  _CELLS = DIM * TP_CELLS_PER_COL;
const outTP  = new Array < UInt >(_CELLS);
const rIn = new Array<Real>(DIM); // input for TP (must be Reals)
const rOut = new Array<Real>(_CELLS);

// initialize SP, TP
const sp = new SpatialPooler(inputDim, colDim);
const tp = new Cells4(DIM, TP_CELLS_PER_COL, 12, 8, 15, 5, .5, .8, 1.0, .1, .1, 0.0, false, 42, true, false);

// Start a stopwatch timer
const stopwatch = new Timer(true);

// run
for (let e = 0; e < EPOCHS; e++) {
	input.forEach((v, i, a) => {a[i] = RandomNumber01(); });
	outSP.fill(0);
	sp.compute(input, true, outSP);
	sp.stripUnlearnedColumns(outSP);

	for (let i = 0; i < DIM; i++ ) {
		rIn[i] = (outSP[i]);
	}

	tp.compute(rIn, rOut, true, true);

	for (let i = 0; i < _CELLS; i++) {
		outTP[i] =  rOut[i];
	}

	// print
	if (e === EPOCHS - 1) {
		console.log( "Epoch = " , e );
		console.log( "SP=" , outSP );
		console.log( "TP=" , outTP);
	}
}

stopwatch.stop();
console.log( "Total elapsed time = " , stopwatch.getElapsed() , " seconds");

// return 0;
// }
