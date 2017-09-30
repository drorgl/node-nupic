/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013-2014, Numenta, Inc.  Unless you have an agreement
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

// #include <iostream>
// #include <sstream>

// #include <nupic/engine/Network.hpp>
// #include <nupic/engine/Region.hpp>
// #include <nupic/ntypes/Dimensions.hpp>
// #include <nupic/ntypes/ArrayRef.hpp>
// #include <nupic/os/Path.hpp>
// #include <nupic/utils/Log.hpp>

import { Network } from "../../../typings/index";

// using namespace nupic;

// int main(int argc, const char * argv[])
// {
// Create network
let net = Network();

// Add VectorFileSensor region to network
let region = net.addRegion("region", "VectorFileSensor", "{activeOutputCount: 1}");

// Set region dimensions
let dims = new Dimensions();
dims.push_back(1);

console.log("Setting region dimensions", dims.toString());

region.setDimensions(dims);

// Load data
let path = Path::makeAbsolute ("../../../src/examples/regions/Data.csv");

console.log("Loading data from ", path);

std::vector < std::string > loadFileArgs;
loadFileArgs.push_back("loadFile");
loadFileArgs.push_back(path);
loadFileArgs.push_back("2");

region.executeCommand(loadFileArgs);

// Initialize network
console.log("Initializing network");

net.initialize();

const outputArray = region.getOutputData("dataOut");

// Compute
console.log("Compute");

region.compute();

// Get output
const buffer = outputArray.getBuffer("Real64");

for (let i = 0; i < outputArray.getCount(); i++) {
	console.log("  ", i, "    ", buffer[i]);
}

// Serialize
const net2 = new Network(
	{
		std: : stringstream ss;
		net.write(ss);
		net2.read(ss);
	});
net2.initialize();

const region2 = net2.getRegions().getByName("region");
region2.executeCommand(loadFileArgs);
const outputArray2 = region2.getOutputData("dataOut");
const buffer2 = outputArray2.getBuffer("Real64");

net.run(1);
net2.run(1);

NTA_ASSERT(outputArray2.getCount() === outputArray.getCount());
for (let i = 0; i < outputArray.getCount(); i++) {
	console.log("  ", i, "    ", buffer[i], "   ", buffer2[i]);
}

//     return 0;
// }
