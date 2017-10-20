#include "SegmentUpdate.hpp"

namespace node_nupic {
	namespace algorithms {
		void SegmentUpdate::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
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
//
//import nupic_module from "../bindings";
//
//import { bool, UInt } from "../types/Types";
//import {Cells4} from "./Cells4";
//
//// #ifndef NTA_SEGMENTUPDATE_HPP
//// #define NTA_SEGMENTUPDATE_HPP
//
//// #include <nupic/proto/SegmentUpdate.capnp.h>
//// #include <nupic/types/Serializable.hpp>
//// #include <nupic/types/Types.hpp>
//// #include <vector>
//// using namespace nupic;
//
//// namespace nupic {
////   namespace algorithms {
////     namespace Cells4 {
//
//// class Cells4;
//
//// ------------------------------------------------------------------------
//// ------------------------------------------------------------------------
///**
// * SegmentUpdate stores information to update segments by creating, removing
// * or updating synapses.
// * SegmentUpdates are applied to the segment they target on a different iteration
// * than the iteration they were created in. SegmentUpdates have a timeStamp,
// * and they are discarded without being applied if they become 'stale'.
// */
//// : Serializable<SegmentUpdateProto>
//interface SegmentUpdate_Static {
//	new(): SegmentUpdate;
//
//	// ----------------------------------------------------------------------
//	new(
//		cellIdx: UInt, segIdx: UInt,
//		sequenceSegment: bool, timeStamp: UInt,
//		synapses?: UInt[]/* = Array<UInt>()*/,
//		phase1Flag?: bool/* = false*/,
//		weaklyPredicting?: bool /*= false*/,
//		cells?: Cells4[] /*=nullptr*/): SegmentUpdate;
//
//	// ----------------------------------------------------------------------
//	// new( o: SegmentUpdate):SegmentUpdate;
//
//	// ----------------------------------------------------------------------
//	// SegmentUpdate& operator=(const SegmentUpdate& o)
//
//}
//
//export interface SegmentUpdate {
//	// typedef Array<UInt>::const_iterator const_iterator;
//
//	// ---------------------------------------------------------------------
//	isSequenceSegment(): bool;
//	cellIdx(): UInt;
//	segIdx(): UInt;
//	timeStamp(): UInt;
//	[idx: number]: UInt;
//	// UInt operator[](UInt idx) const { return _synapses[idx]; }
//	//  const_iterator begin() const            { return _synapses.begin(); }
//	//  const_iterator end() const              { return _synapses.end(); }
//	size(): UInt;
//	empty(): bool;
//	isNewSegment(): bool;
//	isPhase1Segment(): bool;
//	isWeaklyPredicting(): bool;
//
//	// ---------------------------------------------------------------------
//	/**
//	 * Checks that all indices are in range, and that the synapse src cell indices
//	 * are unique and sorted.
//	 */
//	invariants(cells?: Cells4[]/* =nullptr*/): bool;
//
//	// ---------------------------------------------------------------------
//	// using Serializable::write;
//	// void write(SegmentUpdateProto::Builder& proto) const override
//
//	// ---------------------------------------------------------------------
//	// using Serializable::read;
//	// void read(SegmentUpdateProto::Reader& proto) override
//
//	// ---------------------------------------------------------------------
//	// void save(std::ostream& outStream) const
//
//	// ---------------------------------------------------------------------
//	// void load(std::istream& inStream)
//
//	// ---------------------------------------------------------------------
//	// void print(std::ostream& outStream, bool longFormat =false,
//	//           UInt nCellsPerCol = 0) const
//}
//
//// --------------------------------------------------------------------------------
//// #ifndef SWIG
////       inline std::ostream&
////        operator<<(std::ostream& outStream, const SegmentUpdate& update)
////        {
////          update.print(outStream);
////          return outStream;
////        }
//// #endif
//
//// End namespace
////     }
////   }
//// }
//
//// #endif // NTA_SEGMENTUPDATE_HPP
