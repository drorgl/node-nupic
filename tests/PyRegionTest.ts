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

// /*
//  This file is similar to CppRegionTest except that it also tests Python nodes.
//  It is build in nupic.core but tested in nupic. So its execution and README instructions
//  remains in nupic.
// */
// import { NTA_CHECK, NTA_DEBUG, NTA_THROW } from "../typings/index";
// import { Dimensions, Network, NuPIC, Region } from "../typings/index";

// // #include <nupic/engine/NuPIC.hpp>
// // #include <nupic/engine/Network.hpp>
// // #include <nupic/engine/Region.hpp>
// // #include <nupic/engine/Spec.hpp>
// // #include <nupic/engine/Input.hpp>
// // #include <nupic/engine/Output.hpp>
// // #include <nupic/engine/Link.hpp>
// // #include <nupic/ntypes/Dimensions.hpp>
// // #include <nupic/ntypes/Array.hpp>
// // #include <nupic/ntypes/ArrayRef.hpp>
// // #include <nupic/py_support/NumpyArrayObject.hpp>
// // #include <nupic/types/Exception.hpp>
// // #include <nupic/os/OS.hpp> // memory leak detection
// // #include <nupic/os/Env.hpp>
// // #include <nupic/os/Path.hpp>
// // #include <nupic/os/Timer.hpp>

// // #include <string>
// // #include <vector>
// // #include <cmath> // fabs/abs
// // #include <cstdlib> // exit
// // #include <iostream>
// // #include <stdexcept>

// // #include <capnp/message.h>

// const ignore_negative_tests = false;
// function SHOULDFAIL(statement: () => void): void {
// 	if (!ignore_negative_tests) {
// 		let caughtException = false;
// 		try {
// 			statement();
// 		} catch (e) {
// 			caughtException = true;
// 			console.log("Caught exception as expected: ", statement.toString());
// 		}
// 		if (!caughtException) {
// 			throw new Error("Operation '" + statement.toString() + "' did not fail as expected");
// 		}
// 	}
// }

// // using namespace nupic;

// const verbose = false;

// // struct MemoryMonitor
// // {
// //   MemoryMonitor()
// //   {
// //     OS.getProcessMemoryUsage(initial_vmem, initial_rmem);
// //   }

// //   ~MemoryMonitor()
// //   {
// //     if (hasMemoryLeaks())
// //     {
// //       NTA_DEBUG
// //         << "Memory leaks detected. "
// //         << "Real Memory: " << diff_rmem
// //         << ", Virtual Memory: " << diff_vmem;
// //     }
// //   }

// //   void update()
// //   {
// //     OS.getProcessMemoryUsage(current_vmem, current_rmem);
// //     diff_vmem = current_vmem - initial_vmem;
// //     diff_rmem = current_rmem - initial_rmem;
// //   }

// //   bool hasMemoryLeaks()
// //   {
// //     update();
// //     return diff_vmem > 0 || diff_rmem > 0;
// //   }

// //   size_t initial_vmem;
// //   size_t initial_rmem;
// //   size_t current_vmem;
// //   size_t current_rmem;
// //   size_t diff_rmem;
// //   size_t diff_vmem;
// // };

// function testPynodeInputOutputAccess(level2: Region): void {
// 	// --- input/output access for level 2 (Python py.TestNode) ---
// 	SHOULDFAIL(level2.getOutputData("doesnotexist"));

// 	// getting access via zero-copy
// 	console.log("Getting output for zero-copy access");
// 	const output = level2.getOutputData("bottomUpOut");
// 	console.log("Element count in bottomUpOut is ", output.getCount());
// 	const data_actual = output.getBuffer("Real64");
// 	// set the actual output
// 	data_actual[12] = 54321;
// }

// function testPynodeArrayParameters(level2: Region): void {
// 	// Array a is not allocated by us. Will be allocated inside getParameter
// 	// Array a(NTA_BasicType_Int64);
// 	const a = [] as number[];
// 	level2.getParameterArray("int64ArrayParam", a);
// 	console.log("level2.int64ArrayParam size = ", a.length);
// 	console.log("level2.int64ArrayParam = [ ");
// 	let buff = a.getBuffer("Int64");
// 	for (let i = 0; i < a.length; ++i) {
// 		console.log(buff[i]);
// 	}
// 	console.log("]");

// 	// --- test setParameterInt64Array ---
// 	console.log("Setting level2.int64ArrayParam to [ 1 2 3 4 ]");
// 	const v = []; // (4);//std.vector < Int64 >
// 	for (let i = 0; i < 4; ++i) {
// 		v[i] = i + 1;
// 	}
// 	// Array newa(NTA_BasicType_Int64, &v[0], v.size());
// 	const newa = [] as number[];
// 	level2.setParameterArray("int64ArrayParam", newa);

// 	// get the value of intArrayParam after the setParameter call.
// 	// a.releaseBuffer();
// 	// a.allocateBuffer(4);
// 	level2.getParameterArray("int64ArrayParam", a);
// 	console.log("level2.int64ArrayParam size = ", a.length);
// 	console.log("level2.int64ArrayParam = [ ");
// 	buff = a.getBuffer("Int64");
// 	for (let i = 0; i < a.length; ++i ) {
// 		console.log(buff[i]);
// 	}
// 	console.log("]");
// }

// function testPynodeLinking(): void {
// 	const net = new Network();

// 	const region1 = net.addRegion("region1", "TestNode", "");
// 	const region2 = net.addRegion("region2", "py.TestNode", "");
// 	console.log("Linking region 1 to region 2");
// 	net.link("region1", "region2", "TestFanIn2", "");

// 	console.log("Setting region1 dims to (6,4)");
// 	const r1dims = new Dimensions();
// 	r1dims.push(6);
// 	r1dims.push(4);
// 	region1.setDimensions(r1dims);

// 	console.log("Initializing network...");
// 	net.initialize();

// 	const r2dims = region2.getDimensions();
// 	NTA_CHECK(() => r2dims.length === 2, " actual dims: " + r2dims.toString());
// 	NTA_CHECK(() => r2dims[0] === 3, " actual dims: " + r2dims.toString());
// 	NTA_CHECK(() => r2dims[1] === 2, " actual dims: " + r2dims.toString());

// 	const r1OutputArray = region1.getOutputData("bottomUpOut");

// 	region1.compute();

// 	console.log("Checking region1 output after first iteration...");
// 	const buffer = r1OutputArray.getBuffer("Real64");

// 	for (let i = 0; i < r1OutputArray.getCount(); i++) {
// 		if (verbose) {
// 			console.log("  ", i, "    ", buffer[i]);
// 		}
// 		if (i % 2 === 0) {
// 			NTA_CHECK(() => buffer[i] === 0);
// 		} else {
// 			NTA_CHECK(() => buffer[i] === (i - 1) / 2);
// 		}
// 	}

// 	region2.prepareInputs();
// 	const r2InputArray = region2.getInputData("bottomUpIn");
// 	console.log("Region 2 input after first iteration:");
// 	const buffer2 = r2InputArray.getBuffer("Real64");
// 	NTA_CHECK(() => buffer !== buffer2);

// 	for (let i = 0; i < r2InputArray.getCount(); i++) {
// 		if (verbose) {
// 			console.log("  ", i, "    ", buffer2[i]);
// 		}
// 		if (i % 2 === 0) {
// 			NTA_CHECK(() => buffer[i] === 0);
// 		} else {
// 			NTA_CHECK(() => buffer[i] === (i - 1) / 2);
// 		}
// 	}

// 	console.log("Region 2 input by node");
// 	// std.vector < Real64 > r2NodeInput;
// 	const r2NodeInput = [];

// 	for (let node = 0; node < 6; node++) {
// 		region2.getInput("bottomUpIn").getInputForNode(node, r2NodeInput);
// 		if (verbose) {
// 			console.log("Node ", node, ": ");
// 			for (let i = 0; i < r2NodeInput.length; i++) {
// 				console.log(r2NodeInput[i], " ");
// 			}
// 			// console.log("" << std.endl;
// 		}
// 		// 4 nodes in r1 fan in to 1 node in r2
// 		const row = node / 3;
// 		const col = node - (row * 3);
// 		NTA_CHECK(() => r2NodeInput.length === 8);
// 		NTA_CHECK(() => r2NodeInput[0] === 0);
// 		NTA_CHECK(() => r2NodeInput[2] === 0);
// 		NTA_CHECK(() => r2NodeInput[4] === 0);
// 		NTA_CHECK(() => r2NodeInput[6] === 0);
// 		// these values are specific to the fanin2 link policy
// 		NTA_CHECK(() => r2NodeInput[1] === row * 12 + col * 2, "row: " + row + " col: " + col + " val: " + r2NodeInput[1]);
// 		NTA_CHECK(() => r2NodeInput[3] === row * 12 + col * 2 + 1, "row: " + row + " col: " + col + " val: " + r2NodeInput[3]);
// 		NTA_CHECK(() => r2NodeInput[5] === row * 12 + 6 + col * 2, "row: " + row + " col: " + col + " val: " + r2NodeInput[5]);
// 		NTA_CHECK(() => r2NodeInput[7] === row * 12 + 6 + col * 2 + 1, "row: " + row + " col: " + col + " val: " + r2NodeInput[7]);
// 	}

// 	region2.compute();
// }

// function testSecondTimeLeak(): void {
// 	const n = new Network();
// 	n.addRegion("r1", "py.TestNode", "");
// 	n.addRegion("r2", "py.TestNode", "");
// }

// function testRegionDuplicateRegister(): void {
// 	// Register a region
// 	Network.registerPyRegion("nupic.regions.TestDuplicateNodes",
// 		"TestDuplicateNodes");
// 	// Validate that the same region can be registered multiple times
// 	try {
// 		Network.registerPyRegion("nupic.regions.TestDuplicateNodes",
// 			"TestDuplicateNodes");
// 	} catch (e) {
// 		NTA_THROW("testRegionDuplicateRegister failed with exception: " + e.toString());
// 	}
// 	// Validate that a region from a different module but with the same name
// 	// cannot be registered
// 	try {
// 		Network.registerPyRegion("nupic.regions.DifferentModule",
// 			"TestDuplicateNodes");
// 		NTA_THROW("testRegionDuplicateRegister failed to throw exception for " +
// 			"region with same name but different module as existing " +
// 			"registered region");
// 	} catch (e) {
// 		// nop
// 	}
// }

// function testCreationParamTypes(): void {
// 	// Verify that parameters of all types can be passed in through the creation
// 	// params.

// 	const n = new Network();
// 	const region = n.addRegion("test", "py.TestNode",
// 		"{" +
// 		"int32Param: -2000000000, uint32Param: 3000000000, " +
// 		"int64Param: -5000000000, uint64Param: 5000000001, " +
// 		"real32Param: 10.5, real64Param: 11.5, " +
// 		"boolParam: true" +
// 		"}");

// 	NTA_CHECK(() => region.getParameterInt32("int32Param") === -2000000000);
// 	NTA_CHECK(() => region.getParameterUInt32("uint32Param") === 3000000000);
// 	NTA_CHECK(() => region.getParameterInt64("int64Param") === -5000000000);
// 	NTA_CHECK(() => region.getParameterUInt64("uint64Param") === 5000000001);
// 	NTA_CHECK(() => region.getParameterReal32("real32Param") === 10.5);
// 	NTA_CHECK(() => region.getParameterReal64("real64Param") === 11.5);
// 	NTA_CHECK(() => region.getParameterBool("boolParam") === true);
// }

// function testUnregisterRegion(): void {
// 	const n = new Network();
// 	n.addRegion("test", "py.TestNode", "");

// 	Network.unregisterPyRegion("TestNode");

// 	let caughtException = false;
// 	try {
// 		n.addRegion("test", "py.TestNode", "");
// 	} catch (e) {
// 		NTA_DEBUG("Caught exception as expected: '" + e.toString() + "'");
// 		caughtException = true;
// 	}
// 	if (caughtException) {
// 		NTA_DEBUG("testUnregisterRegion passed");
// 	} else {
// 		NTA_THROW("testUnregisterRegion did not throw an exception as expected");
// 	}

// }

// function testWriteRead(): void {
// 	const int32Param = 42;
// 	const uint32Param = 43;
// 	const int64Param = 44;
// 	const uint64Param = 45;
// 	const real32Param = 46;
// 	const real64Param = 46;
// 	const boolParam = true;
// 	const stringParam = "hello";

// 	// std.vector < Int64 > int64ArrayParamBuff(4);
// 	const int64ArrayParamBuff = [] as number[];
// 	for (let i = 0; i < 4; i++) {
// 		int64ArrayParamBuff[i] = i + 1;
// 	}
// 	const int64ArrayParam = [] as number[];
// 	// Array; int64ArrayParam(NTA_BasicType_Int64,
// 	//                     & int64ArrayParamBuff[0],
// 	// 	int64ArrayParamBuff.size());

// 	// std.vector < Real32 > real32ArrayParamBuff(4);
// 	const real32ArrayParamBuff = [] as number[];
// 	for (let i = 0; i < 4; i++) {
// 		real32ArrayParamBuff[i] = i + 1;
// 	}
// 	const real32ArrayParam = [] as number[];
// 	// Array; real32ArrayParam(NTA_BasicType_Real32,
// 	//                      & real32ArrayParamBuff[0],
// 	// 	real32ArrayParamBuff.size());

// 	const boolArrayParamBuff = [] as boolean[];
// 	// bool; boolArrayParamBuff[4];
// 	for (let i = 0; i < 4; i++ )	{
// 		boolArrayParamBuff[i] = (i % 2) === 1;
// 	}

// 	const boolArrayParam = [] as boolean[];
// 	// Array; boolArrayParam(NTA_BasicType_Bool,
// 	// 	boolArrayParamBuff,
// 	// 	4);

// 	const n1 = new Network();
// 	const region1 = n1.addRegion("rw1", "py.TestNode", "");
// 	region1.setParameterInt32("int32Param", int32Param);
// 	region1.setParameterUInt32("uint32Param", uint32Param);
// 	region1.setParameterInt64("int64Param", int64Param);
// 	region1.setParameterUInt64("uint64Param", uint64Param);
// 	region1.setParameterReal32("real32Param", real32Param);
// 	region1.setParameterReal64("real64Param", real64Param);
// 	region1.setParameterBool("boolParam", boolParam);
// 	region1.setParameterString("stringParam", stringParam.c_str());
// 	region1.setParameterArray("int64ArrayParam", int64ArrayParam);
// 	region1.setParameterArray("real32ArrayParam", real32ArrayParam);
// 	region1.setParameterArray("boolArrayParam", boolArrayParam);

// 	const n2 = new Network();

// 	std.stringstream; ss;
// 	n1.write(ss);
// 	n2.read(ss);

// 	const regions = n2.getRegions();
// 	const regionPair = regions.getByIndex(0);
// 	const region2 = regionPair.second;

// 	NTA_CHECK(() => region2.getParameterInt32("int32Param") === int32Param);
// 	NTA_CHECK(() => region2.getParameterUInt32("uint32Param") === uint32Param);
// 	NTA_CHECK(() => region2.getParameterInt64("int64Param") === int64Param);
// 	NTA_CHECK(() => region2.getParameterUInt64("uint64Param") === uint64Param);
// 	NTA_CHECK(() => region2.getParameterReal32("real32Param") === real32Param);
// 	NTA_CHECK(() => region2.getParameterReal64("real64Param") === real64Param);
// 	NTA_CHECK(() => region2.getParameterBool("boolParam") === boolParam);
// 	NTA_CHECK(() => region2.getParameterString("stringParam") === stringParam);

// 	const int64Array = [] as number[];
// 	// Array; int64Array(NTA_BasicType_Int64);
// 	region2.getParameterArray("int64ArrayParam", int64Array);
// 	const int64ArrayBuff =  int64Array.getBuffer("Int64");
// 	NTA_CHECK(() => int64ArrayParam.length === int64Array.length);
// 	for (let i = 0; i < int64ArrayParam.length; i++ )
// 	{
// 		NTA_CHECK(() => int64ArrayBuff[i] === int64ArrayParamBuff[i]);
// 	}

// 	const real32Array = [] as number[];
// 	// Array; real32Array(NTA_BasicType_Real32);
// 	region2.getParameterArray("real32ArrayParam", real32Array);
// 	const real32ArrayBuff = real32Array.getBuffer("Real32");
// 	NTA_CHECK(() => real32ArrayParam.length === real32Array.length);
// 	for (let i = 0; i < real32ArrayParam.length; i++ )
// 	{
// 		NTA_CHECK(() => real32ArrayBuff[i] === real32ArrayParamBuff[i]);
// 	}

// 	const boolArray = [] as boolean[];
// 	// Array; boolArray(NTA_BasicType_Bool);
// 	region2.getParameterArray("boolArrayParam", boolArray);
// 	const boolArrayBuff = boolArray.getBuffer("boolean");
// 	NTA_CHECK(() => boolArrayParam.length === boolArray.length);
// 	for (let i = 0; i < boolArrayParam.length; i++ )
// 	{
// 		NTA_CHECK(() => boolArrayBuff[i] === boolArrayParamBuff[i]);
// 	}
// }

// function realmain(leakTest: boolean): number {
// 	// verbose == true turns on extra output that is useful for
// 	// debugging the test (e.g. when the TestNode compute()
// 	// algorithm changes)

// 	console.log("Creating network...");
// 	const n = new Network();

// 	console.log("Region count is ", n.getRegions().length);

// 	console.log("Adding a PyNode region...");
// 	Network.registerPyRegion("nupic.bindings.regions.TestNode", "TestNode");
// 	const level2 = n.addRegion("level2", "py.TestNode", "{int32Param: 444}");

// 	console.log("Region count is ", n.getRegions().length);
// 	console.log("Node type: ", level2.getType());
// 	console.log("Nodespec is:\n", level2.getSpec().toString());

// 	// Real64; rval;
// 	const int64Param = ("int64Param");
// 	const real64Param = ("real64Param");

// 	// get the value of intArrayParam after the setParameter call.

// 	// --- Test getParameterReal64 of a PyNode
// 	let rval = level2.getParameterReal64("real64Param");
// 	NTA_CHECK(() => rval === 64.1);
// 	console.log("level2 getParameterReal64() returned: ", rval);

// 	// --- Test setParameterReal64 of a PyNode
// 	level2.setParameterReal64("real64Param", 77.7);
// 	rval = level2.getParameterReal64("real64Param");
// 	NTA_CHECK(() => rval === 77.7);

// 	// should fail because network has not been initialized
// 	SHOULDFAIL(() => n.run(1));

// 	// should fail because network can't be initialized
// 	SHOULDFAIL(() => n.initialize());

// 	console.log("Setting dimensions of level1...");
// 	const d = new Dimensions();
// 	d.push(4);
// 	d.push(4);

// 	console.log("Setting dimensions of level2...");
// 	level2.setDimensions(d);

// 	console.log("Initializing again...");
// 	n.initialize();

// 	testPynodeInputOutputAccess(level2);
// 	testPynodeArrayParameters(level2);
// 	testPynodeLinking();
// 	testRegionDuplicateRegister();
// 	testCreationParamTypes();

// 	if (!leakTest) {
// 		// testNuPIC1x();
// 		// testPynode1xLinking();
// 	}
// 	// #if !CAPNP_LITE
// 	// PyRegion.write is implemented only when nupic.core is compiled with
// 	// CAPNP_LITE=0
// 	testWriteRead();
// 	// #endif;

// 	// testUnregisterRegion needs to be the last test run as it will unregister
// 	// the region 'TestNode'.
// 	testUnregisterRegion();

// 	console.log("Done -- all tests passed");

// 	return 0;
// }

// // int; main(int argc, char * argv[]);
// // {
// // This isn't running inside one of the SWIG modules, so we need to
// // initialize the numpy C API.
// // Py_Initialize();
// // NTA_CHECK(Py_IsInitialized());
// // nupic.initializeNumpy();

// /*
//  * Without arguments, this program is a simple end-to-end demo
//  * of NuPIC 2 functionality, used as a developer tool (when
//  * we add a feature, we add it to this program.
//  * With an integer argument N, runs the same test N times
//  * and requires that memory use stay constant -- it can't
//  * grow by even one byte.
//  */

// // TODO: real argument parsing
// // Optional arg is number of iterations to do.
// const argc = process.argv.length;
// NTA_CHECK(() => argc === 1 || argc === 2);
// const count = 1;
// if (argc === 2) {
// 	std.stringstream; ss(argv[1]);
// 	ss >> count;
// }
// // Start checking memory usage after this many iterations.
// // #if defined(NTA_OS_WINDOWS)
// // takes longer to settle down on win32
// const memoryLeakStartIter = 6000;
// // #else
// // size_t; memoryLeakStartIter = 150;
// // #endif;

// // This determines how frequently we check.
// const memoryLeakDeltaIterCheck = 10;

// const minCount = memoryLeakStartIter + 5 * memoryLeakDeltaIterCheck;

// if (count > 1 && count < minCount) {
// 	console.log("Run count of ", count, " specified");
// 	console.log("When run in leak detection mode, count must be at least ", minCount);
// 	process.exit(1);
// }

// let initial_vmem = 0;
// let initial_rmem = 0;
// const current_vmem = 0;
// const current_rmem = 0;
// try {
// 	for (let i = 0; i < count; i++ )	{
// 		// MemoryMonitor m;
// 		NuPIC.init();
// 		realmain(count > 1);
// 		// testExceptionBug();
// 		// testPynode1xLinking();
// 		// testNuPIC1x();
// 		// testSecondTimeLeak();
// 		// testPynodeLinking();
// 		// testCppLinking("TestFanIn2","");
// 		NuPIC.shutdown();
// 		// memory leak detection
// 		// we check even prior to the initial tracking iteration, because the act
// 		// of checking potentially modifies our memory usage
// 		if (i % memoryLeakDeltaIterCheck === 0) {
// 			OS:                                                          : getProcessMemoryUsage(current_rmem, current_vmem);
// 			if (i === memoryLeakStartIter) {
// 				initial_rmem = current_rmem;
// 				initial_vmem = current_vmem;
// 			}
// 			console.log("Memory usage: ", current_vmem, " (virtual) ",
// 				current_rmem, " (real) at iteration ", i);

// 			if (i >= memoryLeakStartIter) {
// 				if (current_vmem > initial_vmem || current_rmem > initial_rmem) {
// 					console.log("Tracked memory usage (iteration ",
// 						memoryLeakStartIter, "): ", initial_vmem,
// 						" (virtual) ", initial_rmem, " (real)");
// 					throw new Error("Memory leak detected");
// 				}
// 			}
// 		}
// 	}

// } catch (e) {
// 	console.log(
// 		"Exception: " + e.toString());
// 	// << " at: " << e.getFilename() << ":" << e.getLineNumber()
// 	// << std; : : endl;
// 	process.exit(1);
// 	}
// 	// } catch (std: : exception & e; ) {
// 	// 	console.log("Exception: " << e.what() << "" << std: : endl;
// 	// 	return 1;
// 	// }
// 	//  catch (...) {
// 	// 	console.log("\nhtmtest is exiting because an exception was thrown" << std: : endl;
// 	// 	return 1;
// 	// }
// if (count > 20) {
// 		console.log("Memory leak check passed -- ", count, " iterations");
// 	}

// console.log("--- ALL TESTS PASSED ---");
// // return 0;
// // }
