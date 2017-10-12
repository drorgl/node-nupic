// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2016, Numenta, Inc.  Unless you have an agreement
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

// import { ASSERT_EQ, ASSERT_FLOAT_EQ, ASSERT_GT, ASSERT_LT, ASSERT_TRUE, TEST } from "../test_base";

// import { ClassifierResult, Real64, sdr_classifier, UInt } from "../../../typings/index";
// import SDRClassifier = sdr_classifier.SDRClassifier;

// /** @file
//  * Implementation of unit tests for SDRClassifier
//  */

// // #include <iostream>
// // #include <sstream>

// // #include <gtest/gtest.h>

// // #include <nupic/algorithms/ClassifierResult.hpp>
// // #include <nupic/algorithms/SDRClassifier.hpp>
// // #include <nupic/math/StlIo.hpp>
// // #include <nupic/types/Types.hpp>
// // #include <nupic/utils/Log.hpp>

// // using namespace std;
// // using namespace nupic;
// // using namespace nupic::algorithms::cla_classifier;
// // using namespace nupic::algorithms::sdr_classifier;

// namespace b {

// 	TEST("SDRClassifierTest", "Basic", () => {
// 		const steps = new Array<UInt>();
// 		steps.push(1);
// 		const c = new SDRClassifier(steps, 0.1, 0.1, 0);

// 		// Create a Array of input bit indices
// 		const input1 = new Array<UInt>();
// 		input1.push(1);
// 		input1.push(5);
// 		input1.push(9);
// 		const bucketIdxList1 = new Array<UInt>();
// 		bucketIdxList1.push(4);
// 		const actValueList1 = new Array<Real64>();
// 		actValueList1.push(34.7);
// 		const result1 = new ClassifierResult();
// 		c.compute(0, input1, bucketIdxList1, actValueList1, false, true, true, result1);

// 		// Create a Array of input bit indices
// 		const input2 = new Array<UInt>();
// 		input2.push(1);
// 		input2.push(5);
// 		input2.push(9);
// 		const bucketIdxList2 = new Array<UInt>();
// 		bucketIdxList2.push(4);
// 		const actValueList2 = new Array<Real64>();
// 		actValueList2.push(34.7);
// 		const result2 = new ClassifierResult();
// 		c.compute(1, input2, bucketIdxList2, actValueList2, false, true, true, result2);

// 		{
// 			let foundMinus1 = false;
// 			let found1 = false;
// 			for (const it of result2.getResultArray()) {
// 				if (it.first === -1) {
// 					// The -1 key is used for the actual values
// 					ASSERT_EQ(false, foundMinus1, "Already found key -1 in classifier result");
// 					foundMinus1 = true;
// 					ASSERT_EQ(5, it.second.length, "Expected five buckets since it has only seen bucket 4 (so it Has buckets 0-4).");
// 					ASSERT_TRUE(Math.abs(it.second[4] - 34.7) < 0.000001, "Incorrect actual value for bucket 4");
// 				} else if (it.first === 1) {
// 					// Check the one-step prediction
// 					ASSERT_EQ(false, found1, "Already found key 1 in classifier result");
// 					found1 = true;
// 					ASSERT_EQ(5, it.second.length, "Expected five bucket predictions");
// 					ASSERT_LT(Math.abs(it.second[0] - 0.2), 0.000001, "Incorrect prediction for bucket 0");
// 					ASSERT_LT(Math.abs(it.second[1] - 0.2), 0.000001, "Incorrect prediction for bucket 1");
// 					ASSERT_LT(Math.abs(it.second[2] - 0.2), 0.000001, "Incorrect prediction for bucket 2");
// 					ASSERT_LT(Math.abs(it.second[3] - 0.2), 0.000001, "Incorrect prediction for bucket 3");
// 					ASSERT_LT(Math.abs(it.second[4] - 0.2), 0.000001, "Incorrect prediction for bucket 4");
// 				}
// 			}
// 			ASSERT_TRUE(foundMinus1, "Key -1 not found in classifier result");
// 			ASSERT_TRUE(found1, "key 1 not found in classifier result");
// 		}
// 	});

// 	TEST("SDRClassifierTest", "SingleValue", () => {
// 		// Feed the same input 10 times, the corresponding probability should be
// 		// very high
// 		const steps = new Array<UInt>();
// 		steps.push(1);
// 		const c = new SDRClassifier(steps, 0.1, 0.1, 0);

// 		// Create a Array of input bit indices
// 		const input1 = new Array<UInt>();
// 		input1.push(1);
// 		input1.push(5);
// 		input1.push(9);
// 		const bucketIdxList = new Array<UInt>();
// 		bucketIdxList.push(4);
// 		const actValueList = new Array<Real64>();
// 		actValueList.push(34.7);
// 		const result1 = new Array<ClassifierResult>();
// 		for (let i = 0; i < 10; ++i) {
// 			// const result1 = new ClassifierResult();
// 			c.compute(i, input1, bucketIdxList, actValueList, false, true, true, result1[i]);

// 			for (const it of result1[i].getResultArray()) {
// 				if (it.first === -1) {
// 					ASSERT_TRUE(Math.abs(it.second[4] - 10.0) < 0.000001, "Incorrect actual value for bucket 4");
// 				} else if (it.first === 1) {
// 					ASSERT_GT(it.second[4], 0.9, "Incorrect prediction for bucket 4");
// 				}
// 			}
// 		}

// 	});

// 	TEST("SDRClassifierTest", "ComputeComplex", () => {
// 		// More complex classification
// 		// This test is ported from the Python unit test
// 		const steps = new Array<UInt>();
// 		steps.push(1);
// 		const c = new SDRClassifier(steps, 1.0, 0.1, 0);

// 		// Create a input Array
// 		const input1 = new Array<UInt>();
// 		input1.push(1);
// 		input1.push(5);
// 		input1.push(9);
// 		const bucketIdxList1 = new Array<UInt>();
// 		bucketIdxList1.push(4);
// 		const actValueList1 = new Array<Real64>();
// 		actValueList1.push(34.7);

// 		// Create a input Array
// 		const input2 = new Array<UInt>();
// 		input2.push(0);
// 		input2.push(6);
// 		input2.push(9);
// 		input2.push(11);
// 		const bucketIdxList2 = new Array<UInt>();
// 		bucketIdxList2.push(5);
// 		const actValueList2 = new Array<Real64>();
// 		actValueList2.push(41.7);

// 		// Create input Arrays
// 		const input3 = new Array<UInt>();
// 		input3.push(6);
// 		input3.push(9);
// 		const bucketIdxList3 = new Array<UInt>();
// 		bucketIdxList3.push(5);
// 		const actValueList3 = new Array<Real64>();
// 		actValueList3.push(44.9);

// 		const bucketIdxList4 = new Array<UInt>();
// 		bucketIdxList4.push(4);
// 		const actValueList4 = new Array<Real64>();
// 		actValueList4.push(42.9);

// 		const bucketIdxList5 = new Array<UInt>();
// 		bucketIdxList5.push(4);
// 		const actValueList5 = new Array<Real64>();
// 		actValueList5.push(34.7);

// 		const result1 = new ClassifierResult();
// 		c.compute(0, input1, bucketIdxList1, actValueList1, false, true, true, result1);

// 		const result2 = new ClassifierResult();
// 		c.compute(1, input2, bucketIdxList2, actValueList2, false, true, true, result2);

// 		const result3 = new ClassifierResult();
// 		c.compute(2, input3, bucketIdxList3, actValueList3, false, true, true, result3);

// 		const result4 = new ClassifierResult();
// 		c.compute(3, input1, bucketIdxList4, actValueList4, false, true, true, result4);

// 		const result5 = new ClassifierResult();
// 		c.compute(4, input1, bucketIdxList5, actValueList5, false, true, true, result5);

// 		{
// 			let foundMinus1 = false;
// 			let found1 = false;
// 			for (const it of result5.getResultArray()) {
// 				ASSERT_TRUE(it.first === -1 || it.first === 1, "Result Array should only have -1 or 1 as key");
// 				if (it.first === -1) {
// 					// The -1 key is used for the actual values
// 					ASSERT_EQ(false, foundMinus1, "Already found key -1 in classifier result");
// 					foundMinus1 = true;
// 					ASSERT_EQ(6, it.second.length, "Expected six buckets since it has only seen bucket 4-5 (so it has buckets 0-5).");
// 					ASSERT_TRUE(Math.abs(it.second[4] - 35.520000457763672) < 0.000001, "Incorrect actual value for bucket 4");
// 					ASSERT_TRUE(Math.abs(it.second[5] - 42.020000457763672) < 0.000001, "Incorrect actual value for bucket 5");
// 				} else if (it.first === 1) {
// 					// Check the one-step prediction
// 					ASSERT_EQ(false, found1, "Already found key 1 in classifier result");
// 					found1 = true;

// 					ASSERT_EQ(6, it.second.length, "Expected six bucket predictions");
// 					ASSERT_LT(Math.abs(it.second[0] - 0.034234), 0.000001, "Incorrect prediction for bucket 0");
// 					ASSERT_LT(Math.abs(it.second[1] - 0.034234), 0.000001, "Incorrect prediction for bucket 1");
// 					ASSERT_LT(Math.abs(it.second[2] - 0.034234), 0.000001, "Incorrect prediction for bucket 2");
// 					ASSERT_LT(Math.abs(it.second[3] - 0.034234), 0.000001, "Incorrect prediction for bucket 3");
// 					ASSERT_LT(Math.abs(it.second[4] - 0.093058), 0.000001, "Incorrect prediction for bucket 4");
// 					ASSERT_LT(Math.abs(it.second[5] - 0.770004), 0.000001, "Incorrect prediction for bucket 5");
// 				}
// 			}
// 			ASSERT_TRUE(foundMinus1, "Key -1 not found in classifier result");
// 			ASSERT_TRUE(found1, "Key 1 not found in classifier result");
// 		}

// 	});

// 	TEST("SDRClassifierTest", "MultipleCategory", () => {
// 		// Test multiple category classification with single compute calls
// 		// This test is ported from the Python unit test
// 		const steps = new Array<UInt>();
// 		steps.push(0);
// 		const c = new SDRClassifier(steps, 1.0, 0.1, 0);

// 		// Create a input Arrays
// 		const input1 = new Array<UInt>();
// 		input1.push(1);
// 		input1.push(3);
// 		input1.push(5);
// 		const bucketIdxList1 = new Array<UInt>();
// 		bucketIdxList1.push(0);
// 		bucketIdxList1.push(1);
// 		const actValueList1 = new Array<Real64>();
// 		actValueList1.push(0);
// 		actValueList1.push(1);

// 		// Create a input Arrays
// 		const input2 = new Array<UInt>();
// 		input2.push(2);
// 		input2.push(4);
// 		input2.push(6);
// 		const bucketIdxList2 = new Array<UInt>();
// 		bucketIdxList2.push(2);
// 		bucketIdxList2.push(3);
// 		const actValueList2 = new Array<Real64>();
// 		actValueList2.push(2);
// 		actValueList2.push(3);

// 		let recordNum = 0;
// 		for (let i = 0; i < 1000; i++) {
// 			const result1 = new ClassifierResult();
// 			const result2 = new ClassifierResult();
// 			c.compute(recordNum, input1, bucketIdxList1, actValueList1, false, true, true, result1);
// 			recordNum += 1;
// 			c.compute(recordNum, input2, bucketIdxList2, actValueList2, false, true, true, result2);
// 			recordNum += 1;
// 		}

// 		{
// 			const result1 = new ClassifierResult();
// 			const result2 = new ClassifierResult();
// 			c.compute(recordNum, input1, bucketIdxList1, actValueList1, false, true, true, result1);
// 			recordNum += 1;
// 			c.compute(recordNum, input2, bucketIdxList2, actValueList2, false, true, true, result2);
// 			recordNum += 1;

// 			for (const it of result1.getResultArray()) {
// 				ASSERT_LT(Math.abs(it.second[0] - 0.5), 0.1, "Incorrect prediction for bucket 0 (expected=0.5)");
// 				ASSERT_LT(Math.abs(it.second[1] - 0.5), 0.1, "Incorrect prediction for bucket 1 (expected=0.5)");
// 			}

// 			for (const it of result2.getResultArray()) {
// 				ASSERT_LT(Math.abs(it.second[2] - 0.5), 0.1, "Incorrect prediction for bucket 2 (expected=0.5)");
// 				ASSERT_LT(Math.abs(it.second[3] - 0.5), 0.1, "Incorrect prediction for bucket 3 (expected=0.5)");
// 			}
// 		}
// 	});

// 	TEST("SDRClassifierTest", "SaveLoad", () => {
// 		const steps = new Array<UInt>();
// 		steps.push(1);
// 		const c1 = new SDRClassifier(steps, 0.1, 0.1, 0);
// 		const c2 = new SDRClassifier(steps, 0.1, 0.1, 0);

// 		// Create a Array of input bit indices
// 		const input1 = new Array<UInt>();
// 		input1.push(1);
// 		input1.push(5);
// 		input1.push(9);
// 		const bucketIdxList1 = new Array<UInt>();
// 		bucketIdxList1.push(4);
// 		const actValueList1 = new Array<Real64>();
// 		actValueList1.push(34.7);
// 		const result = new ClassifierResult();
// 		c1.compute(0, input1, bucketIdxList1, actValueList1, false, true, true, result);

// 		const ss = c1.save();
// 		c2.load(ss);

// 		ASSERT_TRUE(c1 === c2);

// 		const result1 = new ClassifierResult();
// 		const result2 = new ClassifierResult();
// 		c1.compute(1, input1, bucketIdxList1, actValueList1, false, true, true, result1);
// 		c2.compute(1, input1, bucketIdxList1, actValueList1, false, true, true, result2);

// 		ASSERT_TRUE(result1 === result2);
// 	});

// 	TEST("SDRClassifierTest", "WriteRead", () => {
// 		const steps = new Array<UInt>();
// 		steps.push(1);
// 		steps.push(2);
// 		const c1 = new SDRClassifier(steps, 0.1, 0.1, 0);
// 		const c2 = new SDRClassifier(steps, 0.1, 0.1, 0);

// 		// Create a Array of input bit indices
// 		const input1 = new Array<UInt>();
// 		input1.push(1);
// 		input1.push(5);
// 		input1.push(9);
// 		const bucketIdxList1 = new Array<UInt>();
// 		bucketIdxList1.push(4);
// 		const actValueList1 = new Array<Real64>();
// 		actValueList1.push(34.7);
// 		const trainResult1 = new ClassifierResult();
// 		c1.compute(0, input1, bucketIdxList1, actValueList1, false, true, true, trainResult1);

// 		// Create a Array of input bit indices
// 		const input2 = new Array<UInt>();
// 		input2.push(0);
// 		input2.push(8);
// 		input2.push(9);
// 		const bucketIdxList2 = new Array<UInt>();
// 		bucketIdxList2.push(2);
// 		const actValueList2 = new Array<Real64>();
// 		actValueList2.push(24.7);
// 		const trainResult2 = new ClassifierResult();
// 		c1.compute(1, input2, bucketIdxList2, actValueList2, false, true, true, trainResult2);

// 		const ss = c1.save();
// 		c2.load(ss);

// 		ASSERT_TRUE(c1 === c2);

// 		const result1 = new ClassifierResult();
// 		const result2 = new ClassifierResult();
// 		c1.compute(2, input1, bucketIdxList1, actValueList1, false, true, true, result1);
// 		c2.compute(2, input1, bucketIdxList1, actValueList1, false, true, true, result2);

// 		ASSERT_TRUE(result1 === result2);
// 	});

// } // end namespace
