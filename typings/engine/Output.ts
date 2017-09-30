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

import nupic_module from "../bindings";

/** @file
 * Interface for the internal Output class.
 */

// #ifndef NTA_OUTPUT_HPP
// #define NTA_OUTPUT_HPP

// #include <set>
// #include <nupic/types/Types.hpp>
// #include <nupic/utils/Log.hpp> // temporary, while impl is in this file
import {NTA_BasicType} from "../types/Types";
// import * as Log from "../utils/Log";
import {Link} from "./Link";
import {Region} from "./Region";
// namespace nupic
// {

//   class Link;
//   class Region;
//   class Array;

/**
 * Represents a named output to a Region.
 */
interface Output_Static {

	/***
     * Constructor.
     *
     * @param region
     *        The region that the output belongs to.
     * @param type
     *        The type of the output, TODO
     * @param isRegionLevel
     *        Whether the output is region level, i.e. TODO
     */
	new(region: Region, type: NTA_BasicType, isRegionLevel: boolean): Output;

	/**
	 * Destructor
	 */
	// ~Output();
}
export interface Output {
	// public:

	/***
     * Set the name for the output.
     *
     * Output need to know their own name for error messages.
     *
     * @param name
     *        The name of the output
     */
	setName(name: string): void;

	/***
     * Get the name of the output.
     *
     * @return
     *        The name of the output
     */
	getName(): string;

	/***
     * Initialize the Output .
     *
     * @param size
     *        The count of node output element, i.e. TODO
     *
     * @note It's safe to reinitialize an initialized Output with the same
     * parameters.
     *
     */
	initialize(size: number): void;

	/***
     *
     * Add a Link to the Output .
     *
     * @note The Output does NOT take ownership of @a link, it's created and
     * owned by an Input Object.
     *
     * Called by Input.addLink()
     *
     * @param link
     *        The Link to add
     */
	addLink(link: Link): void;

	/***
     * Removing an existing link from the output.
     *
     * @note Called only by Input.removeLink() even if triggered by
     * Network.removeRegion() while removing the region that contains us.
     *
     * @param link
     *        The Link to remove
     */
	removeLink(link: Link): void;

	/***
     * Tells whether the output has outgoing links.
     *
     * @note We cannot delete a region if there are any outgoing links
     * This allows us to check in Network.removeRegion() and Network.~Network().
     * @returns
     *         Whether the output has outgoing links
     */
	hasOutgoingLinks(): boolean;

	/***
     *
     * Get the data of the output.
     *
     * @returns
     *         A constant reference to the data of the output as an @c Array
     *
     * @note It's mportant to return a const array so caller can't
     * reallocate the buffer.
     */
	getData(): any[];

	/***
     *
     * Tells whether the output is region level.
     *
     * @returns
     *     Whether the output is region level, i.e. TODO
     */
	isRegionLevel(): boolean;

	/***
     *
     * Get the Region that the output belongs to.
     *
     * @returns
     *         The mutable reference to the Region that the output belongs to
     */

	getRegion(): Region;

	/***
     * Get the count of node output element.
     *
     * @returns
     *         The count of node output element, previously set by initialize().
     */
	getNodeOutputElementCount(): number;

	// private:

	//   Region& region_; // needed for number of nodes
	//   Array * data_;
	//   bool isRegionLevel_;
	//   // order of links never matters, so store as a set
	//   // this is different from Input, where they do matter
	//   std::set<Link*> links_;
	//   std::string name_;
	//   size_t nodeOutputElementCount_;
}

// }

// #endif // NTA_OUTPUT_HPP
export let Output: Output_Static = nupic_module.Output;
