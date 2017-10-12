// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2017, Numenta, Inc.  Unless you have an agreement
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

// /** @file
//  * Implementation of unit tests for Segment
//  */

// // #include <set>
// // #include <vector>

// // #include <capnp/message.h>
// // #include <capnp/serialize.h>
// // #include <kj/std/iostream.h>
// // #include <gtest/gtest.h>

// // #include <nupic/algorithms/Cells4.hpp>
// // #include <nupic/algorithms/Segment.hpp>
// // #include <nupic/math/ArrayAlgo.hpp> // is_in
// // #include <nupic/proto/Cells4.capnp.h>

// // using namespace nupic::algorithms::Cells4;
// import { ASSERT_EQ, ASSERT_FLOAT_EQ, TEST } from "../test_base";

// import { anomaly, bool, Cells4, NTA_CHECK, Real, Segment, UInt } from "../../../typings/index";

// function _getOrderedSrcCellIndexesForSrcCells(segment: Segment, srcCellsSet: UInt[]): UInt[] {
// 	const result = new Array<UInt>();

// 	for (let i = 0; i < segment.size(); ++i) {
// 		const srcCellIdx = segment[i].srcCellIdx();
// 		if (srcCellsSet.indexOf(srcCellIdx) !== -1) {// if (is_in(srcCellIdx, srcCellsSet)) {
// 			result.push(srcCellIdx);
// 		}
// 	}

// 	return result;
// }

// // template <class InputIterator>
// function _getOrderedSynapseIndexesForSrcCells(
// 	segment: Segment,
// 	srcCellsSet: UInt[]
// ): UInt[] {
// 	const result = new Array<UInt>();

// 	for (let i = 0; i < segment.size(); ++i) {
// 		const srcCellIdx = segment[i].srcCellIdx();
// 		if (srcCellsSet.indexOf(srcCellIdx) !== -1) {// if (is_in(srcCellIdx, srcCellsSet)) {
// 			result.push(i);
// 		}
// 	}

// 	return result;
// }

// /**
//  * Simple comparison function that does the easy checks. It can be expanded to
//  * cover more of the attributes of Cells4 in the future.
//  */
// function checkCells4Attributes(c1: Cells4, c2: Cells4): bool {
// 	if (c1.nSegments() !== c2.nSegments() ||
// 		c1.nCells() !== c2.nCells() ||
// 		c1.nColumns() !== c2.nColumns() ||
// 		c1.nCellsPerCol() !== c2.nCellsPerCol() ||
// 		c1.getMinThreshold() !== c2.getMinThreshold() ||
// 		c1.getPermConnected() !== c2.getPermConnected() ||
// 		c1.getVerbosity() !== c2.getVerbosity() ||
// 		c1.getMaxAge() !== c2.getMaxAge() ||
// 		c1.getPamLength() !== c2.getPamLength() ||
// 		c1.getMaxInfBacktrack() !== c2.getMaxInfBacktrack() ||
// 		c1.getMaxLrnBacktrack() !== c2.getMaxLrnBacktrack() ||

// 		c1.getPamCounter() !== c2.getPamCounter() ||
// 		c1.getMaxSeqLength() !== c2.getMaxSeqLength() ||
// 		c1.getAvgLearnedSeqLength() !== c2.getAvgLearnedSeqLength() ||
// 		c1.getNLrnIterations() !== c2.getNLrnIterations() ||

// 		c1.getMaxSegmentsPerCell() !== c2.getMaxSegmentsPerCell() ||
// 		c1.getMaxSynapsesPerSegment() !== c2.getMaxSynapsesPerSegment() ||
// 		c1.getCheckSynapseConsistency() !== c2.getCheckSynapseConsistency()) {
// 		return false;
// 	}
// 	return true;
// }

// TEST("Cells4Test", "capnpSerialization", () => {
// 	const cells = new Cells4(
// 		10, 2, 1, 1, 1, 1, 0.5, 0.8, 1, 0.1, 0.1, 0, false, -1, true, false);
// 	const input1 = new Array<Real>(10, 0.0);
// 	input1[1] = 1.0;
// 	input1[4] = 1.0;
// 	input1[5] = 1.0;
// 	input1[9] = 1.0;
// 	const input2 = new Array<Real>(10, 0.0);
// 	input2[0] = 1.0;
// 	input2[2] = 1.0;
// 	input2[5] = 1.0;
// 	input2[6] = 1.0;
// 	const input3 = new Array<Real>(10, 0.0);
// 	input3[1] = 1.0;
// 	input3[3] = 1.0;
// 	input3[6] = 1.0;
// 	input3[7] = 1.0;
// 	const input4 = new Array<Real>(10, 0.0);
// 	input4[2] = 1.0;
// 	input4[4] = 1.0;
// 	input4[7] = 1.0;
// 	input4[8] = 1.0;
// 	const output = new Array<Real>(10 * 2);
// 	for (let i = 0; i < 10; ++i) {
// 		cells.compute(input1, output, true, true);
// 		cells.compute(input2, output, true, true);
// 		cells.compute(input3, output, true, true);
// 		cells.compute(input4, output, true, true);
// 		cells.reset();
// 	}

// 	const secondCells = new Cells4();
// 	// TODO: figure out serialization
// 	// 	{
// 	// 		capnp: :MallocMessageBuilder message1;
// 	// 		Cells4Proto::Builder cells4Builder = message1.initRoot<Cells4Proto>();
// 	// 		cells.write(cells4Builder);
// 	// 		std::stringstream ss;
// 	// 		kj: :std: :StdOutputStream; out(ss);
// 	// 		capnp:: writeMessage(out, message1);

// 	// kj::std::StdInputStream in(ss);
// 	// 		capnp::InputStreamMessageReader; message2(in);
// 	// 		Cells4Proto::Reader; cells4Reader = message2.getRoot<Cells4Proto>();
// 	// 		secondCells.read(cells4Reader);
// 	// 	}

// 	NTA_CHECK(() => checkCells4Attributes(cells, secondCells));

// 	const secondOutput = new Array<Real>(10 * 2);
// 	cells.compute(input1, output, true, true);
// 	secondCells.compute(input1, secondOutput, true, true);
// 	for (let i = 0; i < 10; ++i) {
// 		ASSERT_EQ(output[i], secondOutput[i], "Outputs differ at index " + i);
// 	}
// 	NTA_CHECK(() => checkCells4Attributes(cells, secondCells));
// });

// /*
//  * Test Cells4::_generateListsOfSynapsesToAdjustForAdaptSegment.
//  */
// TEST("Cells4Test", "generateListsOfSynapsesToAdjustForAdaptSegment", () => {
// 	const segment = new Segment();

// 	const srcCells = [99, 88, 77, 66, 55, 44, 33, 22, 11, 0];

// 	segment.addSynapses(srcCells,
// 		0.8/*initStrength*/,
// 		0.5/*permConnected*/);

// 	const synapsesSet = [222, 111, 77, 55, 22, 0];

// 	const inactiveSrcCellIdxs = [- 1];
// 	const inactiveSynapseIdxs = [- 1];
// 	const activeSrcCellIdxs = [- 1];
// 	const activeSynapseIdxs = [- 1];

// 	const expectedInactiveSrcCellSet = [99, 88, 66, 44, 33, 11];
// 	const expectedActiveSrcCellSet = [77, 55, 22, 0];
// 	const expectedSynapsesSet = [222, 111];

// 	const expectedInactiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedInactiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedActiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	const expectedActiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	Cells4._generateListsOfSynapsesToAdjustForAdaptSegment(
// 		segment,
// 		synapsesSet,
// 		inactiveSrcCellIdxs,
// 		inactiveSynapseIdxs,
// 		activeSrcCellIdxs,
// 		activeSynapseIdxs);

// 	ASSERT_EQ(expectedSynapsesSet, synapsesSet);
// 	ASSERT_EQ(expectedInactiveSrcCellIdxs, inactiveSrcCellIdxs);
// 	ASSERT_EQ(expectedInactiveSynapseIdxs, inactiveSynapseIdxs);
// 	ASSERT_EQ(expectedActiveSrcCellIdxs, activeSrcCellIdxs);
// 	ASSERT_EQ(expectedActiveSynapseIdxs, activeSynapseIdxs);
// });

// /*
//  * Test Cells4::_generateListsOfSynapsesToAdjustForAdaptSegment with new
//  * synapes, but no active synapses.
//  */
// TEST("Cells4Test", "generateListsOfSynapsesToAdjustForAdaptSegmentWithOnlyNewSynapses", () => {
// 	const segment = new Segment();

// 	const srcCells = [99, 88, 77, 66, 55];

// 	segment.addSynapses(srcCells,
// 		0.8/*initStrength*/,
// 		0.5/*permConnected*/);

// 	const synapsesSet = [222, 111];

// 	const inactiveSrcCellIdxs = [- 1];
// 	const inactiveSynapseIdxs = [- 1];
// 	const activeSrcCellIdxs = [- 1];
// 	const activeSynapseIdxs = [- 1];

// 	const expectedInactiveSrcCellSet = [99, 88, 77, 66, 55];
// 	const expectedActiveSrcCellSet = [];
// 	const expectedSynapsesSet = [222, 111];

// 	const expectedInactiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedInactiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedActiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	const expectedActiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	Cells4._generateListsOfSynapsesToAdjustForAdaptSegment(
// 		segment,
// 		synapsesSet,
// 		inactiveSrcCellIdxs,
// 		inactiveSynapseIdxs,
// 		activeSrcCellIdxs,
// 		activeSynapseIdxs);

// 	ASSERT_EQ(expectedSynapsesSet, synapsesSet);
// 	ASSERT_EQ(expectedInactiveSrcCellIdxs, inactiveSrcCellIdxs);
// 	ASSERT_EQ(expectedInactiveSynapseIdxs, inactiveSynapseIdxs);
// 	ASSERT_EQ(expectedActiveSrcCellIdxs, activeSrcCellIdxs);
// 	ASSERT_EQ(expectedActiveSynapseIdxs, activeSynapseIdxs);
// });

// /*
//  * Test Cells4::_generateListsOfSynapsesToAdjustForAdaptSegment with active
//  * synapses, but no new synapses.
//  */
// TEST("Cells4Test", "generateListsOfSynapsesToAdjustForAdaptSegmentWithoutNewSynapses", () => {
// 	const segment = new Segment();

// 	const srcCells = [99, 88, 77, 66, 55];

// 	segment.addSynapses(srcCells,
// 		0.8/*initStrength*/,
// 		0.5/*permConnected*/);

// 	const synapsesSet = [88, 66];

// 	const inactiveSrcCellIdxs = [- 1];
// 	const inactiveSynapseIdxs = [- 1];
// 	const activeSrcCellIdxs = [- 1];
// 	const activeSynapseIdxs = [- 1];

// 	const expectedInactiveSrcCellSet = [99, 77, 55];
// 	const expectedActiveSrcCellSet = [88, 66];
// 	const expectedSynapsesSet = [];

// 	const expectedInactiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedInactiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedActiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	const expectedActiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	Cells4._generateListsOfSynapsesToAdjustForAdaptSegment(
// 		segment,
// 		synapsesSet,
// 		inactiveSrcCellIdxs,
// 		inactiveSynapseIdxs,
// 		activeSrcCellIdxs,
// 		activeSynapseIdxs);

// 	ASSERT_EQ(expectedSynapsesSet, synapsesSet);
// 	ASSERT_EQ(expectedInactiveSrcCellIdxs, inactiveSrcCellIdxs);
// 	ASSERT_EQ(expectedInactiveSynapseIdxs, inactiveSynapseIdxs);
// 	ASSERT_EQ(expectedActiveSrcCellIdxs, activeSrcCellIdxs);
// 	ASSERT_EQ(expectedActiveSynapseIdxs, activeSynapseIdxs);
// });

// /*
//  * Test Cells4::_generateListsOfSynapsesToAdjustForAdaptSegment with active and
//  * new synapses, but no inactive synapses.
//  */
// TEST("Cells4Test", "generateListsOfSynapsesToAdjustForAdaptSegmentWithoutInactiveSynapses", () => {
// 	const segment = new Segment();

// 	const srcCells = [88, 77, 66];

// 	segment.addSynapses(srcCells,
// 		0.8/*initStrength*/,
// 		0.5/*permConnected*/);

// 	const synapsesSet = [222, 111, 88, 77, 66];

// 	const inactiveSrcCellIdxs = [- 1];
// 	const inactiveSynapseIdxs = [- 1];
// 	const activeSrcCellIdxs = [- 1];
// 	const activeSynapseIdxs = [- 1];

// 	const expectedInactiveSrcCellSet = [];
// 	const expectedActiveSrcCellSet = [88, 77, 66];
// 	const expectedSynapsesSet = [222, 111];

// 	const expectedInactiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedInactiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedActiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	const expectedActiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	Cells4._generateListsOfSynapsesToAdjustForAdaptSegment(
// 		segment,
// 		synapsesSet,
// 		inactiveSrcCellIdxs,
// 		inactiveSynapseIdxs,
// 		activeSrcCellIdxs,
// 		activeSynapseIdxs);

// 	ASSERT_EQ(expectedSynapsesSet, synapsesSet);
// 	ASSERT_EQ(expectedInactiveSrcCellIdxs, inactiveSrcCellIdxs);
// 	ASSERT_EQ(expectedInactiveSynapseIdxs, inactiveSynapseIdxs);
// 	ASSERT_EQ(expectedActiveSrcCellIdxs, activeSrcCellIdxs);
// 	ASSERT_EQ(expectedActiveSynapseIdxs, activeSynapseIdxs);
// });

// /*
//  * Test Cells4::_generateListsOfSynapsesToAdjustForAdaptSegment without initial
//  * synapses, and only new synapses.
//  */
// TEST("Cells4Test", "generateListsOfSynapsesToAdjustForAdaptSegmentWithoutInitialSynapses", () => {
// 	const segment = new Segment();

// 	const srcCells = [];

// 	segment.addSynapses(srcCells,
// 		0.8/*initStrength*/,
// 		0.5/*permConnected*/);

// 	const synapsesSet = [222, 111];

// 	const inactiveSrcCellIdxs = [- 1];
// 	const inactiveSynapseIdxs = [- 1];
// 	const activeSrcCellIdxs = [- 1];
// 	const activeSynapseIdxs = [- 1];

// 	const expectedInactiveSrcCellSet = [];
// 	const expectedActiveSrcCellSet = [];
// 	const expectedSynapsesSet = [222, 111];

// 	const expectedInactiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedInactiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedActiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	const expectedActiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	Cells4._generateListsOfSynapsesToAdjustForAdaptSegment(
// 		segment,
// 		synapsesSet,
// 		inactiveSrcCellIdxs,
// 		inactiveSynapseIdxs,
// 		activeSrcCellIdxs,
// 		activeSynapseIdxs);

// 	ASSERT_EQ(expectedSynapsesSet, synapsesSet);
// 	ASSERT_EQ(expectedInactiveSrcCellIdxs, inactiveSrcCellIdxs);
// 	ASSERT_EQ(expectedInactiveSynapseIdxs, inactiveSynapseIdxs);
// 	ASSERT_EQ(expectedActiveSrcCellIdxs, activeSrcCellIdxs);
// 	ASSERT_EQ(expectedActiveSynapseIdxs, activeSynapseIdxs);
// });

// /*
//  * Test Cells4::_generateListsOfSynapsesToAdjustForAdaptSegment with empty
//  * update set.
//  */
// TEST("Cells4Test", "generateListsOfSynapsesToAdjustForAdaptSegmentWithEmptySynapseSet", () => {
// 	const segment = new Segment();

// 	const srcCells = [88, 77, 66];

// 	segment.addSynapses(srcCells,
// 		0.8/*initStrength*/,
// 		0.5/*permConnected*/);

// 	const synapsesSet = [];

// 	const inactiveSrcCellIdxs = [- 1];
// 	const inactiveSynapseIdxs = [- 1];
// 	const activeSrcCellIdxs = [- 1];
// 	const activeSynapseIdxs = [- 1];

// 	const expectedInactiveSrcCellSet = [88, 77, 66];
// 	const expectedActiveSrcCellSet = [];
// 	const expectedSynapsesSet = [];

// 	const expectedInactiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedInactiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedInactiveSrcCellSet);

// 	const expectedActiveSrcCellIdxs =
// 		_getOrderedSrcCellIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	const expectedActiveSynapseIdxs =
// 		_getOrderedSynapseIndexesForSrcCells(segment,
// 			expectedActiveSrcCellSet);

// 	Cells4._generateListsOfSynapsesToAdjustForAdaptSegment(
// 		segment,
// 		synapsesSet,
// 		inactiveSrcCellIdxs,
// 		inactiveSynapseIdxs,
// 		activeSrcCellIdxs,
// 		activeSynapseIdxs);

// 	ASSERT_EQ(expectedSynapsesSet, synapsesSet);
// 	ASSERT_EQ(expectedInactiveSrcCellIdxs, inactiveSrcCellIdxs);
// 	ASSERT_EQ(expectedInactiveSynapseIdxs, inactiveSynapseIdxs);
// 	ASSERT_EQ(expectedActiveSrcCellIdxs, activeSrcCellIdxs);
// 	ASSERT_EQ(expectedActiveSynapseIdxs, activeSynapseIdxs);
// });
