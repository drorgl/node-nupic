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
// import { ASSERT_EQ, ASSERT_FALSE, ASSERT_FLOAT_EQ, ASSERT_GE, ASSERT_LE, ASSERT_LT, ASSERT_NO_FATAL_FAILURE, ASSERT_TRUE, EXPECT_EQ, EXPECT_GT, EXPECT_LT, TEST } from "../test_base";

// import { bool, pair, Real, spatial_pooler, UInt } from "../../../typings/index";
// import SpatialPooler = spatial_pooler.SpatialPooler;

// /** @file
//  * Implementation of unit tests for SpatialPooler
//  */

// // #include <cstring>
// // #include <fstream>
// // #include <stdio.h>

// // #include <nupic/algorithms/SpatialPooler.hpp>
// // #include <nupic/math/StlIo.hpp>
// // #include <nupic/types/Types.hpp>
// // #include <nupic/utils/Log.hpp>
// // #include "gtest/gtest.h"

// // using namespace std;
// // using namespace nupic;
// // using namespace nupic::algorithms::spatial_pooler;

// namespace c {
// 	function countNonzero(vec: UInt[]): UInt {
// 		let count = 0;

// 		for (const x of vec) {
// 			if (x > 0) {
// 				count++;
// 			}
// 		}

// 		return count;
// 	}

// 	function almost_eq(a: Real, b: Real): bool {
// 		const diff = a - b;
// 		return (diff > -1e-5 && diff < 1e-5);
// 	}

// 	function check_Array_eq(arr: UInt[], vec: UInt[], n?: UInt): bool {
// 		for (let i = 0; i < (n || vec.length); i++) {
// 			if (arr[i] !== vec[i]) {
// 				return false;
// 			}
// 		}
// 		return true;
// 	}

// 	// function check_Array_eq(arr: Real[], vec: Array<Real>): bool {
// 	// 	for (let i = 0; i < vec.length; i++) {
// 	// 		if (!almost_eq(arr[i], vec[i])) {
// 	// 			return false;
// 	// 		}
// 	// 	}
// 	// 	return true;
// 	// }

// 	// function check_Array_eq(arr1: UInt[], arr2: UInt[], n: UInt): bool {
// 	// 	for (let i = 0; i < n; i++) {
// 	// 		if (arr1[i] != arr2[i]) {
// 	// 			return false;
// 	// 		}
// 	// 	}
// 	// 	return true;
// 	// }

// 	// function check_Array_eq(arr1: Real[], arr2: Real[], n: UInt): bool {
// 	// 	for (let i = 0; i < n; i++) {
// 	// 		if (!almost_eq(arr1[i], arr2[i])) {
// 	// 			return false;
// 	// 		}
// 	// 	}
// 	// 	return true;
// 	// }

// 	// function check_Array_eq(vec1: Array<UInt>, vec2: Array<UInt>): bool {
// 	// 	if (vec1.length != vec2.length) {
// 	// 		return false;
// 	// 	}
// 	// 	for (let i = 0; i < vec1.length; i++) {
// 	// 		if (vec1[i] != vec2[i]) {
// 	// 			return false;
// 	// 		}
// 	// 	}
// 	// 	return true;
// 	// }

// 	// function check_Array_eq(vec1: Array<Real>, vec2: Array<Real>): bool {
// 	// 	if (vec1.length != vec2.length) {
// 	// 		return false;
// 	// 	}
// 	// 	for (let i = 0; i < vec1.length; i++) {
// 	// 		if (!almost_eq(vec1[i], vec2[i])) {
// 	// 			return false;
// 	// 		}
// 	// 	}
// 	// 	return true;
// 	// }

// 	function check_spatial_eq(sp1: SpatialPooler, sp2: SpatialPooler): void {
// 		const numColumns = sp1.getNumColumns();
// 		const numInputs = sp2.getNumInputs();

// 		ASSERT_TRUE(sp1.getNumColumns() === sp2.getNumColumns());
// 		ASSERT_TRUE(sp1.getNumInputs() === sp2.getNumInputs());
// 		ASSERT_TRUE(sp1.getPotentialRadius() ===
// 			sp2.getPotentialRadius());
// 		ASSERT_TRUE(sp1.getPotentialPct() === sp2.getPotentialPct());
// 		ASSERT_TRUE(sp1.getGlobalInhibition() ===
// 			sp2.getGlobalInhibition());
// 		ASSERT_TRUE(sp1.getNumActiveColumnsPerInhArea() ===
// 			sp2.getNumActiveColumnsPerInhArea());
// 		ASSERT_TRUE(almost_eq(sp1.getLocalAreaDensity(),
// 			sp2.getLocalAreaDensity()));
// 		ASSERT_TRUE(sp1.getStimulusThreshold() ===
// 			sp2.getStimulusThreshold());
// 		ASSERT_TRUE(sp1.getDutyCyclePeriod() === sp2.getDutyCyclePeriod());
// 		ASSERT_TRUE(almost_eq(sp1.getBoostStrength(), sp2.getBoostStrength()));
// 		ASSERT_TRUE(sp1.getIterationNum() === sp2.getIterationNum());
// 		ASSERT_TRUE(sp1.getIterationLearnNum() ===
// 			sp2.getIterationLearnNum());
// 		ASSERT_TRUE(sp1.getSpVerbosity() === sp2.getSpVerbosity());
// 		ASSERT_TRUE(sp1.getWrapAround() === sp2.getWrapAround());
// 		ASSERT_TRUE(sp1.getUpdatePeriod() === sp2.getUpdatePeriod());
// 		ASSERT_TRUE(almost_eq(sp1.getSynPermTrimThreshold(), sp2.getSynPermTrimThreshold()));
// 		console.log("check: ", sp1.getSynPermActiveInc(), " ", sp2.getSynPermActiveInc());
// 		ASSERT_TRUE(almost_eq(sp1.getSynPermActiveInc(),
// 			sp2.getSynPermActiveInc()));
// 		ASSERT_TRUE(almost_eq(sp1.getSynPermInactiveDec(),
// 			sp2.getSynPermInactiveDec()));
// 		ASSERT_TRUE(almost_eq(sp1.getSynPermBelowStimulusInc(),
// 			sp2.getSynPermBelowStimulusInc()));
// 		ASSERT_TRUE(almost_eq(sp1.getSynPermConnected(),
// 			sp2.getSynPermConnected()));
// 		ASSERT_TRUE(almost_eq(sp1.getMinPctOverlapDutyCycles(),
// 			sp2.getMinPctOverlapDutyCycles()));

// 		let boostFactors1 = new Array<Real>(numColumns);
// 		let boostFactors2 = new Array<Real>(numColumns);
// 		sp1.getBoostFactors(boostFactors1);
// 		sp2.getBoostFactors(boostFactors2);
// 		ASSERT_TRUE(check_Array_eq(boostFactors1, boostFactors2, numColumns));
// 		boostFactors1 = null;
// 		boostFactors2 = null;

// 		let overlapDutyCycles1 = new Array<Real>(numColumns);
// 		let overlapDutyCycles2 = new Array<Real>(numColumns);
// 		sp1.getOverlapDutyCycles(overlapDutyCycles1);
// 		sp2.getOverlapDutyCycles(overlapDutyCycles2);
// 		ASSERT_TRUE(check_Array_eq(overlapDutyCycles1, overlapDutyCycles2, numColumns));
// 		overlapDutyCycles1 = null;
// 		overlapDutyCycles2 = null;

// 		let activeDutyCycles1 = new Array<Real>(numColumns);
// 		let activeDutyCycles2 = new Array<Real>(numColumns);
// 		sp1.getActiveDutyCycles(activeDutyCycles1);
// 		sp2.getActiveDutyCycles(activeDutyCycles2);
// 		ASSERT_TRUE(check_Array_eq(activeDutyCycles1, activeDutyCycles2, numColumns));
// 		activeDutyCycles1 = null;
// 		activeDutyCycles2 = null;

// 		let minOverlapDutyCycles1 = new Array<Real>(numColumns);
// 		let minOverlapDutyCycles2 = new Array<Real>(numColumns);
// 		sp1.getMinOverlapDutyCycles(minOverlapDutyCycles1);
// 		sp2.getMinOverlapDutyCycles(minOverlapDutyCycles2);
// 		ASSERT_TRUE(check_Array_eq(minOverlapDutyCycles1, minOverlapDutyCycles2, numColumns));
// 		minOverlapDutyCycles1 = null;
// 		minOverlapDutyCycles2 = null;

// 		for (let i = 0; i < numColumns; i++) {
// 			let potential1 = new Array<UInt>(numInputs);
// 			let potential2 = new Array<UInt>(numInputs);
// 			sp1.getPotential(i, potential1);
// 			sp2.getPotential(i, potential2);
// 			ASSERT_TRUE(check_Array_eq(potential1, potential2, numInputs));
// 			potential1 = null;
// 			potential2 = null;
// 		}

// 		for (let i = 0; i < numColumns; i++) {
// 			let perm1 = new Array<Real>(numInputs);
// 			let perm2 = new Array<Real>(numInputs);
// 			sp1.getPermanence(i, perm1);
// 			sp2.getPermanence(i, perm2);
// 			ASSERT_TRUE(check_Array_eq(perm1, perm2, numInputs));
// 			perm1 = null;
// 			perm2 = null;
// 		}

// 		for (let i = 0; i < numColumns; i++) {
// 			let con1 = new Array<UInt>(numInputs);
// 			let con2 = new Array<UInt>(numInputs);
// 			sp1.getConnectedSynapses(i, con1);
// 			sp2.getConnectedSynapses(i, con2);
// 			ASSERT_TRUE(check_Array_eq(con1, con2, numInputs));
// 			con1 = null;
// 			con2 = null;
// 		}

// 		let conCounts1 = new Array<UInt>(numColumns);
// 		let conCounts2 = new Array<UInt>(numColumns);
// 		sp1.getConnectedCounts(conCounts1);
// 		sp2.getConnectedCounts(conCounts2);
// 		ASSERT_TRUE(check_Array_eq(conCounts1, conCounts2, numColumns));
// 		conCounts1 = null;
// 		conCounts2 = null;
// 	}

// 	function setup(sp: SpatialPooler, numInputs: UInt, numColumns: UInt): void {
// 		const inputDim = new Array<UInt>();
// 		const columnDim = new Array<UInt>();
// 		inputDim.push(numInputs);
// 		columnDim.push(numColumns);
// 		sp.initialize(inputDim, columnDim);
// 	}

// 	TEST("SpatialPoolerTest", "testUpdateInhibitionRadius", () => {
// 		const sp = new SpatialPooler();
// 		const colDim = new Array<UInt>();
// 		const inputDim = new Array<UInt>();
// 		colDim.push(57);
// 		colDim.push(31);
// 		colDim.push(2);
// 		inputDim.push(1);
// 		inputDim.push(1);
// 		inputDim.push(1);

// 		sp.initialize(inputDim, colDim);
// 		sp.setGlobalInhibition(true);
// 		ASSERT_TRUE(sp.getInhibitionRadius() === 57);

// 		colDim.length = 0;
// 		inputDim.length = 0;
// 		// avgColumnsPerInput = 4
// 		// avgConnectedSpanForColumn = 3
// 		let numInputs = 3;
// 		inputDim.push(numInputs);
// 		let numCols = 12;
// 		colDim.push(numCols);
// 		sp.initialize(inputDim, colDim);
// 		sp.setGlobalInhibition(false);

// 		for (let i = 0; i < numCols; i++) {
// 			const permArr = [1, 1, 1];
// 			sp.setPermanence(i, permArr);
// 		}
// 		let trueInhibitionRadius = 6;
// 		// ((3 * 4) - 1)/2 => round up
// 		sp.updateInhibitionRadius_();
// 		ASSERT_TRUE(trueInhibitionRadius === sp.getInhibitionRadius());

// 		colDim.length = 0;
// 		inputDim.length = 0;
// 		// avgColumnsPerInput = 1.2
// 		// avgConnectedSpanForColumn = 0.5
// 		numInputs = 5;
// 		inputDim.push(numInputs);
// 		numCols = 6;
// 		colDim.push(numCols);
// 		sp.initialize(inputDim, colDim);
// 		sp.setGlobalInhibition(false);

// 		for (let i = 0; i < numCols; i++) {
// 			const permArr = [1, 0, 0, 0, 0];
// 			if (i % 2 === 0) {
// 				permArr[0] = 0;
// 			}
// 			sp.setPermanence(i, permArr);
// 		}
// 		trueInhibitionRadius = 1;
// 		sp.updateInhibitionRadius_();
// 		ASSERT_TRUE(trueInhibitionRadius === sp.getInhibitionRadius());

// 		colDim.length = 0;
// 		inputDim.length = 0;
// 		// avgColumnsPerInput = 2.4
// 		// avgConnectedSpanForColumn = 2
// 		numInputs = 5;
// 		inputDim.push(numInputs);
// 		numCols = 12;
// 		colDim.push(numCols);
// 		sp.initialize(inputDim, colDim);
// 		sp.setGlobalInhibition(false);

// 		for (let i = 0; i < numCols; i++) {
// 			const permArr = [1, 1, 0, 0, 0];
// 			sp.setPermanence(i, permArr);
// 		}
// 		trueInhibitionRadius = 2;
// 		// ((2.4 * 2) - 1)/2 => round up
// 		sp.updateInhibitionRadius_();
// 		ASSERT_TRUE(trueInhibitionRadius === sp.getInhibitionRadius());
// 	});

// 	TEST("SpatialPoolerTest", "testUpdateMinDutyCycles", () => {
// 		const sp = new SpatialPooler();
// 		const numColumns = 10;
// 		const numInputs = 5;
// 		setup(sp, numInputs, numColumns);
// 		sp.setMinPctOverlapDutyCycles(0.01);

// 		const initOverlapDuty = [0.01, 0.001, 0.02, 0.3, 0.012, 0.0512,
// 			0.054, 0.221, 0.0873, 0.309];

// 		const initActiveDuty = [0.01, 0.045, 0.812, 0.091, 0.001, 0.0003,
// 			0.433, 0.136, 0.211, 0.129];

// 		sp.setOverlapDutyCycles(initOverlapDuty);
// 		sp.setActiveDutyCycles(initActiveDuty);
// 		sp.setGlobalInhibition(true);
// 		sp.setInhibitionRadius(2);
// 		sp.updateMinDutyCycles_();
// 		const resultMinOverlap = new Array<Real>(10);
// 		sp.getMinOverlapDutyCycles(resultMinOverlap);

// 		sp.updateMinDutyCyclesGlobal_();
// 		const resultMinOverlapGlobal = new Array<Real>(10);
// 		sp.getMinOverlapDutyCycles(resultMinOverlapGlobal);

// 		sp.updateMinDutyCyclesLocal_();
// 		const resultMinOverlapLocal = new Array<Real>(10);
// 		sp.getMinOverlapDutyCycles(resultMinOverlapLocal);

// 		ASSERT_TRUE(check_Array_eq(resultMinOverlap, resultMinOverlapGlobal,
// 			numColumns));

// 		sp.setGlobalInhibition(false);
// 		sp.updateMinDutyCycles_();
// 		sp.getMinOverlapDutyCycles(resultMinOverlap);

// 		ASSERT_TRUE(!check_Array_eq(resultMinOverlap, resultMinOverlapGlobal,
// 			numColumns));

// 	});

// 	TEST("SpatialPoolerTest", "testUpdateMinDutyCyclesGlobal", () => {
// 		const sp = new SpatialPooler();
// 		const numColumns = 5;
// 		const numInputs = 5;
// 		setup(sp, numInputs, numColumns);
// 		let minPctOverlap: Real;

// 		minPctOverlap = 0.01;

// 		sp.setMinPctOverlapDutyCycles(minPctOverlap);

// 		const overlapArr1 =
// 			[0.06, 1, 3, 6, 0.5];
// 		const activeArr1 =
// 			[0.6, 0.07, 0.5, 0.4, 0.3];

// 		sp.setOverlapDutyCycles(overlapArr1);
// 		sp.setActiveDutyCycles(activeArr1);

// 		const trueMinOverlap1 = 0.01 * 6;

// 		sp.updateMinDutyCyclesGlobal_();
// 		const resultOverlap1 = new Array<Real>(5);
// 		sp.getMinOverlapDutyCycles(resultOverlap1);
// 		for (let i = 0; i < numColumns; i++) {
// 			ASSERT_TRUE(resultOverlap1[i] === trueMinOverlap1);
// 		}

// 		minPctOverlap = 0.015;

// 		sp.setMinPctOverlapDutyCycles(minPctOverlap);

// 		const overlapArr2 = [0.86, 2.4, 0.03, 1.6, 1.5];
// 		const activeArr2 = [0.16, 0.007, 0.15, 0.54, 0.13];

// 		sp.setOverlapDutyCycles(overlapArr2);
// 		sp.setActiveDutyCycles(activeArr2);

// 		const trueMinOverlap2 = 0.015 * 2.4;

// 		sp.updateMinDutyCyclesGlobal_();
// 		const resultOverlap2 = new Array<Real>(5);
// 		sp.getMinOverlapDutyCycles(resultOverlap2);
// 		for (let i = 0; i < numColumns; i++) {
// 			ASSERT_TRUE(almost_eq(resultOverlap2[i], trueMinOverlap2));
// 		}

// 		minPctOverlap = 0.015;

// 		sp.setMinPctOverlapDutyCycles(minPctOverlap);

// 		const overlapArr3 = [0, 0, 0, 0, 0];
// 		const activeArr3 = [0, 0, 0, 0, 0];

// 		sp.setOverlapDutyCycles(overlapArr3);
// 		sp.setActiveDutyCycles(activeArr3);

// 		const trueMinOverlap3 = 0;

// 		sp.updateMinDutyCyclesGlobal_();
// 		const resultOverlap3 = new Array<Real>(5);
// 		sp.getMinOverlapDutyCycles(resultOverlap3);
// 		for (let i = 0; i < numColumns; i++) {
// 			ASSERT_TRUE(almost_eq(resultOverlap3[i], trueMinOverlap3));
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testUpdateMinDutyCyclesLocal", () => {
// 		// wrapAround=false
// 		{
// 			const numColumns = 8;
// 			const sp = new SpatialPooler(
// 				/*inputDimensions*/[5],
// 				/*columnDimensions*/[numColumns],
// 				/*potentialRadius*/ 16,
// 				/*potentialPct*/ 0.5,
// 				/*globalInhibition*/ false,
// 				/*localAreaDensity*/ -1.0,
// 				/*numActiveColumnsPerInhArea*/ 3,
// 				/*stimulusThreshold*/ 1,
// 				/*synPermInactiveDec*/ 0.008,
// 				/*synPermActiveInc*/ 0.05,
// 				/*synPermConnected*/ 0.1,
// 				/*minPctOverlapDutyCycles*/ 0.001,
// 				/*dutyCyclePeriod*/ 1000,
// 				/*boostStrength*/ 0.0,
// 				/*seed*/ 1,
// 				/*spVerbosity*/ 0,
// 				/*wrapAround*/ false);

// 			sp.setInhibitionRadius(1);

// 			const activeDutyArr = [0.9, 0.3, 0.5, 0.7, 0.1, 0.01, 0.08, 0.12];
// 			sp.setActiveDutyCycles(activeDutyArr);

// 			const overlapDutyArr = [0.7, 0.1, 0.5, 0.01, 0.78, 0.55, 0.1, 0.001];
// 			sp.setOverlapDutyCycles(overlapDutyArr);

// 			sp.setMinPctOverlapDutyCycles(0.2);

// 			sp.updateMinDutyCyclesLocal_();

// 			const trueOverlapArr = [0.2 * 0.7,
// 			0.2 * 0.7,
// 			0.2 * 0.5,
// 			0.2 * 0.78,
// 			0.2 * 0.78,
// 			0.2 * 0.78,
// 			0.2 * 0.55,
// 			0.2 * 0.1];
// 			const resultMinOverlapArr = new Array<Real>(8);
// 			sp.getMinOverlapDutyCycles(resultMinOverlapArr);
// 			ASSERT_TRUE(check_Array_eq(resultMinOverlapArr, trueOverlapArr,
// 				numColumns));
// 		}

// 		// wrapAround=true
// 		{
// 			const numColumns = 8;
// 			const sp = new SpatialPooler(
// 				/*inputDimensions*/[5],
// 				/*columnDimensions*/[numColumns],
// 				/*potentialRadius*/ 16,
// 				/*potentialPct*/ 0.5,
// 				/*globalInhibition*/ false,
// 				/*localAreaDensity*/ -1.0,
// 				/*numActiveColumnsPerInhArea*/ 3,
// 				/*stimulusThreshold*/ 1,
// 				/*synPermInactiveDec*/ 0.008,
// 				/*synPermActiveInc*/ 0.05,
// 				/*synPermConnected*/ 0.1,
// 				/*minPctOverlapDutyCycles*/ 0.001,
// 				/*dutyCyclePeriod*/ 1000,
// 				/*boostStrength*/ 10.0,
// 				/*seed*/ 1,
// 				/*spVerbosity*/ 0,
// 				/*wrapAround*/ true);

// 			sp.setInhibitionRadius(1);

// 			const activeDutyArr = [0.9, 0.3, 0.5, 0.7, 0.1, 0.01, 0.08, 0.12];
// 			sp.setActiveDutyCycles(activeDutyArr);

// 			const overlapDutyArr = [0.7, 0.1, 0.5, 0.01, 0.78, 0.55, 0.1, 0.001];
// 			sp.setOverlapDutyCycles(overlapDutyArr);

// 			sp.setMinPctOverlapDutyCycles(0.2);

// 			sp.updateMinDutyCyclesLocal_();

// 			const trueOverlapArr = [0.2 * 0.7,
// 			0.2 * 0.7,
// 			0.2 * 0.5,
// 			0.2 * 0.78,
// 			0.2 * 0.78,
// 			0.2 * 0.78,
// 			0.2 * 0.55,
// 			0.2 * 0.7];
// 			const resultMinOverlapArr = new Array<Real>(8);
// 			sp.getMinOverlapDutyCycles(resultMinOverlapArr);
// 			ASSERT_TRUE(check_Array_eq(resultMinOverlapArr, trueOverlapArr,
// 				numColumns));
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testUpdateDutyCycles", () => {
// 		const sp = new SpatialPooler();
// 		const numInputs = 5;
// 		const numColumns = 5;
// 		setup(sp, numInputs, numColumns);
// 		let overlaps = new Array<UInt>();

// 		const initOverlapArr1 = [1, 1, 1, 1, 1];
// 		sp.setOverlapDutyCycles(initOverlapArr1);
// 		const overlapNewVal1 = [1, 5, 7, 0, 0];
// 		overlaps = overlapNewVal1.slice(0, numColumns);
// 		const active = [0, 0, 0, 0, 0];

// 		sp.setIterationNum(2);
// 		sp.updateDutyCycles_(overlaps, active);

// 		const resultOverlapArr1 = new Array<Real>(5);
// 		sp.getOverlapDutyCycles(resultOverlapArr1);

// 		const trueOverlapArr1 = [1, 1, 1, 0.5, 0.5];
// 		ASSERT_TRUE(check_Array_eq(resultOverlapArr1, trueOverlapArr1, numColumns));

// 		sp.setOverlapDutyCycles(initOverlapArr1);
// 		sp.setIterationNum(2000);
// 		sp.setUpdatePeriod(1000);
// 		sp.updateDutyCycles_(overlaps, active);

// 		const resultOverlapArr2 = new Array<Real>(5);
// 		sp.getOverlapDutyCycles(resultOverlapArr2);
// 		const trueOverlapArr2 = [1, 1, 1, 0.999, 0.999];

// 		ASSERT_TRUE(check_Array_eq(resultOverlapArr2, trueOverlapArr2, numColumns));
// 	});

// 	TEST("SpatialPoolerTest", "testAvgColumnsPerInput", () => {
// 		const sp = new SpatialPooler();
// 		let inputDim = new Array<UInt>();
// 		let colDim = new Array<UInt>();
// 		inputDim.length = 0;
// 		colDim.length = 0;

// 		const colDim1 = [2, 2, 2, 2];
// 		const inputDim1 = [4, 4, 4, 4];
// 		const trueAvgColumnPerInput1 = 0.5;

// 		inputDim = inputDim1.slice(0, 4);
// 		colDim = colDim1.slice(0, 4);
// 		sp.initialize(inputDim, colDim);
// 		let result = sp.avgColumnsPerInput_();
// 		ASSERT_FLOAT_EQ(result, trueAvgColumnPerInput1);

// 		const colDim2 = [2, 2, 2, 2];
// 		const inputDim2 = [7, 5, 1, 3];
// 		const trueAvgColumnPerInput2 = (2.0 / 7 + 2.0 / 5 + 2.0 / 1 + 2 / 3.0) / 4;

// 		inputDim = inputDim2.slice(0, 4);
// 		colDim = colDim2.slice(0, 4);
// 		sp.initialize(inputDim, colDim);
// 		result = sp.avgColumnsPerInput_();
// 		ASSERT_FLOAT_EQ(result, trueAvgColumnPerInput2);

// 		const colDim3 = [3, 3];
// 		const inputDim3 = [3, 3];
// 		const trueAvgColumnPerInput3 = 1;

// 		inputDim = inputDim3.slice(0, 2);
// 		colDim = colDim3.slice(0, 2);
// 		sp.initialize(inputDim, colDim);
// 		result = sp.avgColumnsPerInput_();
// 		ASSERT_FLOAT_EQ(result, trueAvgColumnPerInput3);

// 		const colDim4 = [25];
// 		const inputDim4 = [5];
// 		const trueAvgColumnPerInput4 = 5;

// 		inputDim = inputDim4.slice(0, 1);
// 		colDim = colDim4.slice(0, 1);
// 		sp.initialize(inputDim, colDim);
// 		result = sp.avgColumnsPerInput_();
// 		ASSERT_FLOAT_EQ(result, trueAvgColumnPerInput4);

// 		const colDim5 = [3, 5, 6];
// 		const inputDim5 = [3, 5, 6];
// 		const trueAvgColumnPerInput5 = 1;

// 		inputDim = inputDim5.slice(0, 3);
// 		colDim = colDim5.slice(0, 3);
// 		sp.initialize(inputDim, colDim);
// 		result = sp.avgColumnsPerInput_();
// 		ASSERT_FLOAT_EQ(result, trueAvgColumnPerInput5);

// 		const colDim6 = [2, 4, 6, 8];
// 		const inputDim6 = [2, 2, 2, 2];
// 		//  1  2  3  4
// 		const trueAvgColumnPerInput6 = 2.5;

// 		inputDim = inputDim6.slice(0, 4);
// 		colDim = colDim6.slice(0, 4);
// 		sp.initialize(inputDim, colDim);
// 		result = sp.avgColumnsPerInput_();
// 		ASSERT_FLOAT_EQ(result, trueAvgColumnPerInput6);
// 	});

// 	TEST("SpatialPoolerTest", "testAvgConnectedSpanForColumn1D", () => {

// 		const sp = new SpatialPooler();
// 		const numColumns = 9;
// 		const numInputs = 8;
// 		setup(sp, numInputs, numColumns);

// 		const permArr =
// 			[[0, 1, 0, 1, 0, 1, 0, 1],
// 			[0, 0, 0, 1, 0, 0, 0, 1],
// 			[0, 0, 0, 0, 0, 0, 1, 0],
// 			[0, 0, 1, 0, 0, 0, 1, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 1, 1, 0, 0, 0, 0, 0],
// 			[0, 0, 1, 1, 1, 0, 0, 0],
// 			[0, 0, 1, 0, 1, 0, 0, 0],
// 			[1, 1, 1, 1, 1, 1, 1, 1]];

// 		const trueAvgConnectedSpan =
// 			[7, 5, 1, 5, 0, 2, 3, 3, 8];

// 		for (let i = 0; i < numColumns; i++) {
// 			sp.setPermanence(i, permArr[i]);
// 			const result = sp.avgConnectedSpanForColumn1D_(i);
// 			ASSERT_TRUE(result === trueAvgConnectedSpan[i]);
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testAvgConnectedSpanForColumn2D", () => {
// 		const sp = new SpatialPooler();

// 		let numColumns = 7;
// 		let numInputs = 20;

// 		const colDim = new Array<UInt>();
// 		const inputDim = new Array<UInt>();
// 		const permArr1 =
// 			[[0, 1, 1, 1,
// 				0, 1, 1, 1,
// 				0, 1, 1, 1,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0],
// 			// rowspan = 3, colspan = 3, avg = 3

// 			[1, 1, 1, 1,
// 				0, 0, 1, 1,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0],
// 			// rowspan = 2 colspan = 4, avg = 3

// 			[1, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 1],
// 			// row span = 5, colspan = 4, avg = 4.5

// 			[0, 1, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 1, 0, 0,
// 				0, 1, 0, 0],
// 			// rowspan = 5, colspan = 1, avg = 3

// 			[0, 0, 0, 0,
// 				1, 0, 0, 1,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0],
// 			// rowspan = 1, colspan = 4, avg = 2.5

// 			[0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 1, 0,
// 				0, 0, 0, 1],
// 			// rowspan = 2, colspan = 2, avg = 2

// 			[0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0,
// 				0, 0, 0, 0]
// 				// rowspan = 0, colspan = 0, avg = 0
// 			];

// 		inputDim.push(5);
// 		inputDim.push(4);
// 		colDim.push(10);
// 		colDim.push(1);
// 		sp.initialize(inputDim, colDim);

// 		const trueAvgConnectedSpan1 = [3, 3, 4, 3, 2, 2, 0];

// 		for (let i = 0; i < numColumns; i++) {
// 			sp.setPermanence(i, permArr1[i]);
// 			const result = sp.avgConnectedSpanForColumn2D_(i);
// 			ASSERT_TRUE(result === (trueAvgConnectedSpan1[i]));
// 		}

// 		// 1D tests repeated
// 		numColumns = 9;
// 		numInputs = 8;

// 		colDim.length = 0;
// 		inputDim.length = 0;
// 		inputDim.push(numInputs);
// 		inputDim.push(1);
// 		colDim.push(numColumns);
// 		colDim.push(1);

// 		sp.initialize(inputDim, colDim);

// 		const permArr2 =
// 			[[0, 1, 0, 1, 0, 1, 0, 1],
// 			[0, 0, 0, 1, 0, 0, 0, 1],
// 			[0, 0, 0, 0, 0, 0, 1, 0],
// 			[0, 0, 1, 0, 0, 0, 1, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 1, 1, 0, 0, 0, 0, 0],
// 			[0, 0, 1, 1, 1, 0, 0, 0],
// 			[0, 0, 1, 0, 1, 0, 0, 0],
// 			[1, 1, 1, 1, 1, 1, 1, 1]];

// 		const trueAvgConnectedSpan2 =
// 			[8, 5, 1, 5, 0, 2, 3, 3, 8];

// 		for (let i = 0; i < numColumns; i++) {
// 			sp.setPermanence(i, permArr2[i]);
// 			const result = sp.avgConnectedSpanForColumn2D_(i);
// 			ASSERT_TRUE(result === (trueAvgConnectedSpan2[i] + 1) / 2);
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testAvgConnectedSpanForColumnND", () => {
// 		const sp = new SpatialPooler();
// 		const inputDim = new Array<UInt>();
// 		const colDim = new Array<UInt>();
// 		inputDim.push(4);
// 		inputDim.push(4);
// 		inputDim.push(2);
// 		inputDim.push(5);
// 		colDim.push(5);
// 		colDim.push(1);
// 		colDim.push(1);
// 		colDim.push(1);

// 		sp.initialize(inputDim, colDim);

// 		const numInputs = 160;
// 		const numColumns = 5;

// 		// Real permArr0[4][4][2][5];
// 		// Real permArr1[4][4][2][5];
// 		// Real permArr2[4][4][2][5];
// 		// Real permArr3[4][4][2][5];
// 		// Real permArr4[4][4][2][5];

// 		const permArr0 = new Array<Real[][][]>();
// 		const permArr1 = new Array<Real[][][]>();
// 		const permArr2 = new Array<Real[][][]>();
// 		const permArr3 = new Array<Real[][][]>();
// 		const permArr4 = new Array<Real[][][]>();

// 		for (let i = 0; i < numInputs; i++) {
// 			permArr0[i] = 0;
// 			permArr1[i] = 0;
// 			permArr2[i] = 0;
// 			permArr3[i] = 0;
// 			permArr4[i] = 0;
// 		}

// 		permArr0[1][0][1][0] = 1;
// 		permArr0[1][0][1][1] = 1;
// 		permArr0[3][2][1][0] = 1;
// 		permArr0[3][0][1][0] = 1;
// 		permArr0[1][0][1][3] = 1;
// 		permArr0[2][2][1][0] = 1;

// 		permArr1[2][0][1][0] = 1;
// 		permArr1[2][0][0][0] = 1;
// 		permArr1[3][0][0][0] = 1;
// 		permArr1[3][0][1][0] = 1;

// 		permArr2[0][0][1][4] = 1;
// 		permArr2[0][0][0][3] = 1;
// 		permArr2[0][0][0][1] = 1;
// 		permArr2[1][0][0][2] = 1;
// 		permArr2[0][0][1][1] = 1;
// 		permArr2[3][3][1][1] = 1;

// 		permArr3[3][3][1][4] = 1;
// 		permArr3[0][0][0][0] = 1;

// 		sp.setPermanence(0, permArr0);
// 		sp.setPermanence(1, permArr1);
// 		sp.setPermanence(2, permArr2);
// 		sp.setPermanence(3, permArr3);
// 		sp.setPermanence(4, permArr4);

// 		const trueAvgConnectedSpan =
// 			[11.0 / 4, 6.0 / 4, 14.0 / 4, 15.0 / 4, 0];

// 		for (let i = 0; i < numColumns; i++) {
// 			const result = sp.avgConnectedSpanForColumnND_(i);
// 			ASSERT_TRUE(result === trueAvgConnectedSpan[i]);
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testAdaptSynapses", () => {
// 		const sp = new SpatialPooler();
// 		const numColumns = 4;
// 		const numInputs = 8;
// 		setup(sp, numInputs, numColumns);

// 		let activeColumns = new Array<UInt>();
// 		const inputArray = new Array<UInt>();

// 		const potentialArr1 =
// 			[[1, 1, 1, 1, 0, 0, 0, 0],
// 			[1, 0, 0, 0, 1, 1, 0, 1],
// 			[0, 0, 1, 0, 0, 0, 1, 0],
// 			[1, 0, 0, 0, 0, 0, 1, 0]];

// 		const permanencesArr1 =
// 			[[0.200, 0.120, 0.090, 0.060, 0.000, 0.000, 0.000, 0.000],
// 			[0.150, 0.000, 0.000, 0.000, 0.180, 0.120, 0.000, 0.450],
// 			[0.000, 0.000, 0.014, 0.000, 0.000, 0.000, 0.110, 0.000],
// 			[0.070, 0.000, 0.000, 0.000, 0.000, 0.000, 0.178, 0.000]];

// 		const truePermanences1 =
// 			[[0.300, 0.110, 0.080, 0.160, 0.000, 0.000, 0.000, 0.000],
// 			//   Inc     Dec   Dec    Inc      -      -      -     -
// 			[0.250, 0.000, 0.000, 0.000, 0.280, 0.110, 0.000, 0.440],
// 			//   Inc      -      -     -      Inc    Dec    -     Dec
// 			[0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.210, 0.000],
// 			//   -      -     Trim     -     -     -       Inc   -
// 			[0.070, 0.000, 0.000, 0.000, 0.000, 0.000, 0.178, 0.000]];
// 		//    -      -      -      -      -      -      -       -

// 		const inputArr1 = [1, 0, 0, 1, 1, 0, 1, 0];
// 		const activeColumnsArr1 = [0, 1, 2];

// 		for (let column = 0; column < numColumns; column++) {
// 			sp.setPotential(column, potentialArr1[column]);
// 			sp.setPermanence(column, permanencesArr1[column]);
// 		}

// 		activeColumns = activeColumnsArr1.slice(0, 4); // .assign(&activeColumnsArr1[0],  & activeColumnsArr1[3]);

// 		sp.adaptSynapses_(inputArr1, activeColumns);
// 		for (let column = 0; column < numColumns; column++) {
// 			let permArr = new Array<Real>(numInputs);
// 			sp.getPermanence(column, permArr);
// 			ASSERT_TRUE(check_Array_eq(truePermanences1[column],
// 				permArr,
// 				numInputs));
// 			permArr = null;
// 		}

// 		const potentialArr2 =
// 			[[1, 1, 1, 0, 0, 0, 0, 0],
// 			[0, 1, 1, 1, 0, 0, 0, 0],
// 			[0, 0, 1, 1, 1, 0, 0, 0],
// 			[1, 0, 0, 0, 0, 0, 1, 0]];

// 		const permanencesArr2 =
// 			[[0.200, 0.120, 0.090, 0.000, 0.000, 0.000, 0.000, 0.000],
// 			[0.000, 0.017, 0.232, 0.400, 0.000, 0.000, 0.000, 0.000],
// 			[0.000, 0.000, 0.014, 0.051, 0.730, 0.000, 0.000, 0.000],
// 			[0.170, 0.000, 0.000, 0.000, 0.000, 0.000, 0.380, 0.000]];

// 		const truePermanences2 =
// 			[[0.30, 0.110, 0.080, 0.000, 0.000, 0.000, 0.000, 0.000],
// 			//  #  Inc    Dec     Dec     -       -    -    -    -
// 			[0.000, 0.000, 0.222, 0.500, 0.000, 0.000, 0.000, 0.000],
// 			//  #  -     Trim    Dec    Inc    -       -      -      -
// 			[0.000, 0.000, 0.000, 0.151, 0.830, 0.000, 0.000, 0.000],
// 			//  #   -      -    Trim   Inc    Inc     -     -     -
// 			[0.170, 0.000, 0.000, 0.000, 0.000, 0.000, 0.380, 0.000]];
// 		//  #  -    -      -      -      -       -       -     -

// 		const inputArr2 = [1, 0, 0, 1, 1, 0, 1, 0];
// 		const activeColumnsArr2 = [0, 1, 2];

// 		for (let column = 0; column < numColumns; column++) {
// 			sp.setPotential(column, potentialArr2[column]);
// 			sp.setPermanence(column, permanencesArr2[column]);
// 		}

// 		activeColumns = activeColumnsArr2.slice(0, 3); // .assign(activeColumnsArr2[0], activeColumnsArr2[3]);

// 		sp.adaptSynapses_(inputArr2, activeColumns);

// 		for (let column = 0; column < numColumns; column++) {
// 			let permArr = new Array<Real>(numInputs);
// 			sp.getPermanence(column, permArr);
// 			ASSERT_TRUE(check_Array_eq(truePermanences2[column], permArr, numInputs));
// 			permArr = null;
// 		}

// 	});

// 	TEST("SpatialPoolerTest", "testBumpUpWeakColumns", () => {
// 		const sp = new SpatialPooler();
// 		const numInputs = 8;
// 		const numColumns = 5;
// 		setup(sp, numInputs, numColumns);
// 		sp.setSynPermBelowStimulusInc(0.01);
// 		sp.setSynPermTrimThreshold(0.05);
// 		const overlapDutyCyclesArr = [0, 0.009, 0.1, 0.001, 0.002];
// 		sp.setOverlapDutyCycles(overlapDutyCyclesArr);
// 		const minOverlapDutyCyclesArr = [0.01, 0.01, 0.01, 0.01, 0.01];
// 		sp.setMinOverlapDutyCycles(minOverlapDutyCyclesArr);

// 		const potentialArr =
// 			[[1, 1, 1, 1, 0, 0, 0, 0],
// 			[1, 0, 0, 0, 1, 1, 0, 1],
// 			[0, 0, 1, 0, 1, 1, 1, 0],
// 			[1, 1, 1, 0, 0, 0, 1, 0],
// 			[1, 1, 1, 1, 1, 1, 1, 1]];

// 		const permArr =
// 			[[0.200, 0.120, 0.090, 0.040, 0.000, 0.000, 0.000, 0.000],
// 			[0.150, 0.000, 0.000, 0.000, 0.180, 0.120, 0.000, 0.450],
// 			[0.000, 0.000, 0.074, 0.000, 0.062, 0.054, 0.110, 0.000],
// 			[0.051, 0.000, 0.000, 0.000, 0.000, 0.000, 0.178, 0.000],
// 			[0.100, 0.738, 0.085, 0.002, 0.052, 0.008, 0.208, 0.034]];

// 		const truePermArr =
// 			[[0.210, 0.130, 0.100, 0.000, 0.000, 0.000, 0.000, 0.000],
// 			//  Inc    Inc    Inc    Trim    -     -     -    -
// 			[0.160, 0.000, 0.000, 0.000, 0.190, 0.130, 0.000, 0.460],
// 			//  Inc   -     -    -     Inc   Inc    -     Inc
// 			[0.000, 0.000, 0.074, 0.000, 0.062, 0.054, 0.110, 0.000],  // unchanged
// 			//  -    -     -    -     -    -     -    -
// 			[0.061, 0.000, 0.000, 0.000, 0.000, 0.000, 0.188, 0.000],
// 			//   Inc   Trim    Trim    -     -      -     Inc     -
// 			[0.110, 0.748, 0.095, 0.000, 0.062, 0.000, 0.218, 0.000]];

// 		for (let i = 0; i < numColumns; i++) {
// 			sp.setPotential(i, potentialArr[i]);
// 			sp.setPermanence(i, permArr[i]);
// 			const perm = new Array<Real>(8);
// 			sp.getPermanence(i, perm);
// 		}

// 		sp.bumpUpWeakColumns_();

// 		for (let i = 0; i < numColumns; i++) {
// 			const perm = new Array<Real>(8);
// 			sp.getPermanence(i, perm);
// 			ASSERT_TRUE(check_Array_eq(truePermArr[i], perm, numInputs));
// 		}

// 	});

// 	TEST("SpatialPoolerTest", "testUpdateDutyCyclesHelper", () => {
// 		const sp = new SpatialPooler();
// 		let dutyCycles = new Array<Real>();
// 		let newValues = new Array<UInt>();
// 		let period: UInt;

// 		dutyCycles.length = 0;
// 		newValues.length = 0;
// 		const dutyCyclesArr1 = [1000.0, 1000.0, 1000.0, 1000.0, 1000.0];
// 		const newValues1 = [0, 0, 0, 0, 0];
// 		period = 1000;
// 		const trueDutyCycles1 = [999.0, 999.0, 999.0, 999.0, 999.0];
// 		dutyCycles = dutyCyclesArr1.slice(0, 5); // .assign(dutyCyclesArr1, dutyCyclesArr1 + 5);
// 		newValues = newValues1.slice(0, 5); // .assign(newValues1, newValues1 + 5);
// 		SpatialPooler.updateDutyCyclesHelper_(dutyCycles, newValues, period);
// 		ASSERT_TRUE(check_Array_eq(trueDutyCycles1, dutyCycles));

// 		dutyCycles.length = 0;
// 		newValues.length = 0;
// 		const dutyCyclesArr2 = [1000.0, 1000.0, 1000.0, 1000.0, 1000.0];
// 		const newValues2 = [1000, 1000, 1000, 1000, 1000];
// 		period = 1000;
// 		const trueDutyCycles2 = [1000.0, 1000.0, 1000.0, 1000.0, 1000.0];
// 		dutyCycles = dutyCyclesArr2.slice(0, 5); // .assign(dutyCyclesArr2, dutyCyclesArr2 + 5);
// 		newValues = newValues2.slice(0, 5); // .assign(newValues2, newValues2 + 5);
// 		SpatialPooler.updateDutyCyclesHelper_(dutyCycles, newValues, period);
// 		ASSERT_TRUE(check_Array_eq(trueDutyCycles2, dutyCycles));

// 		dutyCycles.length = 0;
// 		newValues.length = 0;
// 		const dutyCyclesArr3 = [1000.0, 1000.0, 1000.0, 1000.0, 1000.0];
// 		const newValues3 = [2000, 4000, 5000, 6000, 7000];
// 		period = 1000;
// 		const trueDutyCycles3 = [1001.0, 1003.0, 1004.0, 1005.0, 1006.0];
// 		dutyCycles = dutyCyclesArr3.slice(0, 5); // .assign(dutyCyclesArr3, dutyCyclesArr3 + 5);
// 		newValues = newValues3.slice(0, 5); // .assign(newValues3, newValues3 + 5);
// 		SpatialPooler.updateDutyCyclesHelper_(dutyCycles, newValues, period);
// 		ASSERT_TRUE(check_Array_eq(trueDutyCycles3, dutyCycles));

// 		dutyCycles.length = 0;
// 		newValues.length = 0;
// 		const dutyCyclesArr4 = [1000.0, 800.0, 600.0, 400.0, 2000.0];
// 		const newValues4 = [0, 0, 0, 0, 0];
// 		period = 2;
// 		const trueDutyCycles4 = [500.0, 400.0, 300.0, 200.0, 1000.0];
// 		dutyCycles = dutyCyclesArr4.slice(0, 5); // .assign(dutyCyclesArr4, dutyCyclesArr4 + 5);
// 		newValues = newValues4.slice(0, 5); // .assign(newValues4, newValues4 + 5);
// 		SpatialPooler.updateDutyCyclesHelper_(dutyCycles, newValues, period);
// 		ASSERT_TRUE(check_Array_eq(trueDutyCycles4, dutyCycles));

// 	});
// 	// TODO: find out why its disabled, narrowing conversion
// 	/*TEST(SpatialPoolerTest, testUpdateBoostFactors)
// 	{
// 	  SpatialPooler sp;
// 	  setup(sp, 5, 6);

// 	  Real initActiveDutyCycles1[] = {0.1, 0.1, 0.1, 0.1, 0.1, 0.1};
// 	  Real initBoostFactors1[] = {0, 0, 0, 0, 0, 0};
// 	  Array<Real> trueBoostFactors1 =
// 		{1.0, 1.0, 1.0, 1.0, 1.0, 1.0};
// 	  Array<Real> resultBoostFactors1(6, 0);
// 	  sp.setGlobalInhibition(false);
// 	  sp.setBoostStrength(10);
// 	  sp.setBoostFactors(initBoostFactors1);
// 	  sp.setActiveDutyCycles(initActiveDutyCycles1);
// 	  sp.updateBoostFactors_();
// 	  sp.getBoostFactors(resultBoostFactors1);
// 	  ASSERT_TRUE(check_Array_eq(trueBoostFactors1, resultBoostFactors1));

// 	  Real initActiveDutyCycles2[] =
// 		{0.1, 0.3, 0.02, 0.04, 0.7, 0.12};
// 	  Real initBoostFactors2[] =
// 		{0, 0, 0, 0, 0, 0};
// 	  Array<Real> trueBoostFactors2 =
// 		{3.10599, 0.42035, 6.91251, 5.65949, 0.00769898, 2.54297};
// 	  Array<Real> resultBoostFactors2(6, 0);
// 	  sp.setGlobalInhibition(false);
// 	  sp.setBoostStrength(10);
// 	  sp.setBoostFactors(initBoostFactors2);
// 	  sp.setActiveDutyCycles(initActiveDutyCycles2);
// 	  sp.updateBoostFactors_();
// 	  sp.getBoostFactors(resultBoostFactors2);

// 	  ASSERT_TRUE(check_Array_eq(trueBoostFactors2, resultBoostFactors2));

// 	  Real initActiveDutyCycles3[] =
// 		{0.1, 0.3, 0.02, 0.04, 0.7, 0.12};
// 	  Real initBoostFactors3[] =
// 		{0, 0, 0, 0, 0, 0};
// 	  Array<Real> trueBoostFactors3 =
// 		{ 1.25441, 0.840857, 1.47207, 1.41435, 0.377822, 1.20523 };
// 	  Array<Real> resultBoostFactors3(6, 0);
// 	  sp.setWrapAround(true);
// 	  sp.setGlobalInhibition(false);
// 	  sp.setBoostStrength(2.0);
// 	  sp.setInhibitionRadius(5);
// 	  sp.setNumActiveColumnsPerInhArea(1);
// 	  sp.setBoostFactors(initBoostFactors3);
// 	  sp.setActiveDutyCycles(initActiveDutyCycles3);
// 	  sp.updateBoostFactors_();
// 	  sp.getBoostFactors(resultBoostFactors3);

// 	  ASSERT_TRUE(check_Array_eq(trueBoostFactors3, resultBoostFactors3));

// 	  Real initActiveDutyCycles4[] =
// 		{0.1, 0.3, 0.02, 0.04, 0.7, 0.12};
// 	  Real initBoostFactors4[] =
// 		{0, 0, 0, 0, 0, 0};
// 	  Array<Real> trueBoostFactors4 =
// 		{ 1.94773, 0.263597, 4.33476, 3.549, 0.00482795, 1.59467 };
// 	  Array<Real> resultBoostFactors4(6, 0);
// 	  sp.setGlobalInhibition(true);
// 	  sp.setBoostStrength(10);
// 	  sp.setNumActiveColumnsPerInhArea(1);
// 	  sp.setInhibitionRadius(3);
// 	  sp.setBoostFactors(initBoostFactors4);
// 	  sp.setActiveDutyCycles(initActiveDutyCycles4);
// 	  sp.updateBoostFactors_();
// 	  sp.getBoostFactors(resultBoostFactors4);

// 	  ASSERT_TRUE(check_Array_eq(trueBoostFactors3, resultBoostFactors3));
// 	}*/

// 	TEST("SpatialPoolerTest", "testUpdateBookeepingVars", () => {
// 		const sp = new SpatialPooler();
// 		sp.setIterationNum(5);
// 		sp.setIterationLearnNum(3);
// 		sp.updateBookeepingVars_(true);
// 		ASSERT_TRUE(6 === sp.getIterationNum());
// 		ASSERT_TRUE(4 === sp.getIterationLearnNum());

// 		sp.updateBookeepingVars_(false);
// 		ASSERT_TRUE(7 === sp.getIterationNum());
// 		ASSERT_TRUE(4 === sp.getIterationLearnNum());
// 	});

// 	TEST("SpatialPoolerTest", "testCalculateOverlap", () => {
// 		const sp = new SpatialPooler();
// 		const numInputs = 10;
// 		const numColumns = 5;
// 		const numTrials = 5;
// 		setup(sp, numInputs, numColumns);
// 		sp.setStimulusThreshold(0);

// 		const permArr =
// 			[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
// 			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
// 			[0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 1, 1]];

// 		const inputs =
// 			[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 			[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
// 			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

// 		const trueOverlaps =
// 			[[0, 0, 0, 0, 0],
// 			[10, 8, 6, 4, 2],
// 			[5, 4, 3, 2, 1],
// 			[5, 3, 1, 0, 0],
// 			[1, 1, 1, 1, 1]];

// 		for (let i = 0; i < numColumns; i++) {
// 			sp.setPermanence(i, permArr[i]);
// 		}

// 		for (let i = 0; i < numTrials; i++) {
// 			const overlaps = new Array<UInt>();
// 			sp.calculateOverlap_(inputs[i], overlaps);
// 			ASSERT_TRUE(check_Array_eq(trueOverlaps[i], overlaps));
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testCalculateOverlapPct", () => {
// 		const sp = new SpatialPooler();
// 		const numInputs = 10;
// 		const numColumns = 5;
// 		const numTrials = 5;
// 		setup(sp, numInputs, numColumns);
// 		sp.setStimulusThreshold(0);

// 		const permArr =
// 			[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
// 			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
// 			[0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 1, 1]];

// 		const overlapsArr =
// 			[[0, 0, 0, 0, 0],
// 			[10, 8, 6, 4, 2],
// 			[5, 4, 3, 2, 1],
// 			[5, 3, 1, 0, 0],
// 			[1, 1, 1, 1, 1]];

// 		const trueOverlapsPct =
// 			[[0.0, 0.0, 0.0, 0.0, 0.0],
// 			[1.0, 1.0, 1.0, 1.0, 1.0],
// 			[0.5, 0.5, 0.5, 0.5, 0.5],
// 			[0.5, 3.0 / 8, 1.0 / 6, 0, 0],
// 			[1.0 / 10, 1.0 / 8, 1.0 / 6, 1.0 / 4, 1.0 / 2]];

// 		for (let i = 0; i < numColumns; i++) {
// 			sp.setPermanence(i, permArr[i]);
// 		}

// 		for (let i = 0; i < numTrials; i++) {
// 			const overlapsPct = new Array<Real>();
// 			let overlaps = new Array<UInt>();
// 			overlaps = overlapsArr[i].slice(0, numColumns); //  .assign( & overlapsArr[i][0], overlapsArr[i][numColumns]);
// 			sp.calculateOverlapPct_(overlaps, overlapsPct);
// 			ASSERT_TRUE(check_Array_eq(trueOverlapsPct[i], overlapsPct));
// 		}

// 	});

// 	TEST("SpatialPoolerTest", "testIsWinner", () => {
// 		const numInputs = 10;
// 		const numColumns = 5;
// 		const sp = new SpatialPooler([numInputs], [numColumns]);

// 		const winners = new Array<pair<UInt, Real>>();

// 		let numWinners = 3;
// 		let score = -5;
// 		ASSERT_FALSE(sp.isWinner_(score, winners, numWinners));
// 		score = 0;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));

// 		const sc1 = new pair<UInt, Real>(); sc1.first = 1; sc1.second = 32;
// 		const sc2 = new pair<UInt, Real>(); sc2.first = 2; sc2.second = 27;
// 		const sc3 = new pair<UInt, Real>(); sc3.first = 17; sc3.second = 19.5;
// 		winners.push(sc1);
// 		winners.push(sc2);
// 		winners.push(sc3);

// 		numWinners = 3;
// 		score = -5;
// 		ASSERT_TRUE(!sp.isWinner_(score, winners, numWinners));
// 		score = 18;
// 		ASSERT_TRUE(!sp.isWinner_(score, winners, numWinners));
// 		score = 18;
// 		numWinners = 4;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 		numWinners = 3;
// 		score = 20;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 		score = 30;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 		score = 40;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 		score = 40;
// 		numWinners = 6;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));

// 		const sc4 = new pair<UInt, Real>(); sc4.first = 34; sc4.second = 17.1;
// 		const sc5 = new pair<UInt, Real>(); sc5.first = 51; sc5.second = 1.2;
// 		const sc6 = new pair<UInt, Real>(); sc6.first = 19; sc6.second = 0.3;
// 		winners.push(sc4);
// 		winners.push(sc5);
// 		winners.push(sc6);

// 		score = 40;
// 		numWinners = 6;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 		score = 12;
// 		numWinners = 6;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 		score = 0.1;
// 		numWinners = 6;
// 		ASSERT_TRUE(!sp.isWinner_(score, winners, numWinners));
// 		score = 0.1;
// 		numWinners = 7;
// 		ASSERT_TRUE(sp.isWinner_(score, winners, numWinners));
// 	});

// 	TEST("SpatialPoolerTest", "testAddToWinners", () => {
// 		const sp = new SpatialPooler();
// 		const winners = new Array<pair<UInt, Real>>();

// 		let index: UInt;
// 		let score: Real;

// 		index = 17; score = 19.5;
// 		sp.addToWinners_(index, score, winners);
// 		index = 1; score = 32;
// 		sp.addToWinners_(index, score, winners);
// 		index = 2; score = 27;
// 		sp.addToWinners_(index, score, winners);

// 		ASSERT_TRUE(winners[0].first === 1);
// 		ASSERT_TRUE(almost_eq(winners[0].second, 32));
// 		ASSERT_TRUE(winners[1].first === 2);
// 		ASSERT_TRUE(almost_eq(winners[1].second, 27));
// 		ASSERT_TRUE(winners[2].first === 17);
// 		ASSERT_TRUE(almost_eq(winners[2].second, 19.5));

// 		index = 15; score = 20.5;
// 		sp.addToWinners_(index, score, winners);
// 		ASSERT_TRUE(winners[0].first === 1);
// 		ASSERT_TRUE(almost_eq(winners[0].second, 32));
// 		ASSERT_TRUE(winners[1].first === 2);
// 		ASSERT_TRUE(almost_eq(winners[1].second, 27));
// 		ASSERT_TRUE(winners[2].first === 15);
// 		ASSERT_TRUE(almost_eq(winners[2].second, 20.5));
// 		ASSERT_TRUE(winners[3].first === 17);
// 		ASSERT_TRUE(almost_eq(winners[3].second, 19.5));

// 		index = 7; score = 100;
// 		sp.addToWinners_(index, score, winners);
// 		ASSERT_TRUE(winners[0].first === 7);
// 		ASSERT_TRUE(almost_eq(winners[0].second, 100));
// 		ASSERT_TRUE(winners[1].first === 1);
// 		ASSERT_TRUE(almost_eq(winners[1].second, 32));
// 		ASSERT_TRUE(winners[2].first === 2);
// 		ASSERT_TRUE(almost_eq(winners[2].second, 27));
// 		ASSERT_TRUE(winners[3].first === 15);
// 		ASSERT_TRUE(almost_eq(winners[3].second, 20.5));
// 		ASSERT_TRUE(winners[4].first === 17);
// 		ASSERT_TRUE(almost_eq(winners[4].second, 19.5));

// 		index = 22; score = 1;
// 		sp.addToWinners_(index, score, winners);
// 		ASSERT_TRUE(winners[0].first === 7);
// 		ASSERT_TRUE(almost_eq(winners[0].second, 100));
// 		ASSERT_TRUE(winners[1].first === 1);
// 		ASSERT_TRUE(almost_eq(winners[1].second, 32));
// 		ASSERT_TRUE(winners[2].first === 2);
// 		ASSERT_TRUE(almost_eq(winners[2].second, 27));
// 		ASSERT_TRUE(winners[3].first === 15);
// 		ASSERT_TRUE(almost_eq(winners[3].second, 20.5));
// 		ASSERT_TRUE(winners[4].first === 17);
// 		ASSERT_TRUE(almost_eq(winners[4].second, 19.5));
// 		ASSERT_TRUE(winners[5].first === 22);
// 		ASSERT_TRUE(almost_eq(winners[5].second, 1));

// 	});

// 	TEST("SpatialPoolerTest", "testInhibitColumns", () => {
// 		const sp = new SpatialPooler();
// 		setup(sp, 10, 10);

// 		let overlapsReal = new Array<Real>();
// 		let overlaps = new Array<Real>();
// 		const activeColumns = new Array<UInt>();
// 		const activeColumnsGlobal = new Array<UInt>();
// 		const activeColumnsLocal = new Array<UInt>();
// 		let density: Real;
// 		let inhibitionRadius: UInt;
// 		let numColumns: UInt;

// 		density = 0.3;
// 		numColumns = 10;
// 		const overlapsArray = [10, 21, 34, 4, 18, 3, 12, 5, 7, 1];

// 		overlapsReal = overlapsArray.slice(0, overlapsArray.length); // .assign(overlapsArray, overlapsArray);
// 		sp.inhibitColumnsGlobal_(overlapsReal, density, activeColumnsGlobal);
// 		overlapsReal = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],  & overlapsArray[numColumns]);
// 		sp.inhibitColumnsLocal_(overlapsReal, density, activeColumnsLocal);

// 		sp.setInhibitionRadius(5);
// 		sp.setGlobalInhibition(true);
// 		sp.setLocalAreaDensity(density);

// 		overlaps = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],   & overlapsArray[numColumns]);
// 		sp.inhibitColumns_(overlaps, activeColumns);

// 		ASSERT_TRUE(check_Array_eq(activeColumns, activeColumnsGlobal));
// 		ASSERT_TRUE(!check_Array_eq(activeColumns, activeColumnsLocal));

// 		sp.setGlobalInhibition(false);
// 		sp.setInhibitionRadius(numColumns + 1);

// 		overlaps = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],    & overlapsArray[numColumns]);
// 		sp.inhibitColumns_(overlaps, activeColumns);

// 		ASSERT_TRUE(check_Array_eq(activeColumns, activeColumnsGlobal));
// 		ASSERT_TRUE(!check_Array_eq(activeColumns, activeColumnsLocal));

// 		inhibitionRadius = 2;
// 		density = 2.0 / 5;

// 		sp.setInhibitionRadius(inhibitionRadius);
// 		sp.setNumActiveColumnsPerInhArea(2);

// 		overlapsReal = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],       & overlapsArray[numColumns]);
// 		sp.inhibitColumnsGlobal_(overlapsReal, density, activeColumnsGlobal);
// 		overlapsReal = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],       & overlapsArray[numColumns]);
// 		sp.inhibitColumnsLocal_(overlapsReal, density, activeColumnsLocal);

// 		overlaps = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],          & overlapsArray[numColumns]);
// 		sp.inhibitColumns_(overlaps, activeColumns);

// 		ASSERT_TRUE(!check_Array_eq(activeColumns, activeColumnsGlobal));
// 		ASSERT_TRUE(check_Array_eq(activeColumns, activeColumnsLocal));
// 	});

// 	TEST("SpatialPoolerTest", "testInhibitColumnsGlobal", () => {
// 		const sp = new SpatialPooler();
// 		const numInputs = 10;
// 		const numColumns = 10;
// 		setup(sp, numInputs, numColumns);
// 		let overlaps = new Array<Real>();
// 		const activeColumns = new Array<UInt>();
// 		const trueActive = new Array<UInt>();
// 		const active = new Array<UInt>();
// 		let density: Real;

// 		density = 0.3;
// 		const overlapsArray = [1, 2, 1, 4, 8, 3, 12, 5, 4, 1];
// 		overlaps = overlapsArray.slice(0, numColumns); // .assign( & overlapsArray[0],                & overlapsArray[numColumns]);
// 		sp.inhibitColumnsGlobal_(overlaps, density, activeColumns);
// 		const trueActiveArray1 = [4, 6, 7];

// 		trueActive.fill(0, 0, numColumns); //  .assign(numColumns, 0);
// 		active.fill(0, 0, numColumns); // .assign(numColumns, 0);

// 		for (const elem of trueActiveArray1) {
// 			trueActive[elem] = 1;
// 		}

// 		for (const activeColumn of activeColumns) {
// 			active[activeColumn] = 1;
// 		}

// 		ASSERT_TRUE(check_Array_eq(trueActive, active));

// 		density = 0.5;
// 		const overlapsArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 		overlaps = overlapsArray2.slice(0, numColumns); // .assign( & overlapsArray2[0],                 & overlapsArray2[numColumns]);
// 		sp.inhibitColumnsGlobal_(overlaps, density, activeColumns);
// 		const trueActiveArray2 = [5, 6, 7, 8, 9];

// 		for (const elem of trueActiveArray2) {
// 			trueActive[elem] = 1;
// 		}

// 		for (const activeColumn of activeColumns) {
// 			active[activeColumn] = 1;
// 		}

// 		ASSERT_TRUE(check_Array_eq(trueActive, active));
// 	});

// 	TEST("SpatialPoolerTest", "testInhibitColumnsLocal", () => {
// 		// wrapAround = false
// 		{
// 			const sp = new SpatialPooler(
// 				/*inputDimensions*/[10],
// 				/*columnDimensions*/[10],
// 				/*potentialRadius*/ 16,
// 				/*potentialPct*/ 0.5,
// 				/*globalInhibition*/ false,
// 				/*localAreaDensity*/ -1.0,
// 				/*numActiveColumnsPerInhArea*/ 3,
// 				/*stimulusThreshold*/ 1,
// 				/*synPermInactiveDec*/ 0.008,
// 				/*synPermActiveInc*/ 0.05,
// 				/*synPermConnected*/ 0.1,
// 				/*minPctOverlapDutyCycles*/ 0.001,
// 				/*dutyCyclePeriod*/ 1000,
// 				/*boostStrength*/ 10.0,
// 				/*seed*/ 1,
// 				/*spVerbosity*/ 0,
// 				/*wrapAround*/ false);

// 			let density: Real;
// 			let inhibitionRadius: UInt;

// 			let overlaps = new Array<Real>();
// 			const active = new Array<UInt>();

// 			const overlapsArray1 = [1, 2, 7, 0, 3, 4, 16, 1, 1.5, 1.7];
// 			//  L  W  W  L  L  W  W   L   L    W

// 			inhibitionRadius = 2;
// 			density = 0.5;
// 			overlaps = overlapsArray1.slice(0, 10); // .assign( & overlapsArray1[0],                 & overlapsArray1[10]);
// 			const trueActive = [1, 2, 5, 6, 9];
// 			sp.setInhibitionRadius(inhibitionRadius);
// 			sp.inhibitColumnsLocal_(overlaps, density, active);
// 			ASSERT_EQ(5, active.length);
// 			ASSERT_TRUE(check_Array_eq(trueActive, active));

// 			const overlapsArray2 = [1, 2, 7, 0, 3, 4, 16, 1, 1.5, 1.7];
// 			//   L  W  W  L  L  W   W  L   L    W
// 			overlaps = overlapsArray2.slice(0, 10); // .assign(overlapsArray2[0], overlapsArray2[10]);
// 			const trueActive2 = [1, 2, 4, 5, 6, 9];
// 			inhibitionRadius = 3;
// 			density = 0.5;
// 			sp.setInhibitionRadius(inhibitionRadius);
// 			sp.inhibitColumnsLocal_(overlaps, density, active);
// 			ASSERT_TRUE(active.length === 6);
// 			ASSERT_TRUE(check_Array_eq(trueActive2, active));

// 			// Test arbitration

// 			const overlapsArray3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// 			// W  L  W  L  W  L  W  L  L  L
// 			overlaps = overlapsArray3.slice(0, 10); // .assign( & overlapsArray3[0],                 & overlapsArray3[10]);
// 			const trueActive3 = [0, 2, 4, 6];
// 			inhibitionRadius = 3;
// 			density = 0.25;
// 			sp.setInhibitionRadius(inhibitionRadius);
// 			sp.inhibitColumnsLocal_(overlaps, density, active);

// 			ASSERT_TRUE(active.length === 4);
// 			ASSERT_TRUE(check_Array_eq(trueActive3, active));
// 		}

// 		// wrapAround = true
// 		{
// 			const sp = new SpatialPooler(
// 				/*inputDimensions*/[10],
// 				/*columnDimensions*/[10],
// 				/*potentialRadius*/ 16,
// 				/*potentialPct*/ 0.5,
// 				/*globalInhibition*/ false,
// 				/*localAreaDensity*/ -1.0,
// 				/*numActiveColumnsPerInhArea*/ 3,
// 				/*stimulusThreshold*/ 1,
// 				/*synPermInactiveDec*/ 0.008,
// 				/*synPermActiveInc*/ 0.05,
// 				/*synPermConnected*/ 0.1,
// 				/*minPctOverlapDutyCycles*/ 0.001,
// 				/*dutyCyclePeriod*/ 1000,
// 				/*boostStrength*/ 10.0,
// 				/*seed*/ 1,
// 				/*spVerbosity*/ 0,
// 				/*wrapAround*/ true);

// 			let density: Real;
// 			let inhibitionRadius: UInt;

// 			let overlaps = new Array<Real>();
// 			const active = new Array<UInt>();

// 			const overlapsArray1 = [1, 2, 7, 0, 3, 4, 16, 1, 1.5, 1.7];
// 			//  L  W  W  L  L  W  W   L   W    W

// 			inhibitionRadius = 2;
// 			density = 0.5;
// 			overlaps = overlapsArray1.slice(0, 10); //  .assign( & overlapsArray1[0],                 & overlapsArray1[10]);
// 			const trueActive = [1, 2, 5, 6, 8, 9];
// 			sp.setInhibitionRadius(inhibitionRadius);
// 			sp.inhibitColumnsLocal_(overlaps, density, active);
// 			ASSERT_EQ(6, active.length);
// 			ASSERT_TRUE(check_Array_eq(trueActive, active));

// 			const overlapsArray2 = [1, 2, 7, 0, 3, 4, 16, 1, 1.5, 1.7];
// 			//   L  W  W  L  W  W   W  L   L    W
// 			overlaps = overlapsArray2.slice(0, 10); // .assign( & overlapsArray2[0],                 & overlapsArray2[10]);
// 			const trueActive2 = [1, 2, 4, 5, 6, 9];
// 			inhibitionRadius = 3;
// 			density = 0.5;
// 			sp.setInhibitionRadius(inhibitionRadius);
// 			sp.inhibitColumnsLocal_(overlaps, density, active);
// 			ASSERT_TRUE(active.length === 6);
// 			ASSERT_TRUE(check_Array_eq(trueActive2, active));

// 			// Test arbitration

// 			const overlapsArray3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// 			// W  W  L  L  W  W  L  L  L  W
// 			overlaps = overlapsArray3.slice(0, 10); // .assign( & overlapsArray3[0],                 & overlapsArray3[10]);
// 			const trueActive3 = [0, 1, 4, 5];
// 			inhibitionRadius = 3;
// 			density = 0.25;
// 			sp.setInhibitionRadius(inhibitionRadius);
// 			sp.inhibitColumnsLocal_(overlaps, density, active);

// 			ASSERT_TRUE(active.length === 4);
// 			ASSERT_TRUE(check_Array_eq(trueActive3, active));
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testIsUpdateRound", () => {
// 		const sp = new SpatialPooler();
// 		sp.setUpdatePeriod(50);
// 		sp.setIterationNum(1);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(39);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(50);
// 		ASSERT_TRUE(sp.isUpdateRound_());
// 		sp.setIterationNum(1009);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(1250);
// 		ASSERT_TRUE(sp.isUpdateRound_());

// 		sp.setUpdatePeriod(125);
// 		sp.setIterationNum(0);
// 		ASSERT_TRUE(sp.isUpdateRound_());
// 		sp.setIterationNum(200);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(249);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(1330);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(1249);
// 		ASSERT_TRUE(!sp.isUpdateRound_());
// 		sp.setIterationNum(1375);
// 		ASSERT_TRUE(sp.isUpdateRound_());

// 	});

// 	TEST("SpatialPoolerTest", "testRaisePermanencesToThreshold", () => {
// 		const sp = new SpatialPooler();
// 		const stimulusThreshold = 3;
// 		const synPermConnected = 0.1;
// 		const synPermBelowStimulusInc = 0.01;
// 		const numInputs = 5;
// 		const numColumns = 7;
// 		setup(sp, numInputs, numColumns);
// 		sp.setStimulusThreshold(stimulusThreshold);
// 		sp.setSynPermConnected(synPermConnected);
// 		sp.setSynPermBelowStimulusInc(synPermBelowStimulusInc);

// 		const potentialArr =
// 			[[1, 1, 1, 1, 1],
// 			[1, 1, 1, 1, 1],
// 			[1, 1, 1, 1, 1],
// 			[1, 1, 1, 1, 1],
// 			[1, 1, 1, 1, 1],
// 			[1, 1, 0, 0, 1],
// 			[0, 1, 1, 1, 0]];

// 		const permArr =
// 			[[0.0, 0.11, 0.095, 0.092, 0.01],
// 			[0.12, 0.15, 0.02, 0.12, 0.09],
// 			[0.51, 0.081, 0.025, 0.089, 0.31],
// 			[0.18, 0.0601, 0.11, 0.011, 0.03],
// 			[0.011, 0.011, 0.011, 0.011, 0.011],
// 			[0.12, 0.056, 0, 0, 0.078],
// 			[0, 0.061, 0.07, 0.14, 0]];

// 		const truePerm =
// 			[[0.01, 0.12, 0.105, 0.102, 0.02],  // incremented once
// 			[0.12, 0.15, 0.02, 0.12, 0.09],  // no change
// 			[0.53, 0.101, 0.045, 0.109, 0.33],  // increment twice
// 			[0.22, 0.1001, 0.15, 0.051, 0.07],  // increment four times
// 			[0.101, 0.101, 0.101, 0.101, 0.101],  // increment 9 times
// 			[0.17, 0.106, 0, 0, 0.128],  // increment 5 times
// 			[0, 0.101, 0.11, 0.18, 0]]; // increment 4 times

// 		const trueConnectedCount =
// 			[3, 3, 4, 3, 5, 3, 3];

// 		for (let i = 0; i < numColumns; i++) {
// 			let perm = new Array<Real>();
// 			const potential = new Array<UInt>();
// 			perm = permArr[i].slice(0, numInputs); // .assign( & permArr[i][0],                 & permArr[i][numInputs]);
// 			for (let j = 0; j < numInputs; j++) {
// 				if (potentialArr[i][j] > 0) {
// 					potential.push(j);
// 				}
// 			}
// 			const connected =
// 				sp.raisePermanencesToThreshold_(perm, potential);
// 			ASSERT_TRUE(check_Array_eq(truePerm[i], perm));
// 			ASSERT_TRUE(connected === trueConnectedCount[i]);
// 		}

// 	});

// 	TEST("SpatialPoolerTest", "testUpdatePermanencesForColumn", () => {
// 		const inputDim = new Array<UInt>();
// 		const columnDim = new Array<UInt>();

// 		const numInputs = 5;
// 		const numColumns = 5;
// 		const sp = new SpatialPooler();
// 		setup(sp, numInputs, numColumns);
// 		const synPermTrimThreshold = 0.05;
// 		sp.setSynPermTrimThreshold(synPermTrimThreshold);

// 		const permArr =
// 			[[-0.10, 0.500, 0.400, 0.010, 0.020],
// 			[0.300, 0.010, 0.020, 0.120, 0.090],
// 			[0.070, 0.050, 1.030, 0.190, 0.060],
// 			[0.180, 0.090, 0.110, 0.010, 0.030],
// 			[0.200, 0.101, 0.050, -0.09, 1.100]];

// 		const truePerm =
// 			[[0.000, 0.500, 0.400, 0.000, 0.000],
// 			// Clip     -     -      Trim   Trim
// 			[0.300, 0.000, 0.000, 0.120, 0.090],
// 			// -    Trim   Trim   -     -
// 			[0.070, 0.050, 1.000, 0.190, 0.060],
// 			// -     -   Clip   -     -
// 			[0.180, 0.090, 0.110, 0.000, 0.000],
// 			// -     -    -      Trim   Trim
// 			[0.200, 0.101, 0.050, 0.000, 1.000]];
// 		// -      -     -      Clip   Clip

// 		const trueConnectedSynapses =
// 			[[0, 1, 1, 0, 0],
// 			[1, 0, 0, 1, 0],
// 			[0, 0, 1, 1, 0],
// 			[1, 0, 1, 0, 0],
// 			[1, 1, 0, 0, 1]];

// 		const trueConnectedCount = [2, 2, 2, 2, 3];

// 		for (let i = 0; i < 5; i++) {
// 			const perm = permArr[i].slice(0, 5); // new Array<Real>( & permArr[i][0],                 & permArr[i][5]);
// 			sp.updatePermanencesForColumn_(perm, i, false);
// 			permArr.length = numInputs;
// 			// let permArr = new Array<Real>(numInputs);
// 			let connectedArr = new Array<UInt>(numInputs);
// 			let connectedCountsArr = new Array<UInt>(numColumns);
// 			sp.getPermanence(i, permArr);
// 			sp.getConnectedSynapses(i, connectedArr);
// 			sp.getConnectedCounts(connectedCountsArr);
// 			ASSERT_TRUE(check_Array_eq(truePerm[i], permArr, numInputs));
// 			ASSERT_TRUE(check_Array_eq(trueConnectedSynapses[i], connectedArr,
// 				numInputs));
// 			ASSERT_TRUE(trueConnectedCount[i] === connectedCountsArr[i]);
// 			permArr = null;
// 			connectedArr = null;
// 			connectedCountsArr = null;
// 		}

// 	});

// 	TEST("SpatialPoolerTest", "testInitPermanence", () => {
// 		const inputDim = new Array<UInt>();
// 		const columnDim = new Array<UInt>();
// 		inputDim.push(8);
// 		columnDim.push(2);

// 		const sp = new SpatialPooler();
// 		const synPermConnected = 0.2;
// 		const synPermTrimThreshold = 0.1;
// 		const synPermActiveInc = 0.05;
// 		sp.initialize(inputDim, columnDim);
// 		sp.setSynPermConnected(synPermConnected);
// 		sp.setSynPermTrimThreshold(synPermTrimThreshold);
// 		sp.setSynPermActiveInc(synPermActiveInc);

// 		const arr = [0, 1, 1, 0, 0, 1, 0, 1];
// 		const potential = arr.slice(0, 8); // new Array<UInt>( & arr[0],                              & arr[8]);
// 		let perm = sp.initPermanence_(potential, 1.0);
// 		for (let i = 0; i < 8; i++) {
// 			if (potential[i]) {
// 				ASSERT_TRUE(perm[i] >= synPermConnected);
// 			} else {
// 				ASSERT_TRUE(perm[i] < 1e-5);
// 			}
// 		}

// 		perm = sp.initPermanence_(potential, 0);
// 		for (let i = 0; i < 8; i++) {
// 			if (potential[i]) {
// 				ASSERT_LE(perm[i], synPermConnected);
// 			} else {
// 				ASSERT_LT(perm[i], 1e-5);
// 			}
// 		}

// 		inputDim[0] = 100;
// 		sp.initialize(inputDim, columnDim);
// 		sp.setSynPermConnected(synPermConnected);
// 		sp.setSynPermTrimThreshold(synPermTrimThreshold);
// 		sp.setSynPermActiveInc(synPermActiveInc);
// 		potential.length = 0;

// 		for (let i = 0; i < 100; i++) {
// 			potential.push(1);
// 		}

// 		perm = sp.initPermanence_(potential, 0.5);
// 		let count = 0;
// 		for (let i = 0; i < 100; i++) {
// 			ASSERT_TRUE(perm[i] < 1e-5 || perm[i] >= synPermTrimThreshold);
// 			if (perm[i] >= synPermConnected) {
// 				count++;
// 			}
// 		}
// 		ASSERT_TRUE(count > 5 && count < 95);
// 	});

// 	TEST("SpatialPoolerTest", "testInitPermConnected", () => {
// 		const sp = new SpatialPooler();
// 		const synPermConnected = 0.2;
// 		const synPermMax = 1.0;

// 		sp.setSynPermConnected(synPermConnected);
// 		sp.setSynPermMax(synPermMax);

// 		for (let i = 0; i < 100; i++) {
// 			const permVal = sp.initPermConnected_();
// 			ASSERT_GE(permVal, synPermConnected);
// 			ASSERT_LE(permVal, synPermMax);
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testInitPermNonConnected", () => {
// 		const sp = new SpatialPooler();
// 		const synPermConnected = 0.2;
// 		sp.setSynPermConnected(synPermConnected);
// 		for (let i = 0; i < 100; i++) {
// 			const permVal = sp.initPermNonConnected_();
// 			ASSERT_GE(permVal, 0);
// 			ASSERT_LE(permVal, synPermConnected);
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testMapColumn", () => {
// 		{
// 			// Test 1D.
// 			const sp = new SpatialPooler(
// 				/*inputDimensions*/[12],
// 				/*columnDimensions*/[4]);

// 			EXPECT_EQ(1, sp.mapColumn_(0));
// 			EXPECT_EQ(4, sp.mapColumn_(1));
// 			EXPECT_EQ(7, sp.mapColumn_(2));
// 			EXPECT_EQ(10, sp.mapColumn_(3));
// 		}

// 		{
// 			// Test 1D with same dimensions of columns and inputs.
// 			const sp = new SpatialPooler(
// 			/*inputDimensions*/[4],
// 			/*columnDimensions*/[4]);

// 			EXPECT_EQ(0, sp.mapColumn_(0));
// 			EXPECT_EQ(1, sp.mapColumn_(1));
// 			EXPECT_EQ(2, sp.mapColumn_(2));
// 			EXPECT_EQ(3, sp.mapColumn_(3));
// 		}

// 		{
// 			// Test 1D with dimensions of length 1.
// 			const sp = new SpatialPooler(
// 			/*inputDimensions*/[1],
// 			/*columnDimensions*/[1]);

// 			EXPECT_EQ(0, sp.mapColumn_(0));
// 		}

// 		{
// 			// Test 2D.
// 			const sp = new SpatialPooler(
// 			/*inputDimensions*/[36, 12],
// 			/*columnDimensions*/[12, 4]);

// 			EXPECT_EQ(13, sp.mapColumn_(0));
// 			EXPECT_EQ(49, sp.mapColumn_(4));
// 			EXPECT_EQ(52, sp.mapColumn_(5));
// 			EXPECT_EQ(58, sp.mapColumn_(7));
// 			EXPECT_EQ(418, sp.mapColumn_(47));
// 		}

// 		{
// 			// Test 2D, some input dimensions smaller than column dimensions.
// 			const sp = new SpatialPooler(
// 			/*inputDimensions*/[3, 5],
// 			/*columnDimensions*/[4, 4]);

// 			EXPECT_EQ(0, sp.mapColumn_(0));
// 			EXPECT_EQ(4, sp.mapColumn_(3));
// 			EXPECT_EQ(14, sp.mapColumn_(15));
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "testMapPotential1D", () => {
// 		const inputDim = new Array<UInt>();
// 		const columnDim = new Array<UInt>();
// 		inputDim.push(12);
// 		columnDim.push(4);
// 		const potentialRadius = 2;

// 		const sp = new SpatialPooler();
// 		sp.initialize(inputDim, columnDim);
// 		sp.setPotentialRadius(potentialRadius);

// 		let mask = new Array<UInt>();

// 		// Test without wrapAround and potentialPct = 1
// 		sp.setPotentialPct(1.0);

// 		const expectedMask1 = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
// 		mask = sp.mapPotential_(0, false);
// 		ASSERT_TRUE(check_Array_eq(expectedMask1, mask));

// 		const expectedMask2 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0];
// 		mask = sp.mapPotential_(2, false);
// 		ASSERT_TRUE(check_Array_eq(expectedMask2, mask));

// 		// Test with wrapAround and potentialPct = 1
// 		sp.setPotentialPct(1.0);

// 		const expectedMask3 = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1];
// 		mask = sp.mapPotential_(0, true);
// 		ASSERT_TRUE(check_Array_eq(expectedMask3, mask));

// 		const expectedMask4 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
// 		mask = sp.mapPotential_(3, true);
// 		ASSERT_TRUE(check_Array_eq(expectedMask4, mask));

// 		// Test with potentialPct < 1
// 		sp.setPotentialPct(0.5);
// 		const supersetMask1 = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1];
// 		mask = sp.mapPotential_(0, true);
// 		ASSERT_TRUE(sum(mask) === 3);

// 		const unionMask1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// 		for (let i = 0; i < 12; i++) {
// 			unionMask1[i] = supersetMask1[i] | mask[i];
// 		}

// 		ASSERT_TRUE(check_Array_eq(unionMask1, supersetMask1, 12));
// 	});

// 	TEST("SpatialPoolerTest", "testMapPotential2D", () => {
// 		const inputDim = new Array<UInt>();
// 		const columnDim = new Array<UInt>();
// 		inputDim.push(6);
// 		inputDim.push(12);
// 		columnDim.push(2);
// 		columnDim.push(4);
// 		let potentialRadius = 1;
// 		const potentialPct = 1.0;

// 		const sp = new SpatialPooler();
// 		sp.initialize(inputDim, columnDim);
// 		sp.setPotentialRadius(potentialRadius);
// 		sp.setPotentialPct(potentialPct);

// 		let mask = new Array<UInt>();

// 		// Test without wrapAround
// 		const expectedMask1 = [
// 			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
// 		];
// 		mask = sp.mapPotential_(0, false);
// 		ASSERT_TRUE(check_Array_eq(expectedMask1, mask));

// 		const expectedMask2 = [
// 			0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
// 		];
// 		mask = sp.mapPotential_(2, false);
// 		ASSERT_TRUE(check_Array_eq(expectedMask2, mask));

// 		// Test with wrapAround
// 		potentialRadius = 2;
// 		sp.setPotentialRadius(potentialRadius);
// 		const expectedMask3 = [
// 			1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
// 			1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
// 			1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
// 			1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1
// 		];
// 		mask = sp.mapPotential_(0, true);
// 		ASSERT_TRUE(check_Array_eq(expectedMask3, mask));

// 		const expectedMask4 = [
// 			1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
// 			1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
// 			1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
// 			1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1
// 		];
// 		mask = sp.mapPotential_(3, true);
// 		ASSERT_TRUE(check_Array_eq(expectedMask4, mask));
// 	});

// 	TEST("SpatialPoolerTest", "testStripUnlearnedColumns", () => {
// 		const sp = new SpatialPooler();
// 		const inputDim = new Array<UInt>();
// 		const columnDim = new Array<UInt>();
// 		inputDim.push(5);
// 		columnDim.push(3);
// 		sp.initialize(inputDim, columnDim);

// 		// None learned, none active
// 		{
// 			const activeDutyCycles = [0, 0, 0];
// 			const activeArray = [0, 0, 0];
// 			const expected = [0, 0, 0];

// 			sp.setActiveDutyCycles(activeDutyCycles);
// 			sp.stripUnlearnedColumns(activeArray);

// 			ASSERT_TRUE(check_Array_eq(activeArray, expected, 3));
// 		}

// 		// None learned, some active
// 		{
// 			const activeDutyCycles = [0, 0, 0];
// 			const activeArray = [1, 0, 1];
// 			const expected = [0, 0, 0];

// 			sp.setActiveDutyCycles(activeDutyCycles);
// 			sp.stripUnlearnedColumns(activeArray);

// 			ASSERT_TRUE(check_Array_eq(activeArray, expected, 3));
// 		}

// 		// Some learned, none active
// 		{
// 			const activeDutyCycles = [1, 1, 0];
// 			const activeArray = [0, 0, 0];
// 			const expected = [0, 0, 0];

// 			sp.setActiveDutyCycles(activeDutyCycles);
// 			sp.stripUnlearnedColumns(activeArray);

// 			ASSERT_TRUE(check_Array_eq(activeArray, expected, 3));
// 		}

// 		// Some learned, some active
// 		{
// 			const activeDutyCycles = [1, 1, 0];
// 			const activeArray = [1, 0, 1];
// 			const expected = [1, 0, 0];

// 			sp.setActiveDutyCycles(activeDutyCycles);
// 			sp.stripUnlearnedColumns(activeArray);

// 			ASSERT_TRUE(check_Array_eq(activeArray, expected, 3));
// 		}
// 	});

// 	TEST("SpatialPoolerTest", "getOverlaps", () => {
// 		const sp = new SpatialPooler();
// 		const inputDim = [5];
// 		const columnDim = [3];
// 		sp.initialize(inputDim, columnDim);

// 		const potential = [1, 1, 1, 1, 1];
// 		sp.setPotential(0, potential);
// 		sp.setPotential(1, potential);
// 		sp.setPotential(2, potential);

// 		const permanence0 = [0.0, 0.0, 0.0, 0.0, 0.0];
// 		sp.setPermanence(0, permanence0);
// 		const permanence1 = [1.0, 1.0, 1.0, 0.0, 0.0];
// 		sp.setPermanence(1, permanence1);
// 		const permanence2 = [1.0, 1.0, 1.0, 1.0, 1.0];
// 		sp.setPermanence(2, permanence2);

// 		const boostFactors = [1.0, 2.0, 3.0];
// 		sp.setBoostFactors(boostFactors);

// 		const input = [1, 1, 1, 1, 1];
// 		const activeColumns = [0, 0, 0];
// 		sp.compute(input, true, activeColumns);

// 		const overlaps = sp.getOverlaps();
// 		const expectedOverlaps = [0, 3, 5];
// 		EXPECT_EQ(expectedOverlaps, overlaps);

// 		const boostedOverlaps = sp.getBoostedOverlaps();
// 		const expectedBoostedOverlaps = [0.0, 6.0, 15.0];
// 		EXPECT_EQ(expectedBoostedOverlaps, boostedOverlaps);
// 	});

// 	TEST("SpatialPoolerTest", "ZeroOverlap_NoStimulusThreshold_GlobalInhibition", () => {
// 		const inputSize = 10;
// 		const nColumns = 20;

// 		const sp = new SpatialPooler([inputSize],
// 			[nColumns],
// 			/*potentialRadius*/ 10,
// 			/*potentialPct*/ 0.5,
// 			/*globalInhibition*/ true,
// 			/*localAreaDensity*/ -1.0,
// 			/*numActiveColumnsPerInhArea*/ 3,
// 			/*stimulusThreshold*/ 0,
// 			/*synPermInactiveDec*/ 0.008,
// 			/*synPermActiveInc*/ 0.05,
// 			/*synPermConnected*/ 0.1,
// 			/*minPctOverlapDutyCycles*/ 0.001,
// 			/*dutyCyclePeriod*/ 1000,
// 			/*boostStrength*/ 10.0,
// 			/*seed*/ 1,
// 			/*spVerbosity*/ 0,
// 			/*wrapAround*/ true);

// 		const input = new Array<UInt>(inputSize, 0);
// 		const activeColumns = new Array<UInt>(nColumns, 0);
// 		sp.compute(input, true, activeColumns);

// 		EXPECT_EQ(3, countNonzero(activeColumns));
// 	});

// 	TEST("SpatialPoolerTest", "ZeroOverlap_StimulusThreshold_GlobalInhibition", () => {
// 		const inputSize = 10;
// 		const nColumns = 20;

// 		const sp = new SpatialPooler([inputSize],
// 			[nColumns],
// 			/*potentialRadius*/ 5,
// 			/*potentialPct*/ 0.5,
// 			/*globalInhibition*/ true,
// 			/*localAreaDensity*/ -1.0,
// 			/*numActiveColumnsPerInhArea*/ 1,
// 			/*stimulusThreshold*/ 1,
// 			/*synPermInactiveDec*/ 0.008,
// 			/*synPermActiveInc*/ 0.05,
// 			/*synPermConnected*/ 0.1,
// 			/*minPctOverlapDutyCycles*/ 0.001,
// 			/*dutyCyclePeriod*/ 1000,
// 			/*boostStrength*/ 10.0,
// 			/*seed*/ 1,
// 			/*spVerbosity*/ 0,
// 			/*wrapAround*/ true);

// 		const input = new Array<UInt>(inputSize, 0);
// 		const activeColumns = new Array<UInt>(nColumns, 0);
// 		sp.compute(input, true, activeColumns);

// 		EXPECT_EQ(0, countNonzero(activeColumns));
// 	});

// 	TEST("SpatialPoolerTest", "ZeroOverlap_NoStimulusThreshold_LocalInhibition", () => {
// 		const inputSize = 10;
// 		const nColumns = 20;

// 		const sp = new SpatialPooler([inputSize],
// 			[nColumns],
// 			/*potentialRadius*/ 5,
// 			/*potentialPct*/ 0.5,
// 			/*globalInhibition*/ false,
// 			/*localAreaDensity*/ -1.0,
// 			/*numActiveColumnsPerInhArea*/ 1,
// 			/*stimulusThreshold*/ 0,
// 			/*synPermInactiveDec*/ 0.008,
// 			/*synPermActiveInc*/ 0.05,
// 			/*synPermConnected*/ 0.1,
// 			/*minPctOverlapDutyCycles*/ 0.001,
// 			/*dutyCyclePeriod*/ 1000,
// 			/*boostStrength*/ 10.0,
// 			/*seed*/ 1,
// 			/*spVerbosity*/ 0,
// 			/*wrapAround*/ true);

// 		const input = new Array<UInt>(inputSize, 0);
// 		const activeColumns = new Array<UInt>(nColumns, 0);
// 		sp.compute(input, true, activeColumns);

// 		// This exact number of active columns is determined by the inhibition
// 		// radius, which changes based on the random synapses (i.e. weird math).
// 		EXPECT_GT(countNonzero(activeColumns), 2);
// 		EXPECT_LT(countNonzero(activeColumns), 10);
// 	});

// 	TEST("SpatialPoolerTest", "ZeroOverlap_StimulusThreshold_LocalInhibition", () => {
// 		const inputSize = 10;
// 		const nColumns = 20;

// 		const sp = new SpatialPooler(
// 			[inputSize],
// 			[nColumns],
// 		/*potentialRadius*/ 10,
// 		/*potentialPct*/ 0.5,
// 		/*globalInhibition*/ false,
// 		/*localAreaDensity*/ -1.0,
// 		/*numActiveColumnsPerInhArea*/ 3,
// 		/*stimulusThreshold*/ 1,
// 		/*synPermInactiveDec*/ 0.008,
// 		/*synPermActiveInc*/ 0.05,
// 		/*synPermConnected*/ 0.1,
// 		/*minPctOverlapDutyCycles*/ 0.001,
// 		/*dutyCyclePeriod*/ 1000,
// 		/*boostStrength*/ 10.0,
// 		/*seed*/ 1,
// 		/*spVerbosity*/ 0,
// 		/*wrapAround*/ true);

// 		const input = new Array<UInt>(inputSize, 0);
// 		const activeColumns = new Array<UInt>(nColumns, 0);
// 		sp.compute(input, true, activeColumns);

// 		EXPECT_EQ(0, countNonzero(activeColumns));
// 	});

// 	TEST("SpatialPoolerTest", "testSaveLoad", () => {
// 		const filename = "SpatialPoolerSerialization.tmp";
// 		const sp1 = new SpatialPooler();
// 		const sp2 = new SpatialPooler();
// 		const numInputs = 6;
// 		const numColumns = 12;
// 		setup(sp1, numInputs, numColumns);

// 		const state = sp1.save();
// 		sp2.load(state);

// 		ASSERT_NO_FATAL_FAILURE(
// 			() => check_spatial_eq(sp1, sp2));
// 	});

// 	TEST("SpatialPoolerTest", "testWriteRead", () => {
// 		const filename = "SpatialPoolerSerialization.tmp";
// 		const sp1 = new SpatialPooler();
// 		const sp2 = new SpatialPooler();
// 		const numInputs = 6;
// 		const numColumns = 12;
// 		setup(sp1, numInputs, numColumns);

// 		const state = sp1.save();
// 		sp2.load(state);

// 		ASSERT_NO_FATAL_FAILURE(
// 			() => check_spatial_eq(sp1, sp2));

// 	});

// } // end anonymous namespace
