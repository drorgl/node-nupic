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
import { ASSERT_EQ, ASSERT_TRUE, EXPECT_EQ, EXPECT_STREQ, EXPECT_THROW, TEST } from "../test_base";

import { callbackItem, Dimensions, Network, NTA_DEBUG, NuPIC, UInt32, UInt64 } from "../../../typings/index";
/** @file
 * Implementation of Network test
 */

// #include "gtest/gtest.h"

// #include <nupic/engine/Network.hpp>
// #include <nupic/engine/NuPIC.hpp>
// #include <nupic/engine/Region.hpp>
// #include <nupic/ntypes/Dimensions.hpp>
// #include <nupic/utils/Log.hpp>

// using namespace nupic;

function SHOULDFAIL_WITH_MESSAGE(statement: () => void, message: string): void {
	let caughtException = false;
	try {
		statement();
	} catch (e) {

		caughtException = true;
		EXPECT_STREQ(message, e.message, "statement '" + statement.toString() + "' should fail with message \"" +
			message + "\", but failed with message \"" + e.message + "\"");
	}
	EXPECT_EQ(true, caughtException, "statement '" + statement.toString() + "' should fail");
}

TEST("NetworkTest", "AutoInitialization", () => {

	// Uninitialize NuPIC since this test checks auto-initialization
	// If shutdown fails, there is probably a problem with another test which
	// is not cleaning up its networks.
	if (NuPIC.isInitialized()) {
		NuPIC.shutdown();
	}

	ASSERT_TRUE(!NuPIC.isInitialized());

	// creating a network should auto-initialize NuPIC
	{
		const net = new Network();
		ASSERT_TRUE(NuPIC.isInitialized());
		const l1 = net.addRegion("level1", "TestNode", "");

		// Use l1 to avoid a compiler warning
		EXPECT_STREQ("level1", l1.getName());

		// Network still exists, so this should fail.
		EXPECT_THROW(() => NuPIC.shutdown(), "exception");
	}
	// net destructor has been called so we should be able to shut down NuPIC now
	NuPIC.shutdown();
});

TEST("NetworkTest", "RegionAccess", () => {
	const net = new Network();
	EXPECT_THROW(() => net.addRegion("level1", "nonexistent_nodetype", ""), "exception");

	// Should be able to add a region
	const l1 = net.addRegion("level1", "TestNode", "");

	ASSERT_TRUE(l1.getNetwork() === net);

	EXPECT_THROW(() => net.getRegions().getByName("nosuchregion"), "exception");

	// Make sure partial matches don't work
	EXPECT_THROW(() => net.getRegions().getByName("level"), "exception");

	const l1a = net.getRegions().getByName("level1");
	ASSERT_TRUE(l1a === l1);

	// Should not be able to add a second region with the same name
	EXPECT_THROW(() => net.addRegion("level1", "TestNode", ""), "exception");

});

TEST("NetworkTest", "InitializationBasic", () => {
	const net = new Network();
	net.initialize();
});

TEST("NetworkTest", "InitializationNoRegions", () => {
	const net = new Network();
	const l1 = net.addRegion("level1", "TestNode", "");

	// Region does not yet have dimensions -- prevents network initialization
	EXPECT_THROW(() => net.initialize(), "exception");
	EXPECT_THROW(() => net.run(1), "exception");

	const d = new Dimensions();
	d.push(4);
	d.push(4);

	l1.setDimensions(d);

	// Should succeed since dimensions are now set
	net.initialize();
	net.run(1);

	const l2 = net.addRegion("level2", "TestNode", "");
	EXPECT_THROW(() => net.initialize(), "exception");
	EXPECT_THROW(() => net.run(1), "exception");

	l2.setDimensions(d);
	net.run(1);

});

TEST("NetworkTest", "Modification", () => {
	NTA_DEBUG("Running network modification tests");

	const net = new Network();
	let l1 = net.addRegion("level1", "TestNode", "");

	// should have been added at phase0
	let phases = net.getPhases("level1");
	ASSERT_EQ(1, phases.length);
	ASSERT_TRUE(phases.indexOf(0) !== -1);

	const d = new Dimensions();
	d.push(4);
	d.push(4);
	l1.setDimensions(d);

	net.addRegion("level2", "TestNode", "");

	// should have been added at phase1
	phases = net.getPhases("level2");
	ASSERT_EQ(1, phases.length);
	ASSERT_TRUE(phases.indexOf(1) !== -1);

	net.link("level1", "level2", "TestFanIn2", "");

	const regions = net.getRegions();

	ASSERT_EQ(2, regions.getCount());

	// Should succeed since dimensions are now set
	net.initialize();
	net.run(1);
	let l2 = regions.getByName("level2");
	let d2 = l2.getDimensions();
	ASSERT_EQ(2, d2.length);
	ASSERT_EQ(2, d2[0]);
	ASSERT_EQ(2, d2[1]);

	EXPECT_THROW(() => net.removeRegion("doesntexist"), "exception");

	net.removeRegion("level2");
	// net now only contains level1
	ASSERT_EQ(1, regions.getCount());
	EXPECT_THROW(() => regions.getByName("level2"), "exception");

	// network requires initialization, but this will auto-initialize
	net.run(1);

	ASSERT_TRUE(l1 === regions.getByName("level1"));
	l2 = net.addRegion("level2", "TestNode", "");

	// should have been added at phase1
	phases = net.getPhases("level2");
	ASSERT_EQ(1, phases.length);
	ASSERT_TRUE(phases.indexOf(1) !== -1);

	// network requires initialization, but can't be initialized
	// because level2 is not initialized
	EXPECT_THROW(() => net.run(1), "exception");

	net.link("level1", "level2", "TestFanIn2", "");

	// network can be initialized now
	net.run(1);

	ASSERT_EQ(2, regions.getCount());
	ASSERT_TRUE(l2 === regions.getByName("level2"));

	d2 = l2.getDimensions();
	ASSERT_EQ(2, d2.length);
	ASSERT_EQ(2, d2[0]);
	ASSERT_EQ(2, d2[1]);

	// add a third region
	let l3 = net.addRegion("level3", "TestNode", "");

	// should have been added at phase 2
	phases = net.getPhases("level3");
	ASSERT_EQ(1, phases.length);
	ASSERT_TRUE(phases.indexOf(2)  !== -1);

	ASSERT_EQ(3, regions.getCount());

	// network requires initialization, but can't be initialized
	// because level3 is not initialized
	EXPECT_THROW(() => net.run(1), "exception");

	net.link("level2", "level3", "TestFanIn2", "");
	net.initialize();
	d2 = l3.getDimensions();
	ASSERT_EQ(2, d2.length);
	ASSERT_EQ(1, d2[0]);
	ASSERT_EQ(1, d2[1]);

	// try to remove a region whose outputs are connected
	// this should fail because it would leave the network
	// unrunnable
	EXPECT_THROW(() => net.removeRegion("level2"), "exception");
	ASSERT_EQ(3, regions.getCount());
	EXPECT_THROW(() => net.removeRegion("level1"), "exception");
	ASSERT_EQ(3, regions.getCount());

	// this should be ok
	net.removeRegion("level3");
	ASSERT_EQ(2, regions.getCount());

	net.removeRegion("level2");
	net.removeRegion("level1");
	ASSERT_EQ(0, regions.getCount());

	// build up the network again -- slightly differently with
	// l1.l2 and l1.l3
	l1 = net.addRegion("level1", "TestNode", "");
	l1.setDimensions(d);
	net.addRegion("level2", "TestNode", "");
	net.addRegion("level3", "TestNode", "");
	net.link("level1", "level2", "TestFanIn2", "");
	net.link("level1", "level3", "TestFanIn2", "");
	net.initialize();

	// build it up one more time and let the destructor take care of it
	net.removeRegion("level2");
	net.removeRegion("level3");
	net.run(1);

	l2 = net.addRegion("level2", "TestNode", "");
	l3 = net.addRegion("level3", "TestNode", "");
	// try links in reverse order
	net.link("level2", "level3", "TestFanIn2", "");
	net.link("level1", "level2", "TestFanIn2", "");
	net.initialize();
	d2 = l3.getDimensions();
	ASSERT_EQ(2, d2.length);
	ASSERT_EQ(1, d2[0]);
	ASSERT_EQ(1, d2[1]);

	d2 = l2.getDimensions();
	ASSERT_EQ(2, d2.length);
	ASSERT_EQ(2, d2[0]);
	ASSERT_EQ(2, d2[1]);

	// now let the destructor remove everything

});

TEST("NetworkTest", "Unlinking", () => {
	NTA_DEBUG("Running unlinking tests");
	const net = new Network();
	net.addRegion("level1", "TestNode", "");
	net.addRegion("level2", "TestNode", "");
	let d = new Dimensions();
	d.push(4);
	d.push(2);
	net.getRegions().getByName("level1").setDimensions(d);

	net.link("level1", "level2", "TestFanIn2", "");
	ASSERT_TRUE(net.getRegions().getByName("level2").getDimensions().isUnspecified());

	EXPECT_THROW(() => net.removeLink("level1", "level2", "outputdoesnotexist", "bottomUpIn"), "exception");
	EXPECT_THROW(() => net.removeLink("level1", "level2", "bottomUpOut", "inputdoesnotexist"), "exception");
	EXPECT_THROW(() => net.removeLink("level1", "leveldoesnotexist"), "exception");
	EXPECT_THROW(() => net.removeLink("leveldoesnotexist", "level2"), "exception");

	// remove the link from the uninitialized network
	net.removeLink("level1", "level2");
	ASSERT_TRUE(net.getRegions().getByName("level2").getDimensions().isUnspecified());

	EXPECT_THROW(() => net.removeLink("level1", "level2"), "exception");

	// remove, specifying output/input names
	net.link("level1", "level2", "TestFanIn2", "");
	net.removeLink("level1", "level2", "bottomUpOut", "bottomUpIn");
	EXPECT_THROW(() => net.removeLink("level1", "level2", "bottomUpOut", "bottomUpIn"), "exception");

	net.link("level1", "level2", "TestFanIn2", "");
	net.removeLink("level1", "level2", "bottomUpOut");
	EXPECT_THROW(() => net.removeLink("level1", "level2", "bottomUpOut"), "exception");

	// add the link back and initialize (inducing dimensions)
	net.link("level1", "level2", "TestFanIn2", "");
	net.initialize();

	d = net.getRegions().getByName("level2").getDimensions();
	ASSERT_EQ(2, d.length);
	ASSERT_EQ(2, d[0]);
	ASSERT_EQ(1, d[1]);

	// remove the link. This will fail because we can't
	// remove a link to an initialized region
	SHOULDFAIL_WITH_MESSAGE(() => net.removeLink("level1", "level2"),
		"Cannot remove link [level1.bottomUpOut (region dims: [4 2])  to level2.bottomUpIn (region dims: [2 1])  type: TestFanIn2] because destination region level2 is initialized. Remove the region first.");

});

type callbackData = string[];

//  typedef Array<string> callbackData;
const mydata: callbackData = [];

function testCallback(net: Network, iteration: UInt64, data: any): void {
	// callbackData & thedata = *(static_cast < callbackData *>(data));
	const thedata = data as callbackData;

	// push region names onto callback data
	const regions = net.getRegions();
	for (let i = 0; i < regions.getCount(); i++) {
		thedata.push(regions.getByIndex(i).first);
	}
}

const computeHistory = new Array<string>();
function recordCompute(name: string): void {
	computeHistory.push(name);
}

TEST("NetworkTest", "Phases", () => {
	const net = new Network();

	// should auto-initialize with max phase
	const l1 = net.addRegion("level1", "TestNode", "");
	// Use l1 to avoid a compiler warning
	EXPECT_STREQ("level1", l1.getName());

	let phaseSet = net.getPhases("level1");
	ASSERT_EQ(1, phaseSet.length);
	ASSERT_TRUE(phaseSet.indexOf(0) !== -1);

	const l2 = net.addRegion("level2", "TestNode", "");
	EXPECT_STREQ("level2", l2.getName());
	phaseSet = net.getPhases("level2");
	ASSERT_TRUE(phaseSet.length === 1);
	ASSERT_TRUE(phaseSet.indexOf(1) !== -1);

	EXPECT_THROW(() => net.initialize(), "exception");

	const d = new Dimensions();
	d.push(2);
	d.push(2);

	l1.setDimensions(d);
	l2.setDimensions(d);
	net.initialize();
	l1.setParameterCallback("computeCallback", recordCompute);
	l2.setParameterCallback("computeCallback", recordCompute);

	computeHistory.length = 0;
	net.run(2);
	ASSERT_EQ(4, computeHistory.length);
	// use at() to throw an exception if out of range
	EXPECT_STREQ("level1", computeHistory[0]);
	EXPECT_STREQ("level2", computeHistory[1]);
	EXPECT_STREQ("level1", computeHistory[2]);
	EXPECT_STREQ("level2", computeHistory[3]);
	computeHistory.length = 0;

	phaseSet.length = 0;
	phaseSet.push(0);
	phaseSet.push(2);
	net.setPhases("level1", phaseSet);
	net.run(2);
	ASSERT_EQ(6, computeHistory.length);
	if (computeHistory.length === 6) {
		EXPECT_STREQ("level1", computeHistory[0]);
		EXPECT_STREQ("level2", computeHistory[1]);
		EXPECT_STREQ("level1", computeHistory[2]);
		EXPECT_STREQ("level1", computeHistory[3]);
		EXPECT_STREQ("level2", computeHistory[4]);
		EXPECT_STREQ("level1", computeHistory[5]);
	}
	computeHistory.length = 0;
});

TEST("NetworkTest", "MinMaxPhase", () => {
	const n = new Network();
	let minPhase = n.getMinPhase();
	let maxPhase = n.getMaxPhase();

	ASSERT_EQ(0, minPhase);
	ASSERT_EQ(0, maxPhase);

	EXPECT_THROW(() => n.setMinEnabledPhase(1), "exception");
	EXPECT_THROW(() => n.setMaxEnabledPhase(1), "exception");
	const l1 = n.addRegion("level1", "TestNode", "");
	const l2 = n.addRegion("level2", "TestNode", "");
	const l3 = n.addRegion("level3", "TestNode", "");
	const d = new Dimensions();
	d.push(1);
	l1.setDimensions(d);
	l2.setDimensions(d);
	l3.setDimensions(d);

	n.initialize();

	l1.setParameterCallback("computeCallback", recordCompute);
	l2.setParameterCallback("computeCallback", recordCompute);
	l3.setParameterCallback("computeCallback", recordCompute);

	minPhase = n.getMinEnabledPhase();
	maxPhase = n.getMaxEnabledPhase();

	ASSERT_EQ(0, minPhase);
	ASSERT_EQ(2, maxPhase);

	computeHistory.length = 0;
	n.run(2);
	ASSERT_EQ(6, computeHistory.length);
	EXPECT_STREQ("level1", computeHistory[0]);
	EXPECT_STREQ("level2", computeHistory[1]);
	EXPECT_STREQ("level3", computeHistory[2]);
	EXPECT_STREQ("level1", computeHistory[3]);
	EXPECT_STREQ("level2", computeHistory[4]);
	EXPECT_STREQ("level3", computeHistory[5]);

	n.setMinEnabledPhase(0);
	n.setMaxEnabledPhase(1);
	computeHistory.length = 0;
	n.run(2);
	ASSERT_EQ(4, computeHistory.length);
	EXPECT_STREQ("level1", computeHistory[0]);
	EXPECT_STREQ("level2", computeHistory[1]);
	EXPECT_STREQ("level1", computeHistory[2]);
	EXPECT_STREQ("level2", computeHistory[3]);

	n.setMinEnabledPhase(1);
	n.setMaxEnabledPhase(1);
	computeHistory.length = 0;
	n.run(2);
	ASSERT_EQ(2, computeHistory.length);
	EXPECT_STREQ("level2", computeHistory[0]);
	EXPECT_STREQ("level2", computeHistory[1]);

	// reset to full network
	n.setMinEnabledPhase(0);
	n.setMaxEnabledPhase(n.getMaxPhase());
	computeHistory.length = 0;
	n.run(2);
	ASSERT_EQ(6, computeHistory.length);
	if (computeHistory.length === 6) {
		EXPECT_STREQ("level1", computeHistory[0]);
		EXPECT_STREQ("level2", computeHistory[1]);
		EXPECT_STREQ("level3", computeHistory[2]);
		EXPECT_STREQ("level1", computeHistory[3]);
		EXPECT_STREQ("level2", computeHistory[4]);
		EXPECT_STREQ("level3", computeHistory[5]);
	}
	// max < min; allowed, but network should not run
	n.setMinEnabledPhase(1);
	n.setMaxEnabledPhase(0);
	computeHistory.length = 0;
	n.run(2);
	ASSERT_EQ(0, computeHistory.length);

	// max > network max
	EXPECT_THROW(() => n.setMaxEnabledPhase(4), "exception");

	const phases = new Array<UInt32>();
	phases.push(4);
	phases.push(6);
	n.setPhases("level2", phases);
	n.removeRegion("level1");
	// we now have: level2: 4, 6  level3: 2

	minPhase = n.getMinPhase();
	maxPhase = n.getMaxPhase();

	ASSERT_EQ(2, minPhase);
	ASSERT_EQ(6, maxPhase);

	computeHistory.length = 0;
	n.run(2);

	ASSERT_EQ(6, computeHistory.length);
	EXPECT_STREQ("level3", computeHistory[0]);
	EXPECT_STREQ("level2", computeHistory[1]);
	EXPECT_STREQ("level2", computeHistory[2]);
	EXPECT_STREQ("level3", computeHistory[3]);
	EXPECT_STREQ("level2", computeHistory[4]);
	EXPECT_STREQ("level2", computeHistory[5]);

});

TEST("NetworkTest", "Callback", () => {
	const n = new Network();
	n.addRegion("level1", "TestNode", "");
	n.addRegion("level2", "TestNode", "");
	n.addRegion("level3", "TestNode", "");
	const d = new Dimensions();
	d.push(1);
	n.getRegions().getByName("level1").setDimensions(d);
	n.getRegions().getByName("level2").setDimensions(d);
	n.getRegions().getByName("level3").setDimensions(d);

	// Collection < Network; .callbackItem > &
	const callbacks = n.getCallbacks();
	// Network.callbackItem; callback(testCallback, (void * )( & mydata));
	const callback: callbackItem = {
		function: testCallback,
		data: mydata
	};
	callbacks.add("Test Callback", callback);

	n.run(2);
	ASSERT_EQ(6, mydata.length);
	EXPECT_STREQ("level1", mydata[0]);
	EXPECT_STREQ("level2", mydata[1]);
	EXPECT_STREQ("level3", mydata[2]);
	EXPECT_STREQ("level1", mydata[3]);
	EXPECT_STREQ("level2", mydata[4]);
	EXPECT_STREQ("level3", mydata[5]);

});
