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

import { bool} from "../types/Types";
/** @file
 * Definition of the LinkPolicy class
 */

// #ifndef NTA_LINKPOLICY_HPP
// #define NTA_LINKPOLICY_HPP

// #include <string>
// #include <nupic/engine/Input.hpp> // SplitterMap definition
import {Dimensions} from "../ntypes/Dimensions";
import { Input } from "./Input";

// LinkPolicy is an interface class subclassed by all link policies
// namespace nupic
// {

//  class Dimensions;
interface LinkPolicy_Static {

}

export interface LinkPolicy {
	// Subclasses implement this constructor:
	//    LinkPolicy(const std::string params, const Dimensions& srcDimensions,
	//               const Dimensions& destDimensions);

	// public:
	// virtual ~LinkPolicy() {};
	setSrcDimensions(dims: Dimensions): void;
	setDestDimensions(dims: Dimensions): void;
	getSrcDimensions(): Dimensions;
	getDestDimensions(): Dimensions;
	// initialization is probably unnecessary, but it lets
	// us do a sanity check before generating the splitter map.
	initialize(): void;
	isInitialized(): boolean;
	setNodeOutputElementCount(elementCount: number): void;

	// A "protoSplitterMap" specifies which source output nodes send
	// data to which dest input nodes.
	// if protoSplitter[destNode][x] == srcNode for some x, then
	// srcNode sends its output to destNode.
	//
	buildProtoSplitterMap(splitter: Input.SplitterMap): void;
}

// } // namespace nupic

// #endif; // NTA_LINKPOLICY_HPP
