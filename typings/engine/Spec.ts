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
Definition of Spec data structures
*/

// #ifndef NTA_SPEC_HPP
// #define NTA_SPEC_HPP

// #include <nupic/types/Types.hpp>
// #include <nupic/ntypes/Collection.hpp>
// #include <string>
// #include <map>

// namespace nupic
// {
interface InputSpec_Static {
	new(): InputSpec;
	new(
		description: string,
		dataType: NTA_BasicType,
		count: number,
		required: boolean,
		regionLevel: boolean,
		isDefaultInput: boolean,
		requireSplitterMap?: boolean/* = true*/): InputSpec;
}

interface InputSpec {
	// public:

	description: string;
	dataType: NTA_BasicType;
	// TBD: Omit? isn't it always of unknown size?
	// 1 = scalar; > 1 = array of fixed sized; 0 = array of unknown size
	count: number;
	// TBD. Omit? what is "required"? Is it ok to be zero length?
	required: boolean;
	regionLevel: boolean;
	isDefaultInput: boolean;
	requireSplitterMap: boolean;
}

export let InputSpec: InputSpec_Static = nupic_module.InputSpec;

interface OutputSpec_Static {
	new(): OutputSpec;
	new(description: string,
		   dataType: NTA_BasicType,
		   count: number,
		   regionLevel: boolean,
		   isDefaultOutput: boolean): OutputSpec;
}

interface OutputSpec {
	// public:

	description: string;
	dataType: NTA_BasicType;
	// Size, in number of elements. If size is fixed, specify it here.
	// Value of 0 means it is determined dynamically
	count: number;
	regionLevel: boolean;
	isDefaultOutput: boolean;
}

export let OutputSpec: OutputSpec_Static = nupic_module.OutputSpec;

interface CommandSpec_Static {
	new(): CommandSpec;
	new(description: string): CommandSpec;
}

interface CommandSpec {
	// public:

	description: string;

}

export let CommandSpec: CommandSpec_Static = nupic_module.CommandSpec;

interface ParameterSpec_Static {

	new(): ParameterSpec;
    /**
     * @param defaultValue -- a JSON-encoded value
     */
	new(description: string,
		   dataType: NTA_BasicType, count: number,
		   constraints: string, defaultValue: string,
		   accessMode: AccessMode): ParameterSpec;
}

enum AccessMode { CreateAccess, ReadOnlyAccess, ReadWriteAccess }

interface ParameterSpec {
	// public:

	description: string;

	// [open: current basic types are bytes/{u}int16/32/64, real32/64, BytePtr. Is this
	// the right list? Should we have std::string, jsonstd::string?]
	dataType: NTA_BasicType;
	// 1 = scalar; > 1 = array o fixed sized; 0 = array of unknown size
	// TODO: should be size_t? Serialization issues?
	count: number;
	constraints: string;
	defaultValue: string; // JSON representation; empty std::string means parameter is required
	accessMode: AccessMode;

}

export let ParameterSpec: ParameterSpec_Static = nupic_module.ParameterSpec;

interface Spec_Static {
	new(): Spec;
}
export interface Spec {

	// Some RegionImpls support only a single node in a region.
	// Such regions always have dimension [1]
	singleNodeOnly: boolean;

	// Description of the node as a whole
	description: string;

	inputs: InputSpec[];
	outputs: OutputSpec[];
	commands: CommandSpec[];
	parameters: ParameterSpec[];

	// Return a printable string with Spec information
	// TODO: should this be in the base API or layered? In the API right
	// now since we do not build layered libraries.
	toString(): string;

	// #   ifdef NTA_INTERNAL

	//     Spec();

	//     // TODO: decide whether/how to wrap these
	//     std::string getDefaultOutputName() const;
	//     std::string getDefaultInputName() const;

	//     // TODO: need Spec validation, to make sure
	//     // that default input/output are defined
	//     // Currently this is checked in getDefault*, above

	// #   endif; // NTA_INTERNAL

}

export let Spec: Spec_Static = nupic_module.Spec;

// } // namespace nupic

// #endif; // NTA_SPEC_HPP
