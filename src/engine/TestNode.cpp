#include "TestNode.hpp"

//// /* ---------------------------------------------------------------------
////  * Numenta Platform for Intelligent Computing (NuPIC)
////  * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
////  * with Numenta, Inc., for a separate license for this software code, the
////  * following terms and conditions apply:
////  *
////  * This program is free software: you can redistribute it and/or modify
////  * it under the terms of the GNU Affero Public License version 3 as
////  * published by the Free Software Foundation.
////  *
////  * This program is distributed in the hope that it will be useful,
////  * but WITHOUT ANY WARRANTY; without even the implied warranty of
////  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
////  * See the GNU Affero Public License for more details.
////  *
////  * You should have received a copy of the GNU Affero Public License
////  * along with this program.  If not, see http://www.gnu.org/licenses.
////  *
////  * http://numenta.org/licenses/
////  * ---------------------------------------------------------------------
////  */
//import nupic_module from "../bindings";
//import {BundleIO} from "../ntypes/BundleIO";
//import {  bool, Int64, Real64, size_t } from "../types/Types";
//import {Region} from "./Region";
//import {RegionImpl} from "./RegionImpl";
//import {Spec} from "./Spec";
//// #ifndef NTA_TESTNODE_HPP
//// #define NTA_TESTNODE_HPP
//
//// #include <string>
//// #include <vector>
//
//// // Workaround windows.h collision:
//// // https://github.com/sandstorm-io/capnproto/issues/213
//// #undef VOID
//// #include <capnp/any.h>
//
//// #include <nupic/engine/RegionImpl.hpp>
//// #include <nupic/ntypes/Value.hpp>
//
//// namespace nupic
//// {
//
////   /*
////    * TestNode is does simple computations of inputs->outputs
////    * inputs and outputs are Real64 arrays
////    *
////    * delta is a parameter used for the computation. defaults to 1
////    *
////    * Size of each node output is given by the outputSize parameter (cg)
////    * which defaults to 2 and cannot be less than 1. (parameter not yet implemented)
////    *
////    * Here is the totally lame "computation"
////    * output[0] = number of inputs to this baby node + current iteration number (0 for first compute)
////    * output[1] = baby node num + sum of inputs to this baby node
////    * output[2] = baby node num + sum of inputs + (delta)
////    * output[3] = baby node num + sum of inputs + (2*delta)
////    * ...
////    * output[n] = baby node num + sum of inputs + ((n-1) * delta)
//
////    * It can act as a sensor if no inputs are connected (sum of inputs = 0)
////    */
//
////   class BundleIO;
//type computeCallbackFunc = (s: string) => void;
//
//interface TestNode_Static {
//	// new(params: ValueMap, region: Region): TestNode;
//	new(bundle: BundleIO, region: Region): TestNode;
//	// new(capnp::AnyPointer::Reader& proto,  region:Region):TestNode;
//	// virtual ~TestNode();
//
//	// Used by RegionImplFactory to create and cache
//	// a nodespec. Ownership is transferred to the caller.
//	createSpec(): Spec;
//}
//
//interface TestNode extends RegionImpl {
//	/* -----------  Required RegionImpl Interface methods ------- */
//
//	getNodeType(): string;
//	compute(): void;
//	executeCommand(args: string[], index: Int64): string;
//
//	getNodeOutputElementCount(outputName: string): size_t;
//	getParameterFromBuffer(name: string, index: Int64,  value: Buffer): void;
//	setParameterFromBuffer(name: string, index: Int64,  value: Buffer): void;
//
//	initialize(): void;
//
//	serialize(bundle: BundleIO): void;
//	deserialize(bundle: BundleIO): void;
//
//	// using RegionImpl::write;
//	// virtual void write(capnp::AnyPointer::Builder& anyProto) const override;
//
//	// using RegionImpl::read;
//	// virtual void read(capnp::AnyPointer::Reader& anyProto) override;
//
//	/* -----------  Optional RegionImpl Interface methods ------- */
//
//	getParameterArrayCount(name: string, index: Int64): size_t;
//
//	// Override for Real64 only
//	// We choose Real64 in the test node to preserve precision. All other type
//	// go through read/write buffer serialization, and floating point values may get
//	// truncated in the conversion to/from ascii.
//	getParameterReal64(name: string, index: Int64): Real64;
//	setParameterReal64(name: string, index: Int64, value: Real64): void;
//
//	isParameterShared(name: string): bool;
//
//	//   private:
//	//     TestNode();
//
//	//     // parameters
//	//     // cgs parameters for parameter testing
//	//     Int32 int32Param_;
//	//     UInt32 uint32Param_;
//	//     Int64 int64Param_;
//	//     UInt64 uint64Param_;
//	//     Real32 real32Param_;
//	//     Real64 real64Param_;
//	//     bool boolParam_;
//	//     string stringParam_;
//	//     computeCallbackFunc computeCallback_;
//
//	//     Array<Real32> real32ArrayParam_;
//	//     Array<Int64> int64ArrayParam_;
//	//     Array<bool> boolArrayParam_;
//
//	//     // read-only count of iterations since initialization
//	//     UInt64 iter_;
//
//	//     // Constructor param specifying per-node output size
//	//     UInt32 outputElementCount_;
//
//	//     // parameter used for computation
//	//     Int64 delta_;
//
//	//     // cloning parameters
//	//     Array<UInt32> unclonedParam_;
//	//     bool shouldCloneParam_;
//	//     Array<UInt32> possiblyUnclonedParam_;
//	//     Array< Array<Int64> > unclonedInt64ArrayParam_;
//
//	//     /* ----- cached info from region ----- */
//	//     size_t nodeCount_;
//
//	//     // Input/output buffers for the whole region
//	//     const Input *bottomUpIn_;
//	//     const Output *bottomUpOut_;
//}
//// }
//
//// #endif // NTA_TESTNODE_HPP
