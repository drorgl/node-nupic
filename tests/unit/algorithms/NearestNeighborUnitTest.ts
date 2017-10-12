// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
//  * with Numenta, Inc., for a separate license for this software code, the
//  * following terms and conditions apply:
//  *
//  * This program is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU Affero Public License version 3 as
//  * published by the Free Software Foundation.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//  * See the GNU Affero Public License for more details.
//  *
//  * You should have received a copy of the GNU Affero Public License
//  * along with this program.  If not, see http://www.gnu.org/licenses.
//  *
//  * http://numenta.org/licenses/
//  * ---------------------------------------------------------------------
//  */
// import { TEST } from "../test_base";

// import { double, UInt } from "../../../typings/index";
// /** @file
//  * Implementation of unit tests for NearestNeighbor
//  */

// // #include <nupic/math/StlIo.hpp>
// // #include <nupic/math/NearestNeighbor.hpp>
// // #include "../math/SparseMatrixUnitTest.hpp"

// // using namespace std;

// namespace a {

// 	function TEST_LOOP(M: number, statement: () => void) {
// 		for (let nrows = 1, ncols = M, zr = 15;
// 			nrows < M;
// 			nrows += M / 10, ncols -= M / 10, zr = ncols / 10) {
// 			statement();
// 		}
// 	}

// 	const M = 64;

// 	namespace NearestNeighborUnitTest {
// 		// --------------------------------------------------------------------------------
// 		function unit_test_rowLpDist(): void {
// 			if (0) { // Visual tests, off by default

// 				const ncols = 11;
// 				const nrows = 7;
// 				const zr = 2;

// 				const dense = new Dense<UInt, double>(nrows, ncols, zr);
// 				const sparse = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense.begin());
// 				const x = new Array<double>(ncols, 0);

// 				for (let i = 0; i !== ncols; ++i) {
// 					x[i] = i % 2;
// 				}

// 				console.log(dense);
// 				console.log(x);

// 				// L0
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log("L0 ", i, " "
// 						, dense.rowL0Dist(i, x.begin()), " "
// 						, sparse.rowL0Dist(i, x.begin()));
// 				}

// 				// L1
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log("L1 ", i, " "
// 						, dense.rowLpDist(1.0, i, x.begin()), " "
// 						, sparse.rowL1Dist(i, x.begin()));
// 				}

// 				// L2
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log("L2 ", i, " "
// 						, dense.rowLpDist(2.0, i, x.begin()), " "
// 						, sparse.rowL2Dist(i, x.begin()));
// 				}

// 				// Lmax
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log("Lmax ", i, " "
// 						, dense.rowLMaxDist(i, x.begin()), " "
// 						, sparse.rowLMaxDist(i, x.begin()));
// 				}

// 				// Lp
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log("Lp ", i, " "
// 						, dense.rowLpDist(.35, i, x.begin()), " "
// 						, sparse.rowLpDist(.35, i, x.begin()));
// 				}
// 			} // End visual tests

// 			{ // Automated tests
// 				const ncols = 5;
// 				const nrows = 7;
// 				const zr = 2;

// 				TEST_LOOP(M, () => {

// 					if (nrows === 0) {
// 						continue;
// 					}

// 					const dense = new Dense<UInt, double>(nrows, ncols, zr);
// 					const sparse = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense.begin());

// 					const x = new Array<double>(ncols, 0);
// 					for (let i = 0; i < ncols; ++i) {
// 						x[i] = i;
// 					}

// 					for (let p = 0.0; p < 2.5; p += .5) {

// 						const row = rng_.getUInt32(nrows);

// 						sparse.decompact();
// 						const d1 = dense.rowLpDist(p, row, x.begin());
// 						let d2 = sparse.rowLpDist(p, row, x.begin());
// 						{

// 							str << "rowLpDist A " << nrows << "X" << ncols << "/" << zr
// 								<< " - non compact";
// 							TEST(nupic: : nearlyEqual(d1, d2));
// 						}

// 						sparse.compact();
// 						d2 = sparse.rowLpDist(p, row, x.begin());
// 						{

// 							str << "rowLpDist B " << nrows << "X" << ncols << "/" << zr
// 								<< " - compact";
// 							TEST(nupic: : nearlyEqual(d1, d2));

// 						}
// 					}

// 					const row = rng_.getUInt32(nrows);

// 					sparse.decompact();
// 					const d1 = dense.rowLMaxDist(row, x.begin());
// 					let d2 = sparse.rowLMaxDist(row, x.begin());
// 					{

// 						const str = "rowLMaxDist A " + nrows + "X" + ncols + "/" + zr
// 							+ " - non compact";
// 						TEST(nupic: : nearlyEqual(d1, d2));
// 					}

// 					sparse.compact();
// 					d2 = sparse.rowLMaxDist(row, x.begin());
// 					{

// 						const str =  "rowLMaxDist B " + nrows + "X" + ncols + "/" + zr
// 							+ " - compact";
// 						TEST(nupic: : nearlyEqual(d1, d2));
// 					}
// 				});
// 			} // End automated tests
// 		}

// 		// --------------------------------------------------------------------------------
// 		function unit_test_LpDist(): void {
// 			if (0) { // Visual tests, off by default

// 				const ncols = 11;
// 				const nrows = 7;
// 				const zr = 2;
// 				const dense = new Dense<UInt, double>(nrows, ncols, zr);
// 				const sparse = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense.begin());
// 				const x = new Array<double>(ncols, 0), distances = new Array<double>(nrows, 0);

// 				for (let i = 0; i !== ncols; ++i) {
// 					x[i] = i % 2;
// 				}

// 				console.log(dense, x);

// 				// L0
// 				console.log("L0" );
// 				dense.L0Dist(x.begin(), distances.begin());
// 				console.log(distances );
// 				sparse.L0Dist(x.begin(), distances.begin());
// 				console.log(distances );

// 				// L1
// 				console.log("L1" );
// 				dense.LpDist(1.0, x.begin(), distances.begin());
// 				console.log(distances );
// 				sparse.L1Dist(x.begin(), distances.begin());
// 				console.log(distances );

// 				// L2
// 				console.log("L2" );
// 				dense.LpDist(2.0, x.begin(), distances.begin());
// 				console.log(distances );
// 				sparse.L2Dist(x.begin(), distances.begin());
// 				console.log(distances );

// 				// LMax
// 				console.log("LMax" );
// 				dense.LMaxDist(x.begin(), distances.begin());
// 				console.log("dense: " , distances );
// 				sparse.LMaxDist(x.begin(), distances.begin());
// 				console.log("sparse: " , distances );

// 				// Lp
// 				console.log("Lp" );
// 				dense.LpDist(.35, x.begin(), distances.begin());
// 				console.log(distances );
// 				sparse.LpDist(.35, x.begin(), distances.begin());
// 				console.log(distances );
// 			} // End visual tests

// 			if (1) { // Automated tests

// 				const ncols = 5;
// 				const nrows = 7;
// 				const zr = 2;

// 				TEST_LOOP(M, () => {

// 					if (nrows === 0) {
// 						continue;
// 					}

// 					const dense = new Dense<UInt, double>(nrows, ncols, zr);
// 					const sparse = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense.begin());

// 					const x = new Array<double>(ncols, 0);
// 					const yref = new Array<double>(nrows, 0);
// 					const y = new Array<double>(nrows, 0);
// 					for (let i = 0; i < ncols; ++i) {
// 						x[i] = (i);
// 					}

// 					for (let p = 0.0; p < 2.5; p += .5) {

// 						sparse.decompact();
// 						dense.LpDist(p, x.begin(), yref.begin());
// 						sparse.LpDist(p, x.begin(), y.begin());
// 						{
// 							const str = "LpDist A " + nrows + "X" + ncols + "/" + zr
// 								+ " - non compact";
// 							CompareVectors(nrows, y.begin(), yref.begin(), str);
// 						}

// 						sparse.compact();
// 						sparse.LpDist(p, x.begin(), y.begin());
// 						{
// 							const str = "LpDist B " + nrows + "X" + ncols + "/" + zr
// 								+ " - compact";
// 							CompareVectors(nrows, y.begin(), yref.begin(), str);
// 						}
// 					}

// 					sparse.decompact();
// 					dense.LMaxDist(x.begin(), yref.begin());
// 					sparse.LMaxDist(x.begin(), y.begin());

// 					{
// 						const str = "LMaxDist A " + nrows + "X" + ncols + "/" + zr
// 							+ " - non compact";
// 						CompareVectors(nrows, y.begin(), yref.begin(), str);
// 					}

// 					sparse.compact();
// 					sparse.LMaxDist(x.begin(), y.begin());

// 					{
// 						const str = "LMaxDist B " + nrows + "X" + ncols + "/" + zr
// 							+ " - compact";
// 						CompareVectors(nrows, y.begin(), yref.begin(), str);
// 					}
// 				});
// 			} // End automated tests
// 		}

// 		// --------------------------------------------------------------------------------
// 		function unit_test_LpNearest(): void {
// 			if (0) { // Visual tests, off by default

// 				const ncols = 11, nrows = 7, zr = 2;

// 				const dense = new Dense<UInt, double>(nrows, ncols, zr);
// 				for (let i = 0; i !== nrows; ++i) {
// 					for (let j = 0; j !== ncols; ++j) {
// 						dense.at(i, j) = rng_.getReal64() * 2.0;
// 					}
// 				}
// 				const sparse = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense.begin());
// 				const x = new Array<double>(ncols, 0);
// 				const nn1 = new Array<pair<UInt, double>>(nrows), nn2 = new Array<pair<UInt, double>>(nrows);

// 				for (let i = 0; i !== ncols; ++i) {
// 					x[i] = rng_.getReal64() * 2.0;
// 				}
// 				console.log(dense, x);

// 				// L0
// 				console.log("L0");
// 				dense.L0Nearest(x.begin(), nn1.begin(), nrows);
// 				sparse.L0Nearest(x.begin(), nn2.begin(), nrows);
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn1[i].first, ",", nn1[i].second, " ");
// 				}

// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn2[i].first, ",", nn2[i].second, " ");
// 				}

// 				// L1
// 				console.log("L1");
// 				dense.LpNearest(1.0, x.begin(), nn1.begin(), nrows);
// 				sparse.L1Nearest(x.begin(), nn2.begin(), nrows);
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn1[i].first, ",", nn1[i].second, " ");
// 				}
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn2[i].first, ",", nn2[i].second, " ");
// 				}

// 				// L2
// 				console.log("L2");
// 				dense.LpNearest(2.0, x.begin(), nn1.begin(), nrows);
// 				sparse.L2Nearest(x.begin(), nn2.begin(), nrows);
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn1[i].first << "," << nn1[i].second << " ");
// 				}
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn2[i].first << "," << nn2[i].second << " ");
// 				}

// 				// LMax
// 				console.log("LMax");
// 				dense.LMaxNearest(x.begin(), nn1.begin(), nrows);
// 				sparse.LMaxNearest(x.begin(), nn2.begin(), nrows);
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn1[i].first, ",", nn1[i].second, " ");
// 				}
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn2[i].first << "," << nn2[i].second << " ");
// 				}

// 				// Lp
// 				console.log("Lp");
// 				dense.LpNearest(.35, x.begin(), nn1.begin(), nrows);
// 				sparse.LpNearest(.35, x.begin(), nn2.begin(), nrows);
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn1[i].first, ",", nn1[i].second, " ");
// 				}
// 				for (let i = 0; i !== nrows; ++i) {
// 					console.log(nn2[i].first, ",", nn2[i].second, " ");
// 				}
// 			} // End visual tests

// 			if (1) { // Automated tests

// 				const ncols = 5;
// 				const nrows = 7;
// 				const zr = 2;

// 				TEST_LOOP(M, () => {

// 					if (nrows === 0) {
// 						continue;
// 					}

// 					const dense = new Dense<UInt, double>(nrows, ncols, zr);
// 					const sparse = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense.begin());

// 					const x = new Array<double>(ncols, 0);
// 					const yref = new Array<pair<UInt, double>>(nrows);
// 					const y = new Array<pair<UInt, double>>(nrows);
// 					for (let i = 0; i < ncols; ++i) {
// 						x[i] = (i);
// 					}

// 					for (let p = 0.0; p < 2.5; p += .5) {

// 						sparse.decompact();
// 						dense.LpNearest(p, x.begin(), yref.begin(), nrows);
// 						sparse.LpNearest(p, x.begin(), y.begin(), nrows);
// 						{
// 							const str = "LpNearest A " + nrows + "X" + ncols + "/" + zr
// 								+ " - non compact";
// 							Compare(y, yref, str);
// 						}

// 						sparse.compact();
// 						sparse.LpNearest(p, x.begin(), y.begin(), nrows);
// 						{
// 							const str = "LpNearest B " + nrows + "X" + ncols + "/" + zr
// 								+ " - compact";
// 							Compare(y, yref, str);
// 						}

// 						sparse.decompact();
// 						dense.LpNearest(p, x.begin(), yref.begin());
// 						sparse.LpNearest(p, x.begin(), y.begin());
// 						{
// 							const str = "LpNearest C " + nrows + "X" + ncols + "/" + zr
// 								+ " - non compact";
// 							Compare(y, yref, str);
// 						}

// 						sparse.compact();
// 						sparse.LpNearest(p, x.begin(), y.begin());
// 						{
// 							const str = "LpNearest D " + nrows + "X" + ncols + "/" + zr
// 								+ " - compact";
// 							Compare(y, yref, str);
// 						}
// 					}
// 				});
// 			} // End automated tests
// 		}

// 		// --------------------------------------------------------------------------------
// 		function unit_test_dotNearest(): void {
// 			// UInt ncols, nrows, zr, i, j;
// 			let ncols = 5;
// 			let nrows = 7;
// 			const zr = 2;

// 			const dense = new DenseMat(nrows, ncols, zr);

// 			const x = new Array<Real>(ncols, 0);
// 			for (let i = 0; i < ncols; ++i) {
// 				x[i] = Real(20 * i);
// 			}

// 			let res = new pair<UInt, double>(0, 0);
// 			let ref = dense.dotNearest(x.begin());

// 			const smc = new NearestNeighbor<SparseMatrix<UInt, Real, Int, Real>>(nrows, ncols, dense.begin());
// 			res = smc.dotNearest(x.begin());
// 			ComparePair(res, ref, "dotNearest compact 1");

// 			{
// 				nrows *= 10;
// 				ncols *= 10;

// 				const dense2 = new Dense<UInt, double>(nrows, ncols);
// 				for (let i = 0; i < nrows; ++i) {
// 					for (let j = 0; j < ncols; ++j) {
// 						dense2.at(i, j) = rng_.getReal64();
// 						if (dense2.at(i, j) < .8) {
// 							dense2.at(i, j) = 0;
// 						}
// 					}
// 				}

// 				const sm2 = new NearestNeighbor<SparseMatrix<UInt, double>>(nrows, ncols, dense2.begin());

// 				const x2 = new Array<double>(ncols, 0);
// 				for (let j = 0; j < ncols; ++j) {
// 					x2[j] = rng_.getReal64();
// 				}

// 				ref = dense2.dotNearest(x2.begin());

// 				res.first = 0; res.second = 0;
// 				res = sm2.dotNearest(x2.begin());
// 				ComparePair(res, ref, "dotNearest compact 2");
// 			}

// 			{
// 				TEST_LOOP(M, () => {

// 					const dense2 = new DenseMat(nrows, ncols, zr);
// 					const sm2 = new NearestNeighbor<SparseMatrix<UInt, Real, Int, Real>>(nrows, ncols, dense2.begin());

// 					const x2 = new Array<Real>(ncols, 0);
// 					const yref2 = new Array<Real>(nrows, 0);
// 					const y2 = new Array<Real>(nrows, 0);
// 					for (i = 0; i < ncols; ++i) {
// 						x2[i] = (i);
// 					}

// 					sm2.decompact();
// 					ref = dense2.dotNearest(x2.begin());
// 					res.first = 0; res.second = 0;
// 					res = sm2.dotNearest(x2.begin());
// 					{
// 						const str = "dotNearest A " + nrows + "X" + ncols + "/" + zr
// 							+ " - non compact";
// 						ComparePair(res, ref, str);
// 					}

// 					sm2.compact();
// 					res.first = 0; res.second = 0;
// 					res = sm2.dotNearest(x2.begin());
// 					{
// 						const str = "dotNearest B " + nrows + "X" + ncols + "/" + zr
// 							+ " - compact";
// 						ComparePair(res, ref, str);
// 					}
// 				});
// 			}
// 		}
// 	}

// 	// --------------------------------------------------------------------------------
// } // end namespace nupic
