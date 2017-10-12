#ifndef _NUPIC_ALGORITHMS_INSYNAPSE_H_
#define _NUPIC_ALGORITHMS_INSYNAPSE_H_

#include "../nupic.h"


#include "nupic/algorithms/InSynapse.hpp"

class InSynapse : public overres::ObjectWrap {
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

import { bool, Real, UInt } from "../types/Types";

// #ifndef NTA_INSYNAPSE_HPP
// #define NTA_INSYNAPSE_HPP

// #include <nupic/types/Types.hpp>

// #include <ostream>
// #include <fstream>

// using namespace nupic;

// --------------------------------------------------------------------------------

// namespace nupic {
//  namespace algorithms {
// namespace Cells4 {

	// --------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------
	/**
	 * The type of synapse contained in a Segment. It has the source cell index
	 * of the synapse, and a permanence value. The source cell index is between
	 * 0 and nCols * nCellsPerCol.
	 */
export interface InSynapse_Static {
		new(): InSynapse;
		new(srcCellIdx: UInt, permanence: Real): InSynapse;

		// new(o: InSynapse): InSynapse;

		// inline InSynapse& operator=(const InSynapse& o)

	}

export interface InSynapse {

		srcCellIdx(): UInt;
		permanence(): Real;
		permanence(): Real;

		// inline void print(std::ostream& outStream) const;
	}

export let InSynapse: InSynapse_Static = nupic_module.algorithms.Cells4.InSynapse;
	// --------------------------------------------------------------------------------
	// #ifndef SWIG
	//       std::ostream& operator<<(std::ostream& outStream, const InSynapse& s);
	// #endif

	// end namespace
// }
// }
// }

// #endif // NTA_INSYNAPSE_HPP
#endif