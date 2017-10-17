#include "RegionImpl.hpp"

//// /* ---------------------------------------------------------------------
////  * Numenta Platform for Intelligent Computing (NuPIC)
////  * Copyright (C) 2013-2015, Numenta, Inc.  Unless you have an agreement
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
//import { BundleIO } from "../ntypes/BundleIO";
//import { NodeSet } from "../ntypes/NodeSet";
//import { bool, Handle, Int32, Int64, Real32, Real64, size_t, UInt32, UInt64 } from "../types/Types";
//import { Region } from "./Region";
//// /** @file
////  * Definition of the RegionImpl API
////  *
////  * A RegionImpl is a node "plugin" that provides most of the
////  * implementation of a Region, including algorithms.
////  *
////  * The RegionImpl class is expected to be subclassed for particular
////  * node types (e.g. FDRNode, PyNode, etc) and RegionImpls are created
////  * by the RegionImplFactory
////  */
//
//// #ifndef NTA_REGION_IMPL_HPP
//// #define NTA_REGION_IMPL_HPP
//
//// #include <iostream>
//// #include <string>
//// #include <vector>
//
//// #include <capnp/any.h>
//
//// #include <nupic/ntypes/ObjectModel.hpp> // IWriteBuffer
//// #include <nupic/types/Serializable.hpp>
//
//// namespace nupic
//// {
//
////   struct Spec;
////   class Region;
////   class Dimensions;
////   class Input;
////   class Output;
////   class Array;
////   class ArrayRef;
////   class NodeSet;
////   class BundleIO;
//export interface RegionImpl_Static {
//	// All subclasses must call this constructor from their regular constructor
//	new(region: Region): RegionImpl;
//
//	// virtual ~RegionImpl();
//}
//
//export interface RegionImpl {// : public Serializable<capnp::AnyPointer>
//
//	/* ------- Convenience methods  that access region data -------- */
//
//	getType(): string;
//
//	getName(): string;
//
//	getEnabledNodes(): NodeSet;
//
//	/* ------- Parameter support in the base class. ---------*/
//	// The default implementation of all of these methods goes through
//	// set/getParameterFromBuffer, which is compatible with NuPIC 1.
//	// RegionImpl subclasses may override for higher performance.
//
//	getParameterInt32(name: string, index: Int64): Int32;
//	getParameterUInt32(name: string, index: Int64): UInt32;
//	getParameterInt64(name: string, index: Int64): Int64;
//	getParameterUInt64(name: string, index: Int64): UInt64;
//	getParameterReal32(name: string, index: Int64): Real32;
//	getParameterReal64(name: string, index: Int64): Real64;
//	getParameterHandle(name: string, index: Int64): Handle;
//	getParameterBool(name: string, index: Int64): bool;
//
//	setParameterInt32(name: string, index: Int64, value: Int32): void;
//	setParameterUInt32(name: string, index: Int64, value: UInt32): void;
//	setParameterInt64(name: string, index: Int64, value: Int64): void;
//	setParameterUInt64(name: string, index: Int64, value: UInt64): void;
//	setParameterReal32(name: string, index: Int64, value: Real32): void;
//	setParameterReal64(name: string, index: Int64, value: Real64): void;
//	setParameterHandle(name: string, index: Int64, value: Handle): void;
//	setParameterBool(name: string, index: Int64, value: bool): void;
//
//	getParameterArray(name: string, index: Int64, array: any[]): void;
//	setParameterArray(name: string, index: Int64, array: any[]): void;
//
//	setParameterString(name: string, index: Int64, s: string): void;
//	getParameterString(name: string, index: Int64): string;
//
//	/* -------- Methods that must be implemented by subclasses -------- */
//
//	/**
//     * Can't declare a static method in an interface. But RegionFactory
//     * expects to find this method. Caller gets ownership.
//     */
//
//	// static Spec* createSpec();
//
//	// Serialize state.
//	serialize(bundle: BundleIO): void;
//
//	// De-serialize state. Must be called from deserializing constructor
//	deserialize(bundle: BundleIO): void;
//
//	// Serialize state with capnp
//	// using Serializable::write;
//	// virtual void write(capnp::AnyPointer::Builder& anyProto) = 0;
//
//	// Deserialize state from capnp. Must be called from deserializing
//	// constructor.
//	// using Serializable::read;
//	// virtual void read(capnp::AnyPointer::Reader& anyProto) = 0;
//
//	/**
//     * Inputs/Outputs are made available in initialize()
//     * It is always called after the constructor (or load from serialized state)
//     */
//	initialize(): void;
//
//	// Compute outputs from inputs and internal state
//	compute(): void;
//
//	// Execute a command
//	executeCommand(args: string[], index: Int64): string;
//
//	// Per-node size (in elements) of the given output.
//	// For per-region outputs, it is the total element count.
//	// This method is called only for outputs whose size is not
//	// specified in the nodespec.
//	getNodeOutputElementCount(outputName: string): size_t;
//
//	/**
//     * Get a parameter from a write buffer.
//     * This method is called only by the typed getParameter*
//     * methods in the RegionImpl base class
//     *
//     * Must be implemented by all subclasses.
//     *
//     * @param index A node index. (-1) indicates a region-level parameter
//     *
//     */
//	getParameterFromBuffer(
//		name: string,
//		index: Int64,
//		value: Buffer): void;
//
//	/**
//     * Set a parameter from a read buffer.
//     * This method is called only by the RegionImpl base class
//     * type-specific setParameter* methods
//     * Must be implemented by all subclasses.
//     *
//     * @param index A node index. (-1) indicates a region-level parameter
//     */
//	setParameterFromBuffer(
//		name: string,
//		index: Int64,
//		value: Buffer): void;
//
//	/* -------- Methods that may be overridden by subclasses -------- */
//
//	/**
//     * Array-valued parameters may have a size determined at runtime.
//     * This method returns the number of elements in the named parameter.
//     * If parameter is not an array type, may throw an exception or return 1.
//     *
//     * Must be implemented only if the node has one or more array
//     * parameters with a dynamically-determined length.
//     */
//	getParameterArrayCount(name: string, index: Int64): size_t;
//
//	/**
//     * isParameterShared must be available after construction
//     * Default implementation -- all parameters are shared
//     * Tests whether a parameter is node or region level
//     */
//	isParameterShared(name: string): bool;
//
//	//   protected:
//	//     Region* region_;
//
//	//     /* -------- Methods provided by the base class for use by subclasses -------- */
//
//	//     // ---
//	//     /// Callback for subclasses to get an output stream during serialize()
//	//     /// (for output) and the deserializing constructor (for input)
//	//     /// It is invalid to call this method except inside serialize() in a subclass.
//	//     ///
//	//     /// Only one serialization stream may be open at a time. Calling
//	//     /// getSerializationXStream a second time automatically closes the
//	//     /// first stream. Any open stream is closed when serialize() returns.
//	//     // ---
//	//     std::ostream& getSerializationOutputStream(name:string);
//	//     std::istream& getSerializationInputStream(name:string);
//	//     string getSerializationPath(name:string);
//
//	//     // These methods provide access to inputs and outputs
//	//     // They raise an exception if the named input or output is
//	//     // not found.
//	//     Input* getInput(name:string);
//	//     Output* getOutput(name:string);
//
//	//     Dimensions& getDimensions();
//
//}
//
//export let RegionImpl: RegionImpl_Static = nupic_module.x;
//
//// }
//
//// #endif // NTA_REGION_IMPL_HPP
