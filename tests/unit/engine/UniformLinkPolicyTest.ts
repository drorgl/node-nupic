/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
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
import { EXPECT_THROW, EXPECT_TRUE, TEST } from "../test_base";

import { bool, Coordinate, Dimensions, Fraction, Link, pair, size_t, UniformLinkPolicy } from "../../../typings/index";

/** @file
 * Implementation of UniformLinkPolicy test
 */

// #include "gtest/gtest.h"

// #include <nupic/utils/Log.hpp>
// #include <nupic/ntypes/Dimensions.hpp>
// #include <nupic/types/Fraction.hpp>
// #include <utility>

// #include <nupic/engine/UniformLinkPolicy.hpp>

// using namespace nupic;

enum LinkSide {
	srcLinkSide,
	destLinkSide
}

class CoordBounds {
	constructor(public coord: Coordinate, public dimension: size_t, public bounds: pair<Fraction, Fraction>) {
	}
}

// ---
// We need to access private methods in UniformLinkPolicy, and so
// we create this class as a singleton and declare it a friend
// class in UniformLinkPolicy.
// ---
// namespace nupic {
class UniformLinkPolicyInspector {
	public setAndCheckDimensions(
		setLinkSide: LinkSide,
		setDimensions: Dimensions,
		checkDimensions: Dimensions,
		linkParams: string,
		elementCount: size_t = 1): bool {
		const dummyLink = new Link("UnitTestLink", "", "", "");
		const test = new UniformLinkPolicy(linkParams, dummyLink);

		// ---
		// Since we're a unit test working in isolation, the infrastructure won't
		// invoke setNodeOutputElementCount() for us; consequently we'll do that
		// directly here.
		// ---
		test.setNodeOutputElementCount(elementCount);

		setLinkSide === LinkSide.srcLinkSide ? test.setSrcDimensions(setDimensions) :
			test.setDestDimensions(setDimensions);

		const destDims = test.getDestDimensions();
		const srcDims = test.getSrcDimensions();

		let wasExpectedDimensions: bool;

		setLinkSide === LinkSide.srcLinkSide ? (wasExpectedDimensions =
			(srcDims === setDimensions &&
				destDims === checkDimensions)) :
			(wasExpectedDimensions =
				(srcDims === checkDimensions &&
					destDims === setDimensions));

		return (wasExpectedDimensions);
	}

	public setDimensionsAndCheckBounds(
		setLinkSide: LinkSide,
		setDimensions: Dimensions,
		checkBoundsVec: CoordBounds[],
		linkParams: string,
		elementCount: size_t = 1): bool {
		const dummyLink = new Link("UnitTestLink", "", "", "");
		const test = new UniformLinkPolicy(linkParams, dummyLink);

		// ---
		// Since we're a unit test working in isolation, the infrastructure won't
		// invoke setNodeOutputElementCount() for us; consequently we'll do that
		// directly here.
		// ---
		test.setNodeOutputElementCount(elementCount);

		setLinkSide === LinkSide.srcLinkSide ? test.setSrcDimensions(setDimensions) :
			test.setDestDimensions(setDimensions);

		// ---
		// Since we're a unit test working in isolation, the infrastructure won't
		// invoke initialize() for us; consequently we'll do that directly here.
		// ---
		test.initialize();

		let allBoundsEqual = true;

		for (const elem of checkBoundsVec) {
			let testBounds = new pair<Fraction, Fraction>();

			testBounds = test.getInputBoundsForNode(elem.coord,
				elem.dimension);

			if (testBounds !== elem.bounds) {
				allBoundsEqual = false;
			}
		}

		return (allBoundsEqual);
	}
}
// } // end namespace nupic

const inspector = new UniformLinkPolicyInspector();

function makeCoordinate(x: size_t, y: size_t): Coordinate {
	const coord: Coordinate = [];

	coord.push(x);
	coord.push(y);

	return (coord);
}

TEST("UniformLinkPolicyTest", "StrictMappingOddSource", () => {
	// ---
	// Check that a strict mapping with an rfSize of 2 fails on odd source
	// dimensions
	// ---
	EXPECT_THROW(() =>
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(9, 6),
			new Dimensions(0, 0),
			"{mapping: in, rfSize: [2]}"),
		"exception");
});

TEST("UniformLinkPolicyTest", "StrictMappingDimensions", () => {
	// ---
	// Check that a strict mapping with an rfSize of 2 calculates proper
	// dimensions when setting the source
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(8, 6),
			new Dimensions(4, 3),
			"{mapping: in, rfSize: [2]}"));
});

TEST("UniformLinkPolicyTest", "SpanNoImpactSource", () => {
	// ---
	// Check that adding in a span with size equal to the source dimensions has
	// no impact on the calculated destination dimensions when setting the source
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(
			LinkSide.srcLinkSide,
			new Dimensions(8, 6),
			new Dimensions(4, 3),
			"{mapping: in, rfSize: [2], span: [8,6]}"));
});

TEST("UniformLinkPolicyTest", "StrictMappingDestination", () => {
	// ---
	// Check that a strict mapping with an rfSize of 2 calculates proper
	// dimensions when setting the destination
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.destLinkSide,
			new Dimensions(4, 3),
			new Dimensions(8, 6),
			"{mapping: in, rfSize: [2]}"));
});

TEST("UniformLinkPolicyTest", "SpanNoImpactDestination", () => {
	// ---
	// Check that adding in a span with size equal to the source dimensions has
	// no impact on the calculated destination dimensions when setting the
	// destination
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.destLinkSide,
			new Dimensions(4, 3),
			new Dimensions(8, 6),
			"{mapping: in, rfSize: [2], span: [8,6]}"));
});

TEST("UniformLinkPolicyTest", "StrictMappingGranularityDestFails", () => {
	// ---
	// Check that using a fractional rfSize with a granularity of elements fails
	// when the number of elements is inconsistent with a strict mapping
	// ---
	EXPECT_THROW(() =>
		inspector.setAndCheckDimensions(LinkSide.destLinkSide,
			new Dimensions(7),
			new Dimensions(10),
			"{mapping: in, rfSize: [1.42857], rfGranularity: elements}",
			1),
		"exception");
});

TEST("UniformLinkPolicyTest", "StrictMappingGranularityDestPasses", () => {
	// ---
	// Check that when using a compatible number of elements, the above test
	// passes
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.destLinkSide,
			new Dimensions(7),
			new Dimensions(10),
			"{mapping: in, rfSize: [1.42857], rfGranularity: elements}",
			7));
});

TEST("UniformLinkPolicyTest", "StrictMappingGranularitySourceFails", () => {
	// ---
	// Repeat the above two tests setting the source instead of the destination
	// ---
	EXPECT_THROW(() =>
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(10),
			new Dimensions(7),
			"{mapping: in, rfSize: [1.42857], rfGranularity: elements}",
			1),
		"exception");
});

TEST("UniformLinkPolicyTest", "StrictMappingGranularitySourcePasses", () => {
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(10),
			new Dimensions(7),
			"{mapping: in, rfSize: [1.42857], rfGranularity: elements}",
			7));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingSourcePasses", () => {
	// ---
	// Check that a non-strict mapping with an rfSize of 2 succeeds on odd source
	// dimensions and returns the expected values.  Specifically, when working in
	// non-strict mode, UniformLinkPolicy should favor a mapping that provides
	// more source nodes in a given destination node than fewer; consequently,
	// for source dimensions of [9, 6] and a rfSize of [2] we would expect
	// dimensions of [4, 3] instead of [5, 3].
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(9, 6),
			new Dimensions(4, 3),
			"{mapping: in, rfSize: [2], strict: false}"));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingExpectedDimensions", () => {
	// ---
	// Check that a non-strict mapping with overlap and a span has the expected
	// dimensions.
	//
	// In the following test, our second dimension is a valid strict mapping with
	// no overlap or span, so we expect it to be 2 given the parameters.  Our
	// first dimension is more complicated.  Given a receptive field of 3 nodes
	// with an overlap of 2 and a span of 4, each set of four source nodes is
	// going to correspond to two destination nodes.  The remaining lone 9th node
	// should, due to non-strict favoring of mappings that provide more source
	// nodes in a given destination node than fewer, be packed into one of the
	// two spans.  Therefore we expect the first dimension to be of size 4.
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(9, 6),
			new Dimensions(4, 2),
			"{mapping: in, " +
			"rfSize: [3], " +
			"rfOverlap: [2, 0], " +
			"span: [4, 0], " +
			"strict: false}"));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingExpectedDimensions2", () => {
	// ---
	// Repeat the above test using source dimensions of [10, 6].  In this case
	// The remaining 9th and 10th node should, be packed into one each of the
	// two spans.  Therefore we expect the first dimension to be of size 4.
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(10, 6),
			new Dimensions(4, 2),
			"{mapping: in, " +
			"rfSize: [3], " +
			"rfOverlap: [2, 0], " +
			"span: [4, 0], " +
			"strict: false}"));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingExpectedDimensionsEdge", () => {
	// ---
	// Check the same condition as above, but setting the destination and
	// inducing the source dimensions.  We will test using destination dimensions
	// of [5, 2] since this is an edge case which can not possibly be mapped.
	//
	// We expect source dimensions of [10,2], however we further expect a
	// warning that our specified destination dimensions will result in one
	// of the destination nodes in the first dimension receiving no input.
	// This is because with 10 source nodes, given the parameters, you'd have:
	//
	//  * * * *   * * * * * *
	// | RF  |   | RF  |
	//   | RF  |   | RF  |
	// | SPAN  | | SPAN  |
	//
	// i.e. two spans with two receptive fields and two extra nodes.
	//
	// The mapping of these two extra source nodes to a fifth destination node
	// is implied by the formulas; however given the specified span parameter,
	// it makes no sense to have a 5th destination node in the absence of a
	// sixth, and as is the case, the two extra nodes should be distributed
	// across the two valid spans.  This is what is done, and a warning is
	// issued to indicate that the destination dimensions being set, while
	// being honored due to strict=false, will result in the 5th destination
	// node receiving no input.
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.destLinkSide,
			new Dimensions(5, 2),
			new Dimensions(10, 6),
			"{mapping: in, " +
			"rfSize: [3], " +
			"rfOverlap: [2, 0], " +
			"span: [4, 0], " +
			"strict: false}"));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingSourceDimensions", () => {
	// ---
	// Test basic non-strict mapping when setting source dimensions.
	//
	// When working in a non-strict mode, UniformLinkPolicy should favor a
	// mapping that provides more source nodes in a given destination node than
	// fewer; consequently we expect dimensions of [4, 3] instead of [5, 4] for
	// the following settings.
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(8, 6),
			new Dimensions(4, 3),
			"{mapping: in, " +
			"rfSize: [1.7], " +
			"strict: false}"));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingDestinationDimensions", () => {
	// ---
	// Test basic non-strict mapping when setting destination dimensions.
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.destLinkSide,
			new Dimensions(4, 3),
			new Dimensions(7, 6),
			"{mapping: in, " +
			"rfSize: [1.7], " +
			"strict: false}"));
});

TEST("UniformLinkPolicyTest", "OverlapOverhangRealisticDimensions", () => {
	// ---
	// Test overhang and overlap while using realistic image size dimensions.
	// ---
	EXPECT_TRUE(
		inspector.setAndCheckDimensions(LinkSide.srcLinkSide,
			new Dimensions(320, 240),
			new Dimensions(41, 31),
			"{mapping: in, " +
			"rfSize: [16], " +
			"rfOverlap: [8], " +
			"overhang: [8]}"));
});

TEST("UniformLinkPolicyTest", "StrictMappingSplitOverReceptiveFields", () => {
	// ---
	// Test a strict mapping to make sure the elements are split across
	// receptive fields as expected
	// ---
	const expectedBoundVec = new Array<CoordBounds>();

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(0, 0),
			0,
			new pair(new Fraction(0), new Fraction(1))));

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(1, 0),
			0,
			new pair(new Fraction(2), new Fraction(3))));

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(2, 0),
			0,
			new pair(new Fraction(4), new Fraction(5))));

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(3, 0),
			0,
			new pair(new Fraction(6), new Fraction(7))));

	EXPECT_TRUE(
		inspector.setDimensionsAndCheckBounds(LinkSide.srcLinkSide,
			new Dimensions(8, 6),
			expectedBoundVec,
			"{mapping: in, " +
			"rfSize: [2], " +
			"strict: false}"));
});

TEST("UniformLinkPolicyTest", "NonStrictMappingSplitOverReceptiveFields", () => {
	// ---
	// Test a non-strict mapping to make sure the elements are split across
	// receptive fields as expected
	// ---
	const expectedBoundVec = new Array<CoordBounds>();

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(0, 0),
			0,
			new pair(new Fraction(0), new Fraction(1))));

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(1, 0),
			0,
			new pair(new Fraction(2), new Fraction(3))));

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(2, 0),
			0,
			new pair(new Fraction(4), new Fraction(5))));

	expectedBoundVec.push(
		new CoordBounds(makeCoordinate(3, 0),
			0,
			new pair(new Fraction(6), new Fraction(8))));

	EXPECT_TRUE(
		inspector.setDimensionsAndCheckBounds(LinkSide.srcLinkSide,
			new Dimensions(9, 6),
			expectedBoundVec,
			"{mapping: in, " +
			"rfSize: [2], " +
			"strict: false}"));
});
