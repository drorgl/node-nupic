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

// import { NTA_CHECK } from "../typings/index";
// import { Dimensions, Network, NuPIC } from "../typings/index";

// // #define NTA_INTERNAL
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
// // 	MemoryMonitor()
// // 	{
// // 		OS::getProcessMemoryUsage(initial_vmem, initial_rmem);
// // 	}

// // 	~MemoryMonitor()
// // 	{
// // 		if (hasMemoryLeaks()) {
// // 			NTA_DEBUG
// // 				<< "Memory leaks detected. "
// // 				<< "Real Memory: " << diff_rmem
// // 				<< ", Virtual Memory: " << diff_vmem;
// // 		}
// // 	}

// // 	void update()
// // 	{
// // 		OS::getProcessMemoryUsage(current_vmem, current_rmem);
// // 		diff_vmem = current_vmem - initial_vmem;
// // 		diff_rmem = current_rmem - initial_rmem;
// // 	}

// // 	bool hasMemoryLeaks()
// // 	{
// // 		update();
// // 		return diff_vmem > 0 || diff_rmem > 0;
// // 	}

// // 	size_t initial_vmem;
// // 	size_t initial_rmem;
// // 	size_t current_vmem;
// // 	size_t current_rmem;
// // 	size_t diff_rmem;
// // 	size_t diff_vmem;
// // };

// import { Region } from "../typings/index";

// function testCppInputOutputAccess(level1: Region): void {
// 	// --- input/output access for level 1 (C++ TestNode) ---

// 	SHOULDFAIL(level1.getOutputData("doesnotexist"));

// 	// getting access via zero-copy
// 	console.log("Getting output for zero-copy access");
// 	const output = level1.getOutputData("bottomUpOut");
// 	console.log("Element count in bottomUpOut is ", output.getCount());
// 	const data_actual = output.getBuffer("Real64");
// 	// set the actual output
// 	data_actual[12] = 54321;
// }

// function testCppLinking(linkPolicy: string, linkParams: string): void {
// 	const net = new Network();

// 	const region1 = net.addRegion("region1", "TestNode", "");
// 	const region2 = net.addRegion("region2", "TestNode", "");
// 	net.link("region1", "region2", linkPolicy, linkParams);

// 	console.log("Initialize should fail...");
// 	SHOULDFAIL(() => net.initialize());

// 	console.log("Setting region1 dims");
// 	const r1dims = new Dimensions();
// 	r1dims.push(6);
// 	r1dims.push(4);
// 	region1.setDimensions(r1dims);

// 	console.log("Initialize should now succeed");
// 	net.initialize();

// 	const r2dims = region2.getDimensions();
// 	NTA_CHECK(() => r2dims.size() === 2, " actual dims: " + r2dims.toString());
// 	NTA_CHECK(() => r2dims[0] === 3, " actual dims: " + r2dims.toString());
// 	NTA_CHECK(() => r2dims[1] === 2, " actual dims: " + r2dims.toString());

// 	SHOULDFAIL(() => region2.setDimensions(r1dims));

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
// 			console.log("  ", i , "    ", buffer2[i]);
// 		}

// 		if (i % 2 === 0) {
// 			NTA_CHECK(() => buffer[i] === 0);
// 		} else {
// 			NTA_CHECK(() => buffer[i] === (i - 1) / 2);
// 		}
// 	}

// 	console.log("Region 2 input by node");
// 	const r2NodeInput = [];

// 	for (let node = 0; node < 6; node++) {
// 		region2.getInput("bottomUpIn").getInputForNode(node, r2NodeInput);
// 		if (verbose) {
// 			console.log("Node ", node, ": ");
// 			for (const elem of r2NodeInput) {
// 				console.log(elem, " ");
// 			}
// 			// console.log("" << std::endl;
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
// }

// function testYAML(): void {
// 	const params = "{int32Param: 1234, real64Param: 23.1}";
// 	//  badparams contains a non-existent parameter
// 	const badparams = "{int32Param: 1234, real64Param: 23.1, badParam: 4}";

// 	const net = new Network();
// 	let level1: Region = null;
// 	SHOULDFAIL(() => level1 = net.addRegion("level1", "TestNode", badparams));

// 	level1 = net.addRegion("level1", "TestNode", params);
// 	const d = new Dimensions();
// 	d.push(1);
// 	level1.setDimensions(d);
// 	net.initialize();

// 	// check default values
// 	const r32val = level1.getParameterReal32("real32Param");
// 	NTA_CHECK(() => Math.abs(r32val - 32.1) < 0.00001, "r32val = " + r32val + " diff = " + (r32val - 32.1));

// 	const i64val = level1.getParameterInt64("int64Param");
// 	NTA_CHECK(() => i64val === 64, "i64val = " + i64val);

// 	// check values set in region constructor
// 	const ival = level1.getParameterInt32("int32Param");
// 	NTA_CHECK(() => ival === 1234, "ival = " + ival);
// 	const rval = level1.getParameterReal64("real64Param");
// 	NTA_CHECK(() => Math.abs(rval - 23.1) < 0.00000000001, "rval = " + rval);
// 	// TODO: if we get the real64 param with getParameterInt32
// 	// it works -- should we flag an error?

// 	console.log("Got the correct values for all parameters set at region creation");

// }

// function realmain(leakTest: boolean): number {
// 	// verbose == true turns on extra output that is useful for
// 	// debugging the test (e.g. when the TestNode compute()
// 	// algorithm changes)

// 	console.log("Creating network...");
// 	const n = new Network();

// 	console.log("Region count is ", n.getRegions().length);

// 	console.log("Adding a FDRNode region...");
// 	const level1 = n.addRegion("level1", "TestNode", "");

// 	console.log("Region count is ", n.getRegions().length);
// 	console.log("Node type: ", level1.getType());
// 	console.log("Nodespec is:\n", level1.getSpec().toString());

// 	// Int64 val;
// 	// Real64 rval;
// 	const int64Param = "int64Param";
// 	const real64Param = "real64Param";

// 	let val = level1.getParameterInt64(int64Param);
// 	let rval = level1.getParameterReal64(real64Param);
// 	console.log("level1.int64Param = ", val);
// 	console.log("level1.real64Param = ", rval);

// 	val = 20;
// 	level1.setParameterInt64(int64Param, val);
// 	val = 0;
// 	val = level1.getParameterInt64(int64Param);
// 	console.log("level1.int64Param = ", val, " after setting to 20");

// 	rval = 30.1;
// 	level1.setParameterReal64(real64Param, rval);
// 	rval = 0.0;
// 	rval = level1.getParameterReal64(real64Param);
// 	console.log("level1.real64Param = ", rval, " after setting to 30.1");

// 	// --- test getParameterInt64Array ---
// 	// Array a is not allocated by us. Will be allocated inside getParameter
// 	// Array; a(NTA_BasicType_Int64);
// 	const a = Array<NTA_BasicType_Int64>();
// 	level1.getParameterArray("int64ArrayParam", a);
// 	console.log("level1.int64ArrayParam size = ", a.length);
// 	console.log("level1.int64ArrayParam = [ ");
// 	let buff = a.getBuffer("Int64");
// 	for (let i = 0; i < a.getCount(); ++i) {
// 		console.log(buff[i]); // << " ";
// 	}
// 	console.log("]"); // << std::endl;

// 	// --- test setParameterInt64Array ---
// 	console.log("Setting level1.int64ArrayParam to [ 1 2 3 4 ]");
// 	// std::vector < Int64 > v(4);
// 	const v = [];
// 	for (let i = 0; i < 4; ++i) {
// 		v[i] = i + 1;
// 	}
// 	Array; newa(NTA_BasicType_Int64,         & v[0], v.size());
// 	level1.setParameterArray("int64ArrayParam", newa);

// 	// get the value of intArrayParam after the setParameter call.

// 	// The array a owns its buffer, so we can call releaseBuffer if we
// 	// want, but the buffer should be reused if we just pass it again.
// 	// a.releaseBuffer();
// 	level1.getParameterArray("int64ArrayParam", a);
// 	console.log("level1.int64ArrayParam size = ", a.length);
// 	console.log("level1.int64ArrayParam = [ ");
// 	buff = a.getBuffer("Int64");
// 	for (let i = 0; i < a.getCount(); ++i) {
// 		console.log(buff[i]); // , " ");
// 	}
// 	console.log("]"); // << std::endl;

// 	// should fail because network has not been initialized
// 	SHOULDFAIL(() => n.run(1));

// 	// should fail because network can't be initialized
// 	SHOULDFAIL(() => n.initialize());

// 	console.log("Setting dimensions of level1...");
// 	const d = new Dimensions();
// 	d.push(4);
// 	d.push(4);
// 	level1.setDimensions(d);

// 	console.log("Initializing again...");
// 	n.initialize();

// 	level1.compute();

// 	testCppInputOutputAccess(level1);
// 	testCppLinking("TestFanIn2", "");
// 	testCppLinking("UniformLink", "{mapping: in, rfSize: [2]}");
// 	testYAML();

// 	console.log("Done -- all tests passed");

// 	return 0;
// }

// // int main(int argc, char *argv[])
// // {

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
// let count = 1;
// if (argc === 2) {
// 	// std::stringstream ss(argv[1]);
// 	// ss >> count;
// 	count = parseInt(process.argv[1]);
// }
// // Start checking memory usage after this many iterations.
// // #if defined(NTA_OS_WINDOWS)
// // takes longer to settle down on win32
// const memoryLeakStartIter = 6000;
// // #else
// // size_t memoryLeakStartIter = 150;
// // #endif

// // This determines how frequently we check.
// const memoryLeakDeltaIterCheck = 10;

// const minCount = memoryLeakStartIter + 5 * memoryLeakDeltaIterCheck;

// if (count > 1 && count < minCount) {
// 	console.log("Run count of ", count, " specified");
// 	console.log("When run in leak detection mode, count must be at least ", minCount);
// 	// ::exit(1);
// 	process.exit(0);
// }

// let initial_vmem = 0;
// let initial_rmem = 0;
// const current_vmem = 0;
// const current_rmem = 0;
// try {
// 	for (let i = 0; i < count; i++) {
// 		// MemoryMonitor m;
// 		NuPIC.init();
// 		realmain(count > 1);
// 		// testExceptionBug();
// 		// testCppLinking("TestFanIn2","");
// 		NuPIC.shutdown();
// 		// memory leak detection
// 		// we check even prior to the initial tracking iteration, because the act
// 		// of checking potentially modifies our memory usage
// 		if (i % memoryLeakDeltaIterCheck === 0) {
// 			OS:           : getProcessMemoryUsage(current_rmem, current_vmem);
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
// 		"Exception: ", e // ," at: " , e.getFilename() , ":" << e.getLineNumber()
// 	);
// 	return 1;
// }

// // }catch (std::exception & e;) {
// // 	console.log("Exception: " << e.what() << "" << std;: : endl;
// // 	return 1;
// // }
// //  catch (...) {
// // 	std: : cout << "\nHtmTest is exiting because an exception was thrown" << std; : : endl;
// // 	return 1;
// // }
// if (count > 20) {
// 	console.log("Memory leak check passed -- ", count, " iterations");
// }

// console.log("--- ALL TESTS PASSED ---");
// //   return 0;
// // }
