/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013-2017, Numenta, Inc.  Unless you have an agreement
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
import { ASSERT_EQ, ASSERT_TRUE, EXPECT_THROW, TEST } from "../test_base";

import { bool, Dimensions, Input, Network, NTA_BasicType, Real64, size_t } from "../../../typings/index";

/** @file
 * Implementation of Input test
 */

// #include <nupic/engine/Input.hpp>
// #include <nupic/engine/Network.hpp>
// #include <nupic/engine/Output.hpp>
// #include <nupic/engine/Region.hpp>
// #include <nupic/engine/TestNode.hpp>
// #include <nupic/ntypes/Dimensions.hpp>
// #include "gtest/gtest.h"

// using namespace nupic;

TEST("InputTest", "BasicNetworkConstruction", () => {
	const net = new Network();
	const r1 = net.addRegion("r1", "TestNode", "");
	const r2 = net.addRegion("r2", "TestNode", "");

	// Test constructor
	const x = new Input(r1, NTA_BasicType.NTA_BasicType_Int32, true);
	const y = new Input(r2, NTA_BasicType.NTA_BasicType_Byte, false);
	EXPECT_THROW(() => new Input(r1, NTA_BasicType.NTA_BasicType_Last + 1, true),
		"exception");

	// test getRegion()
	ASSERT_EQ(r1, x.getRegion());
	ASSERT_EQ(r2, y.getRegion());

	// test isRegionLevel()
	ASSERT_TRUE(x.isRegionLevel());
	ASSERT_TRUE(!y.isRegionLevel());

	// test isInitialized()
	ASSERT_TRUE(!x.isInitialized());
	ASSERT_TRUE(!y.isInitialized());

	// test one case of initialize()
	EXPECT_THROW(() => x.initialize(), "exception");
	EXPECT_THROW(() => y.initialize(), "exception");

	const d1 = new Dimensions();
	d1.push(8);
	d1.push(4);
	r1.setDimensions(d1);
	const d2 = new Dimensions();
	d2.push(4);
	d2.push(2);
	r2.setDimensions(d2);
	net.link("r1", "r2", "TestFanIn2", "");

	x.initialize();
	y.initialize();

	// test evaluateLinks()
	// should return 0 because x is initialized
	ASSERT_EQ(0, x.evaluateLinks());
	// should return 0 because there are no links
	ASSERT_EQ(0, y.evaluateLinks());

	// test getData()
	const pa = y.getData();
	ASSERT_EQ(0, pa.getCount());
	const buf = (pa.getBuffer());
	ASSERT_TRUE(buf != null);
});

TEST("InputTest", "SplitterMap", () => {
	const net = new Network();
	const region1 = net.addRegion("region1", "TestNode", "");
	const region2 = net.addRegion("region2", "TestNode", "");

	const d1 = new Dimensions();
	d1.push(8);
	d1.push(4);
	region1.setDimensions(d1);

	// test addLink() indirectly - it is called by Network::link()
	net.link("region1", "region2", "TestFanIn2", "");

	// test initialize(), which is called by net.initialize()
	net.initialize();

	const d2 = region2.getDimensions();
	const in1 = region1.getInput("bottomUpIn");
	const in2 = region2.getInput("bottomUpIn");
	const out1 = region1.getOutput("bottomUpOut");

	// test isInitialized()
	ASSERT_TRUE(in1.isInitialized());
	ASSERT_TRUE(in2.isInitialized());

	// test evaluateLinks(), in1 already initialized
	ASSERT_EQ(0, in1.evaluateLinks());
	ASSERT_EQ(0, in2.evaluateLinks());

	// test prepare
	{
		// set in2 to all zeroes
		let ai2 = in2.getData();
		let idata = ai2.getBuffer();
		for (let i = 0; i < 64; i++) {
			idata[i] = 0;
		}

		// set out1 to all 10's
		const ao1 = out1.getData();
		idata = ao1.getBuffer();
		for (let i = 0; i < 64; i++) {
			idata[i] = 10;
		}

		// confirm that in2 is still all zeroes
		ai2 = in2.getData();
		idata = ai2.getBuffer();
		// only test 4 instead of 64 to cut down on number of tests
		for (let i = 0; i < 4; i++) {
			ASSERT_EQ(0, idata[i]);
		}

		in2.prepare();

		// confirm that in2 is now all 10's
		ai2 = in2.getData();
		idata = ai2.getBuffer();
		// only test 4 instead of 64 to cut down on number of tests
		for (let i = 0; i < 4; i++) {
			ASSERT_EQ(10, idata[i]);
		}

	}

	net.run(2);

	// test getSplitterMap()
	let sm = new Array<size_t[]>();
	sm = in2.getSplitterMap();
	ASSERT_EQ(8, sm.length);
	ASSERT_EQ(8, sm[0].length);
	ASSERT_EQ(16, sm[0][4]);
	ASSERT_EQ(12, sm[3][0]);
	ASSERT_EQ(31, sm[3][7]);

	// test getInputForNode()
	// const input = new Array<Real64>();
	let input = in2.getInputForNode<Real64>("Real64", 0);
	ASSERT_EQ(1, input[0]);
	ASSERT_EQ(0, input[1]);
	ASSERT_EQ(8, input[5]);
	ASSERT_EQ(9, input[7]);
	input = in2.getInputForNode<Real64>("Real64", 3);
	ASSERT_EQ(1, input[0]);
	ASSERT_EQ(6, input[1]);
	ASSERT_EQ(15, input[7]);

	// test getData()
	const pa = in2.getData();
	ASSERT_EQ(64, pa.getCount());
	const data = pa.getBuffer();
	ASSERT_EQ(1, data[0]);
	ASSERT_EQ(0, data[1]);
	ASSERT_EQ(1, data[30]);
	ASSERT_EQ(15, data[31]);
	ASSERT_EQ(31, data[63]);
});

TEST("InputTest", "LinkTwoRegionsOneInput", () => {
	const net = new Network();
	const region1 = net.addRegion("region1", "TestNode", "");
	const region2 = net.addRegion("region2", "TestNode", "");
	const region3 = net.addRegion("region3", "TestNode", "");

	const d1 = new Dimensions();
	d1.push(8);
	d1.push(4);
	region1.setDimensions(d1);
	region2.setDimensions(d1);

	net.link("region1", "region3", "TestFanIn2", "");
	net.link("region2", "region3", "TestFanIn2", "");

	net.initialize();

	const d3 = region3.getDimensions();
	const in3 = region3.getInput("bottomUpIn");

	ASSERT_EQ(2, d3.length);
	ASSERT_EQ(4, d3[0]);
	ASSERT_EQ(2, d3[1]);

	net.run(2);

	// test getSplitterMap()
	let sm = new Array<size_t[]>();
	sm = in3.getSplitterMap();
	ASSERT_EQ(8, sm.length);
	ASSERT_EQ(16, sm[0].length);
	ASSERT_EQ(16, sm[0][4]);
	ASSERT_EQ(12, sm[3][0]);
	ASSERT_EQ(31, sm[3][7]);

	// test getInputForNode()
	// const input = new Array<Real64>();
	let input = in3.getInputForNode<Real64>("Real64", 0);
	ASSERT_EQ(1, input[0]);
	ASSERT_EQ(0, input[1]);
	ASSERT_EQ(8, input[5]);
	ASSERT_EQ(9, input[7]);
	input = in3.getInputForNode<Real64>("Real64", 3);
	ASSERT_EQ(1, input[0]);
	ASSERT_EQ(6, input[1]);
	ASSERT_EQ(15, input[7]);

	// test getData()
	const pa = in3.getData();
	ASSERT_EQ(128, pa.getCount());
	const data = pa.getBuffer();
	ASSERT_EQ(1, data[0]);
	ASSERT_EQ(0, data[1]);
	ASSERT_EQ(1, data[30]);
	ASSERT_EQ(15, data[31]);
	ASSERT_EQ(31, data[63]);
	ASSERT_EQ(1, data[64]);
	ASSERT_EQ(0, data[65]);
	ASSERT_EQ(1, data[94]);
	ASSERT_EQ(15, data[95]);
	ASSERT_EQ(31, data[127]);

});
