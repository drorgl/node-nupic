#include "Cell.hpp"

namespace node_nupic {
	namespace algorithms {
		void Cell::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
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
//
//import {bool, Real, UInt} from "../types/Types";
//import {Cells4} from "./Cells4";
//import {InSynapses, Segment} from "./Segment";
//
//// #ifndef NTA_CELL_HPP
//// #define NTA_CELL_HPP
//
//// #include <vector>
//// #include <nupic/proto/Cell.capnp.h>
//// #include <nupic/types/Serializable.hpp>
//// #include <nupic/types/Types.hpp>
//// #include <nupic/algorithms/Segment.hpp>
//
//// namespace nupic {
////   namespace algorithms {
////     namespace Cells4 {
//
////       class Cells4;
//
//// --------------------------------------------------------------------------------
//// --------------------------------------------------------------------------------
///**
// * A Cell is a container for Segments. It maintains a list of active segments and
// * a list of segments that have been "inactivated" because all their synapses were
// * removed. The slots of inactivated segments are re-used, in contrast to the
// * Python TP, which keeps its segments in a dynamic list and always allocates new
// * segments at the end of this dynamic list. This difference is a source of
// * mismatches in unit testing when comparing the Python TP to the C++ down to the
// * segment level.
// */
//interface Cell_Static {
//	// --------------------------------------------------------------------------------
//	new(): Cell;
//
//}
//export interface Cell {// : Serializable<CellProto>
//
//	// --------------------------------------------------------------------------------
//	empty(): bool;
//
//	// --------------------------------------------------------------------------------
//	nSynapses(): UInt;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Returns size of _segments (see nSegments below). If using this to iterate,
//	 * indices less than size() might contain indices of empty segments.
//	 */
//	size(): UInt;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Returns number of segments that are not in the free list currently, i.e. that
//	 * have at leat 1 synapse.
//	 */
//	nSegments(): UInt;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Returns list of segments that are not empty.
//	 */
//	getNonEmptySegList(): UInt[];
//
//	// --------------------------------------------------------------------------------
//	[segIdx: number]: Segment;
//
//	// --------------------------------------------------------------------------------
//
//	// --------------------------------------------------------------------------------
//	getSegment(segIdx: UInt): Segment;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Returns an empty segment to use, either from list of already
//	 * allocated ones that have been previously "freed" (but we kept
//	 * the memory allocated), or by allocating a new one.
//	 */
//	// TODO: rename method to "addToFreeSegment" ??
//	getFreeSegment(
//		synapses: InSynapses,
//		initFrequency: Real,
//		sequenceSegmentFlag: bool,
//		permConnected: Real,
//		iteration: UInt): UInt;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 *  Whether we  want to match python's segment ordering
//	 */
//	setSegmentOrder(matchPythonOrder: bool): void;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Update the duty cycle of each segment in this cell
//	 */
//	updateDutyCycle(iterations: UInt): void;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Rebalance the segment list. The segment list is compacted and all
//	 * free segments are removed. The most frequent segment is placed at
//	 * the head of the list.
//	 *
//	 * Note: outSynapses must be updated after a call to this.
//	 */
//	rebalanceSegments(): void;
//
//	// --------------------------------------------------------------------------------
//	/**
//	 * Returns index of segment with highest activation frequency.
//	 * 0 means
//	 */
//	getMostActiveSegment(): UInt;
//	// --------------------------------------------------------------------------------
//	/**
//	 * Release a segment by putting it on the list of "freed" segments. We keep the
//	 * memory instead of deallocating it each time, so that's it's fast to "allocate"
//	 * a new segment next time.
//	 *
//	 * Assumes outSynapses has already been updated.
//	 * TODO: a call to releaseSegment should delete any pending
//	 *       update for that segment in the update list. The
//	 *       cheapest way to do this is to maintain segment updates on a
//	 *       per cell basis.  Currently there is a check in
//	 *       Cells4::adaptSegment for this case but that may be insufficient.
//	 */
//	releaseSegment( segIdx: UInt): void;
//
//	// The comment below is so awesome, I had to leave it in!
//
//	// ----------------------------------------------------------------------
//	/**
//	 * TODO: write
//	 */
//	invariants(cells?: Cells4 /*=nullptr*/): bool;
//
//	// ----------------------------------------------------------------------
//	// PERSISTENCE
//	// ----------------------------------------------------------------------
//	persistentSize(): UInt;
//
//	// ----------------------------------------------------------------------
//	//  using Serializable::write;
//	//  virtual void write(CellProto::Builder& proto) const override;
//
//	// ----------------------------------------------------------------------
//	//  using Serializable::read;
//	//  virtual void read(CellProto::Reader& proto) override;
//
//	// ----------------------------------------------------------------------
//	//  void save(std::ostream& outStream) const;
//
//	// ----------------------------------------------------------------------
//	//  void load(std::istream& inStream);
//
//}
//
//// end namespace
////     }
////   }
//// }
//// #     endif; // NTA_CELL_HPP
