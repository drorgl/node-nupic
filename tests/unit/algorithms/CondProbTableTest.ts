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
// import { ASSERT_EQ, ASSERT_FLOAT_EQ, ASSERT_NO_FATAL_FAILURE, EXPECT_EQ, TEST } from "../test_base";

// import { CondProbTable, inferType, Real } from "../../../typings/index";

// /** @file
// * Notes
// */

// // #include <nupic/algorithms/CondProbTable.hpp>
// // #include <nupic/math/StlIo.hpp>
// // #include <fstream>
// // #include <boost/serialization/array_wrapper.hpp> //FIXME this include is fix for the include below in boost .64, remove later when fixed upstream
// // #include <boost/numeric/ublas/storage.hpp>
// // #include "gtest/gtest.h"

// // using namespace std;
// // using namespace boost;
// // using namespace nupic;

// namespace condprobtests {

// 	// Size of the table we construct
// 	function numRows()  { return 4; }
// 	function numCols()  { return 3; }

// 	function makeRow(a: Real, b: Real, c: Real): Real[] {
// 		const result = new Array<Real>(3);
// 		result[0] = a;
// 		result[1] = b;
// 		result[2] = c;

// 		return result;
// 	}

// 	function makeCol(a: Real, b: Real, c: Real, d: Real): Real[] {
// 		const result = new Array<Real>(4);
// 		result[0] = a;
// 		result[1] = b;
// 		result[2] = c;
// 		result[3] = d;

// 		return result;
// 	}

// 	function testArrays(
// 		testName: string, v1: Real[], v2: Real[]): void {
// 		EXPECT_EQ(JSON.stringify(v1), JSON.stringify(v2), testName);
// 	}

// 	function testTable(testName: string, table: CondProbTable, rows: Real[][]): void {

// 		// Test the numRows(), numCols() calls
// 		ASSERT_EQ(numRows(), table.numRows());
// 		ASSERT_EQ(numCols(), table.numColumns());

// 		// See if they got added right
// 		const testRow = new Array<Real>(numCols());
// 		for (let i = 0; i < numRows(); i++) {

// 			table.getRow(i, testRow);
// 			ASSERT_NO_FATAL_FAILURE(
// 				() => testArrays(testName + "updateRow " + i, rows[i], testRow));
// 		}

// 		// --------------------------------------------------------------------
// 		// Try out normal inference
// 		let expValue = new Array<Real>();
// 		const output = new Array<Real>(numRows());

// 		// Row 0 matches row 3, so we get half and half hits on those rows
// 		table.inferRow(rows[0], output, inferType.inferMarginal);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 0 infer", makeCol(.16, 0, 0, .24), output));

// 		// Row 1 matches only row 1
// 		table.inferRow(rows[1], output, inferType.inferMarginal);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 1 infer", makeCol(0, 1, 0, 0), output));

// 		// Row 2 matches only row 2 and 3
// 		table.inferRow(rows[2], output, inferType.inferMarginal);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 2 infer", makeCol(0, 0, .36, .24), output));

// 		// Row 3 matches row 0 & row 2 halfway, and row 3 exactly
// 		table.inferRow(rows[3], output, inferType.inferMarginal);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 3 infer", makeCol(.24, 0, .24, .52), output));

// 		// --------------------------------------------------------------------
// 		// Try out inferEvidence inference

// 		// Row 0 matches row 0 and half row 3, so we get half and half hits on those rows
// 		table.inferRow(rows[0], output, inferType.inferRowEvidence);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 0 inferEvidence", makeCol(.4, 0, 0, .24), output));

// 		// Row 1 matches only row 1
// 		table.inferRow(rows[1], output, inferType.inferRowEvidence);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 1 inferEvidence", makeCol(0, 1, 0, 0), output));

// 		// Row 2 matches only row 2 and half row 3
// 		table.inferRow(rows[2], output, inferType.inferRowEvidence);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 2 inferEvidence", makeCol(0, 0, .6, .24), output));

// 		// Row 3 matches row 0 & row 2 halfway, and row 3 exactly
// 		table.inferRow(rows[3], output, inferType.inferRowEvidence);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 3 inferEvidence", makeCol(.6, 0, .4, .52), output));

// 		// --------------------------------------------------------------------
// 		// Try out inferMaxProd inference

// 		// Row 0 matches row 0 and half row 3, so we get half and half hits on those rows
// 		table.inferRow(rows[0], output, inferType.inferMaxProd);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 0 inferMaxProd", makeCol(.16, 0, 0, .24), output));

// 		// Row 1 matches only row 1
// 		table.inferRow(rows[1], output, inferType.inferMaxProd);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 1 inferMaxProd", makeCol(0, 1, 0, 0), output));

// 		// Row 2 matches only row 2 and half row 3
// 		table.inferRow(rows[2], output, inferType.inferMaxProd);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 2 inferMaxProd", makeCol(0, 0, .36, .24), output));

// 		// Row 3 matches row 0 & row 2 halfway, and row 3 exactly
// 		table.inferRow(rows[3], output, inferType.inferMaxProd);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 3 inferMaxProd", makeCol(.24, 0, .24, .36), output));

// 		// --------------------------------------------------------------------
// 		// Try out inferViterbi inference

// 		// Row 0 matches row 0 and half row 3, so we get half and half hits on those rows
// 		table.inferRow(rows[0], output, inferType.inferViterbi);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 0 inferViterbi", makeCol(0, 0, 0, .4), output));

// 		// Row 1 matches only row 1
// 		table.inferRow(rows[1], output, inferType.inferViterbi);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 1 inferViterbi", makeCol(0, 1, 0, 0), output));

// 		// Row 2 matches only row 2 and half row 3
// 		table.inferRow(rows[2], output, inferType.inferViterbi);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 2 inferViterbi", makeCol(0, 0, .6, 0), output));

// 		// Row 3 matches row 0 & row 2 halfway, and row 3 exactly
// 		table.inferRow(rows[3], output, inferType.inferViterbi);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 3 inferViterbi", makeCol(0, 0, .4, .6), output));

// 		// Add a row a second time, the row should double in value
// 		table.updateRow(0, rows[0]);
// 		expValue = rows[0];
// 		for (let i = 0; i < numCols(); i++) {
// 			expValue[i] *= 2;
// 		}
// 		table.getRow(0, testRow);
// 		ASSERT_NO_FATAL_FAILURE(
// 			() => testArrays(testName + "row 0 update#2", expValue, testRow));

// 	}

// 	// ----------------------------------------------------------------------
// 	TEST("CondProbTableTest", "Basic", () => {
// 		// Our 4 rows
// 		const rows = new Array<Real[]>();
// 		rows.length = (numRows());
// 		rows[0] = makeRow(0.0, 0.4, 0.0);
// 		rows[1] = makeRow(1.0, 0.0, 0.0);
// 		rows[2] = makeRow(0.0, 0.0, 0.6);
// 		rows[3] = makeRow(0.0, 0.6, 0.4);

// 		// Test constructing without # of columns
// 		{
// 			const table = new CondProbTable();

// 			// Add the 4 rows
// 			for (let i = 0; i < numRows(); i++) {
// 				table.updateRow(i, rows[i]);
// 			}

// 			// Test it
// 			ASSERT_NO_FATAL_FAILURE(
// 				() => testTable("Dynamic columns:", table, rows));
// 		}

// 		// Test constructing and growing the columns dynamically
// 		{
// 			const table = new CondProbTable();

// 			// Add the 2nd row first which has just 1 column
// 			const row1 = new Array<Real>(1);
// 			row1[0] = rows[1][0];
// 			table.updateRow(1, row1);

// 			// Add the first row first with just 2 columns
// 			const row0 = new Array<Real>(2);
// 			row0[0] = rows[0][0];
// 			row0[1] = rows[0][1];
// 			table.updateRow(0, row0);

// 			for (let i = 2; i < numRows(); i++) {
// 				table.updateRow(i, rows[i]);
// 			}

// 			// Test it
// 			ASSERT_NO_FATAL_FAILURE(
// 				() => testTable("Growing columns:", table, rows));
// 		}

// 		// Make a table with 3 columns
// 		{
// 			const table = new CondProbTable(numCols());

// 			// Add the 4 rows
// 			for (let i = 0; i < numRows(); i++) {
// 				table.updateRow(i, rows[i]);
// 			}

// 			// Test it
// 			ASSERT_NO_FATAL_FAILURE(
// 				() => testTable("Fixed columns:", table, rows));
// 		}

// 		// Make a table, save to stream, then reload and test
// 		{
// 			const table = new CondProbTable(numCols());

// 			// Add the 4 rows
// 			for (let i = 0; i < numRows(); i++) {
// 				table.updateRow(i, rows[i]);
// 			}

// 			// Save it
// 			const state = table.saveState();

// 			const newTable = new CondProbTable();
// 			newTable.readState(state);
// 			ASSERT_NO_FATAL_FAILURE(
// 				() => testTable("Restored from state:", newTable, rows));
// 		}

// 		// Test saving an empty table
// 		{
// 			const table = new CondProbTable();

// 			// Save it
// 			const state = table.saveState();

// 			// Read it in
// 			const newTable = new CondProbTable();
// 			newTable.readState(state);

// 			// Add the 4 rows
// 			for (let i = 0; i < numRows(); i++) {
// 				newTable.updateRow(i, rows[i]);
// 			}

// 			// Test it
// 			ASSERT_NO_FATAL_FAILURE(
// 				() => testTable("Restored from empty state:", newTable, rows));
// 		}

// 	});

// 	// ----------------------------------------------------------------------
// } // end namespace
