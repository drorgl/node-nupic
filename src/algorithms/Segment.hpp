#ifndef _NUPIC_ALGORITHMS_SEGMENT_H_
#define _NUPIC_ALGORITHMS_SEGMENT_H_


#include "../nupic.h"


#include "nupic/algorithms/Segment.hpp"

class Segment : public overres::ObjectWrap {
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

import { bool, Int, Real, Real32, size_t, UInt, UInt32, UInt64 } from "../types/Types";

import { InSynapse } from "./InSynapse";
// #ifndef NTA_SEGMENT_HPP
// #define NTA_SEGMENT_HPP

// #include <algorithm>
// #include <cstring>
// #include <fstream>
// #include <istream>
// #include <ostream>
// #include <set>
// #include <vector>

// #include <nupic/math/ArrayAlgo.hpp> // is_sorted
// #include <nupic/math/StlIo.hpp> // binary_save
// #include <nupic/proto/Segment.capnp.h>
// #include <nupic/types/Serializable.hpp>
// #include <nupic/algorithms/InSynapse.hpp>

// -----------------------------------------------------------------------
/**
    Overview
    ========

    The Segment class implements a single segment on a cell. It contains a list
    of incoming synapses, a sequence segment flag, and meta information about
    segment activity and duty cycle.

    There are a number of metrics representing segment activity. These include
    the total activations, the number of positive activations, the last
    iteration on which the segment became active, and the overall duty cycle.
    These metrics are used to calculate confidence levels of temporal pooler
    predictions. They are also used in fixed resource CLA and online learning to
    determine which segments and synapses to discard when the cell or segment
    reaches capacity.

    There is a reasonable correspondence to the Python Segment class and most
    of the methods here are accessible from Python.

    Implementation Notes
    ====================

    It is valid to have an empty segment. Empty segments are used in the Cell
    class to avoid always shuffling the list of segments whenever a segment is
    deleted.

    A Segment stores synapses in an STL vector of InSynapses. Synapses are
    unique on the segment, and they are kept in order of increasing source cell
    index for speed of certain operations.

    There are a list of duty cycle "tiers". These are iteration counts at which
    different alpha values are used to update the duty cycle. This is necessary
    for implementing a fast moving average, while allowing high precision. It
    is important that the duty cycle tiers are identical between Python and
    CPP implementations.

    The member variable _nConnected holds the number of synapses that
    are actually connected (permanence value >= connected threshold).

 */

// -----------------------------------------------------------------------

// namespace nupic {
//  namespace algorithms {
// namespace Cells4 {

// -----------------------------------------------------------------------
/**
 * Encapsulate the arrays used to maintain per-cell state.
 */
interface CState_Static {
	new(): CState;
	// ~CState()
	// CState& operator=(const CState& o)

}

export interface CState { // : Serializable<CStateProto>
	// public:
	// static const VERSION = 1;

	initialize(nCells: UInt): bool;

	usePythonMemory(pData: Buffer, nCells: UInt): void;
	isSet(cellIdx: UInt): boolean;
	set(cellIdx: UInt): void;
	resetAll(): void;
	arrayPtr(): Buffer;
	// print( outStream:std::ostream) :void;

	// using Serializable::write;
	// virtual void write(CStateProto::Builder& proto) const override

	// using Serializable::read;
	// virtual void read(CStateProto::Reader& proto) override

	// load(std::istream& inStream):void

	version(): UInt;

}
/**
 * Add an index to CState so that we can find all On cells without
 * a sequential search of the entire array.
 */
interface CStateIndexed_Static {
	new(): CStateIndexed;

	// CStateIndexed& operator=(CStateIndexed& o)

}

export interface CStateIndexed extends CState {

	// static const VERSION = 1;

	cellsOn(fSorted?: bool/* = false*/): UInt[];

	set(cellIdx: UInt): void;

	resetAll(): void;

	// void print(std::ostream& outStream) const

	// void write(CStateProto::Builder& proto) const override

	// void read(CStateProto::Reader& proto) override

	// void load(std::istream& inStream)

	version(): UInt;

}

// These are iteration count tiers used when computing segment duty cycle
const _numTiers = 9;
const _dutyCycleTiers = [0, 100, 320, 1000,
	3200, 10000, 32000, 100000,
	320000];

// This is the alpha used in each tier. dutyCycleAlphas[n] is used when
/// iterationIdx > dutyCycleTiers[n]
const _dutyCycleAlphas = [0.0, 0.0032, 0.0010, 0.00032,
	0.00010, 0.000032, 0.000010, 0.0000032,
	0.0000010];

// -----------------------------------------------------------------------
// Forward declarations
// class Segment;

// -----------------------------------------------------------------------
//   struct InSynapseOrder
//   {
//     inline bool operator()(const InSynapse& a, const InSynapse& b) const

//   };

// -----------------------------------------------------------------------
export type InSynapses = InSynapse[];

export interface Segment_Static {
	new(): Segment;

	// ----------------------------------------------------------------------
	new(
		_s: InSynapses, frequency: Real, seqSegFlag: bool,
		permConnected: Real, iteration: UInt): Segment;

	// -----------------------------------------------------------------------
	// new(o: Segment): Segment;

	// -----------------------------------------------------------------------
	// Segment& operator=(const Segment& o);

	// ----------------------------------------------------------------------
	/**
	 * Returns true if iteration is equal to one of the duty cycle tiers.
	 */
	atDutyCycleTier(iteration: UInt): bool;
}

export interface Segment {// : Serializable<SegmentProto>
	// public:

	// Variables representing various metrics of segment activity
	_totalActivations: UInt;    // Total number of times segment was active
	_positiveActivations: UInt; // Total number of times segment was
	// positively reinforced
	_lastActiveIteration: UInt; // The last iteration on which the segment
	// became active (used in learning only)

	_lastPosDutyCycle: Real;
	_lastPosDutyCycleIteration: UInt;

	// private:
	//   bool       _seqSegFlag;    // sequence segment flag
	//   Real       _frequency;     // frequency [UNUSED IN LATEST IMPLEMENTATION]
	//   InSynapses _synapses;      // incoming connections to this segment
	//   UInt       _nConnected;    // number of current connected synapses

	// public:
	// ----------------------------------------------------------------------

	// -----------------------------------------------------------------------
	/**
	  Checks that the synapses are unique and sorted in order of increasing
	  src cell index. This is required by subsequent algorithms. Order
	  matters for _removeSynapses and updateSynapses, but it prevents from
	  partitioning the synapses in above/below permConnected, which test is
	  the bottleneck in activity() (which is the overall bottleneck).

	  TODO: Maybe we can remove the sorted restriction? Check if
	  _removeSynapses and updateSynapses are major bottlenecks.

	 */
	invariants(): boolean;

	// -----------------------------------------------------------------------
	/**
	 * Check that _nConnected is equal to actual number of connected synapses
	 *
	 */
	checkConnected(permConnected: Real): bool;

	// ----------------------------------------------------------------------
	/**
	 * Various accessors
	 */
	empty(): bool;
	size(): UInt;
	isSequenceSegment(): bool;
	frequency(): Real;
	getFrequency(): Real;
	nConnected(): UInt;
	getTotalActivations(): UInt;
	getPositiveActivations(): UInt;
	getLastActiveIteration(): UInt;
	getLastPosDutyCycle(): Real;
	getLastPosDutyCycleIteration(): UInt;
	// -----------------------------------------------------------------------
	/**
	 * Checks whether the given src cellIdx is already contained in this segment
	 * or not.
	 * TODO: optimize with at least a binary search
	 */
	has(srcCellIdx: UInt): bool;

	// -----------------------------------------------------------------------
	/**
	 * Returns the permanence of the idx-th synapse on this Segment. That idx is *not*
	 * a cell index, but just the index of the synapse on that segment, i.e. that
	 * index will change if synapses are deleted from this segment in synpase
	 * adaptation or global decay.
	 */
	setPermanence(idx: UInt, val: Real): void;

	// -----------------------------------------------------------------------
	/**
	 * Returns the permanence of the idx-th synapse on this Segment as a value
	 */
	getPermanence(idx: UInt): Real;

	// -----------------------------------------------------------------------
	/**
	 * Returns the source cell index of the synapse at index idx.
	 */
	getSrcCellIdx(idx: UInt): UInt;

	// -----------------------------------------------------------------------
	/**
	 * Returns the indices of all source cells in this segment.
	 *
	 * Parameter / return value:
	 *   srcCells:      an empty vector. The indices will be returned in
	 *                  this vector.
	 */
	getSrcCellIndices(srcCells: UInt[]): void;

	// -----------------------------------------------------------------------
	/**
	 * Note that _seqSegFlag is set back to zero when the synapses are erased: when
	 * a segment is released, it's empty _AND_ it's no long a sequence segment.
	 * This simplifies further tests in the algorithm.
	 */
	clear(): void;

	[idx: number]: InSynapse;
	// -----------------------------------------------------------------------
	// InSynapse& operator[](UInt idx) const

	// -----------------------------------------------------------------------
	/**
	 * Adds synapses to this segment.
	 *
	 * Parameters:
	 * ==========
	 * - srcCells:        a collection of source cell indices (the sources of the
	 *                    synapses). Source cell indices are unique on a segment,
	 *                    and are kept in increasing order.
	 * - initStrength:    the initial strength to set for the new synapses
	 */

	addSynapses(
		srcCells: Set<UInt> | UInt[], initStrength: Real,
		permConnected: Real): void;

	// -----------------------------------------------------------------------
	/**
	 * Recompute _nConnected for this segment
	 *
	 * Parameters:
	 * ==========
	 * - permConnected: permanence values >= permConnected are considered
	 *                  connected.
	 *
	 */
	recomputeConnected(permConnected: Real): void;

	// -----------------------------------------------------------------------
	/**
	 * Updates synapses permanences, possibly removing synapses from the segment if their
	 * permanence drops to or below 0.
	 *
	 * Parameters:
	 * ==========
	 * - synapses:       a collection of source cell indices to update (will be matched
	 *                   with source cell index of each synapse)
	 * - delta:          the amount to add to the permanence value of the updated
	 *                   synapses
	 * - removed:        collection of synapses that have been removed because their
	 *                   permanence dropped below 0 (srcCellIdx of synapses).
	 *
	 * TODO: have synapses be 2 pointers, to avoid copies in adaptSegments
	 */
	// template <typename T2> // this blocks swig wrapping which doesn't happen right
	//   inline void
	//  updateSynapses(const Array<T2>& synapses, Real delta,
	//                 Real permMax, Real permConnected,
	//                 Array<T2>& removed)

	// ----------------------------------------------------------------------
	/**
	 * Subtract decay from each synapses' permanence value.
	 * Synapses whose permanence drops below 0 are removed and their source
	 * indices are inserted into the "removed" list.
	 *
	 * Parameters:
	 * ==========
	 * - decay:       the amount to subtract from the permanence value the
	 *                synapses
	 * - removed:     srcCellIdx of the synapses that are removed
	 */
	decaySynapses2(
		decay: Real, removed: UInt[],
		permConnected: Real): void;

	// ----------------------------------------------------------------------
	/**
	 * Decay synapses' permanence value. Synapses whose permanence drops
	 * below 0 are removed.
	 *
	 * Parameters:
	 * ==========
	 * - decay:       the amount to subtract from the permanence value the
	 *                synapses
	 * - removed:     srcCellIdx of the synapses that are removed
	 */
	decaySynapses(
		decay: Real, removed: UInt[],
		permConnected: Real, doDecay?: bool/*=true*/): void;

	// ----------------------------------------------------------------------
	/**
	 * Free up some synapses in this segment. We always free up inactive
	 * synapses (lowest permanence freed up first) before we start to free
	 * up active ones.
	 *
	 * Parameters:
	 * ==========
	 * numToFree:                 num synapses we have to remove
	 * inactiveSynapseIndices:    list of inactive synapses (src cell indices)
	 * inactiveSegmentIndices:    list of inactive synapses (index within segment)
	 * activeSynapseIndices:      list of active synapses (src cell indices)
	 * activeSegmentIndices:      list of active synapses (index within segment)
	 * removed:                   srcCellIdx of the synapses that are
	 *                            removed
	 * verbosity:                 verbosity level for debug printing
	 * nCellsPerCol:              number of cells per column (for debug
	 *                            printing)
	 * permMax:                   maximum allowed permanence value
	 */
	freeNSynapses(
		numToFree: UInt,
		inactiveSynapseIndices: UInt[],
		inactiveSegmentIndices: UInt[],
		activeSynapseIndices: UInt[],
		activeSegmentIndices: UInt[],
		removed: UInt[], verbosity: UInt,
		nCellsPerCol: UInt, permMax: Real): void;

	// ----------------------------------------------------------------------
	/**
	 * Computes the activity level for a segment given permConnected and
	 * activationThreshold. A segment is active if it has more than
	 * activationThreshold connected synapses that are active due to
	 * activeState.
	 *
	 * Parameters:
	 * ==========
	 * - activities: pointer to activeStateT or activeStateT1
	 *
	 * NOTE: called getSegmentActivityLevel in Python
	 */
	isActive(
		activities: CState,
		permConnected: Real, activationThreshold: UInt): bool;

	// ----------------------------------------------------------------------
	/**
	 * Compute the activity level of a segment using cell activity levels
	 * contain in activities.
	 *
	 * Parameters:
	 * ==========
	 * - activities: pointer to an array of cell activities.
	 *
	 * - permConnected: permanence values >= permConnected are considered
	 *                  connected.
	 *
	 * - connectedSynapsesOnly: if true, only consider synapses that are
	 *                          connected.
	 */
	computeActivity(
		activities: CState, permConnected: Real,
		connectedSynapsesOnly: bool): UInt;

	// ----------------------------------------------------------------------
	/**
	 * Compute/update and return the positive activations duty cycle of
	 * this segment. This is a measure of how often this segment is
	 * providing good predictions.
	 *
	 * Parameters:
	 * ==========
	 * iteration:   Current compute iteration. Must be > 0!
	 * active:      True if segment just provided a good prediction
	 *
	 */
	dutyCycle(iteration: UInt, active: bool, readOnly: bool): Real;

	// ----------------------------------------------------------------------
	// PERSISTENCE
	// ----------------------------------------------------------------------
	persistentSize(): UInt;

	// ----------------------------------------------------------------------
	// using Serializable::write;
	// void write(SegmentProto::Builder& proto) const override

	// ----------------------------------------------------------------------
	// using Serializable::read;
	// void read(SegmentProto::Reader& proto) override

	// ----------------------------------------------------------------------
	// inline void save(std::ostream& outStream) const

	// ----------------------------------------------------------------------
	// inline void load(std::istream& inStream)

	// -----------------------------------------------------------------------
	/**
	 * Print the segment in a human readable form. If nCellsPerCol is specified
	 * then the source col/cell for each synapse will be printed instead of
	 * cell index.
	 */
	// print( outStream:std::ostream ,  nCellsPerCol?:UInt /*= 0*/):void
}
export let Segment: Segment_Static = nupic_module.x;
	// -----------------------------------------------------------------------

	// -----------------------------------------------------------------------
// } // end namespace Cells4
//  } // end namespace algorithms
// } // end namespace nupic

// -----------------------------------------------------------------------
// #endif // NTA_SEGMENT_HPP
#endif