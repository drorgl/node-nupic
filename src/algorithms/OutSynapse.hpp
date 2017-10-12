#ifndef _NUPIC_ALGORITHMS_OUTSYNAPSE_H_
#define _NUPIC_ALGORITHMS_OUTSYNAPSE_H_

#include "../nupic.h"


#include "nupic/algorithms/OutSynapse.hpp"

class OutSynapse : public overres::ObjectWrap {
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	/*static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

	std::shared_ptr<nupic::Input> _input;

	static POLY_METHOD(New);
	static POLY_METHOD(compute);*/
};

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

import { bool, UInt } from "../types/Types";
import {Cells4} from "./Cells4";

// #ifndef NTA_OUTSYNAPSE_HPP
// #define NTA_OUTSYNAPSE_HPP

// #include <nupic/types/Types.hpp>
// #include <nupic/utils/Log.hpp> // NTA_ASSERT

// using namespace nupic;

// namespace nupic {
//   namespace algorithms {
//     namespace Cells4 {

//      class Cells4;
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
/**
 * The type of synapse we use to propagate activation forward. It contains
 * indices for the *destination* cell, and the *destination* segment on that cell.
 * The cell index is between 0 and nCols * nCellsPerCol.
 */
export interface OutSynapse_Static {
	new(
		dstCellIdx?: UInt/* =(UInt) -1*/,
		dstSegIdx?: UInt/* =(UInt) -1*/
		// Cells4* cells =NULL
	): OutSynapse;

	new( o: OutSynapse): OutSynapse;

	// OutSynapse& operator=(const OutSynapse& o)

	// --------------------------------------------------------------------------------
	// bool operator==(const OutSynapse& a, const OutSynapse& b);

}

export interface OutSynapse {
	dstCellIdx(): UInt;
	dstSegIdx(): UInt;

	/**
	 * Checks whether this outgoing synapses is going to given destination
	 * or not.
	 */
	goesTo(dstCellIdx: UInt, dstSegIdx: UInt): bool;

	/**
	 * Need for is_in/not_in tests.
	 */
	equals(o: OutSynapse): bool;

	/**
	 * Checks that the destination cell index and destination segment index
	 * are in range.
	 */
	invariants(cells?: Cells4[]/* =nullptr*/): bool;
}
export let OutSynapse: OutSynapse_Static = nupic_module.x;

// End namespace
//     }
//   }
// }

// #endif // NTA_OUTSYNAPSE_HPP
#endif