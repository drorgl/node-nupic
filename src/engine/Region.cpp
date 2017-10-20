#include "Region.hpp"

namespace node_nupic {
	namespace engine {
		void Region::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
		}
	}

}
 
///* ---------------------------------------------------------------------
// * Numenta Platform for Intelligent Computing (NuPIC)
// * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
// * with Numenta, Inc., for a separate license for this software code, the
// * following terms and conditions apply:
// *
// * This program is free software: you can redistribute it and/or modify
// * it under the terms of the GNU Affero Public License version 3 as
// * published by the Free Software Foundation.
// *
// * This program is distributed in the hope that it will be useful,
// * but WITHOUT ANY WARRANTY; without even the implied warranty of
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// * See the GNU Affero Public License for more details.
// *
// * You should have received a copy of the GNU Affero Public License
// * along with this program.  If not, see http://www.gnu.org/licenses.
// *
// * http://numenta.org/licenses/
// * ---------------------------------------------------------------------
// */
//import nupic_module from "../bindings";
///** @file
// * Interface for the Region class.
// *
// * A region is a set of one or more "identical" nodes, implemented by a
// * RegionImpl"plugin". A region contains nodes.
//*/
//
//// #ifndef NTA_REGION_HPP
//// #define NTA_REGION_HPP
//
//// #include <string>
//// #include <vector>
//// #include <map>
//// #include <set>
//
//// We need the full definitions because these
//// objects are returned by value.
//// #include <nupic/ntypes/Dimensions.hpp>
//import { ArrayBase } from "../ntypes/ArrayBase";
//import { Dimensions } from "../ntypes/Dimensions";
//import { Handle } from "../types/Types";
//import { Input } from "./Input";
//import { Network } from "./Network";
//import { Output } from "./Output";
//import { Spec } from "./Spec";
//// #include <nupic/os/Timer.hpp>
//// import * as Timer from "../os/Timer";
//// #include <nupic/proto/RegionProto.capnp.h>
//// import * as RegionProto from "../proto/RegionProto";
//// #include <nupic/types/Serializable.hpp>
//// import * as Serializable from "../types/Serializable";
//// #include <nupic/types/Types.hpp>
//// import * as Types from "../types/Types";
//
//// namespace nupic
//// {
//
//// class RegionImpl;
//// class Output;
//// class Input;
//// class ArrayRef;
//// class Array;
//// struct Spec;
//// class NodeSet;
//// class BundleIO;
//// class Timer;
//// class Network;
//// class GenericRegisteredRegionImpl;
//
///**
// * Represents a set of one or more "identical" nodes in a Network.
// *
// * @nosubgrouping
// *
// * ### Constructors
// *
// * @note Region constructors are not available in the public API.
// * Internally regions are created and owned by Network.
// *
// */
//export interface Region_Static {
//	/**
//		* Get the Spec of a region type without an instance.
//		*
//		* @param nodeType
//		*        A region type as a string
//		*
//		* @returns The Spec that describes this region type
//		*/
//
//	getSpecFromType(nodeType: string): Spec;
//
//	/*
//     * Adds a Python module and class to the RegionImplFactory's regions
//     */
//	registerPyRegion(module: string, className: string): void;
//
//	/*
//     * Adds a cpp region to the RegionImplFactory's packages
//     */
//	// registerCPPRegion(name: string, wrapper: GenericRegisteredRegionImpl): void;
//
//	/*
//     * Removes a Python module and class from the RegionImplFactory's regions
//     */
//	unregisterPyRegion(className: string): void;
//
//	/*
//     * Removes a cpp region from the RegionImplFactory's packages
//     */
//	unregisterCPPRegion(name: string): void;
//
//}
//
//export interface Region {// : public Serializable<RegionProto>
//	// {
//	// public:
//
//	/**
//     * @name Region information
//     *
//     * @{
//     */
//
//	/**
//     * Get the network containing this region.
//     *
//     * @returns The network containing this region
//     */
//
//	getNetwork(): Network;
//
//	/**
//     * Get the name of the region.
//     *
//     * @returns The region's name
//     */
//
//	getName(): string;
//
//	/**
//     * Get the dimensions of the region.
//     *
//     * @returns The region's dimensions
//     */
//
//	getDimensions(): Dimensions;
//
//	/**
//     * Assign width and height to the region.
//     *
//     * @param dimensions
//     *        A Dimensions object that describes the width and height
//     */
//	setDimensions(dimensions: Dimensions): void;
//
//	/**
//     * @}
//     *
//     * @name Element interface methods
//     *
//     * @todo What does "Element interface methods" mean here?
//     *
//     * @{
//     *
//     */
//
//	/**
//     * Get the type of the region.
//     *
//     * @returns The node type as a string
//     */
//
//	getType(): string;
//
//	/**
//     * Get the spec of the region.
//     *
//     * @returns The spec that describes this region
//     */
//	getSpec(): Spec;
//
//	/**
//     * @}
//     *
//     * @name Parameter getters and setters
//     *
//     * @{
//     *
//     */
//
//	/**
//     * Get the parameter as an @c Int32 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterInt32(name: string): number;
//
//	/**
//     * Get the parameter as an @c UInt32 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterUInt32(name: string): number;
//
//	/**
//     * Get the parameter as an @c Int64 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterInt64(name: string): number;
//
//	/**
//     * Get the parameter as an @c UInt64 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterUInt64(name: string): number;
//
//	/**
//     * Get the parameter as an @c Real32 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterReal32(name: string): number;
//
//	/**
//     * Get the parameter as an @c Real64 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterReal64(name: string): number;
//
//	/**
//     * Get the parameter as an @c Handle value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterHandle(name: string): Handle;
//
//	/**
//     * Get a bool parameter.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns The value of the parameter
//     */
//	getParameterBool(name: string): boolean;
//
//	/**
//     * Set the parameter to an Int32 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterInt32(name: string, value: number): void;
//
//	/**
//     * Set the parameter to an UInt32 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterUInt32(name: string, value: number): void;
//
//	/**
//     * Set the parameter to an Int64 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterInt64(name: string, value: number): void;
//
//	/**
//     * Set the parameter to an UInt64 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterUInt64(name: string, value: number): void;
//
//	/**
//     * Set the parameter to a Real32 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterReal32(name: string, value: number): void;
//
//	/**
//     * Set the parameter to a Real64 value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterReal64(name: string, value: number): void;
//
//	/**
//     * Set the parameter to a Handle value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterHandle(name: string, value: Handle): void;
//
//	/**
//     * Set the parameter to a bool value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	setParameterBool(name: string, value: boolean): void;
//
//	/**
//     * Set the parameter to a function callback value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param value
//     *        The value of the parameter
//     */
//	// tslint:disable-next-line:ban-types
//	setParameterCallback(name: string, value: Function): void;
//
//	/**
//     * Get the parameter as an @c Array value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param[out] array
//     *        The value of the parameter
//     *
//     * @a array is a memory buffer. If the buffer is allocated,
//     * the value is copied into the supplied buffer; otherwise
//     * @a array would be asked to allocate the buffer and copy into it.
//     *
//     * A typical use might be that the caller would supply an
//     * unallocated buffer on the first call and then reuse the memory
//     * buffer on subsequent calls, i.e.
//     *
//     * @code{.cpp}
//     *
//     *     {
//     *       // no buffer allocated
//     *       Array buffer(NTA_BasicTypeInt64);
//     *
//     *       // buffer is allocated, and owned by Array object
//     *       getParameterArray("foo", buffer);
//     *
//     *       // uses already-allocated buffer
//     *       getParameterArray("foo", buffer);
//     *
//     *     } // Array destructor called -- frees the buffer
//     * @endcode
//     *
//     * Throws an exception if the supplied @a array is not big enough.
//     *
//     */
//	getParameterArray(name: string, array: any[]): void;
//
//	/**
//     * Set the parameter to an @c Array value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param array
//     *        The value of the parameter
//     *
//     *
//     * @note @a array must be initialized before calling setParameterArray().
//     *
//     */
//	setParameterArray(name: string, array: any[]): void;
//
//	/**
//     * Set the parameter to a @c std::string value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @param s
//     *        The value of the parameter
//     *
//     * Strings are handled internally as Byte Arrays, but this interface
//     * is clumsy. setParameterString() and getParameterString() internally use
//     * byte arrays but converts to/from strings.
//     *
//     * setParameterString() is implemented with one copy (from the string into
//     * the node) but getParameterString() requires a second copy so that there
//     * are temporarily three copies of the data in memory (in the node,
//     * in an internal Array object, and in the string returned to the user)
//     *
//     */
//	setParameterString(name: string, s: string): void;
//
//	/**
//     * Get the parameter as a @c std::string value.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns
//     *         The value of the parameter
//     *
//     * @see setParameterString()
//     */
//	getParameterString(name: string): string;
//
//	/**
//     * Tells whether the parameter is shared.
//     *
//     * @param name
//     *        The name of the parameter
//     *
//     * @returns
//     *        Whether the parameter is shared
//     *
//     * @todo figure out what "shared" means here
//     *
//     * @note This method must be overridden by subclasses.
//     *
//     * Throws an exception if it's not overridden
//     */
//	isParameterShared(name: string): boolean;
//
//	/**
//     * @}
//     *
//     * @name Inputs and outputs
//     *
//     * @{
//     *
//     */
//
//	/**
//     * Copies data into the inputs of this region, using
//     * the links that are attached to each input.
//     */
//	prepareInputs(): void;
//
//	/**
//     * Get the input data.
//     *
//     *
//     * @param inputName
//     *        The name of the target input
//     *
//     * @returns An @c ArrayRef that contains the input data.
//     *
//     * @internal
//     *
//     * @note The data is either stored in the
//     * the @c ArrayRef or point to the internal stored data,
//     * the actual behavior is controlled by the 'copy' argument (see below).
//     *
//     * @todo what's the copy' argument mentioned here?
//     *
//     * @endinternal
//     *
//     */
//	getInputData(inputName: string): ArrayBase; // ArrayRef;
//
//	/**
//     * Get the output data.
//     *
//     * @param outputName
//     *        The name of the target output
//     *
//     * @returns
//     *        An @c ArrayRef that contains the output data.
//     *
//     * @internal
//     *
//     * @note The data is either stored in the
//     * the @c ArrayRef or point to the internal stored data,
//     * the actual behavior is controlled by the 'copy' argument (see below).
//     *
//     * @todo what's the copy' argument mentioned here?
//     *
//     * @endinternal
//     *
//     */
//	getOutputData(outputName: string): ArrayBase; // ArrayRef;
//
//	/**
//     * Get the count of input data.
//     *
//     * @param inputName
//     *        The name of the target input
//     *
//     * @returns
//     *        The count of input data
//     *
//     * @todo are getOutput/InputCount needed? count can be obtained from the array objects.
//     *
//     */
//	getInputCount(inputName: string): number;
//
//	/**
//     * Get the count of output data.
//     *
//     * @param outputName
//     *        The name of the target output
//     *
//     * @returns
//     *        The count of output data
//     *
//     * @todo are getOutput/InputCount needed? count can be obtained from the array objects.
//     *
//     */
//	getOutputCount(outputName: string): number;
//
//	/**
//     * @}
//     *
//     * @name Operations
//     *
//     * @{
//     *
//     */
//
//	/**
//     * @todo Region::enable() not implemented, should it be part of API at all?
//     */
//	enable(): void;
//
//	/**
//     * @todo Region::disable() not implemented, should it be part of API at all?
//     */
//	disable(): void;
//
//	/**
//     * Request the underlying region to execute a command.
//     *
//     * @param args
//     *        A list of strings that the actual region will interpret.
//     *        The first string is the command name. The other arguments are optional.
//     *
//     * @returns
//     *        The result value of command execution is a string determined
//     *          by the underlying region.
//     */
//	executeCommand(args: string[]): string;
//
//	/**
//     * Perform one step of the region computation.
//     */
//	compute(): void;
//
//	/**
//     * @}
//     *
//     * @name Profiling
//     *
//     * @{
//     *
//     */
//
//	/**
//     * Enable profiling of the compute and execute operations
//     */
//	enableProfiling(): void;
//
//	/**
//     * Disable profiling of the compute and execute operations
//     */
//	disableProfiling(): void;
//
//	/**
//     * Reset the compute and execute timers
//     */
//	resetProfiling(): void;
//
//	/**
//     * Get the timer used to profile the compute operation.
//     *
//     * @returns
//     *        The Timer object used to profile the compute operation
//     */
//	// getComputeTimer(): Timer;
//
//	/**
//     * Get the timer used to profile the execute operation.
//     *
//     * @returns
//     *        The Timer object used to profile the execute operation
//     */
//	// getExecuteTimer(): Timer;
//
//	/**
//     * @}
//     */
//
//	// #ifdef NTA_INTERNAL
//	// Internal methods.
//
//	// // New region from parameter spec
//	// Region(std::string name,
//	//        const std::string& type,
//	//        const std::string& nodeParams,
//	//        Network * network = nullptr);
//
//	// // New region from serialized state
//	// Region(std::string name,
//	//        const std::string& type,
//	//        const Dimensions& dimensions,
//	//        BundleIO& bundle,
//	//        Network * network = nullptr);
//
//	// // New region from capnp struct
//	// Region(std::string name, RegionProto::Reader& proto,
//	//        Network* network=nullptr);
//
//	// virtual ~Region();
//
//	// void
//	// initialize();
//
//	// bool
//	// isInitialized() const;
//
//	// Used by RegionImpl to get inputs/outputs
//
//	getOutput(name: string): Output;
//
//	getInput(name: string): Input;
//
//	// These are used only for serialization
//	// const std::map<const std::string, Input*>&
//	getInputs(): { [name: string]: Input };
//
//	// const std::map<const std::string, Output*>&
//	getOutputs(): { [name: string]: Output };
//
//	// The following methods are called by Network in initialization
//
//	// Returns number of links that could not be fully evaluated
//	evaluateLinks(): number;
//
//	getLinkErrors(): string;
//
//	getNodeOutputElementCount(name: string): number;
//
//	// initOutputs() : void;
//
//	// initInputs()  : void;
//
//	// void
//	// intialize();
//
//	// Internal -- for link debugging
//
//	setDimensionInfo(info: string): void;
//
//	getDimensionInfo(): string;
//
//	hasOutgoingLinks(): boolean;
//
//	// These methods are needed for teardown choreography
//	// in Network::~Network()
//	// It is an error to call any region methods after uninitialize()
//	// except removeAllIncomingLinks and ~Region
//	uninitialize(): void;
//
//	removeAllIncomingLinks(): void;
//
//	// const NodeSet&
//	// getEnabledNodes() const;
//
//	// TODO: sort our phases api. Users should never call Region::setPhases
//	// and it is here for serialization only.
//
//	setPhases(phases: Set<number>): void;
//
//	// std::set<UInt32>&
//	getPhases(): Set<number>;
//
//	// Called by Network for serialization
//	// void
//	// serializeImpl(BundleIO& bundle) : void;
//
//	// using Serializable::write;
//	// void write(RegionProto::Builder& proto) const;
//
//	// using Serializable::read;
//	// void read(RegionProto::Reader& proto);
//
//	// #endif // NTA_INTERNAL
//
//	// private:
//	//   // verboten
//	//   Region();
//	//   Region(Region&);
//
//	//   // common method used by both constructors
//	//   // Can be called after nodespec_ has been set.
//	//   void createInputsAndOutputs_();
//
//	//   const std::string name_;
//
//	//   // pointer to the "plugin"; owned by Region
//	//   RegionImpl* impl_;
//	//   const std::string type_;
//	//   Spec* spec_;
//
//	//   typedef std::map<const std::string, Output*> OutputMap;
//	//   typedef std::map<const std::string, Input*> InputMap;
//
//	//   OutputMap outputs_;
//	//   InputMap inputs_;
//	//   // used for serialization only
//	//   std::set<UInt32> phases_;
//	//   Dimensions dims_; // topology of nodes; starts as []
//	//   bool initialized_;
//
//	//   NodeSet* enabledNodes_;
//
//	//   // Region contains a backpointer to network_ only to be able
//	//   // to retrieve the containing network via getNetwork() for inspectors.
//	//   // The implementation should not use network_ in any other methods.
//	//   Network* network_;
//
//	//   // Figuring out how a region's dimensions were set
//	//   // can be difficult because any link can induce
//	//   // dimensions. This field says how a region's dimensions
//	//   // were set.
//	//   std::string dimensionInfo_;
//
//	//   // private helper methods
//	//   void setupEnabledNodeSet();
//
//	//   // Profiling related methods and variables.
//	//   bool profilingEnabled_;
//	//   Timer computeTimer_;
//	//   Timer executeTimer_;
//}
//
//// } // namespace nupic
//
//// #endif // NTA_REGION_HPP
//export let Region: Region_Static = nupic_module.Region;
