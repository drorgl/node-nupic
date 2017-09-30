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

// #include <iostream>
// #include <vector>
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

let inputDim = [ DIM_INPUT ];
let colDim = [ DIM ];

// generate random input
vector < UInt > input(DIM_INPUT);
vector < UInt > outSP(DIM); // active array, output of SP/TP
const  _CELLS = DIM * TP_CELLS_PER_COL;
vector < UInt > outTP(_CELLS);
Real; rIn[DIM] = {}; // input for TP (must be Reals)
Real; rOut[_CELLS] = {};

// initialize SP, TP
let sp = new SpatialPooler(inputDim, colDim);
let tp = new Cells4(DIM, TP_CELLS_PER_COL, 12, 8, 15, 5, .5, .8, 1.0, .1, .1, 0.0, false, 42, true, false);

// Start a stopwatch timer
Timer; stopwatch(true);

// run
for (let e = 0; e < EPOCHS; e++) {
	generate(input.begin(), input.end(), RandomNumber01);
	fill(outSP.begin(), outSP.end(), 0);
	sp.compute(input.data(), true, outSP.data());
	sp.stripUnlearnedColumns(outSP.data());

	for (UInt i = 0; i < DIM; i++; ) {
		rIn[i] = (Real)(outSP[i]);
	}

	tp.compute(rIn, rOut, true, true);

	for (let i = 0; i < _CELLS; i++; ) {
		outTP[i] = (UInt); rOut[i];
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