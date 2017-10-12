// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2013-2016, Numenta, Inc.  Unless you have an agreement
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
//  * ----------------------------------------------------------------------
//  */
// import { ASSERT_EQ, ASSERT_NEAR, EXPECT_EQ, EXPECT_NEAR, EXPECT_THROW, EXPECT_TRUE, TEST } from "../test_base";

// import { temporal_memory, } from "../../../typings/index";
// import TemporalMemory = temporal_memory.TemporalMemory;
// import CellIdx = temporal_memory.CellIdx;

// /** @file
//  * Implementation of unit tests for TemporalMemory
//  */

// // #include <cstring>
// // #include <fstream>
// // #include <stdio.h>
// // #include <nupic/math/StlIo.hpp>
// // #include <nupic/types/Types.hpp>
// // #include <nupic/utils/Log.hpp>

// // #include <nupic/algorithms/TemporalMemory.hpp>
// // #include "gtest/gtest.h"

// // using namespace nupic::algorithms::temporal_memory;
// // using namespace std;

// const EPSILON = 0.0000001;

// namespace a {

// 	TEST("TemporalMemoryTest", "testInitInvalidParams", () => {
// 		// Invalid columnDimensions
// 		const columnDim = [];
// 		const tm1 = new TemporalMemory();
// 		EXPECT_THROW(() => tm1.initialize(columnDim, 32), "exception");

// 		// Invalid cellsPerColumn
// 		columnDim.push(2048);
// 		EXPECT_THROW(() => tm1.initialize(columnDim, 0), "exception");
// 	});

// 	/**
// 	 * If you call compute with unsorted input, it should throw an exception.
// 	 */
// 	TEST("TemporalMemoryTest", "testCheckInputs_UnsortedColumns", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const activeColumns = [1, 3, 2, 4];

// 		EXPECT_THROW(() => tm.compute(4, activeColumns), "exception");
// 	});

// 	/**
// 	 * If you call compute with a binary Array rather than a list of indices, it
// 	 * should throw an exception.
// 	 */
// 	TEST("TemporalMemoryTest", "testCheckInputs_BinaryArray", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		// Use an input that will pass an `is_sorted` check.
// 		const activeColumns = [0, 0, 0, 1, 1];

// 		EXPECT_THROW(() => tm.compute(5, activeColumns), "exception");
// 	});

// 	/**
// 	 * When a predicted column is activated, only the predicted cells in the
// 	 * columns should be activated.
// 	 */
// 	TEST("TemporalMemoryTest", "ActivateCorrectlyPredictiveCells", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const activeColumns = [1];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const expectedActiveCells = [4];

// 		const activeSegment =
// 			tm.createSegment(expectedActiveCells[0]);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[2], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[3], 0.5);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		ASSERT_EQ(expectedActiveCells, tm.getPredictiveCells());
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_EQ(expectedActiveCells, tm.getActiveCells());
// 	});

// 	/**
// 	 * When an unpredicted column is activated, every cell in the column should
// 	 * become active.
// 	 */
// 	TEST("TemporalMemoryTest", "BurstUnpredictedColumns", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const activeColumns = [0];
// 		const burstingCells = [0, 1, 2, 3];

// 		tm.compute(1, activeColumns, true);

// 		EXPECT_EQ(burstingCells, tm.getActiveCells());
// 	});

// 	/**
// 	 * When the TemporalMemory receives zero active columns, it should still
// 	 * compute the active cells, winner cells, and predictive cells. All should be
// 	 * empty.
// 	 */

// 	// TODO: find out why its disabled, narrowing conversion
// 	// TEST(TemporalMemoryTest, ZeroActiveColumns)
// 	// {
// 	//  TemporalMemory tm(
// 	//    /*columnDimensions*/ {32},
// 	//    /*cellsPerColumn*/ 4,
// 	//    /*activationThreshold*/ 3,
// 	//    /*initialPermanence*/ 0.21,
// 	//    /*connectedPermanence*/ 0.50,
// 	//    /*minThreshold*/ 2,
// 	//    /*maxNewSynapseCount*/ 3,
// 	//    /*permanenceIncrement*/ 0.10,
// 	//    /*permanenceDecrement*/ 0.10,
// 	//    /*predictedSegmentDecrement*/ 0.02,
// 	//    /*seed*/ 42
// 	//    );

// 	//  // Make some cells predictive.
// 	//  const UInt previousActiveColumns[1] = {0};
// 	//  const Array<CellIdx> previousActiveCells = {0, 1, 2, 3};
// 	//  const Array<CellIdx> expectedActiveCells = {4};

// 	//  Segment segment = tm.createSegment(expectedActiveCells[0]);
// 	//  tm.connections.createSynapse(segment, previousActiveCells[0], 0.5);
// 	//  tm.connections.createSynapse(segment, previousActiveCells[1], 0.5);
// 	//  tm.connections.createSynapse(segment, previousActiveCells[2], 0.5);
// 	//  tm.connections.createSynapse(segment, previousActiveCells[3], 0.5);

// 	//  tm.compute(1, previousActiveColumns, true);
// 	//  ASSERT_FALSE(tm.getActiveCells().empty());
// 	//  ASSERT_FALSE(tm.getWinnerCells().empty());
// 	//  ASSERT_FALSE(tm.getPredictiveCells().empty());

// 	//  const UInt zeroColumns[0] = {};
// 	//  tm.compute(0, zeroColumns, true);

// 	//  EXPECT_TRUE(tm.getActiveCells().empty());
// 	//  EXPECT_TRUE(tm.getWinnerCells().empty());
// 	//  EXPECT_TRUE(tm.getPredictiveCells().empty());
// 	// }

// 	/**
// 	 * All predicted active cells are winner cells, even when learning is
// 	 * disabled.
// 	 */
// 	TEST("TemporalMemoryTest", "PredictedActiveCellsAreAlwaysWinners", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const activeColumns = [1];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const expectedWinnerCells = [4, 6];

// 		const activeSegment1 =
// 			tm.createSegment(expectedWinnerCells[0]);
// 		tm.connections.createSynapse(activeSegment1, previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(activeSegment1, previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(activeSegment1, previousActiveCells[2], 0.5);

// 		const activeSegment2 =
// 			tm.createSegment(expectedWinnerCells[1]);
// 		tm.connections.createSynapse(activeSegment2, previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(activeSegment2, previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(activeSegment2, previousActiveCells[2], 0.5);

// 		tm.compute(numActiveColumns, previousActiveColumns, false);
// 		tm.compute(numActiveColumns, activeColumns, false);

// 		EXPECT_EQ(expectedWinnerCells, tm.getWinnerCells());
// 	});

// 	/**
// 	 * One cell in each bursting column is a winner cell, even when learning is
// 	 * disabled.
// 	 */
// 	TEST("TemporalMemoryTest", "ChooseOneWinnerCellInBurstingColumn", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const activeColumns = [0];
// 		const burstingCells = [0, 1, 2, 3];

// 		tm.compute(1, activeColumns, false);

// 		const winnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(1, winnerCells.length);
// 		EXPECT_TRUE(burstingCells.find(winnerCells[0]) !== burstingCells.end());
// 	});

// 	/**
// 	 * Active segments on predicted active cells should be reinforced. Active
// 	 * synapses should be reinforced, inactive synapses should be punished.
// 	 */
// 	TEST("TemporalMemoryTest", "ReinforceCorrectlyActiveSegments", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.08,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const activeColumns = [1];
// 		const activeCells = [5];
// 		const activeCell = 5;

// 		const activeSegment = tm.createSegment(activeCell);
// 		const activeSynapse1 =
// 			tm.connections.createSynapse(activeSegment, previousActiveCells[0], 0.5);
// 		const activeSynapse2 =
// 			tm.connections.createSynapse(activeSegment, previousActiveCells[1], 0.5);
// 		const activeSynapse3 =
// 			tm.connections.createSynapse(activeSegment, previousActiveCells[2], 0.5);
// 		const inactiveSynapse =
// 			tm.connections.createSynapse(activeSegment, 81, 0.5);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_NEAR(0.6, tm.connections.dataForSynapse(activeSynapse1).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.6, tm.connections.dataForSynapse(activeSynapse2).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.6, tm.connections.dataForSynapse(activeSynapse3).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.42, tm.connections.dataForSynapse(inactiveSynapse).permanence,
// 			EPSILON);
// 	});

// 	/**
// 	 * The best matching segment in a bursting column should be reinforced. Active
// 	 * synapses should be strengthened, and inactive synapses should be weakened.
// 	 */
// 	TEST("TemporalMemoryTest", "ReinforceSelectedMatchingSegmentInBurstingColumn", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.08,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const activeColumns = [1];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const burstingCells = [4, 5, 6, 7];

// 		const selectedMatchingSegment =
// 			tm.createSegment(burstingCells[0]);
// 		const activeSynapse1 =
// 			tm.connections.createSynapse(selectedMatchingSegment,
// 				previousActiveCells[0], 0.3);
// 		const activeSynapse2 =
// 			tm.connections.createSynapse(selectedMatchingSegment,
// 				previousActiveCells[1], 0.3);
// 		const activeSynapse3 =
// 			tm.connections.createSynapse(selectedMatchingSegment,
// 				previousActiveCells[2], 0.3);
// 		const inactiveSynapse =
// 			tm.connections.createSynapse(selectedMatchingSegment,
// 				81, 0.3);

// 		// Add some competition.
// 		const otherMatchingSegment =
// 			tm.createSegment(burstingCells[1]);
// 		tm.connections.createSynapse(otherMatchingSegment,
// 			previousActiveCells[0], 0.3);
// 		tm.connections.createSynapse(otherMatchingSegment,
// 			previousActiveCells[1], 0.3);
// 		tm.connections.createSynapse(otherMatchingSegment,
// 			81, 0.3);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_NEAR(0.4, tm.connections.dataForSynapse(activeSynapse1).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.4, tm.connections.dataForSynapse(activeSynapse2).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.4, tm.connections.dataForSynapse(activeSynapse3).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.22, tm.connections.dataForSynapse(inactiveSynapse).permanence,
// 			EPSILON);
// 	});

// 	/**
// 	 * When a column bursts, don't reward or punish matching-but-not-selected
// 	 * segments.
// 	 */
// 	TEST("TemporalMemoryTest", "NoChangeToNonselectedMatchingSegmentsInBurstingColumn", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.08,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const previousActiveColumns = [0];
// 		const activeColumns = [1];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const burstingCells = [4, 5, 6, 7];

// 		const selectedMatchingSegment =
// 			tm.createSegment(burstingCells[0]);
// 		tm.connections.createSynapse(selectedMatchingSegment,
// 			previousActiveCells[0], 0.3);
// 		tm.connections.createSynapse(selectedMatchingSegment,
// 			previousActiveCells[1], 0.3);
// 		tm.connections.createSynapse(selectedMatchingSegment,
// 			previousActiveCells[2], 0.3);
// 		tm.connections.createSynapse(selectedMatchingSegment,
// 			81, 0.3);

// 		const otherMatchingSegment =
// 			tm.createSegment(burstingCells[1]);
// 		const activeSynapse1 =
// 			tm.connections.createSynapse(otherMatchingSegment,
// 				previousActiveCells[0], 0.3);
// 		const activeSynapse2 =
// 			tm.connections.createSynapse(otherMatchingSegment,
// 				previousActiveCells[1], 0.3);
// 		const inactiveSynapse =
// 			tm.connections.createSynapse(otherMatchingSegment,
// 				81, 0.3);

// 		tm.compute(1, previousActiveColumns, true);
// 		tm.compute(1, activeColumns, true);

// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(activeSynapse1).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(activeSynapse2).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(inactiveSynapse).permanence,
// 			EPSILON);
// 	});

// 	/**
// 	 * When a predicted column is activated, don't reward or punish
// 	 * matching-but-not-active segments anywhere in the column.
// 	 */
// 	TEST("TemporalMemoryTest", "NoChangeToMatchingSegmentsInPredictedActiveColumn", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const previousActiveColumns = [0];
// 		const activeColumns = [1];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const expectedActiveCells = [4];
// 		const otherBurstingCells = [5, 6, 7];

// 		const activeSegment =
// 			tm.createSegment(expectedActiveCells[0]);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[2], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[3], 0.5);

// 		const matchingSegmentOnSameCell =
// 			tm.createSegment(expectedActiveCells[0]);
// 		const synapse1 =
// 			tm.connections.createSynapse(matchingSegmentOnSameCell,
// 				previousActiveCells[0], 0.3);
// 		const synapse2 =
// 			tm.connections.createSynapse(matchingSegmentOnSameCell,
// 				previousActiveCells[1], 0.3);

// 		const matchingSegmentOnOtherCell =
// 			tm.createSegment(otherBurstingCells[0]);
// 		const synapse3 =
// 			tm.connections.createSynapse(matchingSegmentOnOtherCell,
// 				previousActiveCells[0], 0.3);
// 		const synapse4 =
// 			tm.connections.createSynapse(matchingSegmentOnOtherCell,
// 				previousActiveCells[1], 0.3);

// 		tm.compute(1, previousActiveColumns, true);
// 		ASSERT_EQ(expectedActiveCells, tm.getPredictiveCells());
// 		tm.compute(1, activeColumns, true);

// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(synapse1).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(synapse2).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(synapse3).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.3, tm.connections.dataForSynapse(synapse4).permanence,
// 			EPSILON);
// 	});

// 	/**
// 	 * When growing a new segment, if there are no previous winner cells, don't
// 	 * even grow the segment. It will never match.
// 	 */
// 	// TODO: find out why its disabled, narrowing conversion
// 	// TEST(TemporalMemoryTest, NoNewSegmentIfNotEnoughWinnerCells)
// 	// {
// 	//  TemporalMemory tm(
// 	//    /*columnDimensions*/ {32},
// 	//    /*cellsPerColumn*/ 4,
// 	//    /*activationThreshold*/ 3,
// 	//    /*initialPermanence*/ 0.21,
// 	//    /*connectedPermanence*/ 0.50,
// 	//    /*minThreshold*/ 2,
// 	//    /*maxNewSynapseCount*/ 2,
// 	//    /*permanenceIncrement*/ 0.10,
// 	//    /*permanenceDecrement*/ 0.10,
// 	//    /*predictedSegmentDecrement*/ 0.0,
// 	//    /*seed*/ 42
// 	//    );

// 	//  const UInt zeroColumns[0] = {};
// 	//  const UInt activeColumns[1] = {0};

// 	//  tm.compute(0, zeroColumns);
// 	//  tm.compute(1, activeColumns);

// 	//  EXPECT_EQ(0, tm.connections.numSegments());
// 	// }

// 	/**
// 	 * When growing a new segment, if the number of previous winner cells is above
// 	 * maxNewSynapseCount, grow maxNewSynapseCount synapses.
// 	 */
// 	TEST("TemporalMemoryTest", "NewSegmentAddSynapsesToSubsetOfWinnerCells", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 2,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const previousActiveColumns = [0, 1, 2];
// 		const activeColumns = [4];

// 		tm.compute(3, previousActiveColumns);

// 		const prevWinnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(3, prevWinnerCells.length);

// 		tm.compute(1, activeColumns);

// 		const winnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(1, winnerCells.length);
// 		const segments = tm.connections.segmentsForCell(winnerCells[0]);
// 		ASSERT_EQ(1, segments.length);
// 		const synapses = tm.connections.synapsesForSegment(segments[0]);
// 		ASSERT_EQ(2, synapses.length);
// 		for (const synapse of synapses) {
// 			const synapseData = tm.connections.dataForSynapse(synapse);
// 			EXPECT_NEAR(0.21, synapseData.permanence, EPSILON);
// 			EXPECT_TRUE(synapseData.presynapticCell === prevWinnerCells[0] ||
// 				synapseData.presynapticCell === prevWinnerCells[1] ||
// 				synapseData.presynapticCell === prevWinnerCells[2]);
// 		}

// 	});

// 	/**
// 	 * When growing a new segment, if the number of previous winner cells is below
// 	 * maxNewSynapseCount, grow synapses to all of the previous winner cells.
// 	 */
// 	TEST("TemporalMemoryTest", "NewSegmentAddSynapsesToAllWinnerCells", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		const previousActiveColumns = [0, 1, 2];
// 		const activeColumns = [4];

// 		tm.compute(3, previousActiveColumns);

// 		const prevWinnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(3, prevWinnerCells.length);

// 		tm.compute(1, activeColumns);

// 		const winnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(1, winnerCells.length);
// 		const segments = tm.connections.segmentsForCell(winnerCells[0]);
// 		ASSERT_EQ(1, segments.length);
// 		const synapses = tm.connections.synapsesForSegment(segments[0]);
// 		ASSERT_EQ(3, synapses.length);

// 		const presynapticCells = new Array<CellIdx>();
// 		for (const synapse of synapses) {
// 			const synapseData = tm.connections.dataForSynapse(synapse);
// 			EXPECT_NEAR(0.21, synapseData.permanence, EPSILON);
// 			presynapticCells.push(synapseData.presynapticCell);
// 		}
// 		sort(presynapticCells.begin(), presynapticCells.end());
// 		EXPECT_EQ(prevWinnerCells, presynapticCells);
// 	});

// 	/**
// 	 * When adding synapses to a matching segment, the final number of active
// 	 * synapses on the segment should be maxNewSynapseCount, assuming there are
// 	 * enough previous winner cells available to connect to.
// 	 */
// 	TEST("TemporalMemoryTest", "MatchingSegmentAddSynapsesToSubsetOfWinnerCells", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 1,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		// Use 1 cell per column so that we have easy control over the winner cells.
// 		const previousActiveColumns = [0, 1, 2, 3];
// 		const prevWinnerCells = [0, 1, 2, 3];
// 		const activeColumns = [4];

// 		const matchingSegment = tm.createSegment(4);
// 		tm.connections.createSynapse(matchingSegment, 0, 0.5);

// 		tm.compute(4, previousActiveColumns);

// 		ASSERT_EQ(prevWinnerCells, tm.getWinnerCells());

// 		tm.compute(1, activeColumns);

// 		const synapses = tm.connections.synapsesForSegment(matchingSegment);
// 		ASSERT_EQ(3, synapses.length);
// 		for (let i = 1; i < synapses.length; i++) {
// 			const synapseData = tm.connections.dataForSynapse(synapses[i]);
// 			EXPECT_NEAR(0.21, synapseData.permanence, EPSILON);
// 			EXPECT_TRUE(synapseData.presynapticCell === prevWinnerCells[1] ||
// 				synapseData.presynapticCell === prevWinnerCells[2] ||
// 				synapseData.presynapticCell === prevWinnerCells[3]);
// 		}
// 	});

// 	/**
// 	 * When adding synapses to a matching segment, if the number of previous
// 	 * winner cells is lower than (maxNewSynapseCount - nActiveSynapsesOnSegment),
// 	 * grow synapses to all the previous winner cells.
// 	 */
// 	TEST("TemporalMemoryTest", "MatchingSegmentAddSynapsesToAllWinnerCells", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 1,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		// Use 1 cell per column so that we have easy control over the winner cells.
// 		const previousActiveColumns = [0, 1];
// 		const prevWinnerCells = [0, 1];
// 		const activeColumns = [4];

// 		const matchingSegment = tm.createSegment(4);
// 		tm.connections.createSynapse(matchingSegment, 0, 0.5);

// 		tm.compute(2, previousActiveColumns);

// 		ASSERT_EQ(prevWinnerCells, tm.getWinnerCells());

// 		tm.compute(1, activeColumns);

// 		const synapses = tm.connections.synapsesForSegment(matchingSegment);
// 		ASSERT_EQ(2, synapses.length);

// 		const synapseData = tm.connections.dataForSynapse(synapses[1]);
// 		EXPECT_NEAR(0.21, synapseData.permanence, EPSILON);
// 		EXPECT_EQ(prevWinnerCells[1], synapseData.presynapticCell);
// 	});

// 	/**
// 	 * When a segment becomes active, grow synapses to previous winner cells.
// 	 *
// 	 * The number of grown synapses is calculated from the "matching segment"
// 	 * overlap, not the "active segment" overlap.
// 	 */
// 	TEST("TemporalMemoryTest", "ActiveSegmentGrowSynapsesAccordingToPotentialOverlap", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 2,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 1,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		// Use 1 cell per column so that we have easy control over the winner cells.
// 		const previousActiveColumns = [0, 1, 2, 3, 4];
// 		const prevWinnerCells = [0, 1, 2, 3, 4];
// 		const activeColumns = [5];

// 		const activeSegment = tm.createSegment(5);
// 		tm.connections.createSynapse(activeSegment, 0, 0.5);
// 		tm.connections.createSynapse(activeSegment, 1, 0.5);
// 		tm.connections.createSynapse(activeSegment, 2, 0.2);

// 		tm.compute(5, previousActiveColumns);

// 		ASSERT_EQ(prevWinnerCells, tm.getWinnerCells());

// 		tm.compute(1, activeColumns);

// 		const synapses = tm.connections.synapsesForSegment(activeSegment);

// 		ASSERT_EQ(4, synapses.length);

// 		const synapseData = tm.connections.dataForSynapse(synapses[3]);
// 		EXPECT_NEAR(0.21, synapseData.permanence, EPSILON);
// 		EXPECT_TRUE(synapseData.presynapticCell === prevWinnerCells[3] ||
// 			synapseData.presynapticCell === prevWinnerCells[4]);
// 	});

// 	/**
// 	 * When a synapse is punished for contributing to a wrong prediction, if its
// 	 * permanence falls to 0 it should be destroyed.
// 	 */
// 	TEST("TemporalMemoryTest", "DestroyWeakSynapseOnWrongPrediction", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const activeColumns = [2];
// 		const expectedActiveCell = 5;

// 		const activeSegment = tm.createSegment(expectedActiveCell);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[2], 0.5);

// 		// Weak synapse.
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[3], 0.015);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_EQ(3, tm.connections.numSynapses(activeSegment));
// 	});

// 	/**
// 	 * When a synapse is punished for not contributing to a right prediction, if
// 	 * its permanence falls to 0 it should be destroyed.
// 	 */
// 	TEST("TemporalMemoryTest", "DestroyWeakSynapseOnActiveReinforce", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const activeColumns = [1];
// 		const activeCell = 5;

// 		const activeSegment = tm.createSegment(activeCell);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(activeSegment, previousActiveCells[2], 0.5);

// 		// Weak inactive synapse.
// 		tm.connections.createSynapse(activeSegment, 81, 0.09);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_EQ(3, tm.connections.numSynapses(activeSegment));
// 	});

// 	/**
// 	 * When a segment adds synapses and it runs over maxSynapsesPerSegment, it
// 	 * should make room by destroying synapses with the lowest permanence.
// 	 */
// 	TEST("TemporalMemoryTest", "RecycleWeakestSynapseToMakeRoomForNewSynapse", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 1,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.02,
// 			/*permanenceDecrement*/ 0.02,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42,
// 			/*maxSegmentsPerCell*/ 255,
// 			/*maxSynapsesPerSegment*/ 4
// 		);

// 		// Use 1 cell per column so that we have easy control over the winner cells.
// 		const previousActiveColumns = [1, 2, 3];
// 		const prevWinnerCells = [1, 2, 3];
// 		const activeColumns = [4];

// 		const matchingSegment = tm.createSegment(4);

// 		// Create a weak synapse. Make sure it's not so weak that
// 		// permanenceDecrement destroys it.
// 		tm.connections.createSynapse(matchingSegment, 0, 0.11);

// 		// Create a synapse that will match.
// 		tm.connections.createSynapse(matchingSegment, 1, 0.20);

// 		// Create a synapse with a high permanence.
// 		tm.connections.createSynapse(matchingSegment, 31, 0.6);

// 		// Activate a synapse on the segment, making it "matching".
// 		tm.compute(3, previousActiveColumns);

// 		ASSERT_EQ(prevWinnerCells, tm.getWinnerCells());

// 		// Now mark the segment as "correct" by activating its cell.
// 		tm.compute(1, activeColumns);

// 		// There should now be 3 synapses, and none of them should be to cell 0.
// 		const synapses =
// 			tm.connections.synapsesForSegment(matchingSegment);
// 		ASSERT_EQ(4, synapses.length);

// 		const presynapticCells = new Set<CellIdx>();
// 		for (const synapse of synapses) {
// 			presynapticCells.insert(
// 				tm.connections.dataForSynapse(synapse).presynapticCell);
// 		}

// 		const expected: Set<CellIdx> = [1, 2, 3, 31];
// 		EXPECT_EQ(expected, presynapticCells);
// 	});

// 	/**
// 	 * When a cell adds a segment and it runs over maxSegmentsPerCell, it should
// 	 * make room by destroying the least recently active segment.
// 	 */
// 	TEST("TemporalMemoryTest", "RecycleLeastRecentlyActiveSegmentToMakeRoomForNewSegment", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.50,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.02,
// 			/*permanenceDecrement*/ 0.02,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42,
// 			/*maxSegmentsPerCell*/ 2
// 		);

// 		const previousActiveColumns1 = [0, 1, 2];
// 		const previousActiveColumns2 = [3, 4, 5];
// 		const previousActiveColumns3 = [6, 7, 8];
// 		const activeColumns = [9];

// 		tm.compute(3, previousActiveColumns1);
// 		tm.compute(1, activeColumns);

// 		ASSERT_EQ(1, tm.connections.numSegments(9));
// 		const oldestSegment = tm.connections.segmentsForCell(9)[0];

// 		tm.reset();
// 		tm.compute(3, previousActiveColumns2);
// 		tm.compute(1, activeColumns);

// 		ASSERT_EQ(2, tm.connections.numSegments(9));

// 		const oldPresynaptic = new Set < CellIdx >();
// 		for (const synapse of tm.connections.synapsesForSegment(oldestSegment)) {
// 			oldPresynaptic.insert(
// 				tm.connections.dataForSynapse(synapse).presynapticCell);
// 		}

// 		tm.reset();
// 		tm.compute(3, previousActiveColumns3);
// 		tm.compute(1, activeColumns);

// 		ASSERT_EQ(2, tm.connections.numSegments(9));

// 		// Verify none of the segments are connected to the cells the old segment
// 		// was connected to.

// 		for (const segment of tm.connections.segmentsForCell(9)) {
// 			const newPresynaptic = new Set<CellIdx>();
// 			for (const synapse of tm.connections.synapsesForSegment(segment)) {
// 				newPresynaptic.insert(
// 					tm.connections.dataForSynapse(synapse).presynapticCell);
// 			}

// 			const intersection = new Array<CellIdx>();
// 			Set_intersection(oldPresynaptic.begin(), oldPresynaptic.end(),
// 				newPresynaptic.begin(), newPresynaptic.end(),
// 				std: : back_inserter(intersection));

// 			const expected = new Array<CellIdx>();
// 			EXPECT_EQ(expected, intersection);
// 		}
// 	});

// 	/**
// 	 * When a segment's number of synapses falls to 0, the segment should be
// 	 * destroyed.
// 	 */
// 	TEST("TemporalMemoryTest", "DestroySegmentsWithTooFewSynapsesToBeMatching", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const activeColumns = [2];
// 		const expectedActiveCell = 5;

// 		const matchingSegment = tm.createSegment(expectedActiveCell);
// 		tm.connections.createSynapse(matchingSegment, previousActiveCells[0], 0.015);
// 		tm.connections.createSynapse(matchingSegment, previousActiveCells[1], 0.015);
// 		tm.connections.createSynapse(matchingSegment, previousActiveCells[2], 0.015);
// 		tm.connections.createSynapse(matchingSegment, previousActiveCells[3], 0.015);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_EQ(0, tm.connections.numSegments(expectedActiveCell));
// 	});

// 	/**
// 	 * When a column with a matching segment isn't activated, punish the matching
// 	 * segment.
// 	 *
// 	 * To exercise the implementation:
// 	 *
// 	 *  - Use cells before, between, and after the active columns.
// 	 *  - Use segments that are matching-but-not-active and matching-and-active.
// 	 */
// 	TEST("TemporalMemoryTest", "PunishMatchingSegmentsInInactiveColumns", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const numActiveColumns = 1;
// 		const previousActiveColumns = [0];
// 		const previousActiveCells = [0, 1, 2, 3];
// 		const activeColumns = [1];
// 		const previousInactiveCell = 81;

// 		const activeSegment = tm.createSegment(42);
// 		const activeSynapse1 =
// 			tm.connections.createSynapse(activeSegment, previousActiveCells[0], 0.5);
// 		const activeSynapse2 =
// 			tm.connections.createSynapse(activeSegment, previousActiveCells[1], 0.5);
// 		const activeSynapse3 =
// 			tm.connections.createSynapse(activeSegment, previousActiveCells[2], 0.5);
// 		const inactiveSynapse1 =
// 			tm.connections.createSynapse(activeSegment, previousInactiveCell, 0.5);

// 		const matchingSegment = tm.createSegment(43);
// 		const activeSynapse4 =
// 			tm.connections.createSynapse(matchingSegment, previousActiveCells[0], 0.5);
// 		const activeSynapse5 =
// 			tm.connections.createSynapse(matchingSegment, previousActiveCells[1], 0.5);
// 		const inactiveSynapse2 =
// 			tm.connections.createSynapse(matchingSegment, previousInactiveCell, 0.5);

// 		tm.compute(numActiveColumns, previousActiveColumns, true);
// 		tm.compute(numActiveColumns, activeColumns, true);

// 		EXPECT_NEAR(0.48, tm.connections.dataForSynapse(activeSynapse1).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.48, tm.connections.dataForSynapse(activeSynapse2).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.48, tm.connections.dataForSynapse(activeSynapse3).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.48, tm.connections.dataForSynapse(activeSynapse4).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.48, tm.connections.dataForSynapse(activeSynapse5).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.50, tm.connections.dataForSynapse(inactiveSynapse1).permanence,
// 			EPSILON);
// 		EXPECT_NEAR(0.50, tm.connections.dataForSynapse(inactiveSynapse2).permanence,
// 			EPSILON);
// 	});

// 	/**
// 	 * In a bursting column with no matching segments, a segment should be added
// 	 * to the cell with the fewest segments. When there's a tie, choose randomly.
// 	 */
// 	TEST("TemporalMemoryTest", "AddSegmentToCellWithFewestSegments", () => {
// 		let grewOnCell1 = false;
// 		let grewOnCell2 = false;
// 		for (let seed = 0; seed < 100; seed++) {
// 			const tm = new TemporalMemory(
// 				/*columnDimensions*/[32],
// 				/*cellsPerColumn*/ 4,
// 				/*activationThreshold*/ 3,
// 				/*initialPermanence*/ 0.2,
// 				/*connectedPermanence*/ 0.50,
// 				/*minThreshold*/ 2,
// 				/*maxNewSynapseCount*/ 4,
// 				/*permanenceIncrement*/ 0.10,
// 				/*permanenceDecrement*/ 0.10,
// 				/*predictedSegmentDecrement*/ 0.02,
// 				/*seed*/ seed
// 			);

// 			// enough for 4 winner cells
// 			const previousActiveColumns = [1, 2, 3, 4];
// 			const activeColumns = [0];
// 			const previousActiveCells =
// 				[4, 5, 6, 7]; // (there are more)
// 			const nonmatchingCells = [0, 3];
// 			const activeCells = [0, 1, , 3];

// 			const segment1 = tm.createSegment(nonmatchingCells[0]);
// 			tm.connections.createSynapse(segment1, previousActiveCells[0], 0.5);
// 			const segment2 = tm.createSegment(nonmatchingCells[1]);
// 			tm.connections.createSynapse(segment2, previousActiveCells[1], 0.5);

// 			tm.compute(4, previousActiveColumns, true);
// 			tm.compute(1, activeColumns, true);

// 			ASSERT_EQ(activeCells, tm.getActiveCells());

// 			EXPECT_EQ(3, tm.connections.numSegments());
// 			EXPECT_EQ(1, tm.connections.segmentsForCell(0).length);
// 			EXPECT_EQ(1, tm.connections.segmentsForCell(3).length);
// 			EXPECT_EQ(1, tm.connections.numSynapses(segment1));
// 			EXPECT_EQ(1, tm.connections.numSynapses(segment2));

// 			const segments = tm.connections.segmentsForCell(1);
// 			if (segments.empty()) {
// 				const segments2 = tm.connections.segmentsForCell(2);
// 				EXPECT_FALSE(segments2.empty());
// 				grewOnCell2 = true;
// 				segments.insert(segments.end(), segments2.begin(), segments2.end());
// 			}
// 			else {
// 				grewOnCell1 = true;
// 			}

// 			ASSERT_EQ(1, segments.length);
// 			const synapses = tm.connections.synapsesForSegment(segments[0]);
// 			EXPECT_EQ(4, synapses.length);

// 			const columnChecklist = new Set<CellIdx>(previousActiveColumns, previousActiveColumns + 4);

// 			for (const synapse of synapses) {
// 				const synapseData = tm.connections.dataForSynapse(synapse);
// 				EXPECT_NEAR(0.2, synapseData.permanence, EPSILON);

// 				const column = tm.columnForCell(synapseData.presynapticCell);
// 				const position = columnChecklist.find(column);
// 				EXPECT_NE(columnChecklist.end(), position);
// 				columnChecklist.erase(position);
// 			}
// 			EXPECT_TRUE(columnChecklist.empty());
// 		}

// 		EXPECT_TRUE(grewOnCell1);
// 		EXPECT_TRUE(grewOnCell2);
// 	});

// 	/**
// 	 * When the best matching segment has more than maxNewSynapseCount matching
// 	 * synapses, don't grow new synapses. This test is specifically aimed at
// 	 * unexpected behavior with negative numbers and unsigned integers.
// 	 */
// 	TEST("TemporalMemoryTest", "MaxNewSynapseCountOverflow", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const segment = tm.createSegment(8);
// 		tm.connections.createSynapse(segment, 0, 0.2);
// 		tm.connections.createSynapse(segment, 1, 0.2);
// 		tm.connections.createSynapse(segment, 2, 0.2);
// 		tm.connections.createSynapse(segment, 3, 0.2);
// 		tm.connections.createSynapse(segment, 4, 0.2);
// 		const sampleSynapse = tm.connections.createSynapse(segment, 5, 0.2);
// 		tm.connections.createSynapse(segment, 6, 0.2);
// 		tm.connections.createSynapse(segment, 7, 0.2);

// 		const  previousActiveColumns = [ 0, 1, 3, 4];
// 		tm.compute(4, previousActiveColumns);

// 		ASSERT_EQ(1, tm.getMatchingSegments().length);

// 		const  activeColumns = [2];
// 		tm.compute(1, activeColumns);

// 		// Make sure the segment has learned.
// 		ASSERT_NEAR(0.3, tm.connections.dataForSynapse(sampleSynapse).permanence,
// 			EPSILON);

// 		EXPECT_EQ(8, tm.connections.numSynapses(segment));
// 	});

// 	/**
// 	 * With learning disabled, generate some predicted active columns, predicted
// 	 * inactive columns, and nonpredicted active columns. The connections should
// 	 * not change.
// 	 */
// 	TEST("TemporalMemoryTest", "ConnectionsNeverChangeWhenLearningDisabled", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.2,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 4,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.02,
// 			/*seed*/ 42
// 		);

// 		const  previousActiveColumns = [ 0];
// 		const previousActiveCells = [ 0, 1, 2, 3];
// 		const  activeColumns = [
// 			1, // predicted
// 			2  // bursting
// 		];
// 		const previousInactiveCell = 81;
// 		const expectedActiveCells  = [ 4];

// 		const correctActiveSegment =
// 			tm.createSegment(expectedActiveCells[0]);
// 		tm.connections.createSynapse(correctActiveSegment,
// 			previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(correctActiveSegment,
// 			previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(correctActiveSegment,
// 			previousActiveCells[2], 0.5);

// 		const wrongMatchingSegment = tm.createSegment(43);
// 		tm.connections.createSynapse(wrongMatchingSegment,
// 			previousActiveCells[0], 0.5);
// 		tm.connections.createSynapse(wrongMatchingSegment,
// 			previousActiveCells[1], 0.5);
// 		tm.connections.createSynapse(wrongMatchingSegment,
// 			previousInactiveCell, 0.5);

// 		const before = tm.connections;

// 		tm.compute(1, previousActiveColumns, false);
// 		tm.compute(2, activeColumns, false);

// 		EXPECT_EQ(before, tm.connections);
// 	});

// 	/**
// 	* Destroy some segments then verify that the maxSegmentsPerCell is still
// 	* correctly applied.
// 	*/
// 	TEST("TemporalMemoryTest", "DestroySegmentsThenReachLimit", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.50,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.02,
// 			/*permanenceDecrement*/ 0.02,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42,
// 			/*maxSegmentsPerCell*/ 2
// 		);

// 		{
// 			const segment1 = tm.createSegment(11);
// 			const segment2 = tm.createSegment(11);
// 			ASSERT_EQ(2, tm.connections.numSegments());
// 			tm.connections.destroySegment(segment1);
// 			tm.connections.destroySegment(segment2);
// 			ASSERT_EQ(0, tm.connections.numSegments());
// 		}

// 		{
// 			tm.createSegment(11);
// 			EXPECT_EQ(1, tm.connections.numSegments());
// 			tm.createSegment(11);
// 			EXPECT_EQ(2, tm.connections.numSegments());
// 			tm.createSegment(11);
// 			EXPECT_EQ(2, tm.connections.numSegments());
// 			EXPECT_EQ(2, tm.connections.numSegments(11));
// 		}
// 	});

// 	/**
// 	* Creates many segments on a cell, until hits segment limit. Then creates
// 	* another segment, and checks that it destroyed the least recently used
// 	* segment and created a new one in its place.
// 	*/
// 	TEST("TemporalMemoryTest", "CreateSegmentDestroyOld", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.50,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.02,
// 			/*permanenceDecrement*/ 0.02,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42,
// 			/*maxSegmentsPerCell*/ 2
// 		);

// 		const segment1 = tm.createSegment(12);

// 		tm.connections.createSynapse(segment1, 1, 0.5);
// 		tm.connections.createSynapse(segment1, 2, 0.5);
// 		tm.connections.createSynapse(segment1, 3, 0.5);

// 		// Let some time pass.
// 		tm.compute(0, null);
// 		tm.compute(0, null);
// 		tm.compute(0, null);

// 		// Create a segment with 1 synapse.
// 		const segment2 = tm.createSegment(12);
// 		tm.connections.createSynapse(segment2, 1, 0.5);

// 		tm.compute(0, null);

// 		// Give the first segment some activity.
// 		const activeColumns = [ 1, 2, 3];
// 		tm.compute(3, activeColumns);

// 		// Create a new segment with no synapses.
// 		tm.createSegment(12);

// 		const segments = tm.connections.segmentsForCell(12);
// 		ASSERT_EQ(2, segments.length);

// 		// Verify first segment is still there with the same synapses.
// 		const synapses1 = tm.connections.synapsesForSegment(segments[0]);
// 		ASSERT_EQ(3, synapses1.length);
// 		ASSERT_EQ(1, tm.connections.dataForSynapse(synapses1[0]).presynapticCell);
// 		ASSERT_EQ(2, tm.connections.dataForSynapse(synapses1[1]).presynapticCell);
// 		ASSERT_EQ(3, tm.connections.dataForSynapse(synapses1[2]).presynapticCell);

// 		// Verify second segment has been replaced.
// 		ASSERT_EQ(0, tm.connections.numSynapses(segments[1]));
// 	});

// 	/**
// 	 * Hit the maxSegmentsPerCell threshold multiple times. Make sure it works
// 	 * more than once.
// 	 */
// 	TEST("ConnectionsTest", "ReachSegmentLimitMultipleTimes", () => {
// 		const tm = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 1,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.50,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.02,
// 			/*permanenceDecrement*/ 0.02,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42,
// 			/*maxSegmentsPerCell*/ 2
// 		);

// 		tm.createSegment(10);
// 		ASSERT_EQ(1, tm.connections.numSegments());
// 		tm.createSegment(10);
// 		ASSERT_EQ(2, tm.connections.numSegments());
// 		tm.createSegment(10);
// 		ASSERT_EQ(2, tm.connections.numSegments());
// 		tm.createSegment(10);
// 		EXPECT_EQ(2, tm.connections.numSegments());
// 	});

// 	TEST("TemporalMemoryTest", "testColumnForCell1D", () => {
// 		const tm =new TemporalMemory();
// 		tm.initialize(new Array < UInt > ( 2048), 5);

// 		ASSERT_EQ(0, tm.columnForCell(0));
// 		ASSERT_EQ(0, tm.columnForCell(4));
// 		ASSERT_EQ(1, tm.columnForCell(5));
// 		ASSERT_EQ(2047, tm.columnForCell(10239));
// 	});

// 	TEST("TemporalMemoryTest", "testColumnForCell2D", () => {
// 		const tm = new TemporalMemory();
// 		tm.initialize(new Array < UInt > ( 64, 64), 4);

// 		ASSERT_EQ(0, tm.columnForCell(0));
// 		ASSERT_EQ(0, tm.columnForCell(3));
// 		ASSERT_EQ(1, tm.columnForCell(4));
// 		ASSERT_EQ(4095, tm.columnForCell(16383));
// 	});

// 	TEST("TemporalMemoryTest", "testColumnForCellInvalidCell", () => {
// 		const tm = new TemporalMemory();
// 		tm.initialize(new Array < UInt > ( 64, 64), 4);

// 		EXPECT_NO_THROW(tm.columnForCell(16383));
// 		EXPECT_THROW(tm.columnForCell(16384), "exception");
// 		EXPECT_THROW(tm.columnForCell(-1), "exception");
// 	});

// 	TEST("TemporalMemoryTest", "testNumberOfColumns", () => {
// 		const tm = new lMemory();
// 		tm.initialize(new Array < UInt > ( 64, 64), 32);

// 		const numOfColumns = tm.numberOfColumns();
// 		ASSERT_EQ(numOfColumns, 64 * 64);
// 	});

// 	TEST("TemporalMemoryTest", "testNumberOfCells", () => {
// 		const tm = new TemporalMemory();
// 		tm.initialize(new Array < UInt > ( 64, 64), 32);

// 		const numberOfCells = tm.numberOfCells();
// 		ASSERT_EQ(numberOfCells, 64 * 64 * 32);
// 	});

// 	function serializationTestPrepare(tm: TemporalMemory): void {
// 		// Create an active segment and a two matching segments.
// 		// Destroy a few to exercise the code.
// 		const destroyMe1 = tm.createSegment(4);
// 		tm.connections.destroySegment(destroyMe1);

// 		const activeSegment = tm.createSegment(4);
// 		tm.connections.createSynapse(activeSegment, 0, 0.5);
// 		tm.connections.createSynapse(activeSegment, 1, 0.5);
// 		const destroyMe2 = tm.connections.createSynapse(activeSegment, 42, 0.5);
// 		tm.connections.destroySynapse(destroyMe2);
// 		tm.connections.createSynapse(activeSegment, 2, 0.5);
// 		tm.connections.createSynapse(activeSegment, 3, 0.5);

// 		const matchingSegment1 = tm.createSegment(8);
// 		tm.connections.createSynapse(matchingSegment1, 0, 0.4);
// 		tm.connections.createSynapse(matchingSegment1, 1, 0.4);
// 		tm.connections.createSynapse(matchingSegment1, 2, 0.4);

// 		const matchingSegment2 = tm.createSegment(9);
// 		tm.connections.createSynapse(matchingSegment2, 0, 0.4);
// 		tm.connections.createSynapse(matchingSegment2, 1, 0.4);
// 		tm.connections.createSynapse(matchingSegment2, 2, 0.4);
// 		tm.connections.createSynapse(matchingSegment2, 3, 0.4);

// 		const activeColumns= [ 0];
// 		tm.compute(1, activeColumns);

// 		ASSERT_EQ(1, tm.getActiveSegments().length);
// 		ASSERT_EQ(3, tm.getMatchingSegments().length);
// 	}

// 	function serializationTestVerify(tm: TemporalMemory): void {
// 		// Activate 3 columns. One has an active segment, one has two
// 		// matching segments, and one has none. One column should be
// 		// predicted, the others should burst, there should be four
// 		// segments total, and they should have the correct permanences
// 		// and synapse counts.

// 		const prevWinnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(1, prevWinnerCells.length);

// 		const activeColumns = [1, 2, 3];
// 		tm.compute(3, activeColumns);

// 		// Verify the correct cells were activated.
// 		EXPECT_EQ((new Array < UInt > ( 4, 8, 9, 10, 11, 12, 13, 14, 15)),
// 			tm.getActiveCells());
// 		const ArraywinnerCells = tm.getWinnerCells();
// 		ASSERT_EQ(3, winnerCells.length);
// 		EXPECT_EQ(4, winnerCells[0]);
// 		EXPECT_EQ(9, winnerCells[1]);

// 		EXPECT_EQ(4, tm.connections.numSegments());

// 		// Verify the active segment learned.
// 		ASSERT_EQ(1, tm.connections.numSegments(4));
// 		const activeSegment = tm.connections.segmentsForCell(4)[0];
// 		const syns1 =
// 			tm.connections.synapsesForSegment(activeSegment);
// 		ASSERT_EQ(4, syns1.length);
// 		EXPECT_EQ(0,
// 			tm.connections.dataForSynapse(syns1[0]).presynapticCell);
// 		EXPECT_NEAR(0.6,
// 			tm.connections.dataForSynapse(syns1[0]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(1,
// 			tm.connections.dataForSynapse(syns1[1]).presynapticCell);
// 		EXPECT_NEAR(0.6,
// 			tm.connections.dataForSynapse(syns1[1]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(2,
// 			tm.connections.dataForSynapse(syns1[2]).presynapticCell);
// 		EXPECT_NEAR(0.6,
// 			tm.connections.dataForSynapse(syns1[2]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(3,
// 			tm.connections.dataForSynapse(syns1[3]).presynapticCell);
// 		EXPECT_NEAR(0.6,
// 			tm.connections.dataForSynapse(syns1[3]).permanence,
// 			EPSILON);

// 		// Verify the non-best matching segment is unchanged.
// 		ASSERT_EQ(1, tm.connections.numSegments(8));
// 		const matchingSegment1 = tm.connections.segmentsForCell(8)[0];
// 		const syns2 =
// 			tm.connections.synapsesForSegment(matchingSegment1);
// 		ASSERT_EQ(3, syns2.length);
// 		EXPECT_EQ(0,
// 			tm.connections.dataForSynapse(syns2[0]).presynapticCell);
// 		EXPECT_NEAR(0.4,
// 			tm.connections.dataForSynapse(syns2[0]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(1,
// 			tm.connections.dataForSynapse(syns2[1]).presynapticCell);
// 		EXPECT_NEAR(0.4,
// 			tm.connections.dataForSynapse(syns2[1]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(2,
// 			tm.connections.dataForSynapse(syns2[2]).presynapticCell);
// 		EXPECT_NEAR(0.4,
// 			tm.connections.dataForSynapse(syns2[2]).permanence,
// 			EPSILON);

// 		// Verify the best matching segment learned.
// 		ASSERT_EQ(1, tm.connections.numSegments(9));
// 		Segment; matchingSegment2 = tm.connections.segmentsForCell(9)[0];
// 		const Arraysyns3 as Synapse =
// 			tm.connections.synapsesForSegment(matchingSegment2);
// 		ASSERT_EQ(4, syns3.length);
// 		EXPECT_EQ(0,
// 			tm.connections.dataForSynapse(syns3[0]).presynapticCell);
// 		EXPECT_NEAR(0.5,
// 			tm.connections.dataForSynapse(syns3[0]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(1,
// 			tm.connections.dataForSynapse(syns3[1]).presynapticCell);
// 		EXPECT_NEAR(0.5,
// 			tm.connections.dataForSynapse(syns3[1]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(2,
// 			tm.connections.dataForSynapse(syns3[2]).presynapticCell);
// 		EXPECT_NEAR(0.5,
// 			tm.connections.dataForSynapse(syns3[2]).permanence,
// 			EPSILON);
// 		EXPECT_EQ(3,
// 			tm.connections.dataForSynapse(syns3[3]).presynapticCell);
// 		EXPECT_NEAR(0.5,
// 			tm.connections.dataForSynapse(syns3[3]).permanence,
// 			EPSILON);

// 		// Verify the winner cell in the last column grew a segment.
// 		const winnerCell = winnerCells[2];
// 		EXPECT_GE(winnerCell, 12);
// 		EXPECT_LT(winnerCell, 16);
// 		ASSERT_EQ(1, tm.connections.numSegments(winnerCell));
// 		const newSegment = tm.connections.segmentsForCell(winnerCell)[0];
// 		const syns4  =
// 			tm.connections.synapsesForSegment(newSegment);
// 		ASSERT_EQ(1, syns4.length);
// 		EXPECT_EQ(prevWinnerCells[0],
// 			tm.connections.dataForSynapse(syns4[0]).presynapticCell);
// 		EXPECT_NEAR(0.21,
// 			tm.connections.dataForSynapse(syns4[0]).permanence,
// 			EPSILON);
// 	})

// 	TEST("TemporalMemoryTest", "testSaveLoad", () => {
// 		const tm1 = new TemporalMemory(
//       /*columnDimensions*/[32],
//       /*cellsPerColumn*/ 4,
//       /*activationThreshold*/ 3,
//       /*initialPermanence*/ 0.21,
//       /*connectedPermanence*/ 0.50,
//       /*minThreshold*/ 2,
//       /*maxNewSynapseCount*/ 3,
//       /*permanenceIncrement*/ 0.10,
//       /*permanenceDecrement*/ 0.10,
//       /*predictedSegmentDecrement*/ 0.0,
//       /*seed*/ 42
// 		);

// 		serializationTestPrepare(tm1);

// 		stringstream; ss;
// 		tm1.save(ss);

// 		TemporalMemory; tm2;
// 		tm2.load(ss);

// 		ASSERT_TRUE(tm1 === tm2);

// 		serializationTestVerify(tm2);
// 	});

// 	TEST("TemporalMemoryTest", "testWrite", () => {
// 		const tm1 = new TemporalMemory(
// 			/*columnDimensions*/[32],
// 			/*cellsPerColumn*/ 4,
// 			/*activationThreshold*/ 3,
// 			/*initialPermanence*/ 0.21,
// 			/*connectedPermanence*/ 0.50,
// 			/*minThreshold*/ 2,
// 			/*maxNewSynapseCount*/ 3,
// 			/*permanenceIncrement*/ 0.10,
// 			/*permanenceDecrement*/ 0.10,
// 			/*predictedSegmentDecrement*/ 0.0,
// 			/*seed*/ 42
// 		);

// 		serializationTestPrepare(tm1);

// 		// Write and read back the proto
// 		stringstream; ss;
// 		tm1.write(ss);

// 		TemporalMemory; tm2;
// 		tm2.read(ss);

// 		ASSERT_TRUE(tm1 === tm2);

// 		serializationTestVerify(tm2);
// 	});

// 	// Uncomment these tests individually to save/load from a file.
// 	// This is useful for ad-hoc testing of backwards-compatibility.

// 	// TEST(TemporalMemoryTest, saveTestFile)
// 	// {
// 	//   TemporalMemory tm(
// 	//     /*columnDimensions*/ {32},
// 	//     /*cellsPerColumn*/ 4,
// 	//     /*activationThreshold*/ 3,
// 	//     /*initialPermanence*/ 0.21,
// 	//     /*connectedPermanence*/ 0.50,
// 	//     /*minThreshold*/ 2,
// 	//     /*maxNewSynapseCount*/ 3,
// 	//     /*permanenceIncrement*/ 0.10,
// 	//     /*permanenceDecrement*/ 0.10,
// 	//     /*predictedSegmentDecrement*/ 0.0,
// 	//     /*seed*/ 42
// 	//     );
// 	//
// 	//   serializationTestPrepare(tm);
// 	//
// 	//   const char* filename = "TemporalMemorySerializationSave.tmp";
// 	//   ofstream outfile;
// 	//   outfile.open(filename, ios::binary);
// 	//   tm.save(outfile);
// 	//   outfile.close();
// 	// }

// 	// TEST(TemporalMemoryTest, loadTestFile)
// 	// {
// 	//   let tm = new TemporalMemory();
// 	//   const char* filename = "TemporalMemorySerializationSave.tmp";
// 	//   ifstream infile(filename, ios::binary);
// 	//   tm.load(infile);
// 	//   infile.close();
// 	//
// 	//   serializationTestVerify(tm);
// 	// }

// 	// TEST(TemporalMemoryTest, writeTestFile)
// 	// {
// 	//   TemporalMemory tm(
// 	//     /*columnDimensions*/ {32},
// 	//     /*cellsPerColumn*/ 4,
// 	//     /*activationThreshold*/ 3,
// 	//     /*initialPermanence*/ 0.21,
// 	//     /*connectedPermanence*/ 0.50,
// 	//     /*minThreshold*/ 2,
// 	//     /*maxNewSynapseCount*/ 3,
// 	//     /*permanenceIncrement*/ 0.10,
// 	//     /*permanenceDecrement*/ 0.10,
// 	//     /*predictedSegmentDecrement*/ 0.0,
// 	//     /*seed*/ 42
// 	//     );

// 	//   serializationTestPrepare(tm);

// 	//   const char* filename = "TemporalMemorySerializationWrite.tmp";
// 	//   ofstream outfile;
// 	//   outfile.open(filename, ios::binary);
// 	//   tm.write(outfile);
// 	//   outfile.close();
// 	// }

// 	// TEST(TemporalMemoryTest, readTestFile)
// 	// {
// 	//   let tm = new TemporalMemory();
// 	//   const char* filename = "TemporalMemorySerializationWrite.tmp";
// 	//   ifstream infile(filename, ios::binary);
// 	//   tm.read(infile);
// 	//   infile.close();

// 	//   serializationTestVerify(tm);
// 	// }
// } // end namespace nupic
