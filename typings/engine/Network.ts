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

import nupic_module from "../bindings";

import {Collection} from "../ntypes/Collection";
import { Dimensions } from "../ntypes/Dimensions";
import { Link } from "./Link";
import { Region } from "./Region";

/** @file
 * Interface for the Network class
 */

// #ifndef NTA_NETWORK_HPP
// #define NTA_NETWORK_HPP

// #include <iostream>
// #include <map>
// #include <set>
// #include <string>
// #include <vector>

// #include <nupic/ntypes/Collection.hpp>

// #include <nupic/proto/NetworkProto.capnp.h>
// #include <nupic/proto/RegionProto.capnp.h>
// #include <nupic/types/Types.hpp>
// #include <nupic/types/Serializable.hpp>

// namespace nupic
// {

// class Region;
// class Dimensions;
// class GenericRegisteredRegionImpl;
// class Link;

/**
 * The type of run callback function.
 *
 * You can attach a callback function to a network, and the callback function
 *  is called after every iteration of run().
 *
 * To attach a callback, just get a reference to the callback
 * collection with getCallbacks() , and add a callback.
 */
// typedef; void (*runCallbackFunction)(Network*, UInt64 iteration, void*);
type runCallbackFunction = (network: Network, iteration: number, userData: any) => void;

/**
 * Type definition for a callback item, combines a @c runCallbackFunction and
 * a `void*` pointer to the associated data.
 */
// typedef; std::pair<runCallbackFunction, void*> callbackItem;
export interface callbackItem {
	function: runCallbackFunction;
	data: any;
}

/**
 * Represents an HTM network. A network is a collection of regions.
 *
 * @nosubgrouping
 */
interface Network_Static {
	/**
	*
	* Create an new Network and register it to NuPIC.
	*
	* @note Creating a Network will auto-initialize NuPIC.
	*/
	// new(): Network;

	/**
	 * Create a Network by loading previously saved bundle,
	 * and register it to NuPIC.
	 *
	 * @param path The path to the previously saved bundle file, currently only
	 * support files with `.nta` extension.
	 *
	 * @note Creating a Network will auto-initialize NuPIC.
	 */
	new(path?: string): Network;

	/**
	 * Destructor.
	 *
	 * Destruct the network and unregister it from NuPIC:
	 *
	 * - Uninitialize all regions
	 * - Remove all links
	 * - Delete the regions themselves
	 *
	 * @todo Should we document the tear down steps above?
	 */
	// ~Network();

	/**
     * @}
     */

	/*
     * Adds user built region to list of regions
     */
	registerPyRegion(module: string, className: string): void;

	/*
	 * Adds a c++ region to the RegionImplFactory's packages
	 */
	// registerCPPRegion(
	// name: string,
	// wrapper: GenericRegisteredRegionImpl): void;

	/*
	 * Removes a region from RegionImplFactory's packages
	 */
	unregisterPyRegion(className: string): void;

	/*
	 * Removes a c++ region from RegionImplFactory's packages
	 */
	unregisterCPPRegion(name: string): void;

}

export interface Network {// : public Serializable<NetworkProto>

	// public:

	/**
     * @name Construction and destruction
     * @{
     */

	/**
     * Initialize all elements of a network so that it can run.
     *
     * @note This can be called after the Network structure has been set and
     * before Network.run(). However, if you don't call it, Network.run() will
     * call it for you. Also sets up various memory buffers etc. once the Network
     *  structure has been finalized.
     */

	initialize(): void;

	/**
     * @}
     *
     * @name Serialization
     *
     * @{
     */

	/**
     * Save the network to a network bundle (extension `.nta`).
     *
     * @param name
     *        Name of the bundle
     */
	save(name: string): void;

	/**
     * @}
     *
     * @name Region and Link operations
     *
     * @{
     */

	/**
     * Create a new region in a network.
     *
     * @param name
     *        Name of the region, Must be unique in the network
     * @param nodeType
     *        Type of node in the region, e.g. "FDRNode"
     * @param nodeParams
     *        A JSON-encoded string specifying writable params
     *
     * @returns A pointer to the newly created Region
     */

	addRegion(
		name: string,
		nodeType: string,
		nodeParams: string): Region;

	/**
     * Create a new region from saved state.
     *
     * @param name
     *        Name of the region, Must be unique in the network
     * @param nodeType
     *        Type of node in the region, e.g. "FDRNode"
     * @param dimensions
     *        Dimensions of the region
     * @param bundlePath
     *        The path to the bundle
     * @param label
     *        The label of the bundle
     *
     * @todo @a label is the prefix of filename of the saved bundle, should this
     * be documented?
     *
     * @returns A pointer to the newly created Region
     */

	addRegionFromBundle(
		name: string,
		nodeType: string,
		dimensions: Dimensions,
		bundlePath: string,
		label: string): Region;

	/**
     * Create a new region from saved Cap'n Proto state.
     *
     * @param name
     *        Name of the region, Must be unique in the network
     * @param proto
     *        The capnp proto reader
     *
     * @returns A pointer to the newly created Region
     */

	// addRegionFromProto(
	// 	name: string,
	// 	proto: RegionProto.Reader): Region;

	/**
     * Removes an existing region from the network.
     *
     * @param name
     *        Name of the Region
     */
	removeRegion(name: string): void;

	/**
     * Create a link and add it to the network.
     *
     * @param srcName
     *        Name of the source region
     * @param destName
     *        Name of the destination region
     * @param linkType
     *        Type of the link
     * @param linkParams
     *        Parameters of the link
     * @param srcOutput
     *        Name of the source output
     * @param destInput
     *        Name of the destination input
     * @param propagationDelay
     *            Propagation delay of the link as number of network run
     *            iterations involving the link as input; the delay vectors, if
     *            any, are initially populated with 0's. Defaults to 0=no delay
     */
	link(
		srcName: string, destName: string,
		linkType: string, linkParams: string,
		srcOutput?: string/*=""*/, destInput?: string/*=""*/,
		propagationDelay?: number /*=0*/): void;

	/**
     * Removes a link.
     *
     * @param srcName
     *        Name of the source region
     * @param destName
     *        Name of the destination region
     * @param srcOutputName
     *        Name of the source output
     * @param destInputName
     *        Name of the destination input
     */
	removeLink(
		srcName: string, destName: string,
		srcOutputName?: string /*=""*/, destInputName?: string /*=""*/): void;

	/**
     * @}
     *
     * @name Access to components
     *
     * @{
     */

	/**
     * Get all regions.
     *
     * @returns A Collection of Region objects in the network
     */

	getRegions(): Collection<Region>;

	/**
     * Get all links between regions
     *
     * @returns A Collection of Link objects in the network
     */

	getLinks(): Link[];

	/**
     * Set phases for a region.
     *
     * @param name
     *        Name of the region
     * @param phases
     *        A tuple of phases (must be positive integers)
     */
	setPhases(name: string, phases: number[]/* std: :set as UInt32&*/): void;

	/**
     * Get phases for a region.
     *
     * @param name
     *        Name of the region
     *
     * @returns Set of phases for the region
     */

	getPhases(name: string): number[]; // std::set<UInt32>

	/**
     * Get minimum phase for regions in this network. If no regions, then min = 0.
     *
     * @returns Minimum phase
     */
	getMinPhase(): number;

	/**
     * Get maximum phase for regions in this network. If no regions, then max = 0.
     *
     * @returns Maximum phase
     */
	getMaxPhase(): number;

	/**
     * Set the minimum enabled phase for this network.
     *
     * @param minPhase Minimum enabled phase
     */
	setMinEnabledPhase(minPhase: number): void;

	/**
     * Set the maximum enabled phase for this network.
     *
     * @param minPhase Maximum enabled phase
     */
	setMaxEnabledPhase(minPhase: number): void;

	/**
     * Get the minimum enabled phase for this network.
     *
     * @returns Minimum enabled phase for this network
     */
	getMinEnabledPhase(): number;

	/**
     * Get the maximum enabled phase for this network.
     *
     * @returns Maximum enabled phase for this network
     */
	getMaxEnabledPhase(): number;

	/**
     * @}
     *
     * @name Running
     *
     * @{
     */

	/**
     * Run the network for the given number of iterations of compute for each
     * Region in the correct order.
     *
     * For each iteration, Region.compute() is called.
     *
     * @param n Number of iterations
     */
	run(n: number): void;

	/**
     * Get reference to callback Collection.
     *
     * @returns Reference to callback Collection
     */
	getCallbacks(): Collection< callbackItem>;

	/**
     * @}
     *
     * @name Profiling
     *
     * @{
     */

	/**
     * Start profiling for all regions of this network.
     */
	enableProfiling(): void;

	/**
     * Stop profiling for all regions of this network.
     */
	disableProfiling(): void;

	/**
     * Reset profiling timers for all regions of this network.
     */
	resetProfiling(): void;

	// Capnp serialization methods
	// using; Serializable::write;
	// virtual; void write(NetworkProto::Builder& proto); const override;
	write(): Buffer;
	// using; Serializable::read;
	// virtual; void read(NetworkProto::Reader& proto); override;
	read(buf: Buffer): void;
	// private:

	//   // Both constructors use this common initialization method
	//   void commonInit();

	//   // Used by the path-based constructor
	//   void load(const std::string& path);

	//   void loadFromBundle(const std::string& path);

	//   // save() always calls this internal method, which creates
	//   // a .nta bundle
	//   void saveToBundle(const std::string& bundleName);

	//   // internal method using region pointer instead of name
	//   void
	//   setPhases_(Region *r, std::set<UInt32>& phases);

	//   // default phase assignment for a new region
	//   void setDefaultPhase_(Region* region);

	//   // whenever we modify a network or change phase
	//   // information, we set enabled phases to min/max for
	//   // the network
	//   void resetEnabledPhases_();

	//   bool initialized_;
	//   Collection<Region*> regions_;

	//   UInt32 minEnabledPhase_;
	//   UInt32 maxEnabledPhase_;

	//   // This is main data structure used to choreograph
	//   // network computation
	//   std::vector< std::set<Region*> > phaseInfo_;

	//   // we invoke these callbacks at every iteration
	//   Collection<callbackItem> callbacks_;

	//   //number of elapsed iterations
	//   UInt64 iteration_;
}

// } // namespace nupic

// #endif // NTA_NETWORK_HPP
export let Network: Network_Static = nupic_module.Network;
