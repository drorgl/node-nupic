#include "Cells4.hpp"

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
//import { bool, Byte, int, Int, pair, Real, UInt} from "../types/Types";
//import {Cell} from "./Cell";
//import {OutSynapse} from "./OutSynapse";
//import {CState, CStateIndexed, Segment} from "./Segment";
//import {SegmentUpdate} from "./SegmentUpdate";
//
//// #ifndef NTA_Cells4_HPP
//// #define NTA_Cells4_HPP
//
//// #include <ostream>
//// #include <sstream>
//// #include <fstream>
//// #include <nupic/algorithms/Segment.hpp>
//// #include <nupic/algorithms/OutSynapse.hpp>
//// #include <nupic/proto/Cells4.capnp.h>
//// #include <nupic/types/Serializable.hpp>
//// #include <nupic/types/Types.hpp>
//// #include <queue>
//// #include <cstring>
//
//// -----------------------------------------------------------------------
///**
// * Overview
// * ========
// *
// * The Cells4 class is the primary class implementing the C++ version of
// * the temporal pooler. It is designed to be fully accessible from Python.
// * A primary design goal is to maintain exact functional correspondence
// * with the implementation in TP.py.  Given the same inputs, and the same
// * random number seed, the learned segments should be identical in the
// * two implementations. The structure, and method/member
// * variable names also closely matches TP.py.  As such, much of the
// * detailed documentation for the various parameters and methods
// * can be found in the comments in TP.py.
// *
// * Implementation Notes
// * ====================
// *
// * The Cells4 class contains a vector of Cell's. Each Cell instance
// * contains a list of Segments. Each Segment contains Synapses.
// *
// * Cells4 also maintains additional data structures for optimization
// * purposes. The OutSynapses maintain forward propagation data about
// * which Cell's project to which Cell's and Segments.
// *
// * The Cells4 class is used extensively by Python code. Most of the
// * methods are wrapped automatically by SWIG. Some additional methods
// * are explicitly defined in algorithms_impl.i. The memory for
// * certain states, such as _infActiveStateT, can be initialized as
// * pointers to numpy array buffers, avoiding a copy step.
// */
//
//// namespace nupic {
////   namespace algorithms {
////     namespace Cells4 {
//
//// class Cell;
//// class Cells4;
//// class SegmentUpdate;
//
///**
// * Class CBasicActivity:
// * Manage activity counters
// *
// * This class is used by CCellSegActivity.  The counters stay well
// * below 255, allowing us to use UChar elements.  The biggest we
// * have seen is 33.  More important than the raw memory utilization
// * is the reduced pressure on L2 cache.  To see the difference,
// * benchmark this version, then try again after changing
// *
// * CCellSegActivity<UChar> _learnActivity;
// * CCellSegActivity<UChar> _inferActivity;
// *
// * to
// *
// * CCellSegActivity<UInt> _learnActivity;
// * CCellSegActivity<UInt> _inferActivity;
// *
// * We leave this class and CCellSegActivity templated to simplify
// * such testing.
// *
// * While we typically test on just one core, our production
// * configuration may run one engine on each core, thereby increasing
// * the pressure on L2.
// *
// * Counts are collected in one function, following a reset, and
// * used in another.
// *
// *                  Collected in                                     Used in
// * _learnActivity   computeForwardPropagation(CStateIndexed& state)  getBestMatchingCellT
// * _inferActivity   computeForwardPropagation(CState& state)         inferPhase2
// *
// * The _segment counts are the ones that matter.  The _cell counts
// * are an optimization technique.  They track the maximum count
// * for all segments in that cell.  Since segment counts are
// * interesting only if they exceed a threshold, we can skip all of
// * a cell's segments when the maximum is too small.
// *
// * Repeatedly resetting all the counters in large sparse arrays
// * can be costly, and much of the work is unnecessary when most
// * counters are already zero.  To address this, we track which
// * array elements are nonzero, and at reset time zero only those.
// * If an array is not so sparse, this selective zeroing may be
// * slower than a full memset().  We arbitrarily choose a threshold
// * of 6.25%, past which we use memset() instead of selective
// * zeroing.
// */
//const _MAX_CELLS = 1 << 18;      // power of 2 allows efficient array indexing
//const _MAX_SEGS = 1 << 7;      // power of 2 allows efficient array indexing
//// typedef unsigned char UChar;          // custom type, since NTA_Byte = Byte is signed
//
//// template <typename It>
////       class CBasicActivity<T>
////       {
////       public:
////         CBasicActivity()
////         {
////           _counter = nullptr;
////           _nonzero = nullptr;
////           _size = 0;
////           _dimension = 0;
////         }
////         ~CBasicActivity()
////         {
////           if (_counter != nullptr)
////             delete [] _counter;
////           if (_nonzero != nullptr)
////             delete [] _nonzero;
////         }
////         void initialize(UInt n)
////         {
////           if (_counter != nullptr)
////             delete [] _counter;
////           if (_nonzero != nullptr)
////             delete [] _nonzero;
////           _counter = new It[n];                       // use typename here
////           memset(_counter, 0, n * sizeof(_counter[0]));
////           _nonzero = new UInt[n];
////           _size = 0;
////           _dimension = n;
////         }
////         UInt get(UInt cellIdx)
////         {
////           return _counter[cellIdx];
////         }
////         void add(UInt cellIdx, UInt incr)
////         {
////           // currently unused, but may need to resurrect
////           if (_counter[cellIdx] == 0)
////             _nonzero[_size++] = cellIdx;
////           _counter[cellIdx] += incr;
////         }
////         It increment(UInt cellIdx)                    // use typename here
////         {
////           // In the learning phase, the activity count appears never to
////           // reach 255.  Is this a safe assumption?
////           if (_counter[cellIdx] != 0)
////             return ++_counter[cellIdx];
////           _counter[cellIdx] = 1;                      // without this, the inefficient compiler reloads the value from memory, increments it and stores it back
////           _nonzero[_size++] = cellIdx;
////           return 1;
////         }
////         void max(UInt cellIdx, It val)                // use typename here
////         {
////           const It curr = _counter[cellIdx];          // use typename here
////           if (val > curr) {
////             _counter[cellIdx] = val;
////             if (curr == 0)
////               _nonzero[_size++] = cellIdx;
////           }
////         }
////         void reset()
////         {
//// #define REPORT_ACTIVITY_STATISTICS 0
//// #if REPORT_ACTIVITY_STATISTICS
////           // report the statistics for this table
////           // Without a high water counter, we can't tell for sure if a
////           // UChar counter overflowed, but it's likely there was no
////           // overflow if all the other counters are below, say, 200.
////           if (_size == 0) {
////             std::cout << "Reset width=" << sizeof(It) << " all zeroes" << std::endl;
////           }
////           else {
////             static Array<It> vectStat;
////             vectStat.clear();
////             UInt ndxStat;
////             for (ndxStat = 0; ndxStat < _size; ndxStat++)
////               vectStat.push_back(_counter[_nonzero[ndxStat]]);
////             std::sort(vectStat.begin(), vectStat.end());
////             std::cout << "Reset width=" << sizeof(It)
////                       << " size=" << _dimension
////                       << " nonzero=" << _size
////                       << " min=" << UInt(vectStat.front())
////                       << " max=" << UInt(vectStat.back())
////                       << " med=" << UInt(vectStat[_size/2])
////                       << std::endl;
////           }
//// #endif
////           // zero all the nonzero slots
////           if (_size < _dimension / 16) {              // if fewer than 6.25% are nonzero
////             UInt ndx;                                 // zero selectively
////             for (ndx = 0; ndx < _size; ndx++)
////               _counter[_nonzero[ndx]] = 0;
////           }
////           else {
////             memset(_counter, 0, _dimension * sizeof(_counter[0]));
////           }
//
////           // no more nonzero slots
////           _size = 0;
////         }
////       private:
////         It * _counter;                                // use typename here
////         UInt * _nonzero;
////         UInt _size;
////         UInt _dimension;
////       };
//
////       template <typename It>
////       class CCellSegActivity
////       {
////       public:
////         CCellSegActivity()
////         {
////           _cell.initialize(_MAX_CELLS);
////           _seg.initialize(_MAX_CELLS * _MAX_SEGS);
////         }
////         UInt get(UInt cellIdx)
////         {
////           return _cell.get(cellIdx);
////         }
////         UInt get(UInt cellIdx, UInt segIdx)
////         {
////           return _seg.get(cellIdx * _MAX_SEGS + segIdx);
////         }
////         void increment(UInt cellIdx, UInt segIdx)
////         {
////           _cell.max(cellIdx, _seg.increment(cellIdx * _MAX_SEGS + segIdx));
////         }
////         void reset()
////         {
////           _cell.reset();
////           _seg.reset();
////         }
////       private:
////         CBasicActivity<It> _cell;
////         CBasicActivity<It> _seg;
////       };
//
//// typedef Segment::InSynapses InSynapses;
//type OutSynapses = OutSynapse[];
//type SegmentUpdates = SegmentUpdate[];
//
//export interface Cells4_Static {
//	// -----------------------------------------------------------------------
//	/**
//	 * Default constructor needed when lifting from persistence.
//	 */
//	new(
//		nColumns?: UInt/* =0*/, nCellsPerCol?: UInt/* =0*/,
//		activationThreshold?: UInt/* =1*/,
//		minThreshold?: UInt/* =1*/,
//		newSynapseCount?: UInt/* =1*/,
//		segUpdateValidDuration?: UInt/* =1*/,
//		permInitial?: Real/* =.5*/,
//		permConnected?: Real/* =.8*/,
//		permMax?: Real/* =1*/,
//		permDec?: Real/* =.1*/,
//		permInc?: Real/* =.1*/,
//		globalDecay?: Real/* =0*/,
//		doPooling?: bool/* =false*/,
//		seed?: int/* =-1*/,
//		initFromCpp?: bool /* =false*/,
//		checkSynapseConsistency?: bool/* =false*/): Cells4;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Private Helper function for Cells4::adaptSegment. Generates lists of
//	 * synapses to decrement, increment, add, and remove.
//	 *
//	 * We break it out into a separate function to facilitate unit testing.
//	 *
//	 * On Entry, purges resudual data from inactiveSrcCellIdxs,
//	 * inactiveSynapseIdxs, activeSrcCellIdxs, and activeSynapseIdxs.
//	 *
//	 * segment:            The segment being adapted.
//	 *
//	 * synapsesSet:        IN/OUT On entry, the union of source cell indexes
//	 *                     corresponding to existing active synapses in the
//	 *                     segment as well as new synapses to be created. On
//	 *                     return, it's former self sans elements returned
//	 *                     in activeSrcCellIdxs. The remaining elements
//	 *                     correspond to new synapses to be created within
//	 *                     the segment.
//	 *
//	 * inactiveSrcCellIdxs: OUT Source cell indexes corresponding to
//	 *                     inactive synapses in the segment. Ordered by
//	 *                     relative position of the corresponding InSynapses
//	 *                     in the segment. The elements here correlate to
//	 *                     elements in inactiveSynapseIdxs.
//	 *
//	 * inactiveSynapseIdxs: OUT Synapse indexes corresponding to inactive
//	 *                     synapses in the segment. Sorted in
//	 *                     ascending order. The elements here correlate to
//	 *                     elements in inactiveSrcCellIdxs.
//	 *
//	 * activeSrcCellIdxs:  OUT Source cell indexes corresponding to
//	 *                     active synapses in the segment. Ordered by
//	 *                     relative position of the corresponding InSynapses
//	 *                     in the segment. The elements correlate to
//	 *                     elements in activeSynapseIdxs.
//	 *
//	 * activeSynapseIdxs:  OUT Synapse indexes corresponding to active
//	 *                     synapses in the segment. In ascending order. The
//	 *                     elements correlate to elements in
//	 *                     activeSrcCellIdxs.
//	 *
//	 */
//	_generateListsOfSynapsesToAdjustForAdaptSegment(
//		segment: Segment,
//		synapsesSet: Set< UInt> | UInt[],
//		inactiveSrcCellIdxs: UInt[],
//		inactiveSynapseIdxs: UInt[],
//		activeSrcCellIdxs: UInt[],
//		activeSynapseIdxs: UInt[]): void;
//
//}
//
//export interface Cells4 {// : public Serializable<Cells4Proto>
//
//	// static const UInt VERSION = 2;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * This also called when lifting from persistence.
//	 */
//
//	initialize(
//		nColumns?: UInt/* =0*/, nCellsPerCol?: UInt/* =0*/,
//		activationThreshold?: UInt/* =1*/,
//		minThreshold?: UInt/* =1*/,
//		newSynapseCount?: UInt/* =1*/,
//		segUpdateValidDuration?: UInt/* =1*/,
//		permInitial?: Real/* =.5*/,
//		permConnected?: Real/* =.8*/,
//		permMax?: Real/* =1*/,
//		permDec?: Real/* =.1*/,
//		permInc?: Real/* =.1*/,
//		globalDecay?: Real/* =.1*/,
//		doPooling?: bool/* =false*/,
//		initFromCpp?: bool/* =false*/,
//		checkSynapseConsistency?: bool/* =false*/): void;
//
//	// ----------------------------------------------------------------------
//	// ~Cells4();
//
//	// ----------------------------------------------------------------------
//	version(): UInt;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Call this when allocating numpy arrays, to have pointers use those
//	 * arrays.
//	 */
//	//  setStatePointers( infActiveT: Buffer, infActiveT1: Buffer,
//	//             infPredT: Buffer,  infPredT1: Buffer,
//	//            Real* colConfidenceT, Real* colConfidenceT1,
//	//            Real* cellConfidenceT, Real* cellConfidenceT1):void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Use this when C++ allocates memory for the arrays, and Python needs to look
//	 * at them.
//	 */
//	//  getStatePointers(Byte*& activeT, Byte*& activeT1,
//	//                              Byte*& predT, Byte*& predT1,
//	//                              Real*& colConfidenceT, Real*& colConfidenceT1,
//	//                              Real*& confidenceT, Real*& confidenceT1) :void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Use this when Python needs to look up the learn states.
//	 */
//	// getLearnStatePointers(Byte * & activeT, Byte * & activeT1,
//	// 	                     Byte * & predT, Byte * & predT1): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Accessors for getting various member variables
//	 */
//	nSegments(): UInt;
//	nCells(): UInt;
//	nColumns(): UInt;
//	nCellsPerCol(): UInt;
//	getMinThreshold(): UInt;
//	getPermConnected(): Real;
//	getVerbosity(): UInt;
//	getMaxAge(): UInt;
//	getPamLength(): UInt;
//	getMaxInfBacktrack(): UInt;
//	getMaxLrnBacktrack(): UInt;
//	getPamCounter(): UInt;
//	getMaxSeqLength(): UInt;
//	getAvgLearnedSeqLength(): Real;
//	getNLrnIterations(): UInt;
//	getMaxSegmentsPerCell(): Int;
//	getMaxSynapsesPerSegment(): Int;
//	getCheckSynapseConsistency(): bool;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Accessors for setting various member variables
//	 */
//	setMaxInfBacktrack(t: UInt): void;
//	setMaxLrnBacktrack(t: UInt): void;
//	setVerbosity(v: UInt): void;
//	setMaxAge(a: UInt): void;
//	setMaxSeqLength(v: UInt): void;
//	setCheckSynapseConsistency(val: bool): void;
//
//	setMaxSegmentsPerCell(maxSegs: int): void;
//
//	setMaxSynapsesPerCell(maxSyns: int): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Returns the number of segments currently in use on the given cell.
//	 */
//	nSegmentsOnCell(colIdx: UInt, cellIdxInCol: UInt): UInt;
//
//	// -----------------------------------------------------------------------
//	nSynapses(): UInt;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * WRONG ONE if you want the current number of segments with actual synapses
//	 * on the cell!!!!
//	 * This one counts the total number of segments ever allocated on a cell, which
//	 * includes empty segments that have been previously freed.
//	 */
//	__nSegmentsOnCell(cellIdx: UInt): UInt;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Total number of synapses in a given cell (at at given point, changes all the
//	 * time).
//	 */
//	nSynapsesInCell(cellIdx: UInt): UInt;
//
//	// -----------------------------------------------------------------------
//	getCell(colIdx: UInt, cellIdxInCol: UInt): Cell;
//
//	// -----------------------------------------------------------------------
//	getCellIdx(colIdx: UInt, cellIdxInCol: UInt): UInt;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Can return a previously freed segment (segment size == 0) if called with a segIdx
//	 * which is in the "free" list of the cell.
//	 */
//
//	getSegment(colIdx: UInt, cellIdxInCol: UInt, segIdx: UInt): Segment;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Can return a previously freed segment (segment size == 0) if called with a segIdx
//	 * which is in the "free" list of the cell.
//	 */
//	segment(cellIdx: UInt, segIdx: UInt): Segment;
//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//	//
//	// ROUTINES USED IN PERFORMING INFERENCE AND LEARNING
//	//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Main compute routine, called for both learning and inference.
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * input:           array representing bottom up input
//	 * output:          array representing inference output
//	 * doInference:     if true, inference output will be computed
//	 * doLearning:      if true, learning will occur
//	 */
//	compute(input: Real[], output: Real[], doInference: bool, doLearning: bool): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 */
//	reset(): void;
//
//	// ----------------------------------------------------------------------
//	isActive(cellIdx: UInt, segIdx: UInt, state: CState): bool;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Find weakly activated cell in column.
//	 *
//	 * Parameters:
//	 * ==========
//	 * colIdx:         index of column in which to search
//	 * state:          the array of cell activities
//	 * minThreshold:   only consider segments with activity >= minThreshold
//	 * useSegActivity: if true, use forward prop segment activity values
//	 *
//	 * Return value: index and segment of most activated segment whose
//	 * activity is >= minThreshold. The index returned for the cell
//	 * is between 0 and _nCells, *not* a cell index inside the column.
//	 * If no cells are found, return ((UInt) -1, (UInt) -1).
//	 */
//	// getBestMatchingCellT( colIdx:UInt,  state: CState,  minThreshold:UInt):std::pair<UInt, UInt>;
//	// getBestMatchingCellT1( colIdx:UInt,  state: CState,  minThreshold:UInt):std::pair<UInt, UInt>;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Compute cell and segment activities using forward propagation
//	 * and the given state variable.
//	 *
//	 * 2011-08-11: We will remove the CState& function if we can
//	 * convert _infActiveStateT from a CState object to CStateIndexed
//	 * without degrading performance.  Conversion will also require us
//	 * to move all state array modifications from Python to C++.  One
//	 * known offender is TP.py.
//	 */
//	computeForwardPropagation(state: CStateIndexed): void;
//	// #if SOME_STATES_NOT_INDEXED
//	computeForwardPropagation(state: CState): void;
//	// #endif
//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//	//
//	// ROUTINES FOR PERFORMING INFERENCE
//	//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Update the inference state. Called from compute() on every iteration
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * activeColumns:   Indices of active columns
//	 */
//	updateInferenceState(activeColumns: UInt[]): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Update the inference active state from the last set of predictions
//	 * and the current bottom-up.
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * activeColumns:   Indices of active columns
//	 * useStartCells:   If true, ignore previous predictions and simply
//	 *                  turn on the start cells in the active columns
//	 *
//	 * Return value:    whether or not we are in a sequence.
//	 *                  'true' if the current input was sufficiently
//	 *                  predicted, OR if we started over on startCells.
//	 *                  'false' indicates that the current input was NOT
//	 *                  predicted, and we are now bursting on most columns.
//	 *
//	 */
//	inferPhase1(activeColumns: UInt[], useStartCells: bool): bool;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Phase 2 for the inference state. The computes the predicted state,
//	 * then checks to insure that the predicted state is not over-saturated,
//	 * i.e. look too close like a burst. This indicates that there were so
//	 * many separate paths learned from the current input columns to the
//	 * predicted input columns that bursting on the current input columns
//	 * is most likely generated mix and match errors on cells in the
//	 * predicted columns. If we detect this situation, we instead turn on
//	 * only the start cells in the current active columns and re-generate
//	 * the predicted state from those.
//	 *
//	 * Return value:    'true' if we have at least some guess  as to the
//	 *                  next input. 'false' indicates that we have reached
//	 *                  the end of a learned sequence.
//	 *
//	 */
//	inferPhase2(): bool;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * This "backtracks" our inference state, trying to see if we can lock
//	 * onto the current set of inputs by assuming the sequence started N
//	 * steps ago on start cells. For details please see documentation in
//	 * TP.py
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * activeColumns:   Indices of active columns
//	 */
//	inferBacktrack(activeColumns: UInt[]): void;
//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//	//
//	// ROUTINES FOR PERFORMING LEARNING
//	//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Update the learning state. Called from compute()
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * activeColumns:   Indices of active columns
//	 */
//	updateLearningState(
//		activeColumns: UInt[],
//		input: Real[]): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Compute the learning active state given the predicted state and
//	 * the bottom-up input.
//	 *
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * activeColumns:   Indices of active columns
//	 * readOnly:        True if being called from backtracking logic.
//	 *                  This tells us not to increment any segment
//	 *                  duty cycles or queue up any updates.
//	 *
//	 * Return value:    'true' if the current input was sufficiently
//	 *                  predicted, OR if we started over on startCells.
//	 *                  'false' indicates that the current input was NOT
//	 *                  predicted well enough to be considered inSequence
//	 *
//	 */
//	learnPhase1(activeColumns: UInt[], readOnly: bool): bool;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Compute the predicted segments given the current set of active cells.
//	 *
//	 * This computes the lrnPredictedState['t'] and queues up any segments
//	 * that became active (and the list of active synapses for each
//	 * segment) into the segmentUpdates queue
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * readOnly:        True if being called from backtracking logic.
//	 *                  This tells us not to increment any segment
//	 *                  duty cycles or queue up any updates.
//	 *
//	 */
//	learnPhase2(readOnly: bool): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * This "backtracks" our learning state, trying to see if we can lock
//	 * onto the current set of inputs by assuming the sequence started
//	 * up to N steps ago on start cells.
//	 *
//	 */
//	learnBacktrack(): UInt;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * A utility method called from learnBacktrack. This will backtrack
//	 * starting from the given startOffset in our prevLrnPatterns queue.
//	 *
//	 * It returns True if the backtrack was successful and we managed to get
//	 * predictions all the way up to the current time step.
//	 *
//	 * If readOnly, then no segments are updated or modified, otherwise, all
//	 * segment updates that belong to the given path are applied.
//	 *
//	 */
//	learnBacktrackFrom(startOffset: UInt, readOnly: bool): bool;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Update our moving average of learned sequence length.
//	 */
//	_updateAvgLearnedSeqLength(prevSeqLength: UInt): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Choose n random cells to learn from, using cells with activity in
//	 * the state array. The passed in srcCells are excluded.
//	 *
//	 * Parameters:
//	 * - cellIdx:        the destination cell to pick sources for
//	 * - segIdx:         the destination segment to pick sources for
//	 * - nSynToAdd:      the numbers of synapses to add
//	 *
//	 * Return:
//	 * - srcCells:       contains the chosen source cell indices upon return
//	 *
//	 * NOTE: don't forget to keep cell indices sorted!!!
//	 * TODO: make sure we don't pick a cell that's already a src for that seg
//	 */
//
//	chooseCellsToLearnFrom(
//		cellIdx: UInt, segIdx: UInt,
//		nSynToAdd: UInt, state: CStateIndexed, srcCells: UInt[]): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Return the index of a cell in this column which is a good candidate
//	 * for adding a new segment.
//	 *
//	 * When we have fixed size resources in effect, we insure that we pick a
//	 * cell which does not already have the max number of allowed segments.
//	 * If none exists, we choose the least used segment in the column to
//	 * re-allocate. Note that this routine should never return the start
//	 * cell (cellIdx 0) if we have more than one cell per column.
//	 *
//	 * Parameters:
//	 * - colIdx:        which column to look at
//	 *
//	 * Return:
//	 * - cellIdx:       index of the chosen cell
//	 *
//	 */
//	getCellForNewSegment(colIdx: UInt): UInt;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Insert a segmentUpdate data structure containing a list of proposed changes
//	 * to segment segIdx. If newSynapses
//	 * is true, then newSynapseCount - len(activeSynapses) synapses are added to
//	 * activeSynapses. These synapses are randomly chosen from the set of cells
//	 * that have learnState = 1 at timeStep.
//	 *
//	 * Return: true if a new segmentUpdate data structure was pushed onto
//	 * the list.
//	 *
//	 * NOTE: called getSegmentActiveSynapses in Python
//	 *
//	 */
//	computeUpdate(
//		cellIdx: UInt, segIdx: UInt, activeState: CStateIndexed,
//		sequenceSegmentFlag: bool, newSynapsesFlag: bool): bool;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Adds OutSynapses to the internal data structure that maintains OutSynapses
//	 * for each InSynapses. This enables us to propagation activation forward, which
//	 * is faster since activation is sparse.
//	 *
//	 * This is a templated method because sometimes we are called with
//	 * std::set<UInt>::const_iterator and sometimes with
//	 * Array<UInt>::const_iterator
//	 */
//
//	// template <typename It>
//	//   void addOutSynapses(UInt dstCellIdx, UInt dstSegIdx,
//	//                       It newSynapse,
//	//                       It newSynapsesEnd);
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Erases an OutSynapses. See addOutSynapses just above.
//	 */
//	eraseOutSynapses(
//		dstCellIdx: UInt, dstSegIdx: UInt,
//		srcCells: UInt[]): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Go through the list of accumulated segment updates and process them
//	 * as follows:
//	 *
//	 * if       the segment update is too old, remove the update
//	 *
//	 * elseif   the cell received bottom-up input (activeColumns==1) update
//	 *          its permanences then positively adapt this segment
//	 *
//	 * elseif   the cell is still being predicted, and pooling is on then leave it
//	 *          in the queue
//	 *
//	 * else     remove it from the queue.
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * activeColumns:   array of _nColumns columns which are currently active
//	 * predictedState:  array of _nCells states representing predictions for each
//	 *                  cell
//	 *
//	 */
//	processSegmentUpdates(input: Real[], predictedState: CState): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Removes any updates that would be applied to the given col,
//	 * cellIdx, segIdx.
//	 */
//	cleanUpdatesList(cellIdx: UInt, segIdx: UInt): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Apply age-based global decay logic and remove segments/synapses
//	 * as appropriate.
//	 */
//	applyGlobalDecay(): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Applies segment update information to a segment in a cell as follows:
//	 *
//	 * If the segment exists, synapses on the active list get their
//	 * permanence counts incremented by permanenceInc. All other synapses
//	 * get their permanence counts decremented by permanenceDec. If
//	 * a synapse's permanence drops to zero, it is removed from the segment.
//	 * If a segment does not have synapses anymore, it is removed from the
//	 * Cell. We also increment the positiveActivations count of the segment.
//	 *
//	 * If the segment does not exist, it is created using the synapses in
//	 * update.
//	 *
//	 * Parameters:
//	 * ===========
//	 *
//	 * update:        segmentUpdate instance
//	 */
//	adaptSegment( update: SegmentUpdate): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * This method deletes all synapses where permanence value is strictly
//	 * less than minPermanence. It also deletes all segments where the
//	 * number of connected synapses is strictly less than minNumSyns+1.
//	 * Returns the number of segments and synapses removed.
//	 *
//	 * Parameters:
//	 *
//	 * minPermanence:      Any syn whose permamence is 0 or < minPermanence
//	 *                     will be deleted. If 0 is passed in, then
//	 *                     _permConnected is used.
//	 * minNumSyns:         Any segment with less than minNumSyns synapses
//	 *                     remaining in it will be deleted. If 0 is passed
//	 *                     in, then _activationThreshold is used.
//	 *
//	 */
//	trimSegments( minPermanence: Real,  minNumSyns: UInt): pair<UInt, UInt>;
//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//	//
//	// ROUTINES FOR PERSISTENCE
//	//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//
//	/**
//	 * TODO: compute, rather than writing to a buffer.
//	 * TODO: move persistence to binary, faster and easier to compute expecte size.
//	 */
//	persistentSize(): UInt;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Write the state to a proto or file
//	 */
//	// using Serializable::write;
//	// virtual void write(Cells4Proto::Builder& proto) const override;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Read the state into a proto or file
//	 */
//	// using Serializable::read;
//	// virtual void read(Cells4Proto::Reader& proto) override;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Save the state to the given file
//	 */
//	saveToFile(filePath: string): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Load the state from the given file
//	 */
//	loadFromFile(filePath: string): void;
//
//	// ----------------------------------------------------------------------
//	// void save(std::ostream& outStream) const;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Need to load and re-propagate activities so that we can really persist
//	 * at any point, load back and resume inference at exactly the same point.
//	 */
//	// void load(std::istream& inStream);
//
//	// -----------------------------------------------------------------------
//	// void print(std::ostream& outStream) const;
//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//	//
//	// MISC SUPPORT AND DEBUGGING ROUTINES
//	//
//	// ----------------------------------------------------------------------
//	// ----------------------------------------------------------------------
//
//	// Set the Cell class segment order
//	setCellSegmentOrder(matchPythonOrder: bool): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Used in unit tests and debugging.
//	 */
//
//	addNewSegment(
//		colIdx: UInt, cellIdxInCol: UInt,
//		sequenceSegmentFlag: bool,
//		extSynapses: pair< UInt, UInt >  ): void;
//
//	updateSegment(
//		colIdx: UInt, cellIdxInCol: UInt, segIdx: UInt,
//		extSynapses: pair < UInt, UInt >  ): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Rebalances and rebuilds internal structures for faster computing
//	 *
//	 */
//	_rebalance(): void;
//	rebuildOutSynapses(): void;
//	trimOldSegments(age: UInt): void;
//
//	// ----------------------------------------------------------------------
//	/**
//	 * Various debugging helpers
//	 */
//	printStates(): void;
//	printState(state: UInt[]): void;
//	// dumpPrevPatterns(patterns: std: : deque as UInt[] ): void;
//	dumpSegmentUpdates(): void;
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Returns list of indices of segments that are *not* empty in the free list.
//	 */
//
//	getNonEmptySegList(colIdx: UInt, cellIdxInCol: UInt): UInt[];
//
//	// -----------------------------------------------------------------------
//	/**
//	 * Dump timing results to stdout
//	 */
//	dumpTiming(): void;
//
//	// -----------------------------------------------------------------------
//	// Reset all timers to 0
//	// -----------------------------------------------------------------------
//	resetTimers(): void;
//
//	// -----------------------------------------------------------------------
//	// Invariants
//	// -----------------------------------------------------------------------
//	/**
//	 * Performs a number of consistency checks. The test takes some time
//	 * but is very helpful in development. The test is run during load/save.
//	 * It is also run on every compute if _checkSynapseConsistency is true
//	 */
//	invariants(verbose?: bool/* = false*/): bool;
//
//	// -----------------------------------------------------------------------
//	// Statistics
//	// -----------------------------------------------------------------------
//	stats(): void;
//}
//
//export let Cells4: Cells4_Static = nupic_module.x;
//// -----------------------------------------------------------------------
//// #ifndef SWIG
////       std::ostream& operator<<(std::ostream& outStream, const Cells4& cells);
//// #endif
//
//// -----------------------------------------------------------------------
////     } // end namespace Cells4
////   } // end namespace algorithms
//// } // end namespace nupic
//
//// -----------------------------------------------------------------------
//// #endif // NTA_Cells4_HPP
