/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2016, Numenta, Inc.  Unless you have an agreement
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
import { ASSERT_EQ, EXPECT_EQ, EXPECT_NO_THROW, EXPECT_THROW, TEST,  } from "../test_base";

import { int, Real32, Real64, size_t } from "../../../typings/index";

/** @file
 * Unit tests for the ScalarEncoder and PeriodicScalarEncoder
 */

// #include <string>
// #include <vector>
// #include <nupic/encoders/ScalarEncoder.hpp>
// #include "gtest/gtest.h"

// using namespace nupic;

function vec2str<T>(vec: T[]): string {
	let oss = "";
	for (const i of vec) {
		oss += vec.toString();
	}
	return oss;
}

function getEncoding(e: ScalarEncoderBase, input: Real64): Real32[] {
	const actualOutput = Array<Real32>(e.getOutputWidth());
	e.encodeIntoArray(input, actualOutput);
	return actualOutput;
}

class ScalarValueCase {
	public input: Real64;
	public expectedOutput: Real32[];
}

function patternFromNZ(n: int, patternNZ: size_t[]): Real32[] {
	const v = new Array<Real32>(n, 0);
	for (let i = 0; i < n; i++) {
		v[i] = 1;
	}
	// for (auto it = patternNZ.begin(); it !== patternNZ.end(); it++)
	// {
	// 	v[*it] = 1;
	// }
	return v;
}

function doScalarValueCases(e: ScalarEncoderBase, cases: ScalarValueCase[]): void {
	for (let c = cases.begin(); c !== cases.end(); c++) {
		const actualOutput = getEncoding(e, c.input);
		for (let i = 0; i < e.getOutputWidth(); i++) {
			EXPECT_EQ(c.expectedOutput[i], actualOutput[i], "For input " + c.input + " and index " + i +
				"EXPECTED:" +
				vec2str(c.expectedOutput) +
				"ACTUAL:" +
				vec2str(actualOutput);
		}
	}
}

TEST("ScalarEncoder", "ValidScalarInputs", () => {
	const n = 10;
	const w = 2;
	const minValue = 10;
	const maxValue = 20;
	const radius = 0;
	const resolution = 0;

	{
		const clipInput = false;
		const encoder = new ScalarEncoder(w, minValue, maxValue, n, radius, resolution, clipInput);

		EXPECT_THROW(getEncoding(encoder, 9.9), std: : exception);
		EXPECT_NO_THROW(getEncoding(encoder, 10.0));
		EXPECT_NO_THROW(getEncoding(encoder, 20.0));
		EXPECT_THROW(getEncoding(encoder, 20.1), std: : exception);
	}

	{
		const clipInput = true;
		const encoder = new ScalarEncoder(w, minValue, maxValue, n, radius, resolution, clipInput);

		EXPECT_NO_THROW(getEncoding(encoder, 9.9));
		EXPECT_NO_THROW(getEncoding(encoder, 20.1));
	}
});

TEST("PeriodicScalarEncoder", "ValidScalarInputs", () => {
	const n = 10;
	const w = 2;
	const minValue = 10;
	const maxValue = 20;
	const radius = 0;
	const resolution = 0;
	const encoder = new PeriodicScalarEncoder(w, minValue, maxValue, n, radius, resolution);

	EXPECT_THROW(getEncoding(encoder, 9.9), "exception");
	EXPECT_NO_THROW(getEncoding(encoder, 10.0));
	EXPECT_NO_THROW(getEncoding(encoder, 19.9));
	EXPECT_THROW(getEncoding(encoder, 20.0), "exception");
});

TEST("ScalarEncoder", "NonIntegerBucketWidth", () => {
	const n = 7;
	const w = 3;
	const minValue = 10;
	const maxValue = 20;
	const radius = 0;
	const resolution = 0;
	const clipInput = false;
	const encoder = new ScalarEncoder(w, minValue, maxValue, n, radius, resolution, clipInput);

	const cases =
		[[10.0, patternFromNZ(n, [0, 1, 2])],
		[20.0, patternFromNZ(n, [4, 5, 6])]];

	doScalarValueCases(encoder, cases);
});

TEST("PeriodicScalarEncoder", "NonIntegerBucketWidth", () => {
	const n = 7;
	const w = 3;
	const minValue = 10;
	const maxValue = 20;
	const radius = 0;
	const resolution = 0;
	const encoder = new PeriodicScalarEncoder(w, minValue, maxValue, n, radius, resolution);

	const cases =
		[[10.0, patternFromNZ(n, [6, 0, 1])],
		[19.9, patternFromNZ(n, [5, 6, 0])]];

	doScalarValueCases(encoder, cases);
});

TEST("ScalarEncoder", "RoundToNearestMultipleOfResolution", () => {
	const n_in = 0;
	const w = 3;
	const minValue = 10;
	const maxValue = 20;
	const radius = 0;
	const resolution = 1;
	const clipInput = false;
	const encoder = new ScalarEncoder(w, minValue, maxValue, n_in, radius, resolution, clipInput);

	const n = 13;
	ASSERT_EQ(n, encoder.getOutputWidth());

	Array < ScalarValueCase > cases; =
	[[10.00, patternFromNZ(n, [0, 1, 2; }); ],
[10.49, patternFromNZ(n, [0, 1, 2])],
	[10.50, patternFromNZ(n, [1, 2, 3])],
	[11.49, patternFromNZ(n, [1, 2, 3])],
	[11.50, patternFromNZ(n, [2, 3, 4])],
	[14.49, patternFromNZ(n, [4, 5, 6])],
	[14.50, patternFromNZ(n, [5, 6, 7])],
	[15.49, patternFromNZ(n, [5, 6, 7])],
	[15.50, patternFromNZ(n, [6, 7, 8])],
	[19.49, patternFromNZ(n, [9, 10, 11])],
	[19.50, patternFromNZ(n, [10, 11, 12])],
	[20.00, patternFromNZ(n, [10, 11, 12])]; ]

doScalarValueCases(encoder, cases);
})

TEST("PeriodicScalarEncoder", "FloorToNearestMultipleOfResolution", () => {
	const n_in = 0;
	const w = 3;
	const minValue = 10;
	const maxValue = 20;
	const radius = 0;
	const resolution = 1;
	const encoder = new ScalarEncoder(w, minValue, maxValue, n_in, radius, resolution);

	const n = 10;
	ASSERT_EQ(n, encoder.getOutputWidth());

	const cases =
	[[10.00, patternFromNZ(n, [9, 0, 1])],
	[10.99, patternFromNZ(n, [9, 0, 1])],
	[11.00, patternFromNZ(n, [0, 1, 2])],
	[11.99, patternFromNZ(n, [0, 1, 2])],
	[12.00, patternFromNZ(n, [1, 2, 3])],
	[14.00, patternFromNZ(n, [3, 4, 5])],
	[14.99, patternFromNZ(n, [3, 4, 5])],
	[15.00, patternFromNZ(n, [4, 5, 6])],
	[15.99, patternFromNZ(n, [4, 5, 6])],
	[19.00, patternFromNZ(n, [8, 9, 0])],
	[19.99, patternFromNZ(n, [8, 9, 0])]];

	doScalarValueCases(encoder, cases);
});
