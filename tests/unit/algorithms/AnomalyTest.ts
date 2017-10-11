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

// #include <vector>
// #include <algorithm>

// #include "gtest/gtest.h"

// #include "nupic/algorithms/Anomaly.hpp"
// #include "nupic/types/Types.hpp"

// using namespace nupic::algorithms::anomaly;
// using namespace nupic;
import { ASSERT_FLOAT_EQ, TEST } from "../test_base";

import { anomaly, UInt } from "../../../typings/index";
import Anomaly = anomaly.Anomaly;

TEST("ComputeRawAnomalyScore", "NoActiveOrPredicted", () => {
	const active = new Array<UInt>();
	const predicted = new Array<UInt>();
	ASSERT_FLOAT_EQ(anomaly.computeRawAnomalyScore(active, predicted), 0.0);
});

TEST("ComputeRawAnomalyScore", "NoActive", () => {
	const active = new Array<UInt>();
	const predicted = [3, 5];
	ASSERT_FLOAT_EQ(anomaly.computeRawAnomalyScore(active, predicted), 0.0);
});

TEST("ComputeRawAnomalyScore", "PerfectMatch", () => {
	const active = [3, 5, 7];
	const predicted = [3, 5, 7];
	ASSERT_FLOAT_EQ(anomaly.computeRawAnomalyScore(active, predicted), 0.0);
});

TEST("ComputeRawAnomalyScore", "NoMatch", () => {
	const active = [2, 4, 6];
	const predicted = [3, 5, 7];
	ASSERT_FLOAT_EQ(anomaly.computeRawAnomalyScore(active, predicted), 1.0);
});

TEST("ComputeRawAnomalyScore", "PartialMatch", () => {
	const active = [2, 3, 6];
	const predicted = [3, 5, 7];
	ASSERT_FLOAT_EQ(anomaly.computeRawAnomalyScore(active, predicted), 2.0 / 3.0);
});

TEST("Anomaly", "ComputeScoreNoActiveOrPredicted", () => {
	const active = new Array<UInt>();
	const predicted = new Array<UInt>();
	const a = new anomaly.Anomaly();
	ASSERT_FLOAT_EQ(a.compute(active, predicted), 0.0);
});

TEST("Anomaly", "ComputeScoreNoActive", () => {
	const active = new Array<UInt>();
	const predicted = [3, 5];
	const a = new anomaly.Anomaly();
	ASSERT_FLOAT_EQ(a.compute(active, predicted), 0.0);
});

TEST("Anomaly", "ComputeScorePerfectMatch", () => {
	const active = [3, 5, 7];
	const predicted = [3, 5, 7];
	const a = new anomaly.Anomaly();
	ASSERT_FLOAT_EQ(a.compute(active, predicted), 0.0);
});

TEST("Anomaly", "ComputeScoreNoMatch", () => {
	const active = [2, 4, 6];
	const predicted = [3, 5, 7];
	const a = new anomaly.Anomaly();
	ASSERT_FLOAT_EQ(a.compute(active, predicted), 1.0);
});

TEST("Anomaly", "ComputeScorePartialMatch", () => {
	const active = [2, 3, 6];
	const predicted = [3, 5, 7];
	const a = new anomaly.Anomaly();
	ASSERT_FLOAT_EQ(a.compute(active, predicted), 2.0 / 3.0);
});

// TODO: possible problem
TEST("Anomaly", "Cumulative", () => {
	const TEST_COUNT = 9;
	const a = new Anomaly(3);
	const preds = [TEST_COUNT, [1, 2, 6]];

	const acts = [
		[1, 2, 6],
		[1, 2, 6],
		[1, 4, 6],
		[10, 11, 6],
		[10, 11, 12],
		[10, 11, 12],
		[10, 11, 12],
		[1, 2, 6],
		[1, 2, 6]
	];

	const expected = [0.0, 0.0, 1.0 / 9.0, 3.0 / 9.0, 2.0 / 3.0, 8.0 / 9.0,
		1.0, 2.0 / 3.0, 1.0 / 3.0];

	for (let index = 0; index < TEST_COUNT; index++) {
		ASSERT_FLOAT_EQ(a.compute(acts[index], preds[index]), expected[index]);
	}
});

TEST("Anomaly", "SelectModePure", () => {
	const a = new anomaly.Anomaly(0, anomaly.AnomalyMode.PURE, 0);
	const active = [2, 3, 6];
	const predicted = [3, 5, 7];
	ASSERT_FLOAT_EQ(a.compute(active, predicted), 2.0 / 3.0);
});
